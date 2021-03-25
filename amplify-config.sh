#!/usr/bin/env bash

set -e
IFS='|'

API_ID="xqqaacutkjhz7dfvegfxhwgrry"
BUILD_COMMAND="npm run-script build"
START_COMMAND="npm run-script start"

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"$BUILD_COMMAND\",\
\"StartCommand\":\"$START_COMMAND\"\
}"

AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"default\",\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
\"region\":\"us-east-1\"\
}"

AUTHCONFIG="{\
\"userPoolId\":\"us-east-1_7g7GJb6Za\",\
\"webClientId\":\"802uni8f75rcptjtg2va7ljh9\",\
\"nativeClientId\":\"35i0e4s09qakerb4m52km5v86e\"\
}"

CATEGORIES="{\
\"auth\":$AUTHCONFIG\
}"

AMPLIFY="{\
\"projectName\":\"scrumnestui\",\
\"envName\":\"prod\",\
\"defaultEditor\":\"code\"\
}"

FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"

PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

amplify init \
    --amplify $AMPLIFY \
    --frontend $FRONTEND \
    --providers $PROVIDERS \
    --categories $CATEGORIES \
    --yes | true


yes "" | amplify add codegen --apiId $API_ID
yes "" | amplify push
