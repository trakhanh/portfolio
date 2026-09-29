/** localStorage key holding the time the intro was last shown. */
export const SPLASH_KEY = "gk_splash_at";
/** How long a visitor goes without seeing the intro again. */
export const SPLASH_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * Runs in <head> before first paint. If the intro was shown recently (or the
 * visitor prefers reduced motion) it flags <html data-splash="off"> so the
 * statically rendered overlay is hidden by CSS and never flashes on reload.
 */
export const SPLASH_GATE_SCRIPT = `(function(){try{var d=document.documentElement,t=+localStorage.getItem("${SPLASH_KEY}");if(matchMedia("(prefers-reduced-motion: reduce)").matches||(t&&Date.now()-t<${SPLASH_TTL_MS}))d.setAttribute("data-splash","off")}catch(e){}})();`;
