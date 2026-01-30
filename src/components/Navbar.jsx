import { useState } from "react";
import RecClock from "./RecClock";
import { BiMenu } from "react-icons/bi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = ["resume", "work", "contact"];

  const getHref = (item) =>
    item === "resume"
      ? "https://drive.google.com/file/d/1G5EPgA02w_cmZ5_yiUFwiOolMnDPEjEK/view?usp=sharing"
      : `#${item}`;

  return (
    <div
      className="fixed top-0 left-0 z-10 uppercase w-full px-4 sm:px-6 md:px-8 py-2 flex justify-between items-center font-semibold"
      style={{
        color: "#f0f0f0",
        mixBlendMode: "difference",
      }}
    >
      {/* LEFT */}
      <div className="w-full">
        <RecClock />
      </div>

      {/* CENTER */}
      <div className="w-full text-center">&copy;Chaman Chaudhary</div>

      {/* RIGHT — DESKTOP */}
      <div className="w-full hidden md:flex items-center justify-end gap-4">
        {links.map((item, i) => (
          <a key={i} href={getHref(item)} className="nav-btn">
            <span className="nav-text">
              <span className="uppercase">{item}</span>
              <span className="uppercase">{item}</span>
            </span>
          </a>
        ))}
      </div>

      {/* RIGHT — MOBILE MENU BUTTON */}
      <div className="w-full flex md:hidden justify-end relative">
        <button
          onClick={() => setOpen(!open)}
          className="uppercase text-sm tracking-wide"
        >
          <BiMenu className="size-8" />
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute top-full right-0 mt-2 flex flex-col bg-black/80 backdrop-blur-sm rounded-md overflow-hidden">
            {links.map((item, i) => (
              <a
                key={i}
                href={getHref(item)}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm uppercase hover:bg-white/10 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
