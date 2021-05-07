import "./App.css";
import React, { Suspense } from 'react';
// import DisplayData from "./DisplayData";
import Loading from './Loading';
const DisplayData = React.lazy(() => import("./DisplayData.js"));

function App() {
  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <DisplayData />
      </Suspense>
    </div>
  );
}

export default App;
