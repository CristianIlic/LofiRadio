import React from "react";

function RadioCard({ title, viewers, channel, likes, thumbnail, ...props }) {
  return (
    <div className="cardContainer" {...props}>
      <div>
        <img src={thumbnail} alt="" />
      </div>
      <div className="radioInfo">
        <div className="topInfo">
          <h1>{title}</h1>
          <p>{viewers} listening</p>
        </div>
        <div className="bottomInfo">
          <h3>{channel}</h3>
          <h3>{likes} likes</h3>
        </div>
      </div>
    </div>
  );
}

export default RadioCard;
