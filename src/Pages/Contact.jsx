import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

const Contact = () => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      circleRef.current,
      {
        scale: 5,
      },
      {
        scale: 0,
        height: 0,
        width: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 0",
          end: "top -100%",
          scrub: true,
          pin: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[#121813] text-white pt-15 pb-4"
    >
      <div
        ref={circleRef}
        className="absolute top-[50%] left-[50%] -translate-[50%] bg-[#f9f9f9] border-2 rounded-full h-80 w-80"
      />

      <h1 className="uppercase text-[2.5rem] leading-9 font-semibold text-justify px-8">
        I&apos;m a frontend and full-stack developer working independently.
        Understanding development while designing, and appreciating design while
        building, helps me create thoughtful, reliable, and human-centered
        digital solutions.
      </h1>

      <div className="flex flex-col justify-center items-center font-serif text-xl leading-6 tracking-tighter gap-y-6">
        <h3>chaudharychaman1506@gmail.com</h3>
        <div className="flex flex-col justify-center items-center uppercase">
          <h4>
            <span className="italic lowercase text-sm">services</span> UXUI
            design, Custom Web Apps, Full Stack Dev
          </h4>
          <h4>
            <span className="italic lowercase text-sm">address</span> New Delhi,
            India&nbsp;&nbsp;
            <span className="italic lowercase text-sm">phone</span>
            &nbsp;+91)84390&nbsp;68993&nbsp;&nbsp;
            <span className="italic lowercase text-sm">github</span>
            &nbsp;@chman-chaudhary
          </h4>
          <h4>©ALL CONTENT RESERVED BY Chaman Chaudhary</h4>
        </div>
      </div>
    </div>
  );
};

export default Contact;
