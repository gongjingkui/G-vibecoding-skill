// Shared subtitle renderer. Each subtitle page declares its segments and
// calls renderSubtitle(el, t, segments, opts).
export function easeOutCubic(x) {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
}

export function renderSubtitle(el, t, segments, opts = {}) {
  const { popStart = 0, popDur = 0.5, stagger = 0.12 } = opts;
  if (!el.__built) {
    el.innerHTML = "";
    segments.forEach((seg, i) => {
      const span = document.createElement("span");
      span.className = "seg" + (seg.kw ? " kw" : "");
      span.textContent = seg.text;
      span.style.opacity = "0";
      span.style.transform = "translateY(26px)";
      span.style.filter = "blur(4px)";
      el.appendChild(span);
      if (seg.breakAfter) el.appendChild(document.createElement("br"));
    });
    el.__built = true;
  }
  const spans = el.children;
  for (let i = 0; i < spans.length; i++) {
    const s = spans[i];
    if (s.tagName === "BR") continue;
    const local = Math.max(0, t - popStart - i * stagger);
    const p = local / popDur;
    const e = easeOutCubic(p);
    s.style.opacity = String(e);
    s.style.transform = "translateY(" + (26 * (1 - e)) + "px)";
    s.style.filter = "blur(" + (4 * (1 - e)) + "px)";
  }
}
