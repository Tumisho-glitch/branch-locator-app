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
                            maxWidth={300}
                    onClose={() => setIsInfoWindowOpen(false)}
                >
                    <div className="flex flex-row">
                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIgyU3fDk3HZadI9L0eYRwkZ7OpXJdv7B55w&s"} alt={"image"} width={200} />
                        <div>
                            <p>This an official capitec branch</p>
                            <p>Location: {address}</p>
                            <h2>Trading hours</h2>
                            {
                                <ul>
                                    {
                                        tradingHours.map((tradingHour) => {
                                            return <h3>{tradingHour}</h3>
                                        })
                                    }
                                </ul>
                            }
                            <h4>Contact: {contact}</h4>
                        </div>
                    </div>

                </InfoWindow>
            }

        </>
    )
}