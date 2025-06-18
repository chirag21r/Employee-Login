#!/bin/bash

EXPORT_DIR="./logfile"
mkdir -p "$EXPORT_DIR"

DB_NAME="employee_auth_db"

# Export employee_details
sudo -u postgres psql -d $DB_NAME -c "\COPY employee_details TO '$EXPORT_DIR/employee_details.csv' CSV HEADER"

# Export employee_logs
sudo -u postgres psql -d $DB_NAME -c "\COPY employee_logs TO '$EXPORT_DIR/employee_logs.csv' CSV HEADER"

echo "✅ Tables exported to CSV in $EXPORT_DIR"
