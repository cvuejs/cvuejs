#!/usr/bin/env bash
#!/usr/bin/env node --max-old-space-size=4096

set -u -e -o pipefail

cd $(dirname $0)/../..

PACKAGES=(cli
  element-plus
  http)

buildLess() {
  echo 'copy styles...'
  node ./scripts/build/generate-less.js
  echo 'fix zorro paths...'
  sed -i -r "s/~ng-zorro-antd/..\/..\/..\/..\/node_modules\/ng-zorro-antd/g" `grep ~ng-zorro-antd -rl ${DIST}/theme/styles/`
  echo 'build full css...'
  node ./scripts/build/generate-css.js
  node ./scripts/build/generate-css.js min
}

containsElement () {
  local e
  for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
  return 1
}

updateVersionReferences() {
  NPM_DIR="$1"
  (
    echo "======    VERSION: Updating version references in ${NPM_DIR}"
    cd ${NPM_DIR}
    perl -p -i -e "s/PEER\-0\.0\.0\-PLACEHOLDER/^${VERSION}/g" $(grep -ril PEER\-0\.0\.0\-PLACEHOLDER .) < /dev/null 2> /dev/null
    perl -p -i -e "s/0\.0\.0\-PLACEHOLDER/${VERSION}/g" $(grep -ril 0\.0\.0\-PLACEHOLDER .) < /dev/null 2> /dev/null
  )
}

addBanners() {
  for file in ${1}/*; do
    if [[ -f ${file} && "${file##*.}" != "map" ]]; then
      cat ${LICENSE_BANNER} > ${file}.tmp
      cat ${file} >> ${file}.tmp
      mv ${file}.tmp ${file}
    fi
  done
}

VERSION=$(node -p "require('./package.json').version")
echo "=====BUILDING: Version ${VERSION}"

N="
"
PWD=`pwd`

SOURCE=${PWD}/packages
DIST=${PWD}/dist/@cvue

# fix linux
# npm rebuild node-sass

for NAME in ${PACKAGES[@]}
do
  echo "====== PACKAGING ${NAME}"

  LICENSE_BANNER=${SOURCE}/license-banner.txt

  # packaging
  node ${PWD}/scripts/build/build ${NAME}
  # license banner
  addBanners ${DIST}/${NAME}/bundles
  # license file
  cp ${PWD}/LICENSE ${DIST}/${NAME}/LICENSE
  # package version
  updateVersionReferences ${DIST}/${NAME}

done

if containsElement "theme" "${PACKAGES[@]}"; then
  buildLess
fi

echo 'FINISHED!'
