# encoding: utf-8
require 'bundler'
Bundler.require(:default)
require 'sinatra'
require 'erb'

before do
  content_type :html, 'charset' => 'utf-8'
end

get '/' do
  erb :index
end