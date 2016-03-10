class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.references :created_by
      t.references :dealer
      t.string :title
      t.text :description
      t.integer :max_players
      t.string :status
      t.text :scoreboard

      t.timestamps null: false
    end

    add_index :games, :created_by_id
    add_index :games, :dealer_id
  end
end
