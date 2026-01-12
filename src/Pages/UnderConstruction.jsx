import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function UnderConstruction() {
  const hammer = useRef(null);

  useEffect(() => {
    gsap.to(hammer.current, {
      rotation: -30,
      transformOrigin: "top center",
      yoyo: true,
      repeat: -1,
      duration: 0.4,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-[#121813] text-[#e6e6e6]">
      <div className="relative flex items-center gap-2 text-6xl">
        <span ref={hammer}>🔨</span>
        <span>🚧</span>
      </div>

      <h1 className="text-3xl font-bold">Under Construction</h1>
      <p className="text-gray-400">We’re working on something awesome</p>

      <button
        onClick={() => window.history.back()}
        className="mt-4 px-6 py-2 font-medium border border-white rounded-full hover:bg-white hover:text-black transition"
      >
        ← Go Back
      </button>
    </div>
  );
}
