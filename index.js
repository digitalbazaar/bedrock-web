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
