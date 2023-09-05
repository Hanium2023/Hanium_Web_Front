import { useEffect, useRef, useState } from "react";
import { MpSdk, setupSdk } from "@matterport/sdk";

function Setting() {
  const [sdk, setSdk] = useState();
  const [horizontal, setHorizontal] = useState(45);
  const [vertical, setVertical] = useState(45);
  const container = useRef(null);
  let started = false;

  useEffect(() => {
    if (!started && container.current) {
      started = true;
      setupSdk("t1r8p52kww4wn9i5ngke58zcb", {
        container: container.current,
        space: "j4RZx7ZGM6T",
        iframeQueryParams: { qs: 1 },
      }).then(setSdk);
    }
  }, []);

  const rotate = () => {
    sdk?.Camera.rotate(horizontal, vertical);
  };

  return (
    <div className="Setting">
      <div className="container" ref={container}></div>

      <div className="button-wrap">
        <label>
          <span>Horizontal rotation</span>
          <input
            type="number"
            onInput={(evt) => setHorizontal(parseFloat(evt.target.value))}
            value={horizontal}
          />
        </label>
        <label>
          <span>Vertical rotation</span>
          <input
            type="number"
            onInput={(evt) => setVertical(parseFloat(evt.target.value))}
            value={vertical}
          />
        </label>
        <button onClick={rotate}>Rotate</button>
      </div>
    </div>
  );
}

export default Setting;
