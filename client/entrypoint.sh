#!/bin/sh
set -eu

: "${VITE_API_URL:?set me}"


TARGET="/usr/share/nginx/html/index.html"

# Each substitution gets its own -e. We use '@' as the delimiter to avoid
# problems if your URL contains '/'.
sed -i \
  -e "s@__API_URL_PLACEHOLDER__@${VITE_API_URL}@g" \
  "$TARGET"

nginx -g 'daemon off;'
