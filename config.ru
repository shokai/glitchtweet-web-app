require 'rubygems'
require 'sinatra'
require 'bundler/setup'

require File.dirname(__FILE__)+'/helper'
require File.dirname(__FILE__)+'/main'

set :environemt, :production

run Sinatra::Application
