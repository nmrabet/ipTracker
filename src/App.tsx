import React, { useState, useEffect } from "react";
import "./App.css";
import { Geolocation } from "./types/index";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import pattern from "./assets/pattern-bg.png";
import { ReactComponent as Arrow } from "./assets/icon-arrow.svg";

function App() {
  const [position, setPosition] = useState<Geolocation | null>();

  const url =
    "https://geo.ipify.org/api/v1?apiKey=at_JLuFr4jNnjSoYLFCG5hxN11jzMNGB&ipAddress=41.224.222.185";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data: Geolocation) => setPosition(data))
      .then((err) => console.error(err));
  }, []);

  console.log(position);

  return (
    <div>
      <img
        src={pattern}
        alt=""
        className="static z-20 h-1/3 md:h-2/3 object-cover md:w-full"
      />
      <div className="mx-auto z-50 absolute top-12 left-0 right-0 w-8/12">
        <h2 className="text-center text-2xl font-medium mb-5 text-white">
          IP Address Tracker
        </h2>
        <div className="text-center flex justify-center items-center ">
          <input
            type="search"
            placeholder="Search for any IP address or domain"
            className="pl-2 w-8/12 mb-4 border rounded-tl-xl rounded-bl-xl h-10 outline-none"
          />
          <button
            type="submit"
            className="h-10 w-10 bg-black rounded-tr-xl rounded-br-xl focus:outline-none"
          >
            <Arrow className="mx-auto outline-none" />
          </button>
        </div>

        {position && (
          <div className="mx-auto space-y-4 text-left rounded-xl w-11/12 bg-white border m-6 lg:flex flex-row justify-between lg:space-y-0 lg:w-11/12 p-14">
            <div className="" key={position.location.geonameId}>
              <h3 className="font-medium text-xs tracking-wide">IP ADDRESS</h3>
              <h2 className="mt-3 text-xl font-medium">{position.ip}</h2>
            </div>
            <div className="hidden lg:block lg:border"></div>
            <div>
              <h3 className="font-medium text-xs tracking-wide">LOCATION</h3>
              <h2 className="mt-3 text-xl font-medium">
                {position.location.city}
              </h2>
            </div>
            <div className="hidden lg:block lg:border"></div>
            <div>
              <h3 className="font-medium text-xs tracking-wide">TIMEZONE</h3>
              <h2 className="mt-3 text-xl font-medium">
                {position.location.timezone}
              </h2>
            </div>
            <div className="hidden lg:block lg:border"></div>
            <div>
              <h3 className="font-medium text-xs tracking-wide">ISP</h3>
              <h2 className="mt-3 text-xl font-medium">{position.isp}</h2>
            </div>
          </div>
        )}
      </div>

      <div className=" relative z-10">
        <MapContainer
          center={[36.81897, 10.16579]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100vh" }}
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
