import React, { useState } from "react";
import { ChannelState } from "../socket/ChannelReducer";

const Messages = ({
  channelState,
  channel
}: {
  channelState: ChannelState;
  channel: any;
}) => {
  const [typedMessage, setTypedMessage]: [String | null, any] = useState(null);
  const { messages } = channelState;
  return (
    <div>
      <h3>Messages</h3>
      <div>Messages will appear here</div>
      <ul>
        {messages.map((message, index) => {
          return (
            <li key={`message-${message.name}-${index}`}>
              {message.name}: {message.text}
            </li>
          );
        })}
      </ul>
      <form
        onSubmit={event => {
          event.preventDefault();
          channel.push("new_msg", { text: typedMessage });
        }}
      >
        <input
          onChange={event => {
            setTypedMessage(event.target.value);
          }}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Messages;
