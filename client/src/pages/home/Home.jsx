import React, { useRef, useState } from "react";
import Header from "../../components/header/Header";
import useClickOutside from "../../hooks/useClickOutside";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const divRef = useRef();
  useClickOutside(divRef, () => setVisible(false));
  return (
    <div>
      <Header />
      {visible && (
        <div
          ref={divRef}
          style={{ height: "250px", width: "250px", background: "red" }}
        ></div>
      )}
    </div>
  );
};

export default Home;
