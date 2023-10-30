import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { setupSdk } from "@matterport/sdk";
import Box from "@mui/material/Box";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const CenteredIframeWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 300px)", // 조정 가능한 높이 값 (헤더 등에 따라 다름)
});

const TooltipCustom = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.gray,
    maxWidth: 400,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.gray,
    maxWidth: 400,
    fontSize: "15px",
    whiteSpace: "pre-line", // This allows newline characters to be displayed
  },
}));

const Main = () => {
  const [applianceNames, setApplianceNames] = useState([]);
  const [tvMonitorSwitch, setTvMonitorSwitch] = useState("");
  const [airPurifierSwitch, setAirPurifierSwitch] = useState("");
  const [lightSwitch, setLightSwitch] = useState("");
  const [sdk, setSdk] = useState();
  const container = useRef(null);
  let started = false;

  useEffect(() => {
    if (!started && container.current) {
      started = true;

      // Check if an iframe already exists and remove it if needed
      if (container.current.querySelector("iframe")) {
        container.current.querySelector("iframe").remove();
      }

      setupSdk("62nt8kue4c705sg9f0bmgs18b", {
        container: container.current,
        space: "yaAEyWtaRdt",
        iframeQueryParams: { qs: 1 },
      }).then((initializedSdk) => {
        setSdk(initializedSdk);
      });
    }
  }, []);

  const addMultipleMattertags = () => {
    // Define an array of Mattertag descriptors
    const mattertags = [
      {
        label: "조명",
        description: "작동 여부: " + lightSwitch,
        anchorPosition: { x: 0, y: 0.9, z: 1.3 },
        stemVector: { x: 0, y: 0.9, z: 1.3 },
      },
      {
        label: "공기청정기",
        description: "작동 여부: " + airPurifierSwitch,
        anchorPosition: { x: 0.8, y: 0.4, z: 1 },
        stemVector: { x: 0.8, y: 0.4, z: 1 },
      },
      {
        label: "모니터",
        description: "작동 여부: " + tvMonitorSwitch,
        anchorPosition: { x: -1.3, y: 0.9, z: -0.7 },
        stemVector: { x: -1.3, y: 0.9, z: -0.7 },
      },
    ];

    // Add multiple Mattertags
    sdk?.Mattertag.add(mattertags).then((mattertagIds) => {
      console.log("Multiple Mattertags added with IDs:", mattertagIds);
    });
  };

  useEffect(() => {
    fetchApplianceNames();
    fetchTVMonitorSwitch();
    fetchAirPurifierSwitch();
    fetchLightSwitch();
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

  const fetchTVMonitorSwitch = async () => {
    try {
      const response = await axios.get(
        "https://api.smartthings.com/v1/devices/d4cf4e04-7edf-f983-36bf-0c7ae155cf24/components/main/capabilities/switch/status",
        {
          headers: {
            Authorization: "Bearer 1c347acf-6ddb-437a-b020-fcd3cdedad89",
          },
        }
      );
      setTvMonitorSwitch(response.data.switch.value);
    } catch (error) {
      console.error("Error fetching TV monitor Switch:", error);
    }
  };

  const fetchAirPurifierSwitch = async () => {
    try {
      const response = await axios.get(
        "https://api.smartthings.com/v1/devices/844c4982-96a7-fb10-5e40-65f60aee9e9d/components/main/capabilities/switch/status",
        {
          headers: {
            Authorization: "Bearer 1c347acf-6ddb-437a-b020-fcd3cdedad89",
          },
        }
      );
      setAirPurifierSwitch(response.data.switch.value);
    } catch (error) {
      console.error("Error fetching air purifier Switch:", error);
    }
  };

  const fetchLightSwitch = async () => {
    try {
      const response = await axios.get(
        "https://api.smartthings.com/v1/devices/b2cdff25-4a9b-4861-9895-dcca2b3194cd/components/main/capabilities/switch/status",
        {
          headers: {
            Authorization: "Bearer 1c347acf-6ddb-437a-b020-fcd3cdedad89",
          },
        }
      );
      setLightSwitch(response.data.switch.value);
    } catch (error) {
      console.error("Error fetching Light Switch:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>
          우리집 확인{" "}
          <button
            style={{
              background: "#ffffff",
              borderRadius: "5px",
              borderColor: "transparent",
              color: "#000000",
              padding: "5px",
            }}
            onClick={addMultipleMattertags}
            // 호버 스타일을 정의합니다.
            onMouseEnter={(e) => {
              e.target.style.background = "#cccccc"; // 호버 시 배경색 변경
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#ffffff"; // 호버 해제 시 원래 배경색 복원
            }}
          >
            연동하기
          </button>{" "}
        </h1>

        <CenteredIframeWrapper>
          <div
            className="container"
            ref={container}
            style={{ width: "80%", height: "600px", marginTop: "-5px" }}
          ></div>
        </CenteredIframeWrapper>
      </div>
      <h2>제어할 수 있는 가전</h2>
      <div
        style={{
          display: "flex",
          maxWidth: "95%",
          justifyContent: "Left",
          alignItems: "center",
        }}
      >
        {applianceNames.map((name) => {
          let displayName;
          if (name === "Samsung M5 (27)") {
            displayName = "Samsung M5 모니터";
          } else if (name === "[air purifier] Samsung") {
            displayName = "Samsung 공기청정기";
          } else if (name === "hue-rgbw-color-bulb") {
            displayName = "Philips Hue 조명";
          }

          return (
            <TooltipCustom
              arrow
              placement="top"
              title={
                displayName === "Samsung M5 모니터"
                  ? "작동 여부: " + tvMonitorSwitch + "\n가전 정보: " + name
                  : displayName === "Samsung 공기청정기"
                  ? "작동 여부: " + "off" + "\n가전 정보: " + name
                  : displayName === "Philips Hue 조명"
                  ? "작동여부: " + "on" + "\n가전 정보: " + name
                  : ""
              }
              key={name}
            >
              <Box
                sx={{
                  flex: "0 0 18%",
                  height: "100px",
                  margin: "-10px 0 10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "lightgray",
                  "&:hover": {
                    borderRadius: "10px",
                  },
                  "&.samsung-monitor": {
                    backgroundImage: 'url("path_to_monitor_image.jpg")',
                    backgroundSize: "cover", // 이미지 크기 조절
                    display: "block", // 블록 요소로 표시
                    backgroundColor: "rgb(135, 206, 235)",
                  },
                  "&.samsung-air-purifier": {
                    backgroundImage: 'url("../image/air.jpg")',
                    backgroundSize: "cover", // 이미지 크기 조절
                    display: "block", // 블록 요소로 표시
                    backgroundColor: "rgb(105, 210, 265)",
                  },
                  "&.philips-light": {
                    backgroundImage: 'url("path_to_light_image.jpg")',
                    backgroundSize: "cover", // 이미지 크기 조절
                    display: "block", // 블록 요소로 표시
                    backgroundColor: "rgb(105, 170, 265)",
                  },
                }}
                className={`${
                  displayName === "Samsung M5 모니터"
                    ? "samsung-monitor"
                    : displayName === "Samsung 공기청정기"
                    ? "samsung-air-purifier"
                    : displayName === "Philips Hue 조명"
                    ? "philips-light"
                    : ""
                }`}
              >
                <h2
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50%",
                  }}
                >
                  {displayName}
                </h2>
              </Box>
            </TooltipCustom>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
