import React, { useState } from "react";
import "./App.css";
import { Geolocation } from "./types/index";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import pattern from "./assets/pattern-bg.png";
import { ReactComponent as Arrow } from "./assets/icon-arrow.svg";

function App() {
  const [position, setPosition] = useState<Geolocation>();
  const [query, setQuery] = useState("");

  const searchLocation = async (e) => {
    e.preventDefault();
    console.log("submitting");

    const url = `https://geo.ipify.org/api/v1?apiKey=at_JLuFr4jNnjSoYLFCG5hxN11jzMNGB&ipAddress=${query}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setPosition(data);
    } catch (err) {
      console.error(err);
    }
  };

  let DEFAULT_LONGITUDE = position?.location.lng;
  let DEFAULT_LATITUDE = position?.location.lat;

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
        <form
          className="text-center flex justify-center items-center"
          onSubmit={searchLocation}
        >
          <input
            type="text"
            name="query"
            placeholder="Search for any IP address or domain"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-2 w-8/12 mb-4 border rounded-tl-xl rounded-bl-xl h-10 outline-none"
          />
          <button
            type="submit"
            className="h-10 w-10 mb-4 bg-black rounded-tr-xl rounded-br-xl focus:outline-none"
          >
            <Arrow className="mx-auto outline-none" />
          </button>
        </form>
        <div>
          {position && (
            <div className="mx-auto space-y-4 text-center rounded-xl w-11/12 p-6  bg-white border m-6 md:text-left lg:p-14 lg:flex flex-row justify-between lg:space-x-6 lg:space-y-0 lg:w-11/12 ">
              <div className="" key={position.location.geonameId}>
                <h3
                  className="font-medium text-xs tracking-wider"
                  style={{ color: "#3F3F3F" }}
                >
                  IP ADDRESS
                </h3>
                <h2 className="mt-3 text-xl font-medium">{position.ip}</h2>
              </div>
              <div className="hidden lg:block lg:border"></div>
              <div>
                <h3
                  className="font-medium text-xs tracking-wider"
                  style={{ color: "#3F3F3F" }}
                >
                  LOCATION
                </h3>
                <h2 className="mt-3 text-xl font-medium">
                  {position.location.city}
                </h2>
              </div>
              <div className="hidden lg:block lg:border"></div>
              <div>
                <h3
                  className="font-medium text-xs tracking-wider"
                  style={{ color: "#3F3F3F" }}
                >
                  TIMEZONE
                </h3>
                <h2 className="mt-3 text-xl font-medium">
                  {position.location.timezone}
                </h2>
              </div>
              <div className="hidden lg:block lg:border"></div>
              <div>
                <h3
                  className="font-medium text-xs tracking-wider"
                  style={{ color: "#3F3F3F" }}
                >
                  ISP
                </h3>
                <h2 className="mt-3 text-xl font-medium">{position.isp}</h2>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className=" relative z-10">
        <MapContainer
          center={[DEFAULT_LONGITUDE, DEFAULT_LATITUDE]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[DEFAULT_LONGITUDE, DEFAULT_LATITUDE]}>
            <Popup>You are here !</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
