import React, { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [applianceNames, setApplianceNames] = useState([]);

  useEffect(() => {
    fetchApplianceNames();
  }, []);

  const fetchApplianceNames = async () => {
    try {
      const response = await axios.get(
        "https://api.smartthings.com/v1/devices/",
        {
          headers: {
            Authorization: "Bearer 1c347acf-6ddb-437a-b020-fcd3cdedad89",
          },
        }
      );
      const items = response.data.items;
      const names = items.map((item) => item.name);
      setApplianceNames(names);
    } catch (error) {
      console.error("Error fetching appliance names:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>우리집 확인</h1>
        {/* The rest of the component remains unchanged */}
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
          }}
        >
          <iframe
            src="https://my.matterport.com/show/?m=ZyhyYKeWXTk"
            frameBorder="0"
            allowFullScreen
            allow="xr-spatial-tracking"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
      </div>
      <div>
        <h2>제어할 수 있는 가전 제품 정보</h2>
        <ul style={{ display: "flex", padding: 0, marginLeft: 20 }}>
          {/* Map over the applianceNames and render them as list items */}
          {applianceNames.map((name) => (
            <li key={name} style={{ marginRight: "3rem" }}>
              <h3>{name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
