import { useEffect } from "react";

const Reciever = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "reciever" }));
    };
  }, []);

  return (
    <div>
      Reciever
      <h1>Hi</h1>
    </div>
  );
};

export default Reciever;
