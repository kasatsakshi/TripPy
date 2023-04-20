










// import React, { useState, useEffect } from "react";

// function Map(props) {
//   const [map, setMap] = useState(null);
//   const [apiLoaded, setApiLoaded] = useState(false);
//   useEffect(() => {
//     let script = null;

//     // Load the Google Maps JavaScript API script
//     const loadScript = () => {
//       script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCfCUdTXbP9uUwM0Pu07Okk79JlDX5Dv_g`;
//       script.onerror = handleScriptError;
//       script.onload = initMap;
//       document.head.appendChild(script);
//     };

//     // Initialize the map
//     const initMap = () => {
//       const center =  props.center ? props.center : props.locations ? props.locations[0]: {lat: 0, lng: 0};
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         zoom: 12,
//         center,
//       });
//       setMap(map);

//       // Add markers for each location
//       props.locations?.forEach((location) => {
//         new window.google.maps.Marker({
//           position: location,
//           map,
//         });
//       });
//     };

//     // Handle errors if the Google Maps API script fails to load
//     const handleScriptError = () => {
//       console.error("Failed to load Google Maps API script.");
//     };

//     // Load the script when the component mounts
//     if (!apiLoaded) {
//       loadScript();
//       setApiLoaded(true);
//     }

//     // Clean up when the component unmounts
//     return () => {
//       if (script) {
//         document.head.removeChild(script);
//       }
//     };
//   }, [props.locations, apiLoaded]);

//   return <div id="map" style={{ height: "500px", width: '800px' }}></div>;
// }

// export default Map;
