"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { IProperties } from "@/app/types";
import { content, title, description, price } from "./popupStyles";
import "./Cluster.css";

interface MapProps {
  center?: number[];
  locations?: number[][];
  properties?: IProperties[];
}

const marker = new L.Icon({
  iconUrl: "/images/marker.svg",
  iconSize: [20, 20],
});

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map = ({ center, locations, properties }: MapProps) => {
  const router = useRouter();
  const locs = properties?.map((p) => ({
    coordinates: p.coordinates,
    price: p.price,
    propertyId: p.id,
    image: p.imageSrc[0],
    title: p.title,
    description: p.description,
  }));

  const style = {
    width: "25px",
    height: "25px",
  };

  const onClick = (id: any) => router.push("properties/" + id);

  return (
    <MapContainer
      center={center as L.LatLngExpression}
      zoom={center ? 5 : 7}
      scrollWheelZoom={false}
      className="h-full rounded-lg"
    >
      <TileLayer url={url} attribution={attribution} />

      {locs?.map((l) => (
        <Marker
          position={l.coordinates as L.LatLngExpression}
          icon={L.divIcon({
            html: `<div class="cluster-marker" style=${style} >
              $${l.price}
            </div>`,
          })}
          key={uuidv4()}
        >
          <Popup className="request-popup">
            <div
              className="cursor-pointer flex flex-col items-center justify-center gap-1 "
              style={content as any}
              onClick={() => onClick(l.propertyId)}
            >
              <div style={title}>{l.title}</div>
              <div className="text-justify" style={description}>
                {l.description}
              </div>
              <div style={price}>${l.price}</div>
            </div>
          </Popup>
        </Marker>
      ))}
      {/* <Cluster properties={properties as any} locations={undefined} /> */}
    </MapContainer>
  );
};

export default Map;
