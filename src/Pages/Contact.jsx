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
      },
    );
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="
        relative
        h-screen
        w-full
        flex flex-col justify-between items-center
        overflow-hidden
        bg-[#121813]
        text-[#f0f0f0]
        pt-12 sm:pt-14 md:pt-15
        pb-4
      "
    >
      {/* Animated Circle */}
      <div
        ref={circleRef}
        className="
          absolute
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          bg-[#f5f5f5]
          border-2
          rounded-full
          h-64 w-64
          sm:h-64 sm:w-64
          md:h-80 md:w-80
        "
      />

      {/* Main Text */}
      <h1
        className="
          uppercase
          text-xl sm:text-2xl md:text-[2.5rem]
          leading-snug sm:leading-8 md:leading-9
          font-semibold
          text-justify
          px-4 sm:px-6 md:px-8
          pt-16 md:pt-0
        "
      >
        I&apos;m a frontend and full-stack developer working independently.
        Understanding development while designing, and appreciating design while
        building, helps me create thoughtful, reliable, and human-centered
        digital solutions.
      </h1>

      {/* Contact Info */}
      <div
        className="
          flex flex-col justify-center items-center
          font-serif
          text-base sm:text-lg md:text-xl
          leading-6
          tracking-tighter
          gap-y-5 sm:gap-y-6
          px-4
          text-center
        "
      >
        <a
          href="mailto:chaudharychaman1506@gmail.com?subject=Let's%20Connect&body=Hi,%20I%20visited%20your%20portfolio!"
          className="cursor-pointer hover:underline underline-offset-4 decoration-1"
        >
          chaudharychaman1506@gmail.com
        </a>

        <div className="flex flex-col justify-center items-center uppercase gap-y-2">
          <h4>
            <span className="italic lowercase text-xs sm:text-sm">
              services
            </span>{" "}
            UXUI design, Custom Web Apps, Full&nbsp;Stack&nbsp;Dev
          </h4>

          <h4 className="text-center">
            <span className="block sm:inline">
              <span className="italic lowercase text-xs sm:text-sm">
                address
              </span>{" "}
              New&nbsp;Delhi,&nbsp;India
            </span>

            <span className="block sm:inline">
              &nbsp;&nbsp;
              <span className="italic lowercase text-xs sm:text-sm">phone</span>
              &nbsp;+91)84390&nbsp;68993&nbsp;&nbsp;
              <span className="italic lowercase text-xs sm:text-sm">
                github
              </span>
              &nbsp;
              <a
                href="https://github.com/chman-chaudhary"
                className="cursor-pointer hover:underline underline-offset-4 decoration-1 text-nowrap"
              >
                @chman-chaudhary
              </a>
            </span>
          </h4>

          <h4 className="text-xs sm:text-sm">
            ©ALL CONTENT RESERVED BY Chaman Chaudhary
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Contact;
