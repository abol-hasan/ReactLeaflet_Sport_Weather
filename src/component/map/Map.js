import classes from "./map.module.css";
import "leaflet/dist/leaflet.css";
import useGeolocation from "../hooks/useGeolocation";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MyLocation from "./MyLocation";

import FormMapData from "./FormMapData";
import DisplayWorkout from "./DisplayWorkout";
import { useState, useContext, useEffect } from "react";
import MapContext from "../../store/map-context";
import LatlngFinder from "./LatlngFinder";
import MarkOnMap from "./MarkOnMap";
import FlyToMarker from "./FlyToMarker";
import CalculateDistance from "./CalculateDistance";
import useHttp from "../hooks/use-http";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;
L.Map.prototype.options.closePopupOnClick = false;

function Map() {
  const position = useGeolocation();
  const [help, setHelp] = useState(true);
  const [latFly, setLatFly] = useState();
  const [desOrAce, setDesOrAce] = useState(false);
  const [desOrAceCycle, setDesOrAceCycle] = useState(false);
  const [dataWeather, setDataWeather] = useState("");
  const { sendRequest: requestWeather } = useHttp();
  const key = process.env.REACT_APP_WEATHER;
  const mapCtx = useContext(MapContext);

  useEffect(() => {
    if (Object.keys(mapCtx.formState.newLatlng).length !== 0) {
      requestWeather({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${mapCtx.formState.newLatlng.lat}&lon=${mapCtx.formState.newLatlng.lng}&exclude=minutely,daily&units=metric&appid=`,
        key: key,
      }).then((data) => {
        const icon = data.current.weather[0].icon;
        const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        const dtWeather = {
          curTemp: Math.round(data.current.temp),
          next2Hours: Math.round(data.hourly[2].temp),
          feelsLike: Math.round(data.current.feels_like),
          stateOfWeather: data.current.weather[0].description,
          speed: data.current.wind_speed,
          image: imageUrl,
        };
        setDataWeather(dtWeather);
        if (!data) {
          alert("Oops, Something went wrong");
        }
      });
    }
  }, [mapCtx.formState.newLatlng]);

  console.log(dataWeather);

  const onFlyHandler = (data) => {
    setLatFly(data);
  };

  const hideHelp = () => {
    setHelp(false);
  };

  const sortDataRun = () => {
    if (!desOrAce) {
      const newRun = mapCtx.formState.runn.sort(function (a, b) {
        return b.latlng.disToUser - a.latlng.disToUser;
      });

      mapCtx.dispatch({ type: "desendRun", payload: newRun });
      setDesOrAce(true);
    }
    if (desOrAce) {
      const newRun = mapCtx.formState.runn.sort(function (a, b) {
        return a.latlng.disToUser - b.latlng.disToUser;
      });

      mapCtx.dispatch({ type: "desendRun", payload: newRun });
      setDesOrAce(false);
    }
  };

  const sortDataCycle = () => {
    if (!desOrAceCycle) {
      const newcycle = mapCtx.formState.cycle.sort(function (a, b) {
        return b.latlng.disToUser - a.latlng.disToUser;
      });

      mapCtx.dispatch({ type: "desendcycle", payload: newcycle });
      setDesOrAceCycle(true);
    }
    if (desOrAceCycle) {
      const newcycle = mapCtx.formState.cycle.sort(function (a, b) {
        return a.latlng.disToUser - b.latlng.disToUser;
      });

      mapCtx.dispatch({ type: "desendcycle", payload: newcycle });
      setDesOrAceCycle(false);
    }
  };

  return (
    <div className={classes.first}>
      <div className={classes.sidebar}>
        {!help && (
          <div>
            <button
              className={classes.sortrun}
              type="button"
              onClick={sortDataRun}
            >
              Sort Running: {desOrAce ? "Acending " : "Desending"}
            </button>
            <button
              className={classes.sortrun}
              type="button"
              onClick={sortDataCycle}
            >
              Sort Cycling: {desOrAceCycle ? "Acending " : "Desending"}
            </button>
          </div>
        )}
        {help && (
          <div className={classes.title}>
            <h1>Please before using, read all Instruction!</h1>
            <h2>
              Instruction 1: Click on the map, enter your Data, and then hit
              Enter Key !
            </h2>

            <p>Instruction 2: Click on the printed Item to center on Map !</p>
            <p>Instruction 3: Choose two Points for Measuring Distance !</p>
            <p>Note: Sorting is based on Distance from User Location!</p>
          </div>
        )}
        <ul className={classes.ull}>
          <FormMapData onHide={hideHelp} weather={dataWeather} />
          {!mapCtx.openForm && <DisplayWorkout onFly={onFlyHandler} />}
          {mapCtx.showFly && (
            <p className={classes.calculate}>
              Measured Distance: {mapCtx.measuredDis} Km
            </p>
          )}
        </ul>

        <div className={classes.abel}>
          <p>Abolhasan Zaman</p>
          <p>abolhasanzaman@gmail.com</p>
        </div>
      </div>
      <MapContainer
        className={classes["leaflet-container"]}
        center={[51.505, -0.09]}
        zoom={13}
        closePopupOnClick={false}
      >
        <MyLocation position={position} dataWetter={dataWeather} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {!mapCtx.openForm && <LatlngFinder myPosition={position} />}

        <MarkOnMap />
        <CalculateDistance />
        <FlyToMarker onFlyLast={latFly} />
      </MapContainer>
    </div>
  );
}

export default Map;
