import MapContext from "../../store/map-context";
import { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";

const CalculateDistance = () => {
  const mapCtx = useContext(MapContext);
  const twoPoints = mapCtx.twoPoints;
  const map = useMap();

  useEffect(() => {
    if (mapCtx.twoPoints.length === 2) {
      const disBetweentwoPoints = map.distance(
        mapCtx.twoPoints[0],
        mapCtx.twoPoints[1]
      );
      mapCtx.setMeasuredDis((disBetweentwoPoints / 1000).toFixed(2));
      mapCtx.resetPoints();
      mapCtx.flyCtxHandler();
    }
  }, [twoPoints, map]);

  return null;
};
export default CalculateDistance;
