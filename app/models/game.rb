class Game < ActiveRecord::Base


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
  STATUSES = %w(waiting_for_players playing finished)


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
  belongs_to :created_by,     class_name: 'User'
  has_many :players,          dependent: :destroy
  has_many :users,            through: :players
  has_many :cards,            dependent: :destroy


  # Validation Specifications
  #
  # === Examples
  #
  #   validates :name,        presence: true
  #   validates :code,        uniqueness: { scope: :workspace_id }
  #
  validates :created_by_id,       presence: true
  validates :title,               presence: true
  validates :status,              inclusion: STATUSES


  # Callback Hooks
  #
  # === Examples
  #
  #   before_save :parse_attributes
  #   after_save do
  #     ...
  #   end
  #
  before_validation do
    self.status ||= STATUSES.first
  end


  # Named Scopes
  #
  # === Examples
  #
  #   scope :active, -> { where(active: true) }
  #   def self.recent(no_of_records = 5)
  #     order('created_at DESC').limit(no_of_records)
  #   end
  #
  scope :waiting_for_players,   -> { where(status: 'waiting_for_players') }
  scope :playing,               -> { where(status: 'playing') }
  scope :finished,              -> { where(status: 'finished') }

  def self.recent(no_of_records = 10)
    order('created_at DESC').limit(no_of_records)
  end

  def self.not_joined_by(user)
      joins("LEFT OUTER JOIN players ON players.game_id = games.id AND players.user_id = #{user.id}").
        where('players.id IS NULL')
  end


  #
  # Other
  #


end
