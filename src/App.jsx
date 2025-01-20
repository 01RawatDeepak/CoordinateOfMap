import React, { useState, useRef, useEffect } from "react";
import "ol/ol.css";
import "./App.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import MapButtons from "./components/MapButtons";
import MapDisplay from "./components/MapDisplay";
import ResultDisplay from "./components/ResultDisplay";
import {
  initializeMap,
  startDrawing,
  clearAllDrawings,
} from "./components/CordinateMap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const mapRef = useRef(null);
  const [modalContent, setModalContent] = useState([]);

  useEffect(() => {
    const { map, vectorSource, vectorLayer } = initializeMap(
      VectorSource,
      VectorLayer,
      TileLayer,
      OSM,
      View,
      Map
    );

    map.setTarget("map");
    mapRef.current = { map, vectorSource, vectorLayer };

    return () => {
      map.setTarget(null);
    };
  }, []);

  const handleStartDrawing = (type) => {
    const { map, vectorSource } = mapRef.current || {};
    startDrawing(type, map, vectorSource, setModalContent);
  };

  const handleClearAllDrawings = () => {
    const { vectorSource } = mapRef.current || {};
    clearAllDrawings(vectorSource, setModalContent);
  };

  const closeModal = () => {
    setModalContent([]);
  };

  return (
    <>
      <MapDisplay />
      
        <MapButtons
          startDrawing={handleStartDrawing}
          clearAllDrawings={handleClearAllDrawings}
        />
   
      <ResultDisplay modalContent={modalContent} closeModal={closeModal} />
    </>
  );
}

export default App;
