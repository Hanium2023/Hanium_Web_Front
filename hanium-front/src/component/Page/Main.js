import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

const CenteredIframeWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 100px)', // 조정 가능한 높이 값 (헤더 등에 따라 다름)
})

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
    fontSize: '15px',
    whiteSpace: 'pre-line', // This allows newline characters to be displayed
  },
}))

const Main = () => {
  const [applianceNames, setApplianceNames] = useState([])
  const [tvMonitorSwitch, setTvMonitorSwitch] = useState('')
  const [airPurifierSwitch, setAirPurifierSwitch] = useState('')
  const [lightSwitch, setLightSwitch] = useState('')

  useEffect(() => {
    fetchApplianceNames()
    fetchTVMonitorSwitch()
    fetchAirPurifierSwitch()
    fetchLightSwitch()
  }, [])

  const fetchApplianceNames = async () => {
    try {
      const response = await axios.get(
        'https://api.smartthings.com/v1/devices/',
        {
          headers: {
            Authorization: 'Bearer 1c347acf-6ddb-437a-b020-fcd3cdedad89',
          },
        },
      )
      const items = response.data.items
      const names = items.map((item) => item.name)
      setApplianceNames(names)
    } catch (error) {
      console.error('Error fetching appliance names:', error)
    }
  }

  const fetchTVMonitorSwitch = async () => {
    try {
      const response = await axios.get(
        'https://api.smartthings.com/v1/devices/d4cf4e04-7edf-f983-36bf-0c7ae155cf24/components/main/capabilities/switch/status',
        {
          headers: {
            Authorization: 'Bearer 1c347acf-6ddb-437a-b020-fcd3cdedad89',
          },
        },
      )
      setTvMonitorSwitch(response.data.switch.value)
    } catch (error) {
      console.error('Error fetching TV monitor Switch:', error)
    }
  }

  const fetchAirPurifierSwitch = async () => {
    try {
      const response = await axios.get(
        'https://api.smartthings.com/v1/devices/844c4982-96a7-fb10-5e40-65f60aee9e9d/components/main/capabilities/switch/status',
        {
          headers: {
            Authorization: 'Bearer 1c347acf-6ddb-437a-b020-fcd3cdedad89',
          },
        },
      )
      setAirPurifierSwitch(response.data.switch.value)
    } catch (error) {
      console.error('Error fetching air purifier Switch:', error)
    }
  }

  const fetchLightSwitch = async () => {
    try {
      const response = await axios.get(
        'https://api.smartthings.com/v1/devices/3d46cf54-fb97-4649-ac80-336e883ed5a7/components/main/capabilities/switch/status',
        {
          headers: {
            Authorization: 'Bearer 1c347acf-6ddb-437a-b020-fcd3cdedad89',
          },
        },
      )
      setLightSwitch(response.data.switch.value)
    } catch (error) {
      console.error('Error fetching Light Switch:', error)
    }
  }

  return (
    <div>
      <div>
        <h1>우리집 확인</h1>
        <CenteredIframeWrapper>
          <iframe
            src="https://my.matterport.com/show/?m=ZyhyYKeWXTk"
            frameBorder="0"
            allowFullScreen
            allow="xr-spatial-tracking"
            style={{
              width: '90%',
              height: '90%',
            }}
          ></iframe>
        </CenteredIframeWrapper>
      </div>
      <h2>제어할 수 있는 가전</h2>
      <div
        style={{
          display: 'flex',
          maxWidth: '95%',
          justifyContent: 'Left',
          alignItems: 'center',
        }}
      >
        {applianceNames.map((name) => {
          let displayName
          if (name === 'Samsung M5 (27)') {
            displayName = '모니터'
          } else if (name === '[air purifier] Samsung') {
            displayName = '공기청정기'
          } else if (name === 'hue-rgbw-color-bulb') {
            displayName = '조명'
          } else {
            displayName = name
          }

          return (
            <TooltipCustom
              arrow
              placement="top"
              title={
                displayName === '모니터'
                  ? '작동 여부: ' + tvMonitorSwitch + '\n가전 정보: ' + name
                  : displayName === '공기청정기'
                  ? '작동 여부: ' + airPurifierSwitch + '\n가전 정보: ' + name
                  : displayName === '조명'
                  ? '작동여부: ' + lightSwitch + '\n가전 정보: ' + name
                  : ''
              }
              key={name}
            >
              <Box
                sx={{
                  flex: '0 0 20%', // Set to 100% to make it fluid
                  height: '100px',
                  margin: '10px',
                  borderRadius: '10px',
                  backgroundColor: 'lightgray',
                  '&:hover': {
                    backgroundColor: 'lightgray',
                    opacity: [0.9, 0.8, 0.7],
                    borderRadius: '10px',
                  },
                }}
              >
                <h2
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50%',
                  }}
                >
                  {displayName}
                </h2>
              </Box>
            </TooltipCustom>
          )
        })}
      </div>
    </div>
  )
}

export default Main
