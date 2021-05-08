import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import querystring from "querystring";
import "./displaydata.css";

let BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100&";
let BASE_URL_UPDATED = "";
export default function DisplayData(props) {
  const [apiData, setApiData] = useState([]);
  const [filters, setFilter] = useState({
    launch_success: null,
    land_success: null,
    launch_year: null,
  });
  const time = [
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
  ];

  const updateFilter = (type, value) => {
    // console.log("inside updatefilter " + type + value);
    if (filters[type] === value) {
      setFilter({
        ...filters,
        [type]: null,
      });
    } else {
      setFilter({
        ...filters,
        [type]: value,
      });
    }
  };
  const renderYear = () =>
    time.map((yr) => (
        // <a href="#" onClick={(e)=>{e.stopPropagation();updateFilter("launch_year", e.target.value)}}>{yr}</a>
        // <Link to="#" onClick={(e)=>updateFilter("launch_year", e.target.value)}></Link>
      <button
        id="b_year"
        value={yr}
        onClick={(e) => updateFilter("launch_year", e.target.value)}
      >
        {yr}
      </button>
    ));

  useEffect(() => {
    //   console.log(filters);
    axios
      .get(BASE_URL)
      .then((res) => {
        // console.log(res);
        setApiData(res.data);
        // window.history.pushState(null,null,'/homepage');
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    BASE_URL_UPDATED = BASE_URL + querystring.stringify({ ...filters });
    axios
      .get(BASE_URL_UPDATED)
      .then((res) => {
        setApiData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filters]);

  return (
      <Fragment>
    <div id="page-head">SpaceX Launch Programs</div>
    <div id="flights">
        
      <aside id="sidebar">
          <div id="title">
      Filters</div>
      <div class="heading">Launch Year</div>
        <div id="year">{renderYear()}</div>
        <div id="launch">
            
          
          <div class="heading">Successful Launch</div>
          <div class="btn">
          <button
            id="launch_success"
            value="true"
            onClick={(e) => updateFilter("launch_success", e.target.value)}
          >
            True
          </button>
          <button
            id="launch_success"
            value="false"
            onClick={(e) => updateFilter("launch_success", e.target.value)}
          >
            False{" "}
          </button>
          </div>
        </div>
        <div id="land">
        <div class="heading">Successful Landing</div>
        <div class="btn">
          <button
            id="land_success"
            value="true"
            onClick={(e) => updateFilter("land_success", e.target.value)}
          >
            True
          </button>
          <button
            id="land_success"
            value="false"
            onClick={(e) => updateFilter("land_success", e.target.value)}
          >
            False
          </button>
          </div>
        </div>
      </aside>
      <div id="apidata">
        {apiData.map((flight) => (
          <div id="flightdata">
              <div id="image">
            <img src={flight.links.mission_patch_small} alt="Picture cannot be displayed LOLWA" />
            </div>
            <div id="flight-data-items">
                <div id="mission-name">{flight.mission_name} #{flight.flight_number}</div>
            <div class="flight-det"><b>Successful Launch : </b>{flight.launch_success ? "True" : "False"} </div>
            <div class="flight-det"><b>Launch Year : </b>{flight.launch_year}</div>
            <div class="flight-det"><b>Launch Site Name : </b>{flight.launch_site.site_name}</div>
            <div class="flight-det"><b>Details : </b>{flight.details === null ? "Not Available" : `${flight.details}`}</div>
            <div class="flight-det"><b>Youtube : </b> <a href={flight.links.video_link}>click here</a></div>
            <div class="flight-det"><b>Successful Landing : </b>{flight.rocket.first_stage.cores[0].land_success ? "True" : "False"}</div>
            
            </div>
          </div>
        ))}
      </div>
    </div>
    </Fragment>
  );
}
