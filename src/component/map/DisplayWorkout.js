import { useContext } from "react";
import MapContext from "../../store/map-context";
import classes from "./displayworkout.module.css";
import SpeedIcon from "@mui/icons-material/Speed";

const DisplayWorkout = (props) => {
  const mapCtx = useContext(MapContext);

  const { formState } = mapCtx;
  const { runn, cycle } = formState;

  const flyHandler = (pos) => {
    props.onFly(pos);
  };
  const deleteHandler = (id) => {
    mapCtx.removeItem(id);
  };
  const pointHandler = (data) => {
    if (mapCtx.twoPoints.length < 2) {
      mapCtx.addPoints(data);
    }
  };

  return (
    <div>
      {cycle.length === 0
        ? null
        : cycle.map((item) => {
            return (
              <li
                className={[classes.activity, classes.activityrun].join(" ")}
                key={item.id_}
                onClick={flyHandler.bind(null, item.latlng)}
              >
                <input
                  className={classes.input}
                  type="button"
                  value="Delete"
                  onClick={deleteHandler.bind(null, item.id_)}
                />
                <input
                  type="button"
                  value="Choose for Distance"
                  className={classes.input}
                  onClick={pointHandler.bind(null, item.latlng)}
                />
                <h2 className={classes.title}>{item.description}</h2>
                <div className={classes.allitems}>
                  <div className={classes.itemswork}>
                    <span className={classes.items}>🚴‍♀️</span>
                    <span className={classes.items}>{item.dis}</span>
                    <span className={classes.items}>km</span>
                  </div>
                  <div className={classes.itemswork}>
                    <span className={classes.items}>⏱</span>
                    <span className={classes.items}>{item.dur}</span>
                    <span className={classes.items}>min</span>
                  </div>
                  <div className={classes.itemswork}>
                    <span className={classes.items}>
                      <SpeedIcon style={{ color: "#42a5f5" }} />
                    </span>
                    <span className={classes.items}>{item.speed}</span>
                    <span className={classes.items}>km/min</span>
                  </div>
                </div>
              </li>
            );
          })}
      {runn.length === 0
        ? null
        : runn.map((item) => {
            return (
              <li
                className={[classes.activity, classes.activitycycle].join(" ")}
                key={item.id_}
                onClick={flyHandler.bind(null, item.latlng)}
              >
                <input
                  className={classes.input}
                  type="button"
                  value="Delete"
                  onClick={deleteHandler.bind(null, item.id_)}
                />
                <input
                  type="button"
                  value="Choose for Distance"
                  className={classes.input}
                  onClick={pointHandler.bind(null, item.latlng)}
                />
                <h2 className={classes.title}>{item.description}</h2>
                <div className={classes.allitems}>
                  <div className={classes.itemswork}>
                    <span className={classes.items}>🏃‍♂️</span>
                    <span className={classes.items}>{item.dis}</span>
                    <span className={classes.items}>km</span>
                  </div>
                  <div className={classes.itemswork}>
                    <span className={classes.items}>⏱</span>
                    <span className={classes.items}>{item.dur}</span>
                    <span className={classes.items}>min</span>
                  </div>
                  <div className={classes.itemswork}>
                    <span className={classes.items}>🦶🏼</span>
                    <span className={classes.items}>{item.pace}</span>
                    <span className={classes.items}>min/km</span>
                  </div>
                </div>
              </li>
            );
          })}
    </div>
  );
};

export default DisplayWorkout;
