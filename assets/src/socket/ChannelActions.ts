import { Message, Attendee } from "./ChannelReducer";

export const channelActions = {
  NEW_MSG: "NEW_MSG",
  USER_JOIN: "USER_JOIN",
  USER_LEAVE: "USER_LEAVE",
  UPDATE_PRESENCE_STATE: "UPDATE_PRESENCE_STATE",
  SYNC_PRESENCE: "SYNC_PRESENCE"
};

export type ChannelActions = {
  type: keyof typeof channelActions;
  payload: any;
};

// Typescript has challenges with specific object types
//   | { type: typeof channelActions.NEW_MSG; payload: any }
//   | { type: typeof channelActions.USER_JOIN; payload: any };
