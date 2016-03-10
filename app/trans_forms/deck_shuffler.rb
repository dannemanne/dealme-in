class DeckShuffler < ApplicationTransForm
  set_main_model :game,     proxy: { attributes: %w(status title description) }

  attribute :shuffle

  validates :game,          presence: true
  validates :shuffle,       inclusion: %w(all current_deck)

  def model=(model)
    self.game = model
  end

  #
  # Main Transaction Block
  #
  transaction do
    if shuffle == 'all'
      shuffle_cards! game.cards.to_a
    else

    end
  end

  private

  def shuffle_cards!(cards)
    (0..(cards.length-2)).each do |i|
      j = rand(0..(cards.length-i-1))
      card = cards[i]
      cards[i] = cards[i+j]
      cards[i+j] = card
    end

    cards.each_with_index do |card, i|
      card.position_type = 'deck'
      card.position_id = nil
      card.pos_x = 0
      card.pos_y = 0
      card.pos_z = i + 1
      card.facing_up = false
      card.save!
    end
  end


end
