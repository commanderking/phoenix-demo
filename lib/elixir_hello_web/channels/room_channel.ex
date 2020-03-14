require Logger

defmodule ElixirHelloWeb.RoomChannel do

    use Phoenix.Channel
    alias ElixirHelloWeb.Presence

    def join("room:lobby", message, socket) do
      Logger.info(message["params"]["token"])
      Logger.info(message["params"]["name"])

      send(self(), :after_join)
      {:ok, %{user_id: "123"}, assign(socket, :user_id, "123")}
    end
    def join("room:" <> _private_room_id, _params, _socket) do
      {:error, %{reason: "unauthorized"}}
    end
 
    def handle_in("new_join", %{"body" => body}, socket) do 
      broadcast!(socket, "new_join", %{body: body})
      {:noreply, socket}
    end

    def handle_in("new_msg", %{"body" => body}, socket) do
      broadcast!(socket, "new_msg", %{body: body})
      {:noreply, socket}
    end

    def handle_info(:after_join, socket) do
      push socket, "presence_state", Presence.list(socket)

      userTest = socket.assigns[:user_id]
      Logger.info(userTest)
      user = %{
        id: 123,
        username: "Jeff"
      }

      {:ok, _} = Presence.track(socket, "user:#{user.id}", %{
        user_id: user.id,
        username: user.username
      })
      {:noreply, socket}
    end

end