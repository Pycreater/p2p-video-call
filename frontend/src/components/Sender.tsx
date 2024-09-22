import { useEffect, useState } from "react";

const Sender = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pc, setPC] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "sender" }));
    };
  }, []);

  const initiateConn = async () => {
    if (!socket) {
      alert("Socket not found");
      return;
    }

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "createAnswer") {
        await pc?.setRemoteDescription(message.sdp);
      } else if (message.type === "iceCandidates") {
        pc?.addIceCandidate(message.candidate);
      }
    };

    const pc = new RTCPeerConnection();
    setPC(pc);
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.send(
          JSON.stringify({
            type: "iceCandidate",
            candidate: event.candidate,
          })
        );
      }
    };
  };

  return (
    <div>
      Sender
      <button onClick={initiateConn}>Send Data</button>
    </div>
  );
};

export default Sender;
