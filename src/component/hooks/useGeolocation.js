import { useEffect, useState } from "react";

function useGeolocation() {
  const [position, setPosition] = useState({ loaded: false, lat: "", lng: "" });
  const onFound = (position) => {
    setPosition({
      loaded: true,
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  const notFound = () => {
    setPosition((preValue) => {
      return {
        ...preValue,
        loaded: true,
        error: "Could not found your position",
      };
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onFound, notFound);
    }
  }, []);

  return position;
}

export default useGeolocation;
