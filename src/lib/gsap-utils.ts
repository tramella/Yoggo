import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function registerGSAP() {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }
}

export function scrollToTarget(target: string, offset: number = 60) {
  if (typeof window === "undefined" || !target) return;
  
  const el = document.querySelector(target) as HTMLElement | null;
  if (!el) return;

  registerGSAP();

  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

  try {
    gsap.to(window, {
      duration: 1.1,
      scrollTo: {
        y: Math.max(0, top),
        autoKill: true,
      },
      ease: "power3.inOut",
      overwrite: "auto",
    });
  } catch {
    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  }
}
