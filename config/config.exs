# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :elixir_hello,
  ecto_repos: [ElixirHello.Repo]

# Configures the endpoint
config :elixir_hello, ElixirHelloWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "h0n589Zqy7ycEyW9RnvEqDX4C+FlxrOVkh7aRjkkMV6UWJa1YszfWyHzlfwSMVO6",
  render_errors: [view: ElixirHelloWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: ElixirHello.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "uaG98Xhk"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
