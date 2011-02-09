# -*- coding: utf-8 -*-
require 'bundler'
require 'sinatra/static_assets'
require 'sinatra/content_for'
require 'rack'
require 'sinatra/reloader'
require 'json'
require 'yaml'
require 'kconv'
require 'oauth'
require 'twitter'

set :sessions, true

begin
  @@conf = YAML::load open(File.dirname(__FILE__)+'/config.yaml').read
  p @@conf
rescue => e
  STDERR.puts 'config.yaml load error!'
  STDERR.puts e
end

def app_root
  "#{env['rack.url_scheme']}://#{env['HTTP_HOST']}#{env['SCRIPT_NAME']}"
end

def consumer
  OAuth::Consumer.new(@@conf['twitter_key'], @@conf['twitter_secret'],
                      :site => "http://twitter.com")
end

def remove_twitter_cmd(str)
  str.gsub(/^d[ 　\t]/i,'')
end

def get_user
  
end
