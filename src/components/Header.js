import React from "react";
import { Link } from "react-router-dom";

import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <div className="item">
        <h3>
          <Link to="/">Classtime</Link>
        </h3>
      </div>

      <div className="right menu">
        <div className="item">
          <Link to="/">All Streams</Link>
        </div>

        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
