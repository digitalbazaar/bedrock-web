/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
let resolveReady;
let waitUntilPromise = Promise.resolve();

/**
 * A promise that resolves once the web application is started. Other modules
 * may attach other functionality to be run after this promise resolves, e.g.:
 *
 * import {ready} from 'bedrock-web';
 *
 * ready.then(() => /* run some framework bootstrapping code *');
 *
 * .
 */
export const ready = new Promise(r => resolveReady = r);

/**
 * Sets a promise that must resolve before `ready` will be resolved.
 *
 * @param {Promise} p - The Promise to wait for.
 *
 * @returns {Promise} The passed Promise.
 */
export function waitUntil(p) {
  return waitUntilPromise = p;
}

/**
 * Called by the main script of the bedrock web application to cause
 * the `ready` promise to resolve. This is typically called after all other
 * module loader setup and other web app bootstrapping modules have run.
 *
 * @returns {Promise} Settles once the operation completes.
 */
export async function start() {
  await waitUntilPromise;
  resolveReady();
  return ready;
}

// web application shared configuration
export const config = {};

/**
 * Merges the contents of one or more objects into the target. Useful for
 * deep merging (aka "overlaying") configuration objects into `config`.
 *
 * @param {object} options - The options to use.
 * @param {object} options.target - The target object to merge properties into.
 * @param {Array|object} options.source - N objects to merge into the target.
 * @param {boolean} [options.deep=false] - `true` to do a deep merge.
 *
 * @returns {object} The merged target.
 */
export function extend({target, source, deep} = {}) {
  if(!Array.isArray(source)) {
    source = [source];
  }
  for(const obj of source) {
    if(!isObject(obj)) {
      throw new TypeError('"source" must be an object or an array of objects.');
    }
    for(const key of Object.keys(obj)) {
      const value = obj[key];
      if(deep && isObject(value) && !Array.isArray(value)) {
        target[key] = extend({
          target: target[key] || {}, source: value, deep: true
        });
      } else {
        target[key] = value;
      }
    }
  }
  return target;
}

/**
 * Returns true if the given value is an Object.
 *
 * @param {*} value - The value to check.
 *
 * @returns {boolean} `true` if it is an Object, `false` if not.
 */
export function isObject(value) {
  return (Object.prototype.toString.call(value) === '[object Object]');
}
