#!/bin/bash
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
set -Eeuo pipefail

# Based on mongo/docker-entrypoint.sh
# https://github.com/docker-library/mongo/blob/master/docker-entrypoint.sh#L303
if [ "$MONGODB_USERNAME" ] && [ "$MONGODB_PASSWORD" ]; then
  "${mongo[@]}" -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase "$rootAuthDatabase" "$MONGODB_DATABASE" <<-EOJS
      db.createUser({
        user: $(_js_escape "$MONGODB_USERNAME"),
        pwd: $(_js_escape "$MONGODB_PASSWORD"),
        roles: [ { role: 'readWrite', db: $(_js_escape "$MONGODB_DATABASE") } ]
      })
EOJS
fi
