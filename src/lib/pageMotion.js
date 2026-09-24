// Animate only as elements enter the viewport; content stays visible without JS.
export function pageMotion(node, { paused = false } = {}) {
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const seen = new WeakSet();
  const animations = new Set();
  let observer;
  const selector = [
    ".hero > div > *", ".portrait-wrap", ".skill-strip", ".section-heading",
    ".featured-card", ".more-projects-title", ".project-card",
    ".about-intro > *", ".experience-heading", ".experience-list li",
    ".education", ".contact-section .eyebrow", ".contact-heading",
    ".email-link", ".footer-bottom",
  ].join(",");

  function cancel() {
    observer?.disconnect();
    for (const animation of animations) animation.cancel();
    animations.clear();
  }
  function setup() {
    cancel();
    document.documentElement.dataset.motion = paused ? "paused" : "playing";
    if (paused || preference.matches || !("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      visible.forEach((entry, index) => {
        const element = entry.target;
        observer.unobserve(element);
        if (seen.has(element)) return;
        seen.add(element);
        const animation = element.animate([
          { opacity: 0, transform: "translateY(22px) scale(.985)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ], { duration: 700, delay: Math.min(index * 65, 260), easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
        animation.oncancel = () => animations.delete(animation);
      });
    }, { threshold: .08 });
    node.querySelectorAll(selector).forEach(element => {
      if (!seen.has(element)) observer.observe(element);
    });
  }
  function onFocus(event) {
    // Keyboard users should never wait for a reveal to access a link.
    for (const animation of animations) {
      if (animation.effect?.target?.contains(event.target)) animation.finish();
    }
  }
  preference.addEventListener("change", setup);
  node.addEventListener("focusin", onFocus);
  setup();
  return {
    update(options) { paused = options.paused; setup(); },
    destroy() {
      cancel();
      preference.removeEventListener("change", setup);
      node.removeEventListener("focusin", onFocus);
      delete document.documentElement.dataset.motion;
    },
  };
}
