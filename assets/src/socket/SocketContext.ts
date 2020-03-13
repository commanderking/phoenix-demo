import { createContext } from "react";

import { Socket } from "phoenix";
const socket = new Socket("ws://localhost:4000/socket", {
  params: { token: "abc" }
});
const SocketContext = createContext(socket);
export default SocketContext;
