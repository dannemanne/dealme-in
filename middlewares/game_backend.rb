require 'faye/websocket'

module DealmeIn
  class ChatBackend
    KEEPALIVE_TIME = 15 # in seconds

    def initialize(app)
      @app     = app
      @clients = []
    end

    def call(env)
      if Faye::WebSocket.websocket?(env)
        # WebSockets logic goes here
        ws = Faye::WebSocket.new(env, nil, {ping: KEEPALIVE_TIME })

        # On New Connections
        ws.on :open do |event|
          p [:open, ws.object_id]
          @clients << ws
        end

        # On Message Received
        ws.on :message do |event|
          p [:message, event.data]
          @clients.each {|client| client.send(event.data) }
        end

        # On Closed Connection
        ws.on :close do |event|
          p [:close, ws.object_id, event.code, event.reason]
          @clients.delete(ws)
          ws = nil
        end

        # Return async Rack response
        ws.rack_response
      else
        @app.call(env)
      end
    end
  end
end
