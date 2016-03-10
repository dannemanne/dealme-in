class GameUpdater < ApplicationTransForm
  set_main_model :game,     proxy: { attributes: %w(status title description) }

  validates :game,          presence: true

  def model=(model)
    self.game = model
  end

  #
  # Main Transaction Block
  #
  transaction do
    game.status = status
    game.title = title
    game.description = description
    game.save!

    handle_game_state_change!(game.previous_changes[:status])
  end

  private

  def handle_game_state_change!(status_change)
    return if status_change.nil?

    case status_change.join(' -> ')
      when 'waiting_for_players -> playing'
        DeckCreator.new_in_model(game, { no_of_decks: 2, no_of_jokers_per_deck: 3 }, current_user).save!
        DeckShuffler.new_in_model(game, { shuffle: 'all' }, current_user).save!

      else
        # Otherwise it is not a valida status change
        errors.add(:status, 'cannot be changed to that')
        raise ActiveRecord::RecordInvalid, self
    end
  end

end
