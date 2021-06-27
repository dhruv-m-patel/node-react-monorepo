import handlers from 'shortstop-handlers';

export function betterRequire(basePath) {
  const baseRequire = handlers.require(basePath);
  return function hashRequire(v) {
    const [moduleName, func] = v.split('#');
    const module = baseRequire(moduleName);
    if (func) {
      if (module[func]) {
        return module[func];
      }
      return baseRequire(v);
    }
    return module;
  };
}

export function readConfiguration(configFactory) {
  return new Promise((resolve, reject) => {
    configFactory.create((err, config) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(config);
    });
  });
}

export function preloadDefaultState(req) {
  if (!req.initialState) {
    req.initialState = {};
  }
}
