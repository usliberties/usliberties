#!/bin/bash
source awskeys.sh

local_path=$1
aws_path="/"
bucket="usliberties.org"
os=$(uname| tr '[A-Z]' '[a-z]')

function putS3
{
  path=$1
  file=$2
  aws_path=$3
  bucket=$4

  contentType='text/html'

  date=$(date +"%a, %d %b %Y %T %z")
  acl="x-amz-acl:public-read"
  string="PUT\n\n$contentType\n$date\n$acl\n/$bucket$aws_path$file"
  signature=$(echo -en "${string}" | openssl sha1 -hmac "${S3SECRET}" -binary | base64)
  curl -k -X PUT -T "$path/$file" \
    -H "Host: $bucket.s3.amazonaws.com" \
    -H "Date: $date" \
    -H "Content-Type: $contentType" \
    -H "$acl" \
    -H "Authorization: AWS ${S3KEY}:$signature" \
    "https://$bucket.s3.amazonaws.com$aws_path$file"
}  

for file in $(find "$local_path" -type f); do
  echo Uploading $file to S3
  putS3 "$local_path" "${file#$local_path/}" "$aws_path" "$bucket"
done