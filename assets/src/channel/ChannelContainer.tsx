import SocketProvider from "../socket/SocketProvider";
import React from "react";
import useChannel from "../socket/ChannelHook";

type Message = {
  text: String;
};

type Attendee = {
  name: String;
};

type Action =
  | { type: "new_msg"; payload: Message }
  | { type: "NEW_JOIN"; payload: Attendee };

type State = {
  messages: Message[];
  attendees: Attendee[];
};

const initialState = { messages: [], attendees: [] };

const channelReducer = (state: State, action: Action) => {
  console.log("action", action);
  switch (action.type) {
    case "new_msg":
      return { ...state, messages: [...state.messages, action.payload] };
    case "NEW_JOIN":
      return { ...state, attendees: [...state.attendees, action.payload] };
    default:
      return "";
  }
};

const ChannelContainer = () => {
  const state = useChannel("room:lobby", channelReducer, initialState);
  return (
    <SocketProvider>
      <div>Container</div>
    </SocketProvider>
  );
};

export default ChannelContainer;
