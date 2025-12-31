import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import works from "../data/works";
import capabilities from "../data/capabilities";

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
      gsap.registerPlugin(ScrollTrigger);

      const total = capabilities.length;
      let maskDone = false;
      let maskTween;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "top -200%",
          scrub: 2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,

          onEnterBack: () => {
            gsap.to(progressRef.current, {
              transformOrigin: "left",
              rotateZ: 0,
              opacity: 100,
              ease: "none",
              duration: 0.2,
            });
          },

          onLeaveBack: () => {
            maskDone = false;
          },
          onUpdate: (self) => {
            const progress = self.progress; // 0 → 1

            const totalLines = lineRefs.current.length;
            const barWidth = progress * totalLines;

            lineRefs.current.forEach((line, i) => {
              gsap.to(line, {
                opacity: i <= barWidth ? 0 : i < barWidth + 1 ? "50%" : 1,
                duration: 0.12,
                ease: "none",
              });
            });

            gsap.to(progressRef.current, {
              width: `${progress * 100}%`,
              ease: "none",
              duration: 0,
            });

            const maskProgress = maskTween.progress();
            if (maskProgress <= 0.18) {
              maskDone = false;

              const tlx = gsap.timeline();

              // force-close every video immediately
              videoRefs.current.forEach((v) =>
                tlx.to(
                  v,
                  {
                    height: 0,
                    duration: 0.2,
                    ease: "none",
                  },
                  0
                )
              );

              // reset zoom + dark
              imageRefs.current.forEach((img) =>
                tlx.to(img, { scale: 1, duration: 0.5, ease: "power2.out" }, 0)
              );

              overlayRefs.current.forEach((ov) =>
                tlx.to(
                  ov,
                  {
                    backgroundColor: "rgba(0,0,0,0)",
                    duration: 0.4,
                    ease: "none",
                  },
                  0
                )
              );
            } else {
              maskDone = true;
            }
          },
        },
      });

      maskTween = tl.to(".mask", {
        top: "100%",
        ease: "none",
        duration: 2,
        onComplete: () => {
          maskDone = true;
        },
      });

      tl.to(
        cardContainer.current,
        {
          translateX: "-145%",
          ease: "none",
          duration: 15,
        },
        "=+1"
      );

      cardRefs.current.forEach((card, i) => {
        const video = videoRefs.current[i];
        const image = imageRefs.current[i];
        const overlay = overlayRefs.current[i];

        card.addEventListener(
          "mouseenter",
          contextSafe(() => {
            if (!maskDone) return;

            // video expand
            gsap.to(video, {
              height: "auto",
              duration: 0.2,
              ease: "none",
            });

            // image zoom + darken
            gsap.to(image, {
              scale: 1.15,
              duration: 0.5,
              ease: "power2.out",
            });

            gsap.to(overlay, {
              backgroundColor: "rgba(0,0,0,0.4)", // darker
              duration: 0.4,
            });
          })
        );

        card.addEventListener(
          "mouseleave",
          contextSafe(() => {
            if (!maskDone) return;

            // video collapse
            gsap.to(video, {
              height: 0,
              duration: 0.2,
              ease: "none",
            });

            // image zoom reset
            gsap.to(image, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            });

            // restore brightness
            gsap.to(overlay, {
              backgroundColor: "rgba(0,0,0,0)",
              duration: 0.4,
            });
          })
        );
      });

      const progressTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -10%",
          end: "top -20%",
          scrub: true,
        },
      });

      progressTl.to(progressRef.current, {
        transformOrigin: "left",
        rotateZ: 5,
        opacity: 0,
        ease: "none",
      });

      tl.add(progressTl);

      const transitionTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -1%",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });

      transitionTl.to(workRef.current, {
        top: "-100%",
        ease: "none",
      });

      transitionTl.to(
        capRef.current,
        {
          height: "110vh",
          ease: "none",
          scale: 1,
        },
        "-=0.15"
      );

      tl.add(transitionTl);

      const capTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -2%",
          end: `+=${total * 50}%`,
          scrub: true,
          pin: true,

          // 🔑 THIS IS THE FIX
          snap: {
            snapTo: 1 / (total - 1),
            duration: 0.2,
            ease: "power2.out",
          },
        },
      });

      capabilities.forEach((_, i) => {
        capTl.to(
          itemsRef.current[i],
          {
            color: "#black",
            letterSpacing: "0.25em",
            fontWeight: "700",
            opacity: 1,
            duration: 0.01,
          },
          i
        );

        // Deactivate previous
        if (i > 0) {
          capTl.to(
            itemsRef.current[i - 1],
            {
              color: "#6b6b6b",
              letterSpacing: "0.05em",
              fontWeight: "600",
              opacity: 0.35,
              duration: 0.01,
            },
            i
          );
        }

        // Content in
        capTl.to(
          contentRef.current[i],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.2,
          },
          i
        );

        // Content out
        if (i > 0) {
          capTl.to(
            contentRef.current[i - 1],
            {
              autoAlpha: 0,
              y: -20,
              duration: 0.2,
            },
            i
          );
        }
      });

      tl.add(capTl);
    },
    {
      scope: containerRef,
      dependencies: [containerRef, cardRefs, workRef, capRef],
    }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[101vh] w-full bg-[#121813] text-white"
    >
      <section
        ref={workRef}
        className="absolute top-0 left-0 z-20 w-full h-screen flex flex-col justify-center gap-y-6 px-8 bg-[#121813]"
      >
        <h2 className="text-lg">(Featured work)</h2>
        <div ref={cardContainer} className="w-full flex gap-x-30">
          {works.map((work, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="relative h-120 w-80 flex flex-col justify-between items-center overflow-hidden text-lg text-center text-white py-4 shrink-0"
            >
              <img
                ref={(el) => (imageRefs.current[i] = el)}
                src={work.img}
                className="absolute top-0 left-0 w-full h-full z-0"
              />

              <div className="mask absolute top-0 left-0 w-full h-full z-20 bg-black/10 backdrop-grayscale" />

              <div
                ref={(el) => (overlayRefs.current[i] = el)}
                className="absolute top-0 left-0 w-full h-full z-10 bg-black/0 transition-all"
              ></div>

              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src="/sr.mp4"
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
      <section
        ref={capRef}
        className="absolute -bottom-[1%] left-0 z-10 h-[80vh] w-full bg-[#f9f9f9] text-black pt-28 pb-10 space-y-16 rounded-t-4xl scale-95"
      >
        <h1 className="uppercase text-5xl font-bold text-center">How I work</h1>
        <div className="w-full flex px-16">
          {/* LEFT */}
          <div className="w-1/3 flex flex-col justify-center gap-8">
            {capabilities.map((cap, i) => (
              <h2
                key={cap.title}
                ref={(el) => (itemsRef.current[i] = el)}
                className="text-5xl font-semibold uppercase opacity-40"
              >
                {cap.title}
              </h2>
            ))}
          </div>

          {/* RIGHT */}
          <div className="w-2/3 flex items-center relative">
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                ref={(el) => (contentRef.current[i] = el)}
                className="absolute max-w-xl opacity-0 translate-y-6"
              >
                <p className="text-lg leading-relaxed text-black font-serif">
                  {cap.desc}
                </p>

                {/* SKILLS */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {cap.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-black/5 text-black/80"
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
