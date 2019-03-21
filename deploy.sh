set -ex

docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
IMAGE_NAME=nodesmith/eth-madness:mens-$TRAVIS_TAG
docker tag nodesmith/eth-madness:latest $IMAGE_NAME
docker push $IMAGE_NAME
kubectl config use-context aws-us-east
kubectl get pods -l app=eth-madness

PATCH_TEMPLATE=$'\'{"spec": {"template": {"spec": {"containers":[{"name":"app","image":"IMAGE_NAME"}]}}}}\''
PATCH=$(echo ${PATCH_TEMPLATE/IMAGE_NAME/$IMAGE_NAME})
CMD="kubectl patch deployment eth-madness -p $PATCH"
eval $CMD
kubectl get pods -l app=eth-madness
