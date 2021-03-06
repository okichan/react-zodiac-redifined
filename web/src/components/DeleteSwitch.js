import React from "react";

function DeleteSwitch({ data, isSelectMode, selectPhotosToggle, deletePhotos }) {
  return (
    data && (
      <div className="delete-component ">
        <button onClick={selectPhotosToggle} className="clickable">Admin mode</button>
        <div className={`svg-container ${isSelectMode ? "show" : "hidden"}`}>
          <svg
            className="clickable"
            onClick={deletePhotos}
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 753.23 753.23"
            preserveAspectRatio="xMinYMin meet"
          >
            <path d="M494 659c13 0 24-10 24-23V353a24 24 0 0 0-47 0v283c0 13 10 23 23 23zM636 94H494V47c0-26-21-47-47-47H306c-26 0-47 21-47 47v47H118c-26 0-47 21-47 47v47c0 26 21 47 47 47v424c0 52 42 94 94 94h329c52 0 95-42 95-94V235c26 0 47-21 47-47v-47c0-26-21-47-47-47zM306 71c0-13 11-24 24-24h94c13 0 23 11 23 24v23H306V71zm282 588c0 26-21 47-47 47H212c-26 0-47-21-47-47V235h423v424zm24-471H141a24 24 0 0 1 0-47h471a24 24 0 0 1 0 47zM259 659c13 0 23-10 23-23V353a24 24 0 0 0-47 0v283c0 13 11 23 24 23zm118 0c13 0 23-10 23-23V353a24 24 0 0 0-47 0v283c0 13 11 23 24 23z" />
          </svg>
        </div>
      </div>
    )
  );
}

export default DeleteSwitch;
