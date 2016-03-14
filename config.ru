# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment', __FILE__)
require './middlewares/game_backend'

use DealmeIn::ChatBackend
Faye::WebSocket.load_adapter('thin')

run Rails.application
