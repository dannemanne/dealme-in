# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151221054800) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.integer  "game_id"
    t.integer  "position_id"
    t.integer  "dragged_by_id"
    t.string   "card_type"
    t.string   "position_type"
    t.integer  "pos_x"
    t.integer  "pos_y"
    t.integer  "pos_z"
    t.boolean  "facing_up"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "cards", ["card_type"], name: "index_cards_on_card_type", using: :btree
  add_index "cards", ["dragged_by_id"], name: "index_cards_on_dragged_by_id", using: :btree
  add_index "cards", ["game_id"], name: "index_cards_on_game_id", using: :btree
  add_index "cards", ["position_id"], name: "index_cards_on_position_id", using: :btree

  create_table "games", force: :cascade do |t|
    t.integer  "created_by_id"
    t.integer  "dealer_id"
    t.string   "title"
    t.text     "description"
    t.integer  "max_players"
    t.string   "status"
    t.text     "scoreboard"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "games", ["created_by_id"], name: "index_games_on_created_by_id", using: :btree
  add_index "games", ["dealer_id"], name: "index_games_on_dealer_id", using: :btree

  create_table "players", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "game_id"
    t.integer  "player_order"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "players", ["game_id"], name: "index_players_on_game_id", using: :btree
  add_index "players", ["user_id"], name: "index_players_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "name"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "cards", "games"
  add_foreign_key "players", "games"
  add_foreign_key "players", "users"
end
