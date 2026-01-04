import { useRef } from "react";
import MiddleStrip from "../components/MiddleStrip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef(null);
  const scrolldown = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.to(".firstName", {
          y: -160,
          ease: "none",
          scrollTrigger: {
            trigger: scrolldown.current,
            start: "top 85%",
            end: "top 75%",
            scrub: true,
          },
        });

        gsap.to(".intro", {
          y: -160,
          ease: "none",
          scrollTrigger: {
            trigger: scrolldown.current,
            start: "top 50%",
            end: "top 40%",
            scrub: true,
          },
        });

        gsap.to(".scrollDownIcon", {
          y: "-20%",
          ease: "power2.out",
          yoyo: true,
          repeat: -1,
          duration: 0.3,
        });

        gsap.to(scrolldown.current, {
          opacity: 0,
          y: -10,
          ease: "none",
          scrollTrigger: {
            trigger: scrolldown.current,
            start: "top 85%",
            end: "top 75%",
            scrub: true,
          },
        });
      }, container);

      return () => ctx.revert();
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="relative h-screen w-full flex flex-col py-8"
    >
      <MiddleStrip />

      <div className="relative w-full h-full flex flex-col items-center justify-around">
        <span className="firstName h-1/2 flex justify-center items-center uppercase text-[244px] -tracking-[0.8rem] font-extrabold leading-32">
          Chaman
        </span>

        <span className="intro h-1/2 w-3/5 flex justify-center items-center text-xl font-serif text-center">
          I design and build modern user-focused web applications focused on
          performance, usability, and clean architecture.
        </span>
      </div>

      <div>
        <p
          ref={scrolldown}
          className="group relative uppercase text-sm font-semibold text-center cursor-pointer text-gray-800/80 hover:text-[#1a1a1a] transition-colors duration-300"
        >
          <span className="relative">
            Please Scroll Down
            <span className="absolute left-0 -bottom-1 h-px w-full bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </span>{" "}
          <MdKeyboardDoubleArrowDown className="scrollDownIcon inline-block text-lg ml-1" />
        </p>
      </div>
    </div>
  );
};

export default Hero;
