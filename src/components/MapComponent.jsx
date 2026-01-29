"use client";
import {
    AdvancedMarker,
    APIProvider,
    InfoWindow,
    Map,
    Pin,
    useAdvancedMarkerRef,
    useMap
} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import MapMarkerWithInfoWindow from "./MapMarkerWithInfoWindow.jsx";
import branchesData from "../../public/data/branches.json";


export default function MapComponent({focusLocation, setFocusLocation}) {

    const [focusPosition, setFocusPosition] = useState(null);
    const [branches, setBranches] = useState([]);
    const [error, setError] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const map = useMap();

                useEffect(() => {

                    console.log("The focused location has changed")

                    if(!navigator.geolocation){
                        setError("Geolocation is not supported, try different browser");
                        return;
                    }

                    //get the user's gps coordinates
                    if(!focusLocation){
                        navigator.geolocation.getCurrentPosition(position => {
                                console.log(position.coords.latitude, position.coords.longitude);
                                setFocusPosition({lat: position.coords.latitude, lng: position.coords.longitude});
                            },
                            error => {
                                setError(error)
                            },{
                                enableHighAccuracy: true,
                                maximumAge: 0
                            })
                    }
                    else
                    {
                        //if the focus location is given, the set the focusPosition to be the focusLocation
                        setFocusPosition(focusLocation)
                    }

                    if(!map || !focusLocation) return;
                    console.log("Focus Location", focusLocation);
                    map.panTo(focusLocation)


                },[map, setError, focusLocation])

    useEffect(() => {

        async function loadBranches(){
            const data = await fetch("/data/branches.json");
            const branches = await data.json();

            setBranches(branches);

        }

        loadBranches();
    }, [])



    if(!focusPosition || !branches){
        return <p>Waiting for user position or branches data...</p>
    }



    return (

            <Map
                style={{width: '90vw', height: '100vh'}}
                defaultCenter={focusPosition}
                defaultZoom={13}
                gestureHandling='greedy'
                disableDefaultUI
                mapId={"68d9a5bef583da965240143d"}
            >

                {
                    branches.map(branch => {
                        return <MapMarkerWithInfoWindow lat={branch.lat} lng={branch.lng} address={branch.address}
                                                 tradingHours={branch.tradingHours} contact={branch.contact}/>
                    })
                }

            </Map>
    )
}