# encoding: utf-8
require 'sinatra'

before do
  content_type :html, 'charset' => 'utf-8'
end

get '/' do
  erb :index
end

get '/beta' do
  erb :beta
end