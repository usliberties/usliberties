#!/bin/bash

os=$(uname| tr '[A-Z]' '[a-z]')

function getHash
{
  if [ "$os" == "darwin" ] 
    then
    hasher="shasum"
  else
    hasher="sha1sum"
  fi

  root=$1
  local hash=$(find $root/**/* -type f -print0 | sort -z | xargs -0 $hasher | $hasher | awk '{print $1}')
  echo $hash
}

getHash $1