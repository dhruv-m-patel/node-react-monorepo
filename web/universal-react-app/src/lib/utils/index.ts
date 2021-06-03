import handlers from 'shortstop-handlers';

export function betterRequire(basePath: string) {
  const baseRequire = handlers.require(basePath);
  // @ts-ignore
  return function hashRequire(v: any) {
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

// @ts-ignore
export function readConfiguration(configFactory: any) {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    configFactory.create((err: Error, config: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(config);
    });
  });
}

export function preloadDefaultState(req: any) {
  if (!req.initialState) {
    req.initialState = {};
  }
}
