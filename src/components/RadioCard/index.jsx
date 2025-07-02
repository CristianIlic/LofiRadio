import React from "react";
import { formatNumber, truncateText } from "../../utils/functions";
import useIsMobile from "../../hooks/useIsMobile";
import LiveBadge from "./LiveBadge";

function RadioCard({
  title,
  viewers,
  channel,
  likes,
  thumbnail,
  className,
  ...props
}) {
  const isMobile = useIsMobile();
  const truncTitle = truncateText(title, isMobile ? 18 : 30);
  return (
    <div className="cardContainer" {...props}>
      <div className="imageContainer">
        <img className={`${className}`} src={thumbnail} alt="" />
        {viewers !== 0 ? <LiveBadge /> : ""}
      </div>
      <div className="radioInfo">
        <div className="topInfo">
          <h1>{truncTitle}</h1>
          <p>{viewers !== 0 ? `${formatNumber(viewers)} listening` : ""}</p>
        </div>
        <div className="bottomInfo">
          <h3>{channel}</h3>
          <h3>{formatNumber(likes)} likes</h3>
        </div>
      </div>
    </div>
  );
}

export default RadioCard;
