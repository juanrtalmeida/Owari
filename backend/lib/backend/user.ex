defmodule Backend.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}

  @required_params [:email, :name, :password]

  @derive {Jason.Encoder, only: @required_params ++ [:id]}

  schema "users" do
    field :email, :string
    field :name, :string
    field :password, :string
    field :validated, :boolean

    timestamps()
  end

  def changeset_login(params) do
    %__MODULE__{}
    |> cast(params, [:email, :password])
    |> validate_required([:email, :password])
  end

  def changeset_create(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> handle_hash()
    |> validate_required(@required_params)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:name, min: 2)
    |> put_change(:validated, false)
    |> unique_constraint([:email])
  end

  defp handle_hash(changeset) do
    case password =
           changeset
           |> get_field(:password) do
      "" -> changeset
      nil -> changeset
      _ -> changeset |> put_change(:password, make_hash(password))
    end
  end

  defp make_hash(password) do
    Pbkdf2.add_hash(password) |> Map.get(:password_hash)
  end
end
