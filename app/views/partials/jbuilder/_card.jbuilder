json.extract! card, :id, :game_id, :position_type, :position_id, :dragged_by_id, :pos_x, :pos_y, :pos_z, :facing_up, :created_at, :updated_at

if card.visible_to?(current_user)
  json.card_type card.card_type
end
