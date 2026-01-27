import {AdvancedMarker, InfoWindow} from "@vis.gl/react-google-maps";
import {useState} from "react";

export default function MapMarkerWithInfoWindow({lat, lng}) {
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
                            <h2>Please visit to conduct in person business</h2>
                            <h2>Trading hours</h2>
                            <h3>09:00-17:00 Monday-Friday</h3>
                            <h3>09:00-15:00 Saturday</h3>
                            <h4>Contact: 072 CAPITEC BANK</h4>
                        </div>
                    </div>

                </InfoWindow>
            }

        </>
    )
}