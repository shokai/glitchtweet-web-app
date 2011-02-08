#!/usr/bin/env ruby
# -*- coding: utf-8 -*-

def auth?
  return true if session[:access_token] and session[:access_token_secret]
  return false
end

get '/' do
  haml :index
end

get '/auth' do
  @request_token = OAuth::RequestToken.new(consumer,
                                           session[:request_token],
                                           session[:request_token_secret])
  @access_token = @request_token.get_access_token({},
                                                  :oauth_token => params[:oauth_token],
                                                  :oauth_verifier => params[:oauth_verifier])
  session[:access_token] = @access_token.token
  session[:access_token_secret] = @access_token.secret
  redirect app_root
end

get '/login' do
  redirect auth_uri
end

get '/logout' do
  session[:access_token] = nil
  session[:access_token_secret] = nil
  redirect app_root
end

post '/tweet' do
  message = params['message']
  if !message or message.to_s.size < 1
    @mes = {:error => 'message is null'}.to_json
  else
    Twitter.configure do |config|
      config.consumer_key = @@conf['twitter_key']
      config.consumer_secret = @@conf['twitter_secret']
      config.oauth_token = session[:access_token]
      config.oauth_token_secret = session[:access_token_secret]
    end
    res = Twitter.update remove_twitter_cmd(message)
    @mes = {:message => message, :response => res}.to_json
  end
  
end
