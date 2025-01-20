import { Draw } from "ol/interaction";

export const initializeMap = (VectorSource, VectorLayer, TileLayer, OSM, View, Map) => {
  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const map = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer,
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });

  return { map, vectorSource, vectorLayer };
};

export const removeExistingInteractions = (map) => {
  if (map) {
    map.getInteractions().forEach((interaction) => {
      if (interaction instanceof Draw) {
        map.removeInteraction(interaction);
      }
    });
  }
};

export const startDrawing = (type, map, vectorSource, setModalContent) => {
  if (!map || !vectorSource) {
    console.error("Map or vector source is not initialized yet.");
    return;
  }

  removeExistingInteractions(map);

  const draw = new Draw({
    source: vectorSource,
    type,
  });

  draw.on("drawend", (event) => {
    const coordinates = event.feature.getGeometry().getCoordinates();
    console.log("Draw ended. Coordinates:", coordinates);
    setModalContent((prev) => [...prev, coordinates]);
  });

  map.addInteraction(draw);
  console.log(`Draw interaction of type "${type}" added to map`);
};

export const clearAllDrawings = (vectorSource, setModalContent) => {
  if (vectorSource) {
    vectorSource.clear();
    console.log("All drawings cleared from the map");
    setModalContent([]);
  }
};
