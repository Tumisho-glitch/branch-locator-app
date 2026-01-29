import MapComponent from "../components/MapComponent.jsx";
import {useEffect, useState} from "react";
import {APIProvider} from "@vis.gl/react-google-maps";

export default function BranchLocatorPage() {
    const [focusLocation, setFocusLocation] = useState("");

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    return (
        <div className={"flex flex-col justify-center items-center w-screen space-y-2 p-4"}>
            <h1 className="w-full  text-center text-2xl font-heading">Branch locator page</h1>
            <SearchBar setFocusLocation={setFocusLocation} />
            <APIProvider apiKey={apiKey}>
                <MapComponent focusLocation={focusLocation} setFocusLocation={setFocusLocation} />
            </APIProvider>
        </div>
    )
}

function SearchBar({setFocusLocation}) {
    const [query, setQuery] = useState("");
    const [locations, setLocations] = useState([]);

    function handleQueryChange(event) {
        const newQuery = event.target.value;
        setQuery(newQuery);

        // then submit a request to find all places matching the query
        searchPlaces(newQuery);


    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function searchPlaces(){
            const res = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
                method: "POST",
                body: JSON.stringify({"textQuery": query}),
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                    "X-Goog-FieldMask": "places.displayName,places.location"
                },
                signal: signal
            })
            const data = await res.json();
            setLocations(data.places || []);
            console.log("Data :", data.places);
        }

        searchPlaces();

        return () => {
            controller.abort();
        }

    }, [query])



    function clearSearch(){
        setQuery("")
        setLocations("")
    }

    return (
        <div>
            <input className=" w-90 sm:w-140 md:200 p-4 rounded-sm border-1 border-red-500 focus:border-3" placeholder="Search for place" onChange={e => handleQueryChange(e)} value={query} />
            {
                locations && locations.length > 0 &&
                <SearchResults locations={locations} setFocusLocation={setFocusLocation} clearSearch={clearSearch}/>
            }

        </div>

    )
}

function SearchResults({locations, setFocusLocation, clearSearch}) {
    console.log("Locations :", locations);

    function handleSetFocusLocation(location){
        //get the location's latitude and longitude
        console.log("This is the chosen location:", location.location);
        setFocusLocation({lat: location.location.latitude, lng: location.location.longitude});
        clearSearch();
    }

    return (
        <div className="bg-white rounded-2xl space-y-2 font-semibold fixed z-10  text-center shadow-2xl divide-y w-90 sm:w-140 md:200">
            {
               locations.map((location) => {
                    return (<p className="hover:bg-stone-100 hover:cursor-pointer p-2" onClick={()=>handleSetFocusLocation(location)}>{location.displayName.text}</p>)
                })
            }
        </div>
    )
}