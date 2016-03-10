json.extract! player, :id, :user_id, :game_id, :player_order, :created_at, :updated_at

json.user do
  json.partial! 'partials/jbuilder/user', user: player.user if player.user
end
