if [ "${WEBAPP_ENV:-}" != "test" ]; then
  echo "=== Creating mount symlinks ==="

  rm -rf "$APP/public" "$APP/views" "$APP/translations"

  ln -sfn /home/volume/config        /root/volume
  ln -sfn /home/volume/public        "$APP/public"
  ln -sfn /home/volume/views         "$APP/views"
  ln -sfn /home/volume/translations  "$APP/translations"
else
  echo "=== Skipping mount symlinks in test environment ==="
fi

echo "=== Starting app ==="
cd "$APP"
exec ./gowebapp
