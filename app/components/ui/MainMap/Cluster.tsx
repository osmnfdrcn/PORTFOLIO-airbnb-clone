"use client";
import { useCallback, useEffect, useState } from "react";
import { useMap, Marker } from "react-leaflet";
import L from "leaflet";
import useSupercluster from "use-supercluster";
import "./Cluster.css";
import { IProperties } from "@/app/types";

const icons: { [key: number]: L.DivIcon } = {};
const fetchIcon = (count: number, size: number) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count];
};

const markers = new L.Icon({
  iconUrl: "/images/marker.svg",
  iconSize: [20, 20],
});

type Props = {
  locations?: any;
  properties: any;
};

const Cluster = ({ locations, properties }: Props) => {
  const [bounds, setBounds] = useState<any>();
  const [zoom, setZoom] = useState(12);
  const map = useMap();

  // get map bounds
  function updateMap() {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }

  const onMove = useCallback(() => {
    updateMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    updateMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    updateMap();
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  const points = properties.map((p: IProperties) => ({
    type: "Feature",
    properties: { cluster: false, propertyId: p.id, category: "airbnb" },
    geometry: {
      type: "Point",
      coordinates: p.coordinates,
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: map.getZoom(),
    options: { radius: 50, maxZoom: 15 },
  });

  return (
    <>
      {clusters.map((cluster, idx) => {
        const [latitude, longitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    12
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        return (
          <Marker
            key={`cluster-${idx}`}
            position={[latitude, longitude]}
            icon={L.icon({
              iconUrl: "/images/marker2.svg",
              iconSize: [28, 28],
              iconAnchor: [14, 14],
            })}
          />
        );
      })}
    </>
  );
};

export default Cluster;
