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
\"webClientId\":\"35i0e4s09qakerb4m52km5v86e\",\
\"nativeClientId\":\"802uni8f75rcptjtg2va7ljh9\"\
\"identityPoolId\":\"us-east-1:9389378c-dfc1-4fde-9438-fa5af8732a17\",\
}"

STORAGE="{\
\"bucketName\":\"337451035854-scrumnest-files-prod\",\
\"region\":\"us-east-1\"\
}"

CATEGORIES="{\
\"auth\":$AUTHCONFIG,\
\"storage\":$STORAGE\
}"

AMPLIFY="{\
\"appId\":\"d2axvxx4cgym13\",\
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

amplify pull \
    --amplify $AMPLIFY \
    --frontend $FRONTEND \
    --providers $PROVIDERS \
    --categories $CATEGORIES \
    --yes

yes "" | amplify add codegen --apiId $API_ID

amplify status
