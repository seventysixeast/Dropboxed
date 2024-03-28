import React from "react";


const Footer = () => {
  return (
    <footer className="footer footer-static footer-light navbar-border">
      <p className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
        <span className="float-md-left d-block d-md-inline-block">
          Copyright &copy; 2024{" "}
          <a
            className="text-bold-800 grey darken-2"
            href="/dashboard"
            target="_blank"
          >
            DROPBOXED{" "}
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
