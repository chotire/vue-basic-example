import camelCase from 'lodash/camelCase';

const storeData = { modules: {} };

function resister(requireModule, resolvePath) {
  requireModule.keys().forEach(filename => {
    const modulePath = resolvePath(filename).map(camelCase);
    const { modules } = getNamespace(storeData, modulePath);

    // modules 객체에 모듈 추가
    modules[modulePath.pop()] = {
      namespaced: true,
      ...(requireModule(filename).default || requireModule(filename)),
    };
  });
}

// 모듈의 namespace를 재귀적으로 가져온다.
function getNamespace(subtree, path) {
  if (path.length === 1) {
    return subtree;
  }

  const namespace = path.shift();
  subtree.modules[namespace] = {
    modules: {},
    namespaced: true,
    ...subtree.modules[namespace],
  };
  return getNamespace(subtree.modules[namespace], path);
}

resister(require.context('.', true, /^(?!\.\/index).*\.js$/), filename => {
  return filename
    .replace(/^\.\//, '') // 경로의 첫 './' 문자열을 제거
    .replace(/\.\w+$/, '') // 파일 확장자 제거
    .split(/\//); // path 경로 배열로 분할
});

resister(require.context('../../views', true, /store(?!.js)/), filename => {
  return filename
    .replace(/(\.\/|\.js)/g, '')
    .replace(/(\/store\/)/g, '/')
    .replace(/\/store([/store]*)$/, '')
    .split(/\//);
});

resister(require.context('../../views', true, /store.js/), filename => {
  return filename.replace(/(\.\/|\/store.js)/g, '').split(/\//); // path 경로 배열로 분할
});

export default storeData.modules;
