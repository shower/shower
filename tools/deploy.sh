#!/bin/sh

REPO_URL=`git config --get remote.origin.url`

if [ -d _deploy ];
    then
        cd _deploy
        git pull origin gh-pages
        cd ../
    else
        git clone -b gh-pages "$REPO_URL" _deploy
fi

rm -rf _deploy/*
rsync -av --recursive --exclude="_deploy" --exclude="tools" --exclude="Makefile" * _deploy/
cd _deploy
git add -A
git commit -m "update"
git push origin gh-pages
