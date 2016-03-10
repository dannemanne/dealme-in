class Player < ActiveRecord::Base

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
  belongs_to :user
  belongs_to :game



  # Validation Specifications
  #
  # === Examples
  #
  #   validates :name,        presence: true
  #   validates :code,        uniqueness: { scope: :workspace_id }
  #
  validates :user_id,   presence: true
  validates :game_id,   presence: true, uniqueness: { scope: :user_id }


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


end
