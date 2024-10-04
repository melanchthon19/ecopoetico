#!/bin/bash

# ========= 1 =========
# Change url variabla to localhost
PRODUCTION="frontend_react/.env.production"

if [ "$1" == "-local" ]; then
  # Update the .env.production file for local environment
  cat << EOF > "$PRODUCTION"
#VITE_API_URL=https://www.ecopoetico.cl
VITE_API_URL=http://localhost:8000
VITE_BASE_URL='static/'
EOF
  echo "Updated the .env.production file for LOCAL production."

elif [ "$1" == "-server" ]; then
  # Update the .env.production file for server environment
  cat << EOF > "$PRODUCTION"
VITE_API_URL=https://www.ecopoetico.cl
#VITE_API_URL=http://localhost:8000
VITE_BASE_URL='static/'
EOF
  echo "Updated the .env.production file for SERVER production."

else
  echo "Invalid argument. Use -local for local production or -server for server production."
  exit 1
fi

# ========= 2 =========
# Update frontend
cd frontend_react || exit
yes | npm run deploy

# ========= 3 =========
# Collecstatic
cd .. || exit
python manage.py collectstatic


