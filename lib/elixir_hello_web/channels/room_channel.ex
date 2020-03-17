require Logger
import Ecto
defmodule ElixirHelloWeb.RoomChannel do

    use Phoenix.Channel
    alias ElixirHelloWeb.Presence

    def join("room:lobby", message, socket) do
      name = message["params"]["name"]

      send(self(), :after_join)
      uuid = Ecto.UUID.generate
      {:ok, %{name: "name", users: Presence.list(socket) }, assign(socket, :user_data, %{ name: name, uuid: uuid})}
    end
    def join("room:" <> _private_room_id, _params, _socket) do
      {:error, %{reason: "unauthorized"}}
    end
 
    def handle_in("new_join", %{"body" => body}, socket) do
      uuid = socket.assigns[:user_data][:uuid]
      Logger.info(uuid)
      name = socket.assigns[:user_data][:name]
      broadcast!(socket, "new_join", %{user_data: %{ name: name, uuid: uuid} })
      {:noreply, socket}
    end

    def handle_in("new_msg", %{"body" => body}, socket) do
      broadcast!(socket, "new_msg", %{body: body})
      {:noreply, socket}
    end

    def handle_info(:after_join, socket) do
      push socket, "presence_state", Presence.list(socket)
      # broadcast!(socket, "presence_state", %{ list: Presence.list(socket)})

      name = socket.assigns[:user_data][:name]
      uuid = socket.assigns[:user_data][:uuid]

      IO.inspect socket.assigns

      {:ok, _} = Presence.track(socket, "user", %{
        name: name,
        uuid: uuid
      })
      {:noreply, socket}
    end

end