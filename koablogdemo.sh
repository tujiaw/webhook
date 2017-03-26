PRO_DIR="/root/koablogdemo"
echo "start--------------------"
cd $PRO_DIR
echo "pull git code"
git pull
echo "restart koablogdemo"
pm2 restart koablogdemo
echo "finished-----------------"