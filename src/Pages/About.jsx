import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.to(container.current, {
          backgroundColor: "#121813",
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 0%",
            end: "top -20%",
            scrub: true,
          },
        });

        gsap.fromTo(
          ".line",
          { wordSpacing: "0.05em" },
          {
            wordSpacing: "0.4em",
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top -20%",
              end: "top -60%",
              scrub: true,
            },
          }
        );
      }, container);

      return () => ctx.revert();
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="relative h-[180vh] w-full px-8 flex flex-col justify-end items-start text-[#f0f0f0]"
    >
      <h1 className="w-full text-lg font-semibold text-center mb-4">
        (Who we are)
      </h1>

      <p className="uppercase text-5xl font-bold mb-8 text-justify leading-12 ml-8">
        <span className="line">As a BCA graduate and web developer,</span>
        <span className="line block">I enjoy working across the stack — </span>
        <span className="line block">from crafting interfaces with React </span>
        <span className="line block">
          and Next.js to building backends using
        </span>
        <span className="line block">Node.js and PostgreSQL. I approach</span>
        <span className="line block">projects focusing on clean code,</span>
        <span className="line block">scalability, and solving.</span>
      </p>

      <p className="w-[85%] mx-auto mb-16 text-lg font-serif text-[#f0f0f0]">
        I build web applications with intention, not just motion for the sake of
        motion. Beyond making interfaces look good, I focus on how users
        interact, how systems behave, and how small decisions affect performance
        and usability.
      </p>
    </div>
  );
};

export default About;
