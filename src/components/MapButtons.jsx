import React, { useState } from "react";

function MapButtons({ startDrawing, clearAllDrawings }) {
  const [activeButton, setActiveButton] = useState(null); 
  const handleStartDrawing = (type) => {
    setActiveButton(type);
    startDrawing(type);
  };
  const getButtonClass = (type) => {
    return activeButton === type ? "btn btn-success" : "btn btn-primary";
  };

  return (
    <div className="d-flex gap-2 p-3 justify-content-center">
      <button
        className={getButtonClass("LineString")}
        onClick={() => handleStartDrawing("LineString")}
      >
        Line
      </button>
      <button
        className={getButtonClass("Polygon")}
        onClick={() => handleStartDrawing("Polygon")}
      >
        Polygon
      </button>
      <button className="btn btn-danger" onClick={clearAllDrawings}>
        Delete
      </button>
    </div>
  );
}

export default MapButtons;
