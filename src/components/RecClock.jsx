import { useEffect, useState } from "react";

function RecClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const day = days[now.getDay()];

  const pad = (n) => String(n).padStart(2, "0");

  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return (
    <span className="uppercase font-semibold">
      <button className="nav-btn">
        <span className="nav-text">
          <span className="uppercase">REC</span>
          <span className="uppercase">REC</span>
        </span>
      </button>
      &nbsp;&nbsp;{day}
      {hours}:{minutes}:{seconds}
    </span>
  );
}

export default RecClock;
