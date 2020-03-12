import SocketProvider from "../socket/SocketProvider";
import React from "react";

const ChannelContainer = () => {
  return (
    <SocketProvider>
      <div>Container</div>
    </SocketProvider>
  );
};

export default ChannelContainer;
