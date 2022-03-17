import MapContext from "../../store/map-context";
import { useContext } from "react";
import { useMapEvents } from "react-leaflet";

const LatlngFinder = (props) => {
  const mapCtx = useContext(MapContext);
  const myCoords = { lat: props.myPosition.lat, lng: props.myPosition.lng };

  const map = useMapEvents({
    click(mapEvent) {
      const newCoords = { lat: mapEvent.latlng.lat, lng: mapEvent.latlng.lng };
      const calDisToUser = (map.distance(myCoords, newCoords) / 1000).toFixed(
        2
      );

      const sentCoords = {
        lat: mapEvent.latlng.lat,
        lng: mapEvent.latlng.lng,
        disToUser: calDisToUser,
      };

      if (mapCtx.typeSport === "running") {
        mapCtx.dispatch({ type: "latlngRunning", payload: sentCoords });
      }
      if (mapCtx.typeSport === "cycling") {
        mapCtx.dispatch({ type: "latlngCycling", payload: sentCoords });
      }
      mapCtx.openFormHandler();
      mapCtx.noFlyHandler();
    },
  });
  return null;
};

export default LatlngFinder;
