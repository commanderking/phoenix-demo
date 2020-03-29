import { useContext, useReducer, useEffect, useState } from "react";
import SocketContext from "./SocketContext";
import { ChannelState } from "./ChannelReducer";
import { channelActions, ChannelActions } from "./ChannelActions";
import { Presence } from "phoenix";

type Meta = {
  id: string;
  phx_ref: string;
  name: string;
};

const useChannel = (
  channelTopic: string,
  reducer: (state: ChannelState, action: ChannelActions) => ChannelState,
  initialState: ChannelState,
  name: string
) => {
  const socket = useContext(SocketContext);
  const [state, dispatch]: [ChannelState, any] = useReducer(
    reducer,
    initialState
  );

  // @ts-ignore
  const [lobbyChannel, setLobbyChannel] = useState("");

  useEffect(() => {
    socket.connect();

    const channel = socket.channel(channelTopic, {
      params: { name }
    });

    const presence = new Presence(channel);

    channel
      .join()
      .receive("ok", resp => {
        channel.push("new_join", { body: { name } });
        // @ts-ignore
        setLobbyChannel(channel);
      })
      .receive("error", ({ reason }) => {
        console.error("failed to join channel", reason);
      });

    channel.on("new_join", payload => {
      const { user_data } = payload;
      dispatch({
        type: channelActions.USER_JOIN,
        payload: { ...user_data, actionType: channelActions.USER_JOIN }
      });
    });

    channel.on("new_msg", payload => {
      const { text, name } = payload;
      dispatch({
        type: channelActions.NEW_MSG,
        payload: {
          text,
          name
        }
      });
    });

    // Wanted to use presence_diff for the "joins" case as well, but the joins that are returned is
    // always the entire list of people who have joined since the beginning of the channel start
    // maybe this would be useful for an entire history of the order folks joined, but less useful if
    // we want to keep a timeline of when people joined and left
    channel.on("presence_diff", presenceDiff => {
      const { joins, leaves } = presenceDiff;
      const getMetasWithActionType = (metas: Meta[]) =>
        metas.map((meta: Meta) => {
          return {
            ...meta,
            userAction: channelActions.USER_LEAVE
          };
        });

      if (leaves?.user?.metas) {
        dispatch({
          type: channelActions.USER_LEAVE,
          payload: getMetasWithActionType(leaves.user.metas)
        });
      }
    });

    // presence list is the complete list of everyone whos in the channel
    presence.onSync(() => {
      presence.list((id, { metas }) => {
        dispatch({
          type: channelActions.SYNC_PRESENCE,
          payload: metas
        });
      });
    });

    // Thought we could hook into onJoin to add users as they joined, but // current returns just the current user of teh socket
    // newPres returns the entire presence for everyone who's joined, not just of the new join
    // presence.onJoin((id, current, newPres) => {
    //   console.log("current", current);
    //   console.log("newPres", newPres);
    // });

    return () => {
      channel.push("user_leave", {});
      channel.leave();
    };
  }, [channelTopic, socket]);

  return { channelState: state, channel: lobbyChannel };
};

export default useChannel;
