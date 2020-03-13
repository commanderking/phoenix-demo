import React, { useEffect } from "react";
import { Socket } from "phoenix";
import SocketContext from "./SocketContext";

const socket = new Socket("ws://localhost:4000/socket", {
  params: { token: "abc" }
});

const SocketProvider = ({ wsUrl, options, children }: any) => {
  useEffect(() => {}, [options, wsUrl]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
