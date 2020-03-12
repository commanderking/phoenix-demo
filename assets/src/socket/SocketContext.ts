import { createContext } from "react";

import { Socket } from "phoenix";
const socket = new Socket("/socket", {});

const SocketContext = createContext(socket);
export default SocketContext;
