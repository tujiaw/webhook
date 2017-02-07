PRO_DIR="/root/nodeblog"
echo "start--------------------"
cd $PRO_DIR
echo "pull git code"
git pull
echo "restart nodeblog"
pm2 restart nodeblog
echo "finished-----------------"