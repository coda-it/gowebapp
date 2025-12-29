echo "=== Creating mount symlinks ==="
APP=/root/go/src/github.com/coda-it/gowebapp
rm -rf "$APP/public" "$APP/views" "$APP/translations"
ln -sfn /home/volume/config        /root/volume
ln -sfn /home/volume/public        "$APP/public"
ln -sfn /home/volume/views         "$APP/views"
ln -sfn /home/volume/translations  "$APP/translations"

echo "=== Starting app ==="
cd "$APP"
exec ./gowebapp
