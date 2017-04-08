PRO_DIR="/root/NodeChat"
echo "start--------------------"
cd $PRO_DIR
echo "pull git code"
git pull
echo "restart NodeChat"
pm2 restart NodeChat
echo "finished-----------------"