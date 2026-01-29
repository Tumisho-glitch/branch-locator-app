import MapComponent from "../components/MapComponent.jsx";
import {useState} from "react";
import {APIProvider} from "@vis.gl/react-google-maps";

export default function BranchLocatorPage() {
    const [focusLocation, setFocusLocation] = useState("");

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    return (
        <div className={"flex flex-col justify-center items-center w-screen space-y-2"}>
            <h1 className="w-full  text-center">Branch locator page</h1>
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

    async function searchPlaces(SearchQuery, setFocusLocation){
        const res = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
            method: "POST",
            body: JSON.stringify({"textQuery": SearchQuery}),
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                "X-Goog-FieldMask": "places.displayName,places.location"
            }
        })
        const data = await res.json();
        setLocations(data.places || []);
        console.log("Data :", data.places);
    }

    function clearSearch(){
        setQuery("")
        setLocations("")
    }

    return (
        <div>
            <input className="bg-stone-100 w-200" onChange={e => handleQueryChange(e)} value={query} />
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
        <div className="bg-stone-300 space-y-2 font-semibold fixed z-10 w-200 text-center shadow-2xl">
            {
               locations.map((location) => {
                    return (<p className="hover:bg-stone-400 hover:cursor-pointer" onClick={()=>handleSetFocusLocation(location)}>{location.displayName.text}</p>)
                })
            }
        </div>
    )
}