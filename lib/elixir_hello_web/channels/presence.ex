defmodule ElixirHelloWeb.Presence do
    use Phoenix.Presence, otp_app: :elixir_hello, pubsub_server: ElixirHello.PubSub
end