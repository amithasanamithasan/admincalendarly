import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSearchParams } from "react-router-dom";

const Videocall = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const containerRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    const appID = Number(import.meta.env.VITE_ZEGO_CLOUD_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_CLOUD_SECRET;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "User"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: containerRef.current,
      scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
    });
  }, [roomId]);

  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}></div>
  );
};

export default Videocall;

// import React, { useEffect } from "react";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// const Videocall = () => {
//   const myMeeting = async (element) => {
//     const appID = parseInt(import.meta.env.VITE_ZEGO_CLOUD_ID);
//     const serverSecret = import.meta.env.VITE_ZEGO_CLOUD_SECRET;

//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       "room1",
//       Date.now().toString(),
//       "Amit"
//     );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp.joinRoom({
//       container: element,
//       scenario: {
//         mode: ZegoUIKitPrebuilt.GroupCall,
//       },
//     });
//   };

//   useEffect(() => {
//     const div = document.getElementById("zego-container");
//     if (div) {
//       myMeeting(div);
//     }
//   }, []);

//   return (
//     <div id="zego-container" style={{ width: "100vw", height: "100vh" }} />
//   );
// };

// export default Videocall;
