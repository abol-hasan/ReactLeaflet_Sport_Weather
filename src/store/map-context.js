import React, { useReducer, useState } from "react";

const MapContext = React.createContext({
  openForm: false,
  openFormHandler: () => {},
  closeFormHandler: () => {},
});

const initialState = {
  runn: [],
  cycle: [],
  newLatlng: {},
};
const reducerFn = (state, action) => {
  switch (action.type) {
    case "Running":
      const updatedRunn = state.runn.concat(action.payload);
      return {
        runn: updatedRunn,
        cycle: [...state.cycle],
        newLatlng: {},
      };
    case "Cycling":
      const updatedCycle = state.cycle.concat(action.payload);
      return {
        cycle: updatedCycle,
        runn: [...state.runn],
        newLatlng: {},
      };
    case "latlngRunning":
      return {
        runn: [...state.runn],
        cycle: [...state.cycle],

        newLatlng: { ...action.payload },
      };
    case "latlngCycling":
      return {
        runn: [...state.runn],
        cycle: [...state.cycle],

        newLatlng: { ...action.payload },
      };
    case "desendRun":
      return {
        runn: action.payload,
        cycle: [...state.cycle],
        newLatlng: {},
      };
    case "desendcycle":
      return {
        runn: [...state.runn],
        cycle: action.payload,
        newLatlng: {},
      };
    case "del":
      const anyRunItem = state.runn.some((item) => item.id_ === action.payload);
      const anyCycleItem = state.cycle.some(
        (item) => item.id_ === action.payload
      );
      if (anyRunItem) {
        const updatedRun = state.runn.filter(
          (item) => item.id_ !== action.payload
        );
        return {
          runn: updatedRun,
          cycle: [...state.cycle],
          newLatlng: { ...state.newLatlng },
        };
      }
      if (anyCycleItem) {
        const updatedCycle = state.cycle.filter(
          (item) => item.id_ !== action.payload
        );
        return {
          runn: [...state.runn],
          cycle: updatedCycle,
          newLatlng: { ...state.newLatlng },
        };
      }
      break;

    default:
      throw new Error();
  }
};

export const ContextMapProvider = (props) => {
  const [state, dispatch] = useReducer(reducerFn, initialState);
  const [showFly, setShowFly] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [typeSport, setTypeSport] = useState("running");
  const [twoPoints, setTwoPoints] = useState([]);
  const [measuredDis, setMeasuredDis] = useState("");

  const addPointHandler = (point) => {
    setTwoPoints((preValue) => {
      return [...preValue, point];
    });
  };

  const resetTwoPointHandler = () => {
    setTwoPoints([]);
  };

  const flyCtxHandler = () => {
    setShowFly(true);
  };
  const noFlyHandler = () => {
    setShowFly(false);
  };
  const openFormHandler = () => {
    setOpenForm(true);
  };
  const closeFormHandler = () => {
    setOpenForm(false);
  };
  const deleteHandler = (id) => {
    dispatch({ type: "del", payload: id });
  };

  const values = {
    openForm: openForm,
    openFormHandler: openFormHandler,
    closeFormHandler: closeFormHandler,
    formState: state,
    dispatch: dispatch,
    showFly: showFly,
    flyCtxHandler: flyCtxHandler,
    noFlyHandler: noFlyHandler,
    typeSport: typeSport,
    setTypeSport: setTypeSport,
    removeItem: deleteHandler,
    resetPoints: resetTwoPointHandler,
    addPoints: addPointHandler,
    twoPoints: twoPoints,
    measuredDis: measuredDis,
    setMeasuredDis: setMeasuredDis,
  };

  return (
    <MapContext.Provider value={values}>{props.children}</MapContext.Provider>
  );
};

export default MapContext;
