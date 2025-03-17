# start
task dev


task build


# create keys on server

ssh-keygen -t rsa -b 4096 -C "papacoundia@gmail.com"
cat id_rsa_github.pub >> ~/.ssh/authorized_keys

# Key to add on github => $SSH_PRIVATE_KEY


cat id_rsa_github