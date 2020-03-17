import { Message, Attendee } from "./ChannelReducer";

export const channelActions = {
  NEW_MSG: "NEW_MSG",
  NEW_JOIN: "NEW_JOIN",
  USER_LEAVE: "USER_LEAVE",
  UPDATE_PRESENCE_STATE: "UPDATE_PRESENCE_STATE"
};

export type ChannelActions = {
  type: keyof typeof channelActions;
  payload: any;
};

// Typescript has challenges with specific object types
//   | { type: typeof channelActions.NEW_MSG; payload: any }
//   | { type: typeof channelActions.NEW_JOIN; payload: any };
