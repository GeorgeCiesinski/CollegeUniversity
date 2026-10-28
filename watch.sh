#!/bin/bash

# Specify a unique name for the lock file
lockfile="watch.lock"

# Check if the lock file exists
if [ -e "$lockfile" ]; then
  echo "Script is already running. Exiting."
  exit 1
fi

# Create the lock file
touch "$lockfile"

# Define the directories
# This is where the SCSS and CSS folders can be changed if needed 
scssDirectory="web/themes/its/src/scss"
cssDirectory="web/themes/its/css"

# Check if scssDirectory exists
if [ ! -d "$scssDirectory" ]; then
  echo "$scssDirectory does not exist. Make sure the ITS theme is in web/themes/its and try again."
  rm "$lockfile" # Remove the lock file before exiting
  exit 1
fi

# Initialize an empty array to store all the arguments
arguments=()

# Iterate through folders in scssDirectory
for folder in "$scssDirectory"/*; do
  # Check if folder is a directory
  if [ -d "$folder" ]; then
    # Extract folder name (basename)
    folder_name=$(basename "$folder")
    
    # Construct the argument and add it to the arguments array
    argument="$folder:$cssDirectory/$folder_name"
    arguments+=("$argument")
    
    # Optionally, display a message for each folder being watched
    echo "Watching $folder_name"
  fi
done

# Construct the full scss --watch command
sass_command="sass --watch ${arguments[*]}"

# Echo the full command
echo "Executing command: $sass_command"

# Execute the scss --watch command with all arguments
eval "$sass_command" &

# Wait for the user to press Enter to stop watching
echo "IMPORTANT: Press Enter to stop watching... do not use CTRL+C"
read -r

# Kill the scss process when Enter is pressed
pkill -f "sass --watch"

# Remove the lock file when the script finishes
rm "$lockfile"