import React, { useState } from "react";
import { formatNumber, truncateText } from "../../utils/functions";
import useIsMobile from "../../hooks/useIsMobile";
import LiveBadge from "./LiveBadge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="cardContainer" {...props}>
      <div className="imageContainer">
        <img className={`${className}`} src={thumbnail} alt="" />
        <div id="favorite-icon">
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
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
