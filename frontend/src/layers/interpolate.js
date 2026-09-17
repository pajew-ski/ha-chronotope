/**
 * Smooth movement for tracked objects (spec 7.4): the display runs one
 * polling interval behind real time and interpolates linearly between the
 * last two known positions; without a fresh sample it dead-reckons from
 * track and speed for up to two intervals, then hides the object. The
 * selected object keeps a 60 s trail.
 */
const EARTH_M_PER_DEG = 111_320;

export class TrackInterpolator {
  constructor({ intervalMs = 15000, trailMs = 60000, maxSamples = 12 } = {}) {
    this.intervalMs = intervalMs;
    this.trailMs = trailMs;
    this.maxSamples = maxSamples;
    this._tracks = new Map(); // id -> { feature, samples: [{t, lat, lon, alt}] }
  }

  setInterval(intervalMs) {
    this.intervalMs = Math.max(1000, intervalMs);
  }

  ingest(features, receivedAt = Date.now()) {
    const seen = new Set();
    for (const feature of features || []) {
      const coords = feature.geometry?.coordinates;
      if (!coords || coords.length < 2) continue;
      const ts = feature.properties?.ts ? Date.parse(feature.properties.ts) : NaN;
      const t = Number.isFinite(ts) ? Math.min(ts, receivedAt) : receivedAt;
      const entry = this._tracks.get(feature.id) || { feature, samples: [] };
      entry.feature = feature;
      const last = entry.samples[entry.samples.length - 1];
      if (!last || last.t < t || last.lat !== coords[1] || last.lon !== coords[0]) {
        entry.samples.push({ t: last && last.t >= t ? last.t + 1 : t, lat: coords[1], lon: coords[0], alt: coords[2] ?? null });
        if (entry.samples.length > this.maxSamples) entry.samples.shift();
      }
      entry.lastSeen = receivedAt;
      this._tracks.set(feature.id, entry);
      seen.add(feature.id);
    }
    // Objects missing from the newest poll fade out via dead reckoning.
    for (const [id, entry] of this._tracks) {
      if (!seen.has(id) && receivedAt - entry.lastSeen > 2 * this.intervalMs) this._tracks.delete(id);
    }
  }

  /** Features with interpolated coordinates for the display time. */
  featuresAt(now = Date.now()) {
    const displayTime = now - this.intervalMs;
    const out = [];
    for (const [, entry] of this._tracks) {
      const position = this._positionAt(entry, displayTime);
      if (!position) continue;
      const coords = [position.lon, position.lat];
      if (position.alt != null) coords.push(position.alt);
      out.push({ ...entry.feature, geometry: { type: "Point", coordinates: coords } });
    }
    return out;
  }

  trail(id, now = Date.now()) {
    const entry = this._tracks.get(id);
    if (!entry) return [];
    const from = now - this.intervalMs - this.trailMs;
    return entry.samples.filter((s) => s.t >= from).map((s) => [s.lat, s.lon]);
  }

  _positionAt(entry, t) {
    const samples = entry.samples;
    if (!samples.length) return null;
    const last = samples[samples.length - 1];
    if (t <= samples[0].t) return samples[0];
    for (let i = samples.length - 1; i > 0; i -= 1) {
      const a = samples[i - 1];
      const b = samples[i];
      if (t >= a.t && t <= b.t) {
        const f = b.t === a.t ? 1 : (t - a.t) / (b.t - a.t);
        return {
          lat: a.lat + (b.lat - a.lat) * f,
          lon: a.lon + (b.lon - a.lon) * f,
          alt: a.alt != null && b.alt != null ? a.alt + (b.alt - a.alt) * f : b.alt ?? a.alt,
        };
      }
    }
    // Beyond the last sample: dead reckoning for at most two intervals.
    const age = t - last.t;
    if (age > 2 * this.intervalMs) return null;
    const props = entry.feature.properties || {};
    const speed = Number(props.speed_ms);
    const track = Number(props.track);
    if (!Number.isFinite(speed) || !Number.isFinite(track) || speed <= 0) return last;
    const distance = speed * (age / 1000);
    const rad = (track * Math.PI) / 180;
    const dLat = (distance * Math.cos(rad)) / EARTH_M_PER_DEG;
    const dLon = (distance * Math.sin(rad)) / (EARTH_M_PER_DEG * Math.max(0.05, Math.cos((last.lat * Math.PI) / 180)));
    return { lat: last.lat + dLat, lon: last.lon + dLon, alt: last.alt };
  }
}
