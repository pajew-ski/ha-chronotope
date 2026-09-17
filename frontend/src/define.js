/**
 * Define a custom element once. The panel bundle and the Lovelace card
 * bundle share components (map view, layer modules); when both are loaded
 * in the same page the second definition must not throw.
 */
export function define(name, cls) {
  if (!customElements.get(name)) customElements.define(name, cls);
}
