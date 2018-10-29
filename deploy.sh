#!/usr/bin/env bash

if [ $# -ne 1 ]; then
  echo "Please specify 1 arg; [prod|qa]"
  exit 1
fi

if [ $1 = "prod" ]; then
  echo "building..."
  npm run build
  echo ""

  echo "registering artifact to S3..."
  aws s3 cp dist s3://backup.kamereo.vn/buyer-v2/prod/$(date -u +"%Y-%m-%dT%H:%M:%SZ") --recursive
  echo ""

  echo "deploying artifact to prod..."
  aws s3 cp build/ s3://buyer-v2.kamereo.vn/ --recursive
  echo ""

  echo "clearing up CouldFront cache ..."
  aws configure set preview.cloudfront true
  aws cloudfront create-invalidation --distribution-id E1YMKE0KO4G0S1 --paths '/*'
  echo "cache is being invalidated!"

  echo "done!"
  exit 0
fi

if [ $1 = "qa" ]; then
  echo "building..."
  npm run build
  echo ""

  echo "registering artifact to S3..."
  aws s3 cp build/ s3://backup.kamereo.vn/buyer-v2/qa/$(date -u +"%Y-%m-%dT%H:%M:%SZ") --recursive
  echo ""

  echo "deploying artifact to qa..."
  aws s3 cp build/ s3://buyer-v2.qa.kamereo.vn/ --recursive
  echo ""

  echo "clearing up CouldFront cache ..."
  aws configure set preview.cloudfront true
  aws cloudfront create-invalidation --distribution-id E37FO3N4RZZS2G --paths '/*'
  echo "cache is being invalidated!"

  echo "done!"
  exit 0
fi

echo "Please specify a correct arg; [prod|qa]"
exit 1
