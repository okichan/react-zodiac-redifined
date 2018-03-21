import React from "react";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

function TopPageThumbs({
  data,
  isSelectMode,
  selectedPhotos,
  enteredWord,
  searchImage,
  enteredWordHandler,
  clearSearch,
  toggleTick,
  deletePhotos
}) {
  return (
    data && (
      <div className="flex-container">
        {data.map(data => {
          return (
            <ScrollAnimation animateIn="fadeIn" animateOnce={true} duration={2}>
              
              <div
                className={`thumb-wrapper ${isSelectMode ? "swing" : ""}`}
                key={`div_${data.id}`}
              >
                <p className="animal-name">{data.name}</p>
                <input
                  className={`checkbox ${isSelectMode ? "" : "hidden"}`}
                  type="checkbox"
                  name={data.id}
                  value={data.id}
                  onChange={toggleTick}
                  key={`input_${data.id}`}
                />
                <div className={isSelectMode ? "" : "back"} />
                <Link to={`/${data.id}`} key={data.id} className={isSelectMode ? "back" : ""} rel="noopener noreferrer">
                  <img
                    className={`thumb ${isSelectMode ? "back" : ""}`}
                    title={data.name}
                    src={data.uri}
                    alt={data.name}
                    key={data.id}
                  />
                </Link>
              </div>
            </ScrollAnimation>
          );
        })}
      </div>
    )
  );
}

export default TopPageThumbs;
