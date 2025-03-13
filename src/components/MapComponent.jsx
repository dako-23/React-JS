import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Loader from './Loader.jsx';

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px",
  overflow: "hidden",
};

const center = {
  lat: 42.6977,
  lng: 23.3242,
};

export default function ContactMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAT1GejcsJZD2aAPXVshuqsOJ215DoKSHA",
  });

  return (
    <>
      {isLoaded
        ?
        <div className="w-full h-[300px] rounded-xl shadow-lg">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
            <MarkerF position={center} />
          </GoogleMap>
        </div>
        :
        <div className="flex items-center justify-center h-full text-gray-700">
          <Loader />
        </div>}
    </>
  )
}


