require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Vagrant
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.generators do |g|
      g.fixture_replacement :factory_girl, dir: 'spec/factories', suffix: 'factory'
      g.assets false
    end

    # Support for Coffee Script syntax with Browserify module handling
    config.browserify_rails.commandline_options = "-t coffeeify --extension=\".js.coffee\""
    config.browserify_rails.commandline_options = "-t [ babelify --presets [ es2015 react stage-0 ] ] --extension=\".js.jsx\""

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true

    # Mail config
    config.action_mailer.raise_delivery_errors = true
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
        address:              ENV['MAIL_SERVER'],
        port:                 587,
        user_name:            ENV['MAIL_USER'],
        password:             ENV['MAIL_PASS'],
        enable_starttls_auto: true
    }
    config.action_mailer.default_url_options = {
        host: ENV['MAIL_DEFAULT_HOST'],
        port: ENV['MAIL_DEFAULT_PORT'],
    }
  end
end
