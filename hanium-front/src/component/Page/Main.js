import React from "react";

const Main = () => {
  return (
    <div>
      <div>
        <h1>우리집 확인</h1>
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
          <li style={{ marginRight: "3rem" }}>
            <h3>공기청정기</h3>
          </li>
          <li style={{ marginRight: "3rem" }}>
            <h3>조명</h3>
          </li>
          <li>
            <h3>모니터</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Main;
