import { Marker } from "react-leaflet";
import { useRef, useEffect } from "react";
import React from "react";

const MyMarker = (props) => {
  const leafletRef = useRef();

  useEffect(() => {
    leafletRef.current.openPopup();
  }, [props.position]);

  return <Marker ref={leafletRef} {...props} />;
};

export default React.memo(MyMarker);
