PRO_DIR="/root/sanjiadian"
echo "start--------------------"
cd $PRO_DIR
echo "pull git code"
git pull
echo "restart sanjiadian"
pm2 restart sanjiadian
echo "finished-----------------"