# https://blog.mads-hartmann.com/2017/06/16/writing-readable-bash-scripts.html
#
# update the repo & build the latest version of the client
cd ~/chirp && git pull && cd ~/chirp/client && yarn build \
# kill existing top-level gunicorn process
&& kill $(ps -ef | grep gunicorn | awk 'NR==1 {print $2}'); \
# set up log
cd ~/chirp/server/server && touch ./log && sudo chown 777 ./log \
# start server in background
&& gunicorn -b 0.0.0.0:5000 app:app --log-file=./log & disown
# live tail the logs in current console
&& cd ~/chirp/server/server && tail -f ./log
