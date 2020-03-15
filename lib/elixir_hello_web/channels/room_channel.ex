require Logger

defmodule ElixirHelloWeb.RoomChannel do

    use Phoenix.Channel
    alias ElixirHelloWeb.Presence

    def join("room:lobby", message, socket) do
      name = message["params"]["name"]

      send(self(), :after_join)
      {:ok, %{name: "name"}, assign(socket, :name, name)}
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
      # push socket, "presence_state", Presence.list(socket)
      broadcast!(socket, "presence_state", %{ list: Presence.list(socket)})

      name = socket.assigns[:name]

      {:ok, _} = Presence.track(socket, "user", %{
        name: name
      })
      {:noreply, socket}
    end

end