import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import works from "../data/works";
import capabilities from "../data/capabilities";

gsap.registerPlugin(ScrollTrigger);

const WorkAndSkill = () => {
  const containerRef = useRef(null);
  const workRef = useRef(null);
  const capRef = useRef(null);
  const cardContainer = useRef(null);
  const progressRef = useRef(null);
  const cardRefs = useRef([]);
  const videoRefs = useRef([]);
  const imageRefs = useRef([]);
  const overlayRefs = useRef([]);
  const lineRefs = useRef([]);
  const itemsRef = useRef([]);
  const contentRef = useRef([]);

  useGSAP(
    (context, contextSafe) => {
      let maskDone = false;

      gsap.set(progressRef.current, { width: "0%" });
      gsap.set(lineRefs.current, { opacity: 1 });

      // Create ONE master timeline to handle the pinning for everything
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Provides enough scroll "room" for all phases
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      mainTl.to(".mask", {
        top: "100%",
        ease: "none",
        duration: 2,
        onUpdate: function () {
          if (progressRef.current) progressRef.current.style.width = "0%";
          maskDone = this.progress() > 0.5;
        },
      });

      mainTl.to(
        cardContainer.current,
        {
          x: "-145%",
          ease: "none",
          duration: 10,
          onUpdate: function () {
            const p = this.progress();
            const totalLines = lineRefs.current.length;

            // SYNC: Width and Lines use the exact same 'p'
            if (progressRef.current) {
              progressRef.current.style.width = `${p * 100}%`;
            }

            const activeIndex = p * totalLines;

            lineRefs.current.forEach((line, i) => {
              if (!line) return;
              let opacityValue = 1;
              if (i < Math.floor(activeIndex)) {
                opacityValue = 0;
              } else if (i === Math.floor(activeIndex)) {
                opacityValue = 0.5;
              } else {
                opacityValue = 1;
              }
              line.style.opacity = opacityValue;
            });
          },
        },
        "+=0.5"
      );

      mainTl.to(
        workRef.current,
        {
          y: "-100%",
          ease: "none",
          duration: 3,
        },
        "+=0.5"
      );

      mainTl.to(
        capRef.current,
        {
          height: "110vh",
          scale: 1,
          ease: "none",
          duration: 3,
        },
        "-=1"
      );

      // 3. Capabilities Sequence
      capabilities.forEach((_, i) => {
        const step = gsap.timeline();
        step.to(
          itemsRef.current[i],
          {
            color: "black",
            letterSpacing: "0.25em",
            opacity: 1,
            duration: 1,
          },
          0
        );

        step.to(
          contentRef.current[i],
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
          },
          0
        );

        if (i > 0) {
          step.to(
            itemsRef.current[i - 1],
            {
              color: "#6b6b6b",
              letterSpacing: "0.05em",
              opacity: 0.35,
              duration: 1,
            },
            0
          );
          step.to(
            contentRef.current[i - 1],
            {
              autoAlpha: 0,
              y: -20,
              duration: 1,
            },
            0
          );
        }
        mainTl.add(step, "+=0.8");
      });

      // Hover logic remains isolated
      cardRefs.current.forEach((card, i) => {
        card.addEventListener(
          "mouseenter",
          contextSafe(() => {
            if (!maskDone) return;
            gsap.to(videoRefs.current[i], { height: "auto", duration: 0.2 });
            gsap.to(imageRefs.current[i], { scale: 1.15, duration: 0.5 });
            gsap.to(overlayRefs.current[i], {
              backgroundColor: "rgba(0,0,0,0.4)",
              duration: 0.4,
            });
          })
        );
        card.addEventListener(
          "mouseleave",
          contextSafe(() => {
            gsap.to(videoRefs.current[i], { height: 0, duration: 0.2 });
            gsap.to(imageRefs.current[i], { scale: 1, duration: 0.5 });
            gsap.to(overlayRefs.current[i], {
              backgroundColor: "rgba(0,0,0,0)",
              duration: 0.4,
            });
          })
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full bg-[#121813] text-[#e6e6e6] overflow-hidden"
    >
      {/* SECTION: WORK (Z-20) */}
      <section
        ref={workRef}
        className="absolute inset-0 z-20 w-full h-screen flex flex-col justify-center gap-y-6 px-8 bg-[#121813]"
      >
        <h2 className="text-lg">(Featured work)</h2>
        <div
          ref={cardContainer}
          className="w-full flex gap-x-30 will-change-transform"
        >
          {works.map((work, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="relative h-120 w-80 flex flex-col justify-between items-center overflow-hidden text-lg text-center text-[#e6e6e6] py-4 shrink-0"
            >
              <img
                ref={(el) => (imageRefs.current[i] = el)}
                src={work.img}
                className="absolute top-0 left-0 w-full h-full z-0 object-cover"
              />
              <div className="mask absolute top-0 left-0 w-full h-full z-20 bg-black/10 backdrop-grayscale" />
              <div
                ref={(el) => (overlayRefs.current[i] = el)}
                className="absolute top-0 left-0 w-full h-full z-10 bg-black/0"
              />
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={work.video}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-0 object-cover z-10"
                muted
                autoPlay
                loop
              />
              <h2 className="relative z-30">{work.title}</h2>
              <div className="relative z-30 uppercase leading-4">
                <h2>{work.date}</h2>
                <h2>{work.description}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="relative flex justify-center items-center gap-x-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                ref={(el) => (lineRefs.current[i] = el)}
                className="w-px h-4 bg-white"
              />
            ))}
            <div
              ref={progressRef}
              className="absolute top-0 left-0 w-0 h-4 border border-white bg-transparent"
            />
          </div>
        </div>
      </section>

      {/* SECTION: CAPABILITIES (Z-10) */}
      <section
        ref={capRef}
        className="absolute -bottom-[1%] left-0 z-10 h-[80vh] w-full bg-[#f5f5f5] text-[#1a1a1a] pt-28 pb-10 space-y-16 rounded-t-4xl scale-95 origin-bottom"
      >
        <h1 className="uppercase text-5xl font-bold text-center">How I work</h1>
        <div className="w-full flex px-16">
          <div className="w-1/3 flex flex-col justify-center gap-8">
            {capabilities.map((cap, i) => (
              <h2
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="text-5xl font-semibold uppercase opacity-40"
              >
                {cap.title}
              </h2>
            ))}
          </div>
          <div className="w-2/3 flex items-center relative">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                ref={(el) => (contentRef.current[i] = el)}
                className="absolute max-w-xl opacity-0 translate-y-6"
              >
                <p className="text-lg leading-relaxed text-[#1a1a1a] font-serif">
                  {cap.desc}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {cap.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-black/5 text-[#1a1a1a]/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkAndSkill;
