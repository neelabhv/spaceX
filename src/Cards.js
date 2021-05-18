import React, { useState } from 'react';
import './displaydata.css';

export default function Cards({flight}){
    const [readmore, setReadmore]=useState(false);
    const {flight_number, mission_name, launch_success, launch_year, details} = flight;
    const site_name = flight.launch_site.site_name;
    const land_success = flight.rocket.first_stage.cores[0].land_success;
    const video_link = flight.links.video_link;

    return(
        <div>
            <div id="image">
            <img src={flight.links.mission_patch_small} alt="Image cannot be displayed" />
            </div>
            <div id="flight-data-items">
                <div id="mission-name">{mission_name} #{flight_number}</div>
            <div className="flight-det"><b>Successful Launch : </b>{launch_success ? "True" : "False"} </div>
            <div className="flight-det"><b>Launch Year : </b>{launch_year}</div>
            <div className="flight-det"><b>Launch Site Name : </b>{site_name}</div> 
            <div className="flight-det"><b>Details : </b>
                {details!==null ? 
                    <div class="expand-div">
                    {readmore===false ? `${details}`.substring(0,20) : `${details}`}
                    <button class="expand" onClick={(e)=>setReadmore(!readmore)}>{readmore? 'read less':'read more'}
                    </button>
                    </div> : "Not Available"
                }
            </div>
            <div class="flight-det"><b>Youtube : </b> <a href={video_link}>click here</a></div>
            <div class="flight-det"><b>Successful Landing : </b>{land_success ? "True" : "False"}</div>
            
            </div>
        </div>
    )
}