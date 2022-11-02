import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { api_key } from "../config/dev";
import { useRef, useState } from 'react'
const libraries = ["places"];
const google = window.google;

const Map = () => {
  const [map, setMap] = useState( /** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  /** @type React.MutableRefObjectHTMLInputElement> */
  const originRef = useRef()
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: api_key,
    libraries: libraries,
  })
  
  if(!isLoaded){
    return <h1 style={{textAlign: "center", margin: "auto"}}>Loading...</h1>
  }

  const calculateRoute = async (e) => {
    e.preventDefault()
    if(originRef.current.value === "") {
      return 
    }
    
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: {lat: 45.3141, lng: -91.6510},
      travelMode: google.maps.TravelMode.DRIVING
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const clearRoute = (e) => {
    e.preventDefault()
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
  }

  const renderDistance = () => {
    return distance ? (
      <div className="distance">Distance: {distance}</div>
    ) : ""
  }

  const renderDuration = () => {
    return duration ? (
      <div className="duration">Duration: {duration}</div>
    ) : ""
  }

  return (
    <div style={{width: "574px", height: "450px"}}>
      <GoogleMap
        center={{lat: 45.3141, lng: -91.6510}}
        zoom={15}
        mapContainerStyle={{height: "100%", width: "100%"}}
        options={{
          zoomControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          center: true,
        }}
        onLoad={(map) => {
          setMap(map)
        }}
      >
        {directionsResponse ? <DirectionsRenderer directions={directionsResponse} /> : ""}
        <Marker position={{lat: 45.3141, lng: -91.6510}} />
      </GoogleMap>
      <Autocomplete>
        <input placeholder="Enter you location to see how far you are from Hope & Anchor" id="location-input" ref={originRef} />
      </Autocomplete>
      <button type="submit" className="btn btn-primary" id="get-directions" onClick={calculateRoute}>Get Directions</button>
      <button className="btn btn-primary" id="clear-directions" onClick={clearRoute}>Clear Directions</button>
      {renderDistance()}
      {renderDuration()}
    </div>
  )
};

export default Map;