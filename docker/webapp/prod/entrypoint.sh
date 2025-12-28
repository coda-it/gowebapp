mkdir -p /root/volume \
  /root/go/src/github.com/coda-it/gowebapp/public \
  /root/go/src/github.com/coda-it/gowebapp/views \
  /root/go/src/github.com/coda-it/gowebapp/translations

echo "Waiting for mounts..."
i=0
while [ $i -lt 30 ]; do
  [ -d /home/volume ] && [ "$(ls -A /home/volume 2>/dev/null || true)" ] && break
  i=$((i+1))
  sleep 1
done

echo "=== ENV (storage-related) ==="
env | grep -E 'WEBSITE_|APPSETTING_|AZURE' || true

echo
echo "=== Mounts (filtered) ==="
# pokaże tylko /home/volume i ewentualnie cifs/fuse
(mount | grep -E '/home/volume| type cifs | type fuse' || true)

echo
echo "=== df -h (filtered) ==="
(df -h | grep -E '/home/volume|Filesystem' || true)

echo
echo "=== Listing /home/volume ==="
ls -la /home/volume || true

for d in /home/volume/config /home/volume/public /home/volume/translations /home/volume/views; do
  echo
  echo "=== $d ==="
  ls -la "$d" || echo "WARN: $d not accessible"
done

echo
echo "=== Starting app ==="

ln -sfn /home/volume/config        /root/volume
ln -sfn /home/volume/public        /root/go/src/github.com/coda-it/gowebapp/public
ln -sfn /home/volume/views         /root/go/src/github.com/coda-it/gowebapp/views
ln -sfn /home/volume/translations  /root/go/src/github.com/coda-it/gowebapp/translations

cd /root/go/src/github.com/coda-it/gowebapp && ./gowebapp
