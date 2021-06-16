import React, { useState, useEffect } from "react";
import "./App.css";
import { Geolocation } from "./types/index";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import pattern from "./assets/pattern-bg.png";
import { ReactComponent as Arrow } from "./assets/icon-arrow.svg";

function App() {
  const [positions, setPositions] = useState<Geolocation[]>([]);

  const url =
    "https://geo.ipify.org/api/v1?apiKey=at_JLuFr4jNnjSoYLFCG5hxN11jzMNGB&ipAddress=41.224.222.185";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data: Geolocation[]) => setPositions(data));
  }, [url]);

  console.log(positions);

  return (
    <div className="">
      <img
        src={pattern}
        alt=""
        className="static z-20 h-1/3 md:h-2/3 object-cover md:w-full"
      />
      <div className="mx-auto z-50 absolute top-12 left-0 right-0 w-8/12">
        <h2 className="text-center text-lg font-medium mb-3 text-white">
          IP Address Tracker
        </h2>
        <div className="text-center flex justify-center items-center">
          <input
            type="search"
            placeholder="Search for any IP address or domain"
            className="pl-2 w-8/12 border rounded-tl-xl rounded-bl-xl h-10 outline-none"
          />
          <button
            type="submit"
            className="h-10 w-10 bg-black rounded-tr-xl rounded-br-xl focus:outline-none"
          >
            <Arrow className="mx-auto outline-none" />
          </button>
        </div>
        {positions.map((place) => {
          return (
            <div className="mx-auto text-center rounded-xl w-11/12 bg-white border m-6 lg:flex flex-row justify-between lg:w-8/12 p-6">
              <div className="" key={place.location.geonameId}>
                <h3 className="font-bold text-xs">IP ADDRESS</h3>
                <h2>{place.ip}</h2>
              </div>
              <div>
                <h3 className="font-bold text-xs">LOCATION</h3>
                <h2>{place.location.city}</h2>
              </div>
              <div>
                <h3 className="font-bold text-xs">TIMEZONE</h3>
                <h2>{place.location.timezone}</h2>
              </div>
              <div>
                <h3 className="font-bold text-xs">ISP</h3>
                <h2>{place.isp}</h2>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" relative z-10">
        <MapContainer
          center={[36.81897, 10.16579]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[36.81897, 10.16579]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        ,
      </div>
    </div>
  );
}

export default App;
