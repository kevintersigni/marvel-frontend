import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <button
      className="scrollToTop"
      style={{ display: visible ? "inline" : "none" }}
      onClick={scrollToTop}
    >
      <span>
        <FontAwesomeIcon icon="chevron-up" />
      </span>
    </button>
  );
};

export default ScrollToTop;
