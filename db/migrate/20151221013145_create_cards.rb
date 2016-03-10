class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.references :game, index: true, foreign_key: true
      t.references :position, index: true
      t.references :dragged_by, index: true
      t.string :card_type
      t.string :position_type
      t.integer :pos_x
      t.integer :pos_y
      t.integer :pos_z
      t.boolean :facing_up

      t.timestamps null: false
    end
    add_index :cards, :card_type
  end
end
