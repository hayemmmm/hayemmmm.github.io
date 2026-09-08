import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";
import initSampleGallery from "./scripts/sampleGallery";

initSampleGallery();
if (typeof window.ScrollReveal === "function") {
  initScrollReveal(targetElements, defaultProps);
} else {
  document.documentElement.classList.remove("sr");
}
initTiltEffect();
