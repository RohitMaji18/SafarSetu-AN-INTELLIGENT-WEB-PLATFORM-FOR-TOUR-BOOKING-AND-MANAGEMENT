import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ShieldCheck, Loader2, MapPin, Globe } from "lucide-react";
import { renderToStaticMarkup } from 'react-dom/server';

// --- VIBRANT GREEN PIN (Real Look) ---
const iconHTML = renderToStaticMarkup(
    <div className="relative flex items-center justify-center">
        {/* Pulsing Green Effect */}
        <div className="absolute w-12 h-12 bg-green-500/40 rounded-full animate-ping" />
        <div className="bg-green-500 p-3 rounded-full border-2 border-white shadow-2xl">
            <MapPin size={20} className="text-white fill-white" />
        </div>
    </div>
);

const customMarkerIcon = L.divIcon({
    html: iconHTML,
    className: 'custom-icon',
    iconSize: [48, 48],
    iconAnchor: [24, 48],
});

function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom);
            const timer = setTimeout(() => {
                map.invalidateSize();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [center, zoom, map]);
    return null;
}

const TourMap = ({ locationName }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const locationMapping = useMemo(() => ({
        "jaisalmer": { coords: [26.9157, 70.9160], state: "Rajasthan" },
        "alleppey": { coords: [9.4981, 76.3329], state: "Kerala" },
        "meghalaya": { coords: [25.4670, 91.3662], state: "Meghalaya" },
        "darjeeling": { coords: [27.0410, 88.2627], state: "West Bengal" },
        "cherrapunji": { coords: [25.2702, 91.7323], state: "Meghalaya" },
        "lakshadweep": { coords: [10.5667, 72.6417], state: "Lakshadweep" },
        "spiti valley": { coords: [32.2426, 78.0349], state: "Himachal Pradesh" },
        "uttarakhand": { coords: [30.0668, 79.0193], state: "Uttarakhand" },
        "gulmarg": { coords: [34.0484, 74.3805], state: "Jammu & Kashmir" },
        "north goa": { coords: [15.6061, 73.8182], state: "Goa" },
        "coorg": { coords: [12.3375, 75.8069], state: "Karnataka" },
        "kutch": { coords: [23.7337, 69.8597], state: "Gujarat" }
    }), []);

    const cityName = locationName?.split(',')[0].toLowerCase().trim();
    const target = locationMapping[cityName] || { coords: [20.5937, 78.9629], state: "India" };
    const zoomLevel = locationMapping[cityName] ? 13 : 5;

    useEffect(() => { setIsLoaded(true); }, []);

    if (!locationName) return null;

    return (
        <div className="mt-4 space-y-6">
            {/* Header: Green Style */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 gap-4">
                <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                        <Globe size={16} className="text-green-500" />
                        <span className="text-green-500 font-black uppercase tracking-widest text-[10px]">Satellite Live Link</span>
                    </div>
                    <h2 className="text-4xl font-black text-foreground uppercase italic tracking-tighter">
                        Journey <span className="text-green-500">Destination</span>
                    </h2>
                </div>
                
                <div className="bg-white border border-border px-6 py-4 rounded-[1.5rem] flex items-center gap-5 shadow-sm">
                    <div className="text-left border-r border-border pr-5">
                        <p className="text-[9px] font-black text-foreground/30 uppercase tracking-widest">Pinpoint</p>
                        <p className="text-sm font-bold text-foreground font-mono">
                            {target.coords[0]}° N / {target.coords[1]}° E
                        </p>
                    </div>
                    <ShieldCheck className="text-green-500 animate-pulse" size={24} />
                </div>
            </div>

            {/* REAL SATELLITE MAP CONTAINER */}
            <div className="relative h-[550px] w-full rounded-[3rem] overflow-hidden border border-border bg-slate-900 shadow-2xl">
                {!isLoaded ? (
                    <div className="h-full w-full flex items-center justify-center">
                        <Loader2 className="animate-spin text-green-500" size={40} />
                    </div>
                ) : (
                    <MapContainer 
                        center={target.coords} 
                        zoom={zoomLevel} 
                        scrollWheelZoom={false} 
                        zoomControl={false}
                        className="h-full w-full z-0"
                        key={`${target.coords[0]}-${target.coords[1]}`}
                    >
                        {/* --- YE HAI REAL MAP TILES (Satellite View) --- */}
                        <TileLayer 
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution='&copy; Esri'
                        />
                        {/* Labels layer taaki shehero ke naam dikhte rahein */}
                        <TileLayer 
                            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" 
                            opacity={0.8}
                        />
                        
                        <ChangeView center={target.coords} zoom={zoomLevel} />
                        <ZoomControl position="topright" />
                        
                        <Marker position={target.coords} icon={customMarkerIcon}>
                            <Popup className="green-popup">
                                <div className="p-1 text-center">
                                    <p className="text-[10px] font-black uppercase text-foreground">{locationName}</p>
                                    <p className="text-[9px] font-bold text-green-600 uppercase tracking-widest">{target.state}</p>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                )}

                {/* Satellite HUD Overlay */}
                <div className="absolute bottom-10 left-10 z-[400] hidden md:block">
                    <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] shadow-xl max-w-[240px] text-left">
                        <p className="text-[9px] font-black text-green-400 uppercase tracking-widest mb-2">Satellite Scan</p>
                        <p className="text-[12px] text-gray-200 leading-relaxed font-medium italic">
                            Real-time terrain view for <span className="text-white font-bold">{cityName}</span> complete. Signal strength nominal.
                        </p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .green-popup .leaflet-popup-content-wrapper {
                    background: #1a1c1e !important;
                    color: white !important;
                    border: 2px solid #22c55e;
                    border-radius: 12px;
                }
                .green-popup .leaflet-popup-tip { background: #22c55e; }
                /* Thoda saturation badhaya taaki satellite image real lage */
                .leaflet-container { filter: brightness(0.8) contrast(1.2) saturate(1.1); }
            `}} />
        </div>
    );
};

export default TourMap;