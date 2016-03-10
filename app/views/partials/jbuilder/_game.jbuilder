json.extract! game, :id, :title, :description, :status, :created_by_id, :created_at, :updated_at

json.created_by do
  json.partial! 'partials/jbuilder/user', user: game.created_by if game.created_by
end
