#!/bin/bash

# Prompt for values
read -p "Enter MONGO_URI: " MONGO_URI
read -p "Enter DB_NAME: " DB_NAME

# Set environment variables
export MONGO_URI="$MONGO_URI"
export DB_NAME="$DB_NAME"

npm run migration:up