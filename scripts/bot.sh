#!/usr/bin/env bash
SELF_PATH="$(cd -P -- "$(dirname -- "$0")" && pwd -P)/$(basename -- "$0")"
SELF_PATH="$(readlink "$SELF_PATH" || echo $SELF_PATH)"
DIR_PATH="$(dirname "$SELF_PATH")"
cd $DIR_PATH

#git diff --name-status "$FORMATED_COMMIT_RANGE"
node bot/index.js
#curl "http://qy.im.baidu.com/msgt/api/sendMsgToGroup?access_token=$ROBOT_TOKEN" -d '{"to":1605096,"access_token":"$ROBOT_TOKEN","msg_type":"text","content":"啦啦啦"}'