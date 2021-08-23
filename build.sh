#!/bin/sh

echo "Building branch" $1
echo "Last commit message" $2

LAST_COMMIT_MESSAGE=$2
SHOULD_DEPLOY_WAR=$(echo $LAST_COMMIT_MESSAGE | grep "Deploy to dev")

git clean -fd
npm install --unsafe-perm -verbose

if [ "$1" = "master" ]
    then
    	npm run build
        echo "Deploying to PRODUCTION"
        aws s3 cp build s3://m.zakopane.bergregions.pl/ --recursive --exclude "*" --include "*.*"
else
if [ "$1" = "develop" ] || [ "$SHOULD_DEPLOY_WAR" = "$LAST_COMMIT_MESSAGE" ]
    then
    	npm run build
        echo "Deploying app to DEV"
        git log --oneline -n 20 --pretty=format:"%h%x09%an%x09%ad%x09%s" >> changelog.txt
        aws s3 cp changelog.txt s3://dev.m.zakopane.bergregions.pl/changelog.txt
        aws s3 cp build s3://dev.m.zakopane.bergregions.pl/ --recursive --exclude "*" --include "*.*"
    fi
fi
