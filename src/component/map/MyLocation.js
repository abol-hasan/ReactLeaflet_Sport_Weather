import { useContext } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import MapContext from "../../store/map-context";

function MyLocation(props) {
  const map = useMap();
  const mapCtx = useContext(MapContext);

  const { lat, lng } = props.position;
  const coords = [lat, lng];
  map.setView(coords);
  /* console.log(mapCtx.formState); */
  return (
    <Marker position={coords}>
      <Popup autoClose={false}>
        <p>Your Position</p>
        <p>
          <strong>Temperature</strong>: {props.dataWetter.curTemp} °C
        </p>
        <p>
          <strong>Condition</strong>: {props.dataWetter.stateOfWeather}
        </p>
        <p>
          <strong>Feel_Like</strong>: {props.dataWetter.feelsLike} °C
        </p>
        <p>
          <strong>Wind-Speed</strong>: {props.dataWetter.speed} m/S
        </p>
        <img src={props.dataWetter.image} alt="conditionWeather" />
      </Popup>
    </Marker>
  );
}

export default MyLocation;
