import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Build = () => {
  const container = useRef(null);
  const boxContainerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const boxContainer = boxContainerRef.current;
      const boxes = gsap.utils.toArray(".box-frame");

      gsap.set(".mirror", { transformOrigin: "center bottom" });
      gsap.to(".mirror", {
        rotationX: "+=360",
        ease: "none",
        repeat: -1,
        duration: 12,
      });

      const handleMove = (e) => {
        const rect = boxContainer.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        const maxX = rect.width - rect.width * 0.05;
        const maxY = rect.height - rect.height * 0.05;

        x = Math.max(rect.width * 0.05, Math.min(x, maxX));
        y = Math.max(rect.height * 0.05, Math.min(y, maxY));

        boxes.forEach((box, i) => {
          const delayFactor = i * 0.3;

          gsap.to(box, {
            x: x - rect.width / 2,
            y: y - rect.height / 2,
            duration: 0.4 + delayFactor,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      let mouseAttached = false;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          start: "top top",
          end: "+120%",
          scrub: true,

          onUpdate: (self) => {
            if (self.progress === 1 && !mouseAttached) {
              boxContainer.addEventListener("mousemove", handleMove);
              mouseAttached = true;
            }

            if (self.progress < 1 && mouseAttached) {
              boxContainer.removeEventListener("mousemove", handleMove);
              mouseAttached = false;

              gsap.killTweensOf(boxes);
              gsap.to(".box-frame", {
                x: 0,
                y: 0,
                duration: 0.4,
                ease: "power3.out",
              });
            }
          },
        },
      });

      tl.fromTo(
        ".left-page",
        { width: "100%", rotateY: 0 },
        { width: "20%", rotateY: "-90", duration: 2.5, ease: "none" },
        0
      );

      tl.fromTo(
        ".right-page",
        { width: "20%", rotateY: "90", translateX: "0" },
        { width: "79%", rotateY: "0", duration: 2.7, ease: "none" },
        0
      );

      tl.to(".right-page", {
        translateX: "-13.5%",
        duration: 0.3,
        ease: "none",
      });

      tl.from(".box-frame", {
        width: "100%",
        height: "100%",
        ease: "none",
        stagger: 0.025,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={container}
      className="relative w-screen h-auto text-[#f0f0f0] bg-[#121813] overflow-hidden space-y-10 pb-40"
    >
      <div className="relative w-full h-screen overflow-y-hidden">
        <div className="absolute top-[2.5%] left-0 left-page text-[#f5f5f5] h-[95%] w-full flex flex-col justify-center items-center gap-[135px]">
          {Array.from({ length: 3 }).map((_, index) => (
            <RotatingTextEffect key={index} label="Build" />
          ))}
        </div>

        {/* Right Page */}
        <div
          ref={boxContainerRef}
          style={{
            backgroundImage: `url("./build-bg.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="absolute top-[2.5%] right-0 h-[95%] right-page bg-zinc-500 text-[#f0f0f0] overflow-hidden origin-center"
        >
          <div className="relative h-full w-full flex items-center justify-center">
            {/* BOXES (new size ratios) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({ length: 12 }).map((_, i) => {
                const factor = (i * (i + 3)) / 5;
                return (
                  <div
                    key={i}
                    className="box-frame absolute border border-white/60"
                    style={{
                      // BIGGER RANGE: small box very small, big box very large
                      width: `${3.5 + factor * 3}%`,
                      height: `${10 + factor * 9}%`,
                    }}
                  />
                );
              })}
            </div>

            {/* TEXT */}
            <div className="relative z-10 px-6 text-center">
              <p className="uppercase text-base md:text-base tracking-wide text-nowrap">
                Thoughtfully built interactions that
                <br />
                respond, adapt, and endure.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] h-full flex justify-between items-start text-lg">
        <div className="w-[12.5%]">(How I build)</div>
        <div className="w-full">
          I build digital experiences by thinking in systems rather than
          isolated screens. Every project starts with structure — how components
          connect, how users move, and how motion supports understanding.
          Instead of relying on surface-level effects, I focus on combining
          clean layouts, purposeful animation, and solid logic to create
          interfaces that feel responsive, balanced, and natural to use.
          <br />
          <br />
          By working across the stack, I’m able to shape experiences from
          foundation to interaction. Modern frontend frameworks, smooth
          performance, and thoughtful motion come together to add depth without
          distraction. Each detail is built to serve a role-guiding attention,
          reinforcing meaning, and scaling with real-world needs — so the final
          experience feels intentional, reliable, and quietly impactful.
        </div>
      </div>
    </div>
  );
};

export default Build;

const RotatingTextEffect = ({ label }) => {
  return (
    <div className="persp relative" style={{ perspective: "700px" }}>
      <h1 className="uppercase text-[18vw] font-bold font-outline leading-[194px] tracking-widest text-nowrap">
        {label}
      </h1>
      <h1 className="absolute top-0 left-0 uppercase text-[18vw] font-bold font-outline leading-[194px] tracking-widest origin-bottom rotate-x-180">
        {label}
      </h1>
      <h1 className="mirror absolute top-0 left-0 uppercase text-[18vw] font-bold font-outline leading-[194px] tracking-widest origin-bottom rotate-x-60">
        {label}
      </h1>
      <h1 className="mirror absolute top-0 left-0 uppercase text-[18vw] font-bold font-outline leading-[194px] tracking-widest origin-bottom rotate-x-120">
        {label}
      </h1>
      <h1 className="mirror absolute top-0 left-0 uppercase text-[18vw] font-bold font-outline leading-[194px] tracking-widest origin-bottom rotate-x-240">
        {label}
      </h1>
      <h1 className="mirror absolute top-0 left-0 uppercase text-[18vw] font-bold font-outline leading-[194px] tracking-widest origin-bottom rotate-x-300">
        {label}
      </h1>
    </div>
  );
};
