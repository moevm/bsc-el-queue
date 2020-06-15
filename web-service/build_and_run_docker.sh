#!/usr/bin/env bash

# For general development 
# ./scripts/build_and_run_docker.sh false 

# For server deploy
# ./scripts/build_and_run_docker.sh true always


# For integration testing
# ./scripts/build_and_run_docker.sh true no arch_evm_testing no
no_cache=${1:-"true"}
restart_image=${2:-"no"}
container_name=${3:-"bsc-el-queue"}
port=${4:-"8086"} # Specify "no" for building & running without mapped ports

date +'%Y-%m-%d %T' > DEBUG
git branch | grep "*">> DEBUG
git log -1 | grep commit >> DEBUG

if [[ "${no_cache}" == "true" ]]
then
    docker rmi ${container_name} || true
fi

port_arg="-p ${port}:80"

if [[ "${port}" == "no" ]]
then
    port_arg=""
fi

docker rm -f ${container_name}
docker build --no-cache=${no_cache} -t ${container_name}_image  -f ./Dockerfile ../
docker run -p 3280:81 -p 3281:82 -p 3282:83 -d --restart=${restart_image} --name ${container_name} -t ${container_name}_image
