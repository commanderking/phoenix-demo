defmodule ElixirHello.Repo do
  use Ecto.Repo,
    otp_app: :elixir_hello,
    adapter: Ecto.Adapters.Postgres
end
