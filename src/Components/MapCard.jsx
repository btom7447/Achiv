import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [10, 39]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapCard = () => {
    const position = [51.505, -0.09]; // Default position for the map
    const zoomLevel = 14;
    const zoomedInLevel = 18;

    // Custom component to handle zooming in on marker click
    const ZoomOnClick = ({ position }) => {
        const map = useMap();

        const handleClick = () => {
            map.setView(position, zoomedInLevel);
        };

        return (
            <Marker position={position} eventHandlers={{ click: handleClick }}>
                <Popup>
                    38 Broadway NY, 1001 USA
                </Popup>
            </Marker>
        );
    };

    return (
        <div className="map-card" style={{ height: '400px', width: '100%' }}>
            <MapContainer center={position} zoom={zoomLevel} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomOnClick position={position} />
            </MapContainer>
            <h4>London Studio</h4>
            <p>123 Sesame Street, Abuja</p>
            <p>+123 456 7890</p>
        </div>
    );
};

export default MapCard;