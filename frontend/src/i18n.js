/**
 * Tiny localization layer. English is the default; German is applied
 * automatically when the HA profile language is German. The panel calls
 * setLanguage() before first render.
 */

const DICTIONARIES = {
  en: {
    "panel.newEvent": "+ New event",
    "panel.count.one": "{n} event",
    "panel.count.other": "{n} events",
    "panel.home": "Home",
    "error.query": "Query failed: {msg}",
    "error.profileSave": "Saving profile failed: {msg}",
    "error.profileDelete": "Deleting profile failed: {msg}",
    "error.save": "Saving failed: {msg}",
    "error.delete": "Deleting failed: {msg}",
    "error.action": "Action failed: {msg}",
    "error.ics": "Could not copy ICS URL: {msg}",
    "error.capture": "Too few points for the drawing.",

    "profile.label": "Profile",
    "profile.none": "— no profile —",
    "profile.placeholder": "Profile name",
    "profile.save": "Save",
    "profile.save.title": "Save current filters under this name",
    "profile.delete": "Delete",
    "profile.delete.title": "Delete selected profile",

    "search.label": "Search",
    "search.placeholder": "Title, description, address…",
    "search.favorites": "Favorites only",

    "category.label": "Category",
    "category.none": "No categories yet",

    "radius.label": "Radius",
    "radius.hint": "Click the map to set the center",

    "window.label": "Time window",
    "window.allDays": "All days",

    "weekdays.label": "Weekdays",
    "weekdays.short": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "time.allday": "All day",
    "time.range": "By time of day",

    "map.label": "Map",
    "map.zones": "HA zones",
    "map.persons": "People",
    "map.geofeeds": "Geo feeds",
    "map.route": "Directions (OSM)",

    "export.label": "Export",
    "export.copy": "Copy ICS subscription URL",
    "export.copied": "URL copied",

    "view.label": "View",
    "view.reset": "Reset view",
    "view.reset.title": "Restore default filters and map layers",

    "filters.label": "Filters",
    "filters.active": "{n} active",
    "filters.show": "Show filters",
    "filters.hide": "Hide filters",

    "stats.summary": "Statistics ({n} events)",
    "stats.places": "Cached places",
    "stats.profiles": "Profiles",
    "stats.events": "events",
    "stats.last": "last",

    "list.empty": "No events match the current filters.",
    "list.visited": "visited",
    "list.source": "Source",
    "list.favorite.add": "Mark as favorite",
    "list.favorite.remove": "Remove favorite",
    "list.edit": "Edit event",
    "list.hide": "Hide event",
    "list.fuzzy": "Imprecise schedule",

    "editor.new": "New event",
    "editor.edit": "Edit event",
    "editor.title": "Title*",
    "editor.category": "Category",
    "editor.start": "Start*",
    "editor.end": "End*",
    "editor.address": "Address",
    "editor.address.placeholder": "fills coordinates from the cache",
    "editor.pickPoint": "Pick point on map",
    "editor.rrule": "Recurrence (RRULE)",
    "editor.precision": "Time precision",
    "editor.precision.exact": "exact",
    "editor.precision.approximate": "approximate",
    "editor.scheduleText": "Schedule wording",
    "editor.scheduleText.placeholder": "Wednesdays 6 pm, ~twice a month",
    "editor.geometry": "Geometry (GeoJSON, optional)",
    "editor.drawLine": "Draw line",
    "editor.drawPolygon": "Draw area",
    "editor.applyDrawing": "Apply drawing",
    "editor.captureHint.point": "Click the map to set the point.",
    "editor.captureHint.points": "Click the map to add points.",
    "editor.source": "Source",
    "editor.sourceUrl": "Source URL",
    "editor.description": "Description",
    "editor.favorite": "Favorite",
    "editor.save": "Save",
    "editor.cancel": "Cancel",
    "editor.delete": "Delete",
    "editor.error.times": "Start and end are required.",
    "editor.error.geometry": "Geometry is not valid JSON.",
    "editor.error.coords": "Provide lat and lon together.",
    "editor.close": "Close",
    "editor.delete.confirm": "Delete this event?",
  },
  de: {
    "panel.newEvent": "+ Neues Event",
    "panel.count.one": "{n} Event",
    "panel.count.other": "{n} Events",
    "panel.home": "Zuhause",
    "error.query": "Abfrage fehlgeschlagen: {msg}",
    "error.profileSave": "Profil speichern fehlgeschlagen: {msg}",
    "error.profileDelete": "Profil löschen fehlgeschlagen: {msg}",
    "error.save": "Speichern fehlgeschlagen: {msg}",
    "error.delete": "Löschen fehlgeschlagen: {msg}",
    "error.action": "Aktion fehlgeschlagen: {msg}",
    "error.ics": "ICS-URL konnte nicht kopiert werden: {msg}",
    "error.capture": "Zu wenige Punkte für die Zeichnung.",

    "profile.label": "Profil",
    "profile.none": "— kein Profil —",
    "profile.placeholder": "Profilname",
    "profile.save": "Speichern",
    "profile.save.title": "Aktuelle Filter unter diesem Namen speichern",
    "profile.delete": "Löschen",
    "profile.delete.title": "Ausgewähltes Profil löschen",

    "search.label": "Suche",
    "search.placeholder": "Titel, Beschreibung, Adresse…",
    "search.favorites": "nur Favoriten",

    "category.label": "Kategorie",
    "category.none": "Noch keine Kategorien",

    "radius.label": "Radius",
    "radius.hint": "Klick auf die Karte setzt das Zentrum",

    "window.label": "Zeitfenster",
    "window.allDays": "Alle Tage",

    "weekdays.label": "Wochentage",
    "weekdays.short": ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    "time.allday": "Ganztags",
    "time.range": "Nach Uhrzeit",

    "map.label": "Karte",
    "map.zones": "HA-Zonen",
    "map.persons": "Personen",
    "map.geofeeds": "Geo-Feeds",
    "map.route": "Route (OSM)",

    "export.label": "Export",
    "export.copy": "ICS-Abo-URL kopieren",
    "export.copied": "URL kopiert",

    "view.label": "Ansicht",
    "view.reset": "Ansicht zurücksetzen",
    "view.reset.title": "Filter und Karten-Layer auf Standard zurücksetzen",

    "filters.label": "Filter",
    "filters.active": "{n} aktiv",
    "filters.show": "Filter anzeigen",
    "filters.hide": "Filter ausblenden",

    "stats.summary": "Statistik ({n} Events)",
    "stats.places": "Orte im Cache",
    "stats.profiles": "Profile",
    "stats.events": "Events",
    "stats.last": "zuletzt",

    "list.empty": "Keine Events für die aktuellen Filter.",
    "list.visited": "besucht",
    "list.source": "Quelle",
    "list.favorite.add": "Als Favorit markieren",
    "list.favorite.remove": "Favorit entfernen",
    "list.edit": "Event bearbeiten",
    "list.hide": "Event ausblenden",
    "list.fuzzy": "Unpräzise Zeitangabe",

    "editor.new": "Neues Event",
    "editor.edit": "Event bearbeiten",
    "editor.title": "Titel*",
    "editor.category": "Kategorie",
    "editor.start": "Beginn*",
    "editor.end": "Ende*",
    "editor.address": "Adresse",
    "editor.address.placeholder": "füllt Koordinaten aus dem Cache",
    "editor.pickPoint": "Punkt per Kartenklick",
    "editor.rrule": "Wiederholung (RRULE)",
    "editor.precision": "Zeit-Präzision",
    "editor.precision.exact": "exakt",
    "editor.precision.approximate": "ungefähr",
    "editor.scheduleText": "Zeitangabe (Wortlaut)",
    "editor.scheduleText.placeholder": "mittwochs 18 Uhr, ca. 2x im Monat",
    "editor.geometry": "Geometrie (GeoJSON, optional)",
    "editor.drawLine": "Linie zeichnen",
    "editor.drawPolygon": "Fläche zeichnen",
    "editor.applyDrawing": "Zeichnung übernehmen",
    "editor.captureHint.point": "Klicke auf die Karte, um den Punkt zu setzen.",
    "editor.captureHint.points": "Klicke auf die Karte, um Punkte hinzuzufügen.",
    "editor.source": "Quelle",
    "editor.sourceUrl": "Quell-URL",
    "editor.description": "Beschreibung",
    "editor.favorite": "Favorit",
    "editor.save": "Speichern",
    "editor.cancel": "Abbrechen",
    "editor.delete": "Löschen",
    "editor.error.times": "Beginn und Ende sind Pflichtfelder.",
    "editor.error.geometry": "Geometrie ist kein gültiges JSON.",
    "editor.error.coords": "Lat und Lon nur gemeinsam angeben.",
    "editor.close": "Schließen",
    "editor.delete.confirm": "Dieses Event löschen?",
  },
};

let active = DICTIONARIES.en;

export function setLanguage(language) {
  const key = String(language || "en").toLowerCase().split("-")[0];
  active = DICTIONARIES[key] || DICTIONARIES.en;
}

export function t(key, vars) {
  let value = active[key] ?? DICTIONARIES.en[key] ?? key;
  if (typeof value === "string" && vars) {
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.replace(`{${name}}`, String(replacement));
    }
  }
  return value;
}
