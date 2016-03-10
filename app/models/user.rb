class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


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
  has_many :created_games,  class_name: 'Game', foreign_key: :created_by_id, dependent: :nullify
  has_many :players,        dependent: :destroy
  has_many :games,          through: :players



  # Validation Specifications
  #
  # === Examples
  #
  #   validates :name,        presence: true
  #   validates :code,        uniqueness: { scope: :workspace_id }
  #


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
  scope :waiting_for_players,   -> { where(status: 'waiting_for_players') }
  scope :playing,               -> { where(status: 'playing') }
  scope :finished,              -> { where(status: 'finished') }


  #
  # Other
  #
  def display_name
    name.blank? ? email : name
  end


end
