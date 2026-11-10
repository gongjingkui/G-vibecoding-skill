// Helpers shared by scene pages.
export function clamp(x, a = 0, b = 1) { return Math.max(a, Math.min(b, x)); }
export function lerp(a, b, x) { return a + (b - a) * x; }
export function easeInOut(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
export function easeOut(x) { return 1 - Math.pow(1 - clamp(x), 3); }

// Slow push-in (or pull) over the shot. returns scale.
export function push(t, dur, from = 1.0, to = 1.07) {
  return lerp(from, to, easeInOut(clamp(t / dur)));
}

// Slow horizontal drift. returns px.
export function drift(t, dur, from = 0, to = -40) {
  return lerp(from, to, easeInOut(clamp(t / dur)));
}

// Apply a camera transform to an element.
export function cam(el, t, dur, { from = 1.0, to = 1.07, xFrom = 0, xTo = -40, yFrom = 0, yTo = -24, pre = '' } = {}) {
  const s = push(t, dur, from, to);
  const x = drift(t, dur, xFrom, xTo);
  const y = lerp(yFrom, yTo, easeInOut(clamp(t / dur)));
  el.style.transform = `${pre} translate(${x}px, ${y}px) scale(${s})`.trim();
}

// Fade a DOM element in over [a,b].
export function fade(el, t, a, b) {
  const p = clamp((t - a) / (b - a));
  el.style.opacity = String(easeOut(p));
  el.style.visibility = p > 0 ? "visible" : "hidden";
}
