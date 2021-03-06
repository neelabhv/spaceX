import React, { useState, useEffect, Fragment, Suspense } from "react";
import axios from "axios";
import "./displaydata.css";
import querystring from "querystring";
// import Cards from './Cards';
import Loading from "./Loading";
const Cards = React.lazy(() => import("./Cards.js"));


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
       <button
        id="b_year"
        value={yr}
        onClick={(e) => updateFilter("launch_year", e.target.value)}
      >
        {yr}
      </button>
    ));

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => {
        setApiData(res.data);
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
      <div className="heading">Launch Year</div>
        <div id="year">{renderYear()}</div>
        <div id="launch">
          <div className="heading">Successful Launch</div>
          <div className="btn">
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
        <div className="heading">Successful Landing</div>
        <div className="btn">
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
          <div id="flightdata" key={flight.id}>
              <Suspense fallback={<Loading/>}>
                <Cards flight={flight}/>
              </Suspense>
          </div>
        ))}
      </div>
    </div>
    </Fragment>
  );
}
