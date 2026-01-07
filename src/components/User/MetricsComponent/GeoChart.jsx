import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { useApiContext } from "../../../contexts/APIcontext.jsx";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


export const GeoChart = () => {
  const { filteredSearchInput, loading } = useApiContext();
  const [markers, setMarkers] = useState([]);

  // Build markers safely, handling missing data
  useEffect(() => {
    const arr = filteredSearchInput
      .filter(item => item.reclong && item.reclat) // ensure coordinates exist
      .map(item => ({
        name: item.name || "Unknown",
        recclass: item.recclass || "Unknown",
        mass: item.mass || "Unknown",
        year: item.year ? new Date(item.year).getFullYear() : "Unknown",
        coordinates: [parseFloat(item.reclong), parseFloat(item.reclat)],
      }));

    setMarkers(arr);
  }, [filteredSearchInput]);

  return (
    <>
      {!loading && (
        <div>
          <ComposableMap>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} />
                ))
              }
            </Geographies>

            {markers.map(({ name, recclass, mass, year, coordinates }) => (
              <Marker
                key={`${name}-${coordinates[0]}-${coordinates[1]}`}
                coordinates={coordinates}
                className="my-anchor-element"
                data-tooltip-html={`
                  Name: <b>${name}</b><br/>
                  Reclass: <b>${recclass}</b><br/>
                  Mass: <b>${mass}</b><br/>
                  Year: <b>${year}</b>
                `}
              >
                <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
              </Marker>
            ))}
          </ComposableMap>

          <Tooltip anchorSelect=".my-anchor-element" place="top" />
        </div>
      )}
    </>
  );
};
