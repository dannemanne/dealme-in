json.partial! 'partials/jbuilder/game', game: game

json.players game.players do |player|
  json.partial! 'partials/jbuilder/player', player: player
end

json.cards game.cards do |card|
  json.partial! 'partials/jbuilder/card', card: card
end
