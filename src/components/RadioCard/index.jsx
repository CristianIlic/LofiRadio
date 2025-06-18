import React from "react";

function RadioCard({
  title,
  viewers,
  channel,
  likes,
  thumbnail,
  className,
  ...props
}) {
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }

  function formatNumber(number) {
    const formattedNumber = Number(number).toLocaleString();
    return formattedNumber;
  }
  const truncTitle = truncateText(title, 30);

  return (
    <div className="cardContainer" {...props}>
      <img className={`${className}`} src={thumbnail} alt="" />
      <div className="radioInfo">
        <div className="topInfo">
          <h1>{truncTitle}</h1>
          <p>{formatNumber(viewers)} listening</p>
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
