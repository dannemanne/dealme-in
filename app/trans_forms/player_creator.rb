class PlayerCreator < ApplicationTransForm
  attr_accessor :game
  set_main_model :player,     proxy: { attributes: %w(user_id player_order) }

  validates :game,          presence: true
  validates :user_id,       presence: true
  validate do
    if current_user && game && current_user.id != game.created_by_id
      errors.add(:user_id, 'only the Game creator can invite other Users to join') unless user_id == current_user.id
    end
  end

  def model=(model)
    self.game = model
  end

  #
  # Main Transaction Block
  #
  transaction do
    self.player_order ||= (game.players.maximum(:player_order) || 0) + 1

    self.player = game.players.create!(user_id: user_id, player_order: player_order)
  end

end
