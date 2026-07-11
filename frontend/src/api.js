/** Thin wrappers around the Chronotope WebSocket commands. */

export const queryEvents = (hass, filters) =>
  hass.callWS({ type: "chronotope/events/query", ...filters });

export const fetchCategories = (hass) =>
  hass.callWS({ type: "chronotope/categories" });

export const fetchIcsUrl = (hass, filters) =>
  hass.callWS({ type: "chronotope/ics_url", ...filters });

export const saveEvent = (hass, event) =>
  hass.callWS({ type: "chronotope/events/save", event });

export const deleteEvent = (hass, eventId) =>
  hass.callWS({ type: "chronotope/events/delete", event_id: eventId });

/**
 * Translate the panel's filter state into the WebSocket filter payload
 * shared by events/query and ics_url.
 */
export function buildWsFilters(state) {
  const filters = {};
  if (state.categories.length) filters.categories = [...state.categories];
  if (state.radiusEnabled && state.center) {
    filters.center = { lat: state.center.lat, lon: state.center.lon };
    filters.radius_km = state.radiusKm;
  }
  if (state.start) filters.start = new Date(state.start).toISOString();
  if (state.end) filters.end = new Date(state.end).toISOString();
  if (state.weekdays.length) filters.weekdays = [...state.weekdays];
  if (state.timeMode === "range") {
    if (state.timeFrom) filters.time_from = state.timeFrom;
    if (state.timeTo) filters.time_to = state.timeTo;
  }
  return filters;
}
