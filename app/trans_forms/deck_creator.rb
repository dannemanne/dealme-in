class DeckCreator < ApplicationTransForm
  set_main_model :game,     proxy: true

  attribute :no_of_jokers_per_deck,     Integer,  default: 0
  attribute :no_of_decks,               Integer,  default: 0

  validates :game,          presence: true
  validate do
    if current_user && game && current_user.id != game.created_by_id
      errors.add(:user_id, 'only the Game creator can start the Game')
    end
  end

  def model=(model)
    self.game = model
  end

  #
  # Main Transaction Block
  #
  transaction do
    no_of_decks.times do
      Card::CARDS.each_pair do |code, card_hash|
        if card_hash[:suit].nil?
          # Extra Card, i.e. Joker

        else
          # Standard Card
          game.cards.create!(card_type: code, position_type: 'deck')
        end
      end

      no_of_jokers_per_deck.times do
        game.cards.create!(card_type: 'JK', position_type: 'deck')
      end
    end
  end

end
