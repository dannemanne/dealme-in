json.game do
  json.partial! 'game', game: game
end

json.current_user do
  json.partial! 'partials/jbuilder/user', user: current_user
end
