import classes from "./formmapdata.module.css";
import MapContext from "../../store/map-context";
import { useContext, useEffect, useRef, Fragment } from "react";
import { v4 as uuid } from "uuid";
//prettier-ignore
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function FormMapData(props) {
  const disRef = useRef();
  const durRef = useRef();
  const id_ = uuid().slice(0, 10);
  const correctInput = (...inputs) =>
    inputs.every((inp) => Number.isFinite(inp));

  const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

  const mapCtx = useContext(MapContext);

  const cancelFormHandler = () => {
    mapCtx.closeFormHandler();
  };
  const date = new Date();

  const description = `${mapCtx.typeSport[0].toUpperCase()}${mapCtx.typeSport.slice(
    1
  )} on ${months[date.getMonth()]} ${date.getDate()}`;
  const { openForm } = mapCtx;
  const formClass = mapCtx.openForm
    ? classes.form
    : `${classes.form} ${classes.hidden}`;

  useEffect(() => {
    if (openForm) {
      disRef.current.focus();
    }
  }, [openForm]);

  const changeHandler = (e) => {
    mapCtx.setTypeSport(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onHide();

    if (!mapCtx.openForm) {
      return alert("PLease click with Mouse on the Map");
    }

    const enteredDistance = +disRef.current.value;
    const enteredDuration = +durRef.current.value;

    if (mapCtx.typeSport === "running") {
      if (
        !correctInput(enteredDistance, enteredDuration) ||
        !allPositive(enteredDistance, enteredDuration)
      )
        return alert("Inputs have to be positive numbers!");

      const runPace = +(enteredDuration / enteredDistance).toFixed(2);
      mapCtx.dispatch({
        type: "Running",
        payload: {
          dis: enteredDistance,
          dur: enteredDuration,
          pace: runPace,
          description: description,
          latlng: mapCtx.formState.newLatlng,
          id_: id_,
          weather: props.weather,
        },
      });
    }

    if (mapCtx.typeSport === "cycling") {
      if (
        !correctInput(enteredDistance, enteredDuration) ||
        !allPositive(enteredDistance, enteredDuration)
      )
        return alert("Inputs have to be positive numbers!");

      const cycleSpeed = +(enteredDistance / enteredDuration).toFixed(2);

      mapCtx.dispatch({
        type: "Cycling",
        payload: {
          dis: enteredDistance,
          dur: enteredDuration,
          speed: cycleSpeed,
          description: description,
          latlng: mapCtx.formState.newLatlng,
          id_: id_,
          weather: props.weather,
        },
      });
    }
    disRef.current.value = durRef.current.value = "";
    mapCtx.closeFormHandler();
  };

  console.log(mapCtx.formState);

  return (
    <Fragment>
      <form className={formClass} onSubmit={submitHandler}>
        <div className={classes.formeachblock}>
          <label className={classes.formlabel}>Type</label>
          <select className={classes.formselect} onChange={changeHandler}>
            <option value="running">Running</option>
            <option value="cycling">Cycling</option>
          </select>
        </div>
        <div className={classes.formeachblock}>
          <label className={classes.formlabel}>Distance</label>
          <input
            className={classes.forminput}
            type="text"
            placeholder="km"
            ref={disRef}
          />
        </div>
        <div className={classes.formeachblock}>
          <label className={classes.formlabel}>Duration</label>
          <input
            className={classes.forminput}
            type="text"
            placeholder="min"
            ref={durRef}
          />
        </div>
        <div className={classes.cancel}>
          <button type="button" onClick={cancelFormHandler}>
            Cancel
          </button>
        </div>
        <button style={{ display: "none" }}>hi</button>
      </form>
    </Fragment>
  );
}

export default FormMapData;
