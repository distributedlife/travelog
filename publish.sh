#!/bin/bash
rake generate

[ -z "$1" ] && echo "Please provide an update message for git commit (eg publish.sh \"Added new article.\")" && exit 1

echo "Restructing, hold tight."
rm -rf ../public
cp -R public ..

# Can we git checkout public
git checkout public
[ "$(echo $?)" != "0" ] && echo "Can't checkout public." && exit 1
git pull --rebase

# Clear out the entire public repo for replacement
rm -rf *

# Dump in the exported html
mv ../public/* .

git add .
git add -u
git commit -m "$1"

echo "Pushing changes to heroku"
git push heroku master
[ "$(echo $?)" != "0" ] && echo "Error pushing changes. We're going to stop here while you resolve it." && exit 1

git checkout "master"
