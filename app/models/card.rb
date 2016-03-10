class Card < ActiveRecord::Base

  # Default Scope (if any)
  #
  # === Example
  #
  #   default_scope { where(active: true) }
  #

  # Class Constants
  #
  # === Examples
  #
  #   STATUS = %w(enabled disabled)
  #   TYPES = { 0 => :home, 1 => :away }.freeze
  #
  POSITIONS = %w(deck board hand)
  PROC_IS_IN_HAND = Proc.new { |c| c.position_type == 'hand' }
  CARDS = {
      'AH' => { suit: 'HEARTS', value: 'ACE' },
      '2H' => { suit: 'HEARTS', value: '2' },
      '3H' => { suit: 'HEARTS', value: '3' },
      '4H' => { suit: 'HEARTS', value: '4' },
      '5H' => { suit: 'HEARTS', value: '5' },
      '6H' => { suit: 'HEARTS', value: '6' },
      '7H' => { suit: 'HEARTS', value: '7' },
      '8H' => { suit: 'HEARTS', value: '8' },
      '9H' => { suit: 'HEARTS', value: '9' },
      '0H' => { suit: 'HEARTS', value: '10' },
      'JH' => { suit: 'HEARTS', value: 'JACK' },
      'QH' => { suit: 'HEARTS', value: 'QUEEN' },
      'KH' => { suit: 'HEARTS', value: 'KING' },

      'AS' => { suit: 'SPADES', value: 'ACE' },
      '2S' => { suit: 'SPADES', value: '2' },
      '3S' => { suit: 'SPADES', value: '3' },
      '4S' => { suit: 'SPADES', value: '4' },
      '5S' => { suit: 'SPADES', value: '5' },
      '6S' => { suit: 'SPADES', value: '6' },
      '7S' => { suit: 'SPADES', value: '7' },
      '8S' => { suit: 'SPADES', value: '8' },
      '9S' => { suit: 'SPADES', value: '9' },
      '0S' => { suit: 'SPADES', value: '10' },
      'JS' => { suit: 'SPADES', value: 'JACK' },
      'QS' => { suit: 'SPADES', value: 'QUEEN' },
      'KS' => { suit: 'SPADES', value: 'KING' },

      'AD' => { suit: 'DIAMONDS', value: 'ACE' },
      '2D' => { suit: 'DIAMONDS', value: '2' },
      '3D' => { suit: 'DIAMONDS', value: '3' },
      '4D' => { suit: 'DIAMONDS', value: '4' },
      '5D' => { suit: 'DIAMONDS', value: '5' },
      '6D' => { suit: 'DIAMONDS', value: '6' },
      '7D' => { suit: 'DIAMONDS', value: '7' },
      '8D' => { suit: 'DIAMONDS', value: '8' },
      '9D' => { suit: 'DIAMONDS', value: '9' },
      '0D' => { suit: 'DIAMONDS', value: '10' },
      'JD' => { suit: 'DIAMONDS', value: 'JACK' },
      'QD' => { suit: 'DIAMONDS', value: 'QUEEN' },
      'KD' => { suit: 'DIAMONDS', value: 'KING' },

      'AC' => { suit: 'CLUBS', value: 'ACE' },
      '2C' => { suit: 'CLUBS', value: '2' },
      '3C' => { suit: 'CLUBS', value: '3' },
      '4C' => { suit: 'CLUBS', value: '4' },
      '5C' => { suit: 'CLUBS', value: '5' },
      '6C' => { suit: 'CLUBS', value: '6' },
      '7C' => { suit: 'CLUBS', value: '7' },
      '8C' => { suit: 'CLUBS', value: '8' },
      '9C' => { suit: 'CLUBS', value: '9' },
      '0C' => { suit: 'CLUBS', value: '10' },
      'JC' => { suit: 'CLUBS', value: 'JACK' },
      'QC' => { suit: 'CLUBS', value: 'QUEEN' },
      'KC' => { suit: 'CLUBS', value: 'KING' },

      'JK' => { suit: nil, value: 'JOKER' }
  }.freeze


  # Attribute Declarations
  #
  # === Examples
  #
  #   attr_accessor :save_and_create_another
  #
  #   attr_accessible :name, :code, :description
  #


  # Association Declarations
  #
  # === Examples
  #
  #   belongs_to :user
  #   has_many :posts, dependent: :destroy
  #
  belongs_to :game
  belongs_to :position,   class_name: 'Player'
  belongs_to :dragged_by, class_name: 'Player'


  # Validation Specifications
  #
  # === Examples
  #
  #   validates :name,        presence: true
  #   validates :code,        uniqueness: { scope: :workspace_id }
  #
  validates :game_id,         presence: true
  validates :position_type,   inclusion: POSITIONS
  validates :position_id,     presence: true, if: PROC_IS_IN_HAND
  validates :card_type,       inclusion: CARDS.keys


  # Callback Hooks
  #
  # === Examples
  #
  #   before_save :parse_attributes
  #   after_save do
  #     ...
  #   end
  #



  # Named Scopes
  #
  # === Examples
  #
  #   scope :active, -> { where(active: true) }
  #   def self.recent(no_of_records = 5)
  #     order('created_at DESC').limit(no_of_records)
  #   end
  #


  #
  # Other
  #
  def visible_to?(user)
    facing_up && (position_type != 'hand' || position_id == user.id)
  end



end
