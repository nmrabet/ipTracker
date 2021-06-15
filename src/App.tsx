import React, { useEffect } from "react";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import pattern from "./assets/pattern-bg.png";
import { ReactComponent as Arrow } from "./assets/icon-arrow.svg";

function App() {
  const url =
    "https://geo.ipify.org/api/v1?apiKey=at_JLuFr4jNnjSoYLFCG5hxN11jzMNGB&ipAddress=41.224.222.185";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="">
      <img
        src={pattern}
        alt=""
        className="static z-20 h-1/3 object-cover md:w-full"
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
        <div className="mx-auto text-center rounded-xl w-11/12 bg-white border m-6 lg:flex flex-row justify-between lg:w-8/12 p-6">
          <div className="">
            <h3 className="font-bold text-xs">IP ADDRESS</h3>
          </div>
          <div>
            <h3 className="font-bold text-xs">LOCATION</h3>
          </div>
          <div>
            <h3 className="font-bold text-xs">TIMEZONE</h3>
          </div>
          <div>
            <h3 className="font-bold text-xs">ISP</h3>
          </div>
        </div>
      </div>
      <div className=' relative z-10'>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "95vh", width: "100vw", overflow: "hidden" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
