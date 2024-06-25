import React from "react";

const PhotographerHome = () => {
  return (
    <div>
      <section>
        <div className="photo-container">
          <img
            className="image-photo"
            src="/app-assets/images/gallery/9.jpg"
            alt="img09"
          />
        </div>
        <div className="cover-detail">
          <h1 className="cover-collection-name">30C Tennyson St, Byron Bay</h1>
          <div className="cover-arrow">
            <button className="btn btn-outline-secondary text-white border-white outline-white">
              View Gallery
            </button>
          </div>
        </div>
        <div className="cover-logo-wrapper">
          <a
            className="text-white"
            href="https://www.mediadrive.com.au"
            target="_blank"
            rel="noopener noreferrer"
          >
            MEDIA DRIVE
          </a>
        </div>
      </section>
      <section>
        <div className="">
          <a href="https://mediadrive.pixieset.com/30ctennysonstbyronbay/">
            <h1>30C Tennyson St, Byron Bay</h1>
            <a
              id="business-link"
              href="https://www.mediadrive.com.au"
              target="_blank"
              rel="noopener noreferrer"
            >
              Media Drive
            </a>
          </a>
        </div>
      </section>
    </div>
  );
};

export default PhotographerHome;