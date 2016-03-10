class WelcomeController < ApplicationController
  before_filter :authenticate_user!

  def index
    @waiting_for_players = Game.waiting_for_players.not_joined_by(current_user)
    @my_recent = current_user.games.recent
  end

end
