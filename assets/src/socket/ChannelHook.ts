import { useContext, useReducer, useEffect } from "react";
import SocketContext from "./SocketContext";
import { Presence } from "phoenix";

const channelActions = {
  NEW_MSG: "NEW_MSG",
  NEW_JOIN: "NEW_JOIN"
};

const useChannel = (channelTopic: string, reducer: any, initialState: any) => {
  const socket = useContext(SocketContext);
  console.log("socket", socket);
  const [state, dispatch]: [any, any] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("channelTopic", channelTopic);
    socket.connect();

    const channel = socket.channel(channelTopic, {
      params: { token: "abc", name: "Jeff" }
    });
    // channel.onMessage = (event, payload) => {
    //   dispatch({ event, payload });
    //   return payload;
    // };

    channel
      .join()
      .receive("ok", resp => {
        console.log("Join Successfully", resp);
        channel.push("new_join", { body: { name: "Jeff" } });
      })
      .receive("error", ({ reason }) => {
        console.error("failed to join channel", reason);
      });

    channel.on("new_join", payload => {
      console.log("new join payload", payload);
      dispatch({ type: channelActions.NEW_JOIN, payload: payload.body });
    });

    channel.on("presence_diff", response => {
      console.log("response", response);
    });

    return () => {
      console.log("leaving");
      channel.leave();
    };
  }, [channelTopic, socket]);

  return state;
};

export default useChannel;
