import {
  json2satrec,
  propagate,
  gstime,
  eciToGeodetic,
  degreesLat,
  degreesLong,
} from "satellite.js";

/**
 * Browser-side SGP4 propagation of CelesTrak OMM records (spec 7.3).
 * satellite.js 6 parses OMM directly (json2satrec), so six-digit catalog
 * numbers need no TLE round trip. Objects that fail to propagate are
 * skipped silently; ground tracks span ±45 min in one-minute steps.
 */
export class SatelliteTracker {
  constructor() {
    this._records = new Map(); // id -> { satrec, omm }
    this._positions = new Map(); // id -> { lat, lon, alt, t }
    this.group = null;
  }

  setOmm(list, group) {
    this.group = group || null;
    this._records.clear();
    for (const omm of list || []) {
      try {
        const satrec = json2satrec(omm);
        if (satrec.error) continue;
        this._records.set(`sat:${omm.NORAD_CAT_ID}`, { satrec, omm });
      } catch (err) {
        // malformed record: skip, never break the layer
      }
    }
    for (const id of [...this._positions.keys()]) {
      if (!this._records.has(id)) this._positions.delete(id);
    }
  }

  get size() {
    return this._records.size;
  }

  /**
   * Propagate; with `visibleOnly` the predicate decides which objects get
   * this tick (visible ones every second, the rest every 10 s).
   */
  tick(date = new Date(), predicate = null) {
    const gmst = gstime(date);
    for (const [id, { satrec }] of this._records) {
      if (predicate && !predicate(id, this._positions.get(id))) continue;
      const pos = this._propagate(satrec, date, gmst);
      if (pos) this._positions.set(id, { ...pos, t: date.getTime() });
      else this._positions.delete(id);
    }
  }

  features(color) {
    const out = [];
    for (const [id, { omm }] of this._records) {
      const pos = this._positions.get(id);
      if (!pos) continue;
      out.push({
        type: "Feature",
        id,
        geometry: { type: "Point", coordinates: [pos.lon, pos.lat, Math.round(pos.alt * 1000)] },
        properties: {
          label: omm.OBJECT_NAME,
          kind: "satellite",
          ts: new Date(pos.t).toISOString(),
          alt_m: Math.round(pos.alt * 1000),
          color,
          detail: {
            norad: omm.NORAD_CAT_ID,
            object_id: omm.OBJECT_ID,
            group: this.group,
            epoch: omm.EPOCH,
            inclination_deg: omm.INCLINATION,
            period_min: omm.MEAN_MOTION ? Math.round((1440 / omm.MEAN_MOTION) * 10) / 10 : null,
          },
        },
      });
    }
    return out;
  }

  groundTrack(id, date = new Date(), minutes = 45, stepSeconds = 60) {
    const record = this._records.get(id);
    if (!record) return [];
    const points = [];
    let previous = null;
    for (let offset = -minutes * 60; offset <= minutes * 60; offset += stepSeconds) {
      const when = new Date(date.getTime() + offset * 1000);
      const pos = this._propagate(record.satrec, when, gstime(when));
      if (!pos) continue;
      // Break the polyline at the antimeridian instead of drawing across.
      if (previous && Math.abs(pos.lon - previous.lon) > 180) points.push(null);
      points.push([pos.lat, pos.lon]);
      previous = pos;
    }
    const segments = [];
    let current = [];
    for (const point of points) {
      if (point === null) {
        if (current.length > 1) segments.push(current);
        current = [];
      } else current.push(point);
    }
    if (current.length > 1) segments.push(current);
    return segments;
  }

  _propagate(satrec, date, gmst) {
    try {
      const result = propagate(satrec, date);
      if (!result || !result.position || typeof result.position !== "object") return null;
      const geo = eciToGeodetic(result.position, gmst);
      const lat = degreesLat(geo.latitude);
      const lon = degreesLong(geo.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lon) || !Number.isFinite(geo.height)) return null;
      return { lat, lon, alt: geo.height };
    } catch (err) {
      return null;
    }
  }
}
