"use client";
import { IProperties } from "@/app/types";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

type MapWrapperProps = {
  properties: IProperties[];
};

function MapWrapper({ properties }: MapWrapperProps) {
  const locations = properties.map((p) => p.coordinates);

  const Map = useMemo(
    () =>
      dynamic(() => import("../index"), {
        ssr: false,
        loading: () => (
          <div className="animate-pulse h-[75vh] rounded-lg bg-neutral-200"></div>
        ), //find a better way to fix flickering
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locations]
  );

  return (
    <Map locations={locations} center={[41, 29]} properties={properties} />
  );
}

export default MapWrapper;
