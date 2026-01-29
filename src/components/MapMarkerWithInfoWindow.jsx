import {AdvancedMarker, InfoWindow} from "@vis.gl/react-google-maps";
import {useState} from "react";

export default function MapMarkerWithInfoWindow({lat, lng, tradingHours, address, contact}) {
    const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);


    return (
        <>
            <AdvancedMarker
                position={{lat: lat, lng: lng}}
                title={"Cape town branch offices"}
                onClick={() => {setIsInfoWindowOpen(true)}}
            >
            </AdvancedMarker>

            {
                isInfoWindowOpen &&
                <InfoWindow position={{lat: lat, lng: lng}}
                            maxWidth={400}
                    onClose={() => setIsInfoWindowOpen(false)}
                >
                    <div className="flex flex-col w-fit h-fit justify-center items-center">
                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIgyU3fDk3HZadI9L0eYRwkZ7OpXJdv7B55w&s"} alt={"image"} className="w-70" />
                        <div className="text-sm flex flex-col justify-center items-center">
                            <h1 className="text-lg font-heading">This an official capitec branch</h1>
                            <p>Location: {address}</p>
                            <h2 className="font-bold">Trading hours</h2>
                            {
                                <ul>
                                    {
                                        tradingHours.map((tradingHour) => {
                                            return <h3>{tradingHour}</h3>
                                        })
                                    }
                                </ul>
                            }
                            <h4 className="font-semibold">Contact: {contact}</h4>
                        </div>
                    </div>

                </InfoWindow>
            }

        </>
    )
}