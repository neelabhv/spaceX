import React from 'react';
import loader from './loader.gif';

export default function Loading(){
    return(
        <div id="spinner">
            {/* Loading........... */}
            <img src={loader} alt="loading..."/>
        </div>
    )
}