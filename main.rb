#!/usr/bin/env ruby
# -*- coding: utf-8 -*-

def app_root
  "#{env['rack.url_scheme']}://#{env['HTTP_HOST']}#{env['SCRIPT_NAME']}"
end

get '/' do
  haml :index
end

