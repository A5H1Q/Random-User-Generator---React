import "./App.css";
import React, {useState, useEffect} from "react";
// Importing Icons
import {ReactComponent as Mail} from "./mail.svg";
import {ReactComponent as Gps} from "./gps.svg";
import {ReactComponent as Tel} from "./tel.svg";
import {ReactComponent as Luv} from "./luv.svg";
import {ReactComponent as LightBtn} from "./bright.svg";
import {ReactComponent as DarkBtn} from "./dark.svg";

const Loader = ({w}) => <div className={`loadBar w-${w}`}></div>; // Placeholder Loading-Bar

function App() {
 // Placeholder Data
 const placeHolder = {
  results: [
   {
    name: {
     title: <Loader w="1" />,
     first: "",
     last: "",
    },
    location: {
     city: <Loader w="3" />,
     country: "",
    },
    email: <Loader w="5" />,
    login: {
     username: "loading..",
     password: <Loader w="2" />,
    },
    dob: {
     age: 21,
    },
    phone: <Loader w="4" />,
    picture: {
     medium: "./spinner.gif",
     thumbnail: "repeating-linear-gradient(45deg, transparent, transparent 12px, var(--bg) 12px, var(--bg) 24px)",
    },
   },
  ],
 };

 const [data, setData] = useState([placeHolder, "Just A Sec.."]); // API data
 const [darkMode, setMode] = useState(true); // Toggle Darkmode

 useEffect(() => {
  fetchApi();
 }, []);

 const applyLight = (x) => {
  setMode(x);
  var root = document.querySelector(":root");
  if (x) {
   root.style.setProperty("--bg", "#202020");
   root.style.setProperty("--txt", "#fff");
   root.style.setProperty("--card", "#404040");
   root.style.setProperty("--btn", "#101010");
   root.style.setProperty("--shadow", "#161616");
  } else {
   root.style.setProperty("--bg", "#ccc");
   root.style.setProperty("--txt", "#000");
   root.style.setProperty("--card", "#fff");
   root.style.setProperty("--btn", "#006d02");
   root.style.setProperty("--shadow", "#9f9f9f");
  }
 };

 // Request Method
 async function fetchApi() {
  setData([placeHolder, "Just A Sec.."]);
  var response = await fetch("https://api.randomuser.me");
  var data = await response.json();
  data.results[0].picture.thumbnail = "url(" + data.results[0].picture.thumbnail + ")";
  setData([data, "Next User"]);
 }

 return (
  <div className="App">
   {darkMode ? (
    <LightBtn
     onClick={() => {
      applyLight(false);
     }}
    />
   ) : (
    <DarkBtn
     onClick={() => {
      applyLight(true);
     }}
    />
   )}
   <div className="cover" style={{background: data[0].results[0].picture.thumbnail}}></div>
   <img className="dp" src={data[0].results[0].picture.medium} alt="Profile pic" />
   <h4>
    {data[0].results[0].name.title} {data[0].results[0].name.first} {data[0].results[0].name.last}
    <span>@{data[0].results[0].login.username}</span>
   </h4>
   <ul>
    <li>
     <Luv /> {data[0].results[0].login.password}
    </li>
    <li>
     <Gps />
     {data[0].results[0].location.city} {data[0].results[0].location.country}
    </li>
    <li>
     <Tel />
     {data[0].results[0].phone}
    </li>
    <li>
     <Mail />
     {data[0].results[0].email}
    </li>
   </ul>
   <button onClick={fetchApi}>{data[1]}</button>
  </div>
 );
}

export default App;
