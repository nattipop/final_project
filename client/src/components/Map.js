import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { api_key } from "../config/dev";
import { useRef, useState } from 'react'
const libraries = ["places"];

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

  const handaLocation = {lat: 45.3141, lng: -91.6510};
  
  if(!isLoaded){
    return <h1 style={{textAlign: "center", margin: "auto"}}>Loading...</h1>
  }
  
  const calculateRoute = async () => {
    if(originRef.current.value === "") {
      return 
    }
    const google = window.google;
    
    if(google){
      debugger
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: handaLocation,
        travelMode: google.maps.TravelMode.DRIVING
      });
     
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    }
  };

  const clearRoute = (e) => {
    e.preventDefault()
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
  }

  const renderDistanceDuration = () => {
    return (distance && duration) ? (
      `You are ${distance} and ${duration} away from a delicious cup of coffee!`
    ) : ""
  }

  return (
    <div style={{width: "574px", height: "450px"}}>
      <GoogleMap
        center={handaLocation}
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
        <Marker position={handaLocation} title="H&A">H&A</Marker>
      </GoogleMap>
      <Autocomplete>
        <input placeholder="Enter your location to see how far you are from Hope & Anchor" id="location-input" ref={originRef} />
      </Autocomplete>
      <button type="submit" className="btn btn-primary" id="get-directions" onClick={calculateRoute}>Get Directions</button>
      <button className="btn btn-primary" id="clear-directions" onClick={clearRoute}>Clear Directions</button>
      <div className="duration">
        {renderDistanceDuration()}
      </div>
    </div>
  )
};

export default Map;