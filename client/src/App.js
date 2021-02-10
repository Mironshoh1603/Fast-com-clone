import { useState, useRef, useEffect } from "react";
import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { getRequest } from "./utils/apiRequests";
import { BASE_URL, GET_INTERNET_SPEED } from "./utils/apiEndpoints";
import CountUp from "react-countup";

function App() {
  const [error, setError] = useState(null);
  const [speed, setSpeed] = useState(null);
  let startMethod = useRef(null);
  useEffect(() => {
    getInternetSpeed();
  }, []);

  const getInternetSpeed = async () => {
    const response = await getRequest(`${BASE_URL}${GET_INTERNET_SPEED}`);
    if (response.error) {
      setError(response.error);
      return false;
    }
    setSpeed(response.speed);
    startMethod();
  };

  return (
    <div className="App">
      <div className="logo">
        <img src="https://fast.com/assets/new-logo-vert-37861c.svg" />
      </div>
      <div className="body">
        <h3 className="heading">Your Internet speed is</h3>
        <div className="top-section">
          <CountUp
            start={speed ? speed - 50 : 0}
            end={speed ? speed : 0}
            duration={5}
            onEnd={() => console.log("end")}
            onStart={() => console.log("start")}
          >
            {({ countUpRef, start }) => {
              startMethod = start;
              return (
                <>
                  <div className="left">
                    <div className="speed-count" ref={countUpRef} />
                  </div>
                  <div className="right">
                    <div className="speed-measure">Mbps</div>
                    <div
                      className="reload"
                      onClick={() => getInternetSpeed(start)}
                    >
                      <FontAwesomeIcon
                        icon={faRedoAlt}
                        className="icon-block"
                      />
                    </div>
                  </div>
                </>
              );
            }}
          </CountUp>
        </div>
      </div>
      <div className="footer">
        <button className="showmore-btn">Show more info</button>
        <div className="social-icon">
          <div className="icon-container">
            <FontAwesomeIcon className="icon-block" icon={faQuestion} />
          </div>
          <div className="icon-container">
            <FontAwesomeIcon className="icon-block" icon={faTwitter} />
          </div>
          <div className="icon-container">
            <FontAwesomeIcon className="icon-block" icon={faFacebookF} />
          </div>
        </div>
        <div className="small-logo">
          <img src="https://fast.com/assets/poweredby-865a3b.svg" />
        </div>
      </div>
    </div>
  );
}

export default App;
