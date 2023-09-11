import React from "react";

import "./loader.css";

const Loader = () => {
  return (
    <div className="container-loader">
      <div className="">
       
      <div>
      <svg width="400" height="100" viewBox="0 0 400 100">
          <text x="10" y="50" class="text" id="letterG">L</text>
          <text x="60" y="50" class="text" id="letterO">O</text>
          <text x="60" y="50" class="text" id="letterO"> </text>
          <text x="110" y="50" class="text" id="letterD">S</text>
          <text x="160" y="50" class="text" id="letterI">A</text>
          <text x="210" y="50" class="text" id="letterV">L</text>
          <text x="260" y="50" class="text" id="letterA">O</text>
          <text x="260" y="50" class="text" id="letterA">N</text>
      </svg>
  </div>

      </div>
    </div>
  );
};

export default Loader;
