class PlayersController < ApplicationController
  before_filter :authenticate_user!
  before_action :set_game
  before_action :set_player,  only: [:show, :edit, :update, :destroy]

  # GET /games/1/players
  # GET /games/1/players.json
  def index
    @players = @game.players
  end

  # GET /games/1/players/1
  # GET /games/1/players/1.json
  def show
  end

  # POST /games/1/players
  # POST /games/1/players.json
  def create
    @player_creator = PlayerCreator.new_in_model(@game, player_params, current_user)

    respond_to do |format|
      if @player_creator.save
        format.html { redirect_to @game, notice: 'Player successfully joined the Game.' }
        format.json { render :show, status: :created, location: @game }
      else
        format.html { render :new }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /games/1/players/1
  # PATCH/PUT /games/1/players/1.json
  def update
    respond_to do |format|
      if @game.update(game_params)
        format.html { redirect_to @game, notice: 'Game was successfully updated.' }
        format.json { render :show, status: :ok, location: @game }
      else
        format.html { render :edit }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /games/1/players/1
  # DELETE /games/1/players/1.json
  def destroy
    @game.destroy
    respond_to do |format|
      format.html { redirect_to games_url, notice: 'Game was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

private

  # Use callbacks to share common setup or constraints between actions.
  def set_game
    @game = Game.find(params[:game_id])
  end

  def set_player
    @player = @game.players.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def player_params
    params[:player].permit(:user_id, :player_order)
  end
end
