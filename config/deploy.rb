default_run_options[:pty] = true

set :application, "joaonetto.me"

set :repository,  "git@bitbucket.org:joaonettome/joaonetto.me.git"
set :scm, :git
set :scm_passphrase, "Phdxp103!@#"
set :scm_verbose, true
set :deploy_via, :remote_cache
set :deploy_to, "/var/www/joaonetto.me"
set :use_sudo, true

set :user, "joaonettome"
set :domain, "mytrix"

role :web, "apache2"                          # Your HTTP server, Apache/etc
server domain, :app, :web

namespace :deploy do
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end