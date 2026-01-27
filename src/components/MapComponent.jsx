"use client";
import {AdvancedMarker, APIProvider, InfoWindow, Map, Pin, useAdvancedMarkerRef} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import MapMarkerWithInfoWindow from "./MapMarkerWithInfoWindow.jsx";


export default function MapComponent(){

    const [userPosition, setUserPosition] = useState(null);
    const [error, setError] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();

    useEffect(() => {

        if(!navigator.geolocation){
            setError("Geolocation is not supported, try different browser");
            return;
        }

        //get the user's gps coordinates
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords.latitude, position.coords.longitude);
            setUserPosition({lat: position.coords.latitude, lng: position.coords.longitude});
        },
            error => {
                setError(error)
            },{
            enableHighAccuracy: true,
                maximumAge: 0
            })

    },[setError])

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    if(!userPosition){
        return <p>Waiting for user position...</p>
    }

    console.log(userPosition)

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                style={{width: '90vw', height: '100vh'}}
                defaultCenter={userPosition}
                defaultZoom={15}
                gestureHandling='greedy'
                disableDefaultUI
                mapId={"68d9a5bef583da965240143d"}
            >
                
                <MapMarkerWithInfoWindow lat={-26.2041} lng={28.0473}/>
                <MapMarkerWithInfoWindow lat={-33.9321} lng={18.8602}/>


            </Map>
    </APIProvider>
    )
}