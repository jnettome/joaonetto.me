set :user, "joaonettome"
set :domain, "mytrix"
default_run_options[:pty] = true

set :repository,  "git@bitbucket.org:joaonettome/joaonetto.me.git"
set :deploy_to, "/var/www/joaonetto.me"
set :deploy_via, :remote_cache
set :scm, :git
set :scm_passphrase, "Phdxp103!@#"
set :scm_verbose, true
set :use_sudo, true

server domain, :app, :web

namespace :deploy do
  task :bundle do
    run "cd #{current_path} && bundle install"
  end
  
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

after "deploy", "deploy:bundle"