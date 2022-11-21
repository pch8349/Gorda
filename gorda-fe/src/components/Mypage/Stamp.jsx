import { useState } from "react";
import "./Stamp.scss";

function Stamp(data) {
  const [stampData, setStampData] = useState([]);
  const [hover, setHover] = useState(false);
  const hoverIntro = () => {
    setHover(true);
  };
  const [leave, setLeave] = useState(false);
  const leaveIntro = () => {
    setLeave(true);
    setHover(false);
  };
  return (
    <>
      <div className="stampList">
        {data.data.isMyBadgeEmpty === 0 ? (
          <>
            <div
              style={{
                backgroundImage: `url(${data.data.myBadgeLogo})`,
                opacity: "0.3",
              }}
              className="stamp"
              onMouseOver={hoverIntro}
              onMouseLeave={leaveIntro}
            ></div>
            <div className="stamp_name" style={{ opacity: "0.3" }}>
              {data.data.myBadgeName}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                backgroundImage: `url(${data.data.myBadgeLogo})`,
              }}
              className="stamp"
              onMouseOver={hoverIntro}
              onMouseLeave={leaveIntro}
            ></div>
            <div className="stamp_name">{data.data.myBadgeName}</div>
            <div className={hover ? `hoverTest` : ""}>
              {hover ? (
                <>
                  <div className="hoverP">{data.data.myBadgeContent}</div>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Stamp;
