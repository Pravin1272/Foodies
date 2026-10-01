import React, { useRef } from "react";
import { categories } from "../../assets/assets";
import './ExploreMenu.css';

const ExploreMenu = () => {
const menuRef = useRef(null);

const scrollLeft = () => {
  if (menuRef.current) {
    menuRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (menuRef.current) {
    menuRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  }
};
  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1>Explore Our Menu</h1>
          <p>Explore curated lists of dishes from top categories</p>
        </div>

        <div>
          <button
               className="btn btn-light rounded-circle border me-2"
             onClick={scrollLeft}><i className="bi bi-arrow-left"></i>
         </button>

          <button
              className="btn btn-light rounded-circle border"
            onClick={scrollRight}>
           <i className="bi bi-arrow-right"></i>
         </button>
        </div>
      </div>

      <div className="d-flex gap-4 overflow-auto pb-3 explore-menu-list" ref={menuRef}>

        {categories.map((item, index) => (
          <div
            key={index}
            className="text-center flex-shrink-0 explore-menu-list-item"
          >
            <img
              src={item.icon}
              alt={item.category}
              className="rounded-circle"
              width="120"
              height="120"
            />

            <p className="mt-2 fw-bold">{item.category}</p>
          </div>
        ))}

      </div>
      <hr/>
    </div>
  );
};



export default ExploreMenu;