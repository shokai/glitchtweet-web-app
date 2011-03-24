# -*- coding: utf-8 -*-
require 'rack'
require 'sinatra/reloader' if development?
require 'json'
require 'yaml'
require 'kconv'
require 'oauth'
require 'twitter'

begin
  @@conf = YAML::load open(File.dirname(__FILE__)+'/config.yaml').read
  p @@conf
rescue => e
  STDERR.puts 'config.yaml load error!'
  STDERR.puts e
end

use Rack::Session::Cookie, :key => 'rack.session',
                           :domain => @@conf['session_domain'],
                           :path => '/',
                           :expire_after => 60*60*24*14, # 2 weeks
                           :secret => @@conf['session_secret']

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
