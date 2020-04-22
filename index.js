/*!
 * Bedrock Web App launcher.
 *
 * Copyright (c) 2018-2020 Digital Bazaar, Inc. All rights reserved.
 */

let resolve;
let waitUntilPromise = Promise.resolve();

/**
 * A promise that resolves once the web application is started. Other modules
 * may attach other functionality to be run after this promise resolves, e.g.
 *
 * import {ready} from 'bedrock-web';
 *
 * ready.then(() => /* run some framework bootstrapping code *');
 */
export const ready = new Promise(r => resolve = r);

/**
 * Sets a promise that must resolve before `ready` will be resolved.
 *
 * @param {Promise} p the Promise to wait for.
 */
export const waitUntil = p => waitUntilPromise = p;

/**
 * Called by the main script of the bedrock web application to cause
 * the `ready` promise to resolve. This is typically called after all other
 * module loader setup and other web app bootstrapping modules have run.
 */
export const start = async () => {
  await waitUntilPromise;
  resolve();
  return ready;
};
