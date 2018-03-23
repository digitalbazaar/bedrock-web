/*!
 * Bedrock Frontend launcher.
 *
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

let resolve;

/**
 * A promise that resolves once the frontend is started. Other modules may
 * attach other functionality to be run after this promise resolves, e.g.
 *
 * import {ready} from 'bedrock-frontend';
 *
 * ready.then(() => /* run some framework bootstrapping code *');
 */
export const ready = new Promise(r => resolve = r);

/**
 * Called by the main script of the bedrock frontend application to cause
 * the `ready` promise to resolve. This is typically called after all other
 * module loader setup and other frontend bootstrapping modules have run.
 */
export const start = () => {
  resolve();
  return ready;
};
