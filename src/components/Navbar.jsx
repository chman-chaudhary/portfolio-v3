import { BiChevronDown } from "react-icons/bi";
import RecClock from "./RecClock";

const Navbar = () => {
  return (
    <div
      className="fixed top-0 left-0 z-10 uppercase w-full px-8 py-2 flex justify-between items-center font-semibold text-black"
      style={{
        color: "#f9f9f9",
        mixBlendMode: "difference",
      }}
    >
      <div className="w-full">
        <RecClock />
      </div>
      <div className="w-full text-center">&copy;Chaman Chaudhary</div>
      <div className="w-full flex items-center justify-end gap-4">
        <button className="nav-btn flex items-center gap-2">
          <span>LAN</span>

          <span className="nav-text flex items-center gap-1">
            <span className="flex items-center gap-1">
              EN <BiChevronDown className="w-3 h-3 translate-y-px" />
            </span>
            <span className="flex items-center gap-1">
              EN <BiChevronDown className="w-3 h-3 translate-y-px" />
            </span>
          </span>
        </button>

        {["Work", "Contact"].map((item, i) => (
          <button key={i} className="nav-btn">
            <span className="nav-text">
              <span className="uppercase">{item}</span>
              <span className="uppercase">{item}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
