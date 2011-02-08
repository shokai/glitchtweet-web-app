require 'rubygems'
require 'sinatra'

require File.dirname(__FILE__)+'/helper'
require File.dirname(__FILE__)+'/main'

set :environment, :development

set :port, 8085
set :server, 'thin'

Sinatra::Application.run
