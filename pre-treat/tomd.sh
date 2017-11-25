#!/usr/bin/env bash

SELF_PATH="$(cd -P -- "$(dirname -- "$0")" && pwd -P)/$(basename -- "$0")"
SELF_PATH="$(readlink "$SELF_PATH" || echo $SELF_PATH)"
DIR_PATH="$(dirname "$SELF_PATH")"

LINKS_PATH="$DIR_PATH/links.txt"
if [ ! -f $LINKS_PATH ]; then
  echo "Not found file: $LINKS_PATH";
  exit 1;
fi

MDS_PATH="$DIR_PATH/md"

rm -rf $MDS_PATH/*

while read line
do
  echo "URL: ${line}"
  html2md $line -s ".inner.clearfix" > "$MDS_PATH/$(basename $line.".md")"
done < $LINKS_PATH