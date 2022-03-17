import { useMap } from "react-leaflet";

const FlyToMarker = (props) => {
  const map = useMap();
  const position = props.onFlyLast;

  const pos = !!position;

  if (pos) {
    map.flyTo(position);
  }
  return null;
};

export default FlyToMarker;
