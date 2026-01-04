import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const forwardText = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "REST APIs",
  "Authentication",
  "GSAP",
];

const backwardText = [
  "Frontend",
  "Full Stack",
  "Clean Code",
  "Performance",
  "Problem Solving",
  "Scalable Apps",
  "System Design",
  "UX Focused",
  "Web Development",
];

const MiddleStrip = () => {
  const container = useRef(null);

  useGSAP(() => {
    gsap.to(".backward-scrolling", {
      translateX: "-100%",
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    gsap.from(".forward-scrolling", {
      translateX: "-100%",
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(container.current, {
      y: -100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top 38%",
        end: "top 28%",
        scrub: true,
      },
    });
  }, [container]);

  return (
    <div
      ref={container}
      className="absolute top-[50%] -translate-y-[50%] left-0 w-full -space-y-1 bg-white uppercase text-xs font-semibold z-10"
    >
      {/* Upper strip */}
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="backward-scrolling flex items-center justify-start gap-32 shrink-0 whitespace-nowrap pr-32">
          {backwardText.map((text, index) => (
            <span key={index} className="">
              {text}
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="backward-scrolling flex items-center justify-start gap-32 shrink-0 whitespace-nowrap pr-32"
        >
          {backwardText.map((text, index) => (
            <span key={index} className="">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Lower strip */}
      <div className="flex overflow-x-auto scrollbar-hide">
        <div
          aria-hidden
          className="forward-scrolling flex items-center justify-start gap-32 shrink-0 whitespace-nowrap pr-32"
        >
          {forwardText.map((text, index) => (
            <span key={index} className="">
              {text}
            </span>
          ))}
        </div>
        <div className="forward-scrolling flex items-center justify-start gap-32 shrink-0 whitespace-nowrap pr-32">
          {forwardText.map((text, index) => (
            <span key={index} className="">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiddleStrip;
