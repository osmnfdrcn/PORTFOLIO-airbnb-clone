"use client";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map = ({ center }: MapProps) => {
  return (
    <MapContainer
      center={center as L.LatLngExpression}
      zoom={center ? 7 : 2}
      scrollWheelZoom={false}
      className="h-[45vh] rounded-lg"
    >
      <TileLayer url={url} attribution={attribution} />
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;

// "use client";
// import L from "leaflet";
// import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import { IProperties } from "@/app/types";
// import { v4 as uuidv4 } from "uuid";
// import Image from "next/image";
// // @ts-ignore
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
// });

// interface MapProps {
//   center?: number[];
//   properties?: IProperties[];
// }

// const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// const attribution =
//   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// const Map = ({ center, properties }: MapProps) => {
//   return (
//     <MapContainer
//       center={center as L.LatLngExpression}
//       // zoom={center ? 7 : 2}
//       zoom={3}
//       scrollWheelZoom={false}
//       className="h-[100%] rounded-lg"
//     >
//       <TileLayer url={url} attribution={attribution} />
//       {center ? <Marker position={center as L.LatLngExpression} /> : null}
//       {properties?.map((p) => (
//         <>
//           <Marker key={uuidv4()} position={p.coordinates as L.LatLngExpression}>
//             <Popup>
//               <Image src={p.imageSrc[0]} alt={""} width={400} height={400} />
//             </Popup>
//           </Marker>
//         </>
//       ))}
//     </MapContainer>
//   );
// };

// export default Map;
