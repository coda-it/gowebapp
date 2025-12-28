mkdir -p /root/volume \
  /root/go/src/github.com/coda-it/gowebapp/public \
  /root/go/src/github.com/coda-it/gowebapp/views \
  /root/go/src/github.com/coda-it/gowebapp/translations

ln -sfn /home/volume/config        /root/volume
ln -sfn /home/volume/public        /root/go/src/github.com/coda-it/gowebapp/public
ln -sfn /home/volume/views         /root/go/src/github.com/coda-it/gowebapp/views
ln -sfn /home/volume/translations  /root/go/src/github.com/coda-it/gowebapp/translations

cd /root/go/src/github.com/coda-it/gowebapp && ./gowebapp
