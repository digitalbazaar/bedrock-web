/*!
 * Copyright (c) 2019-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {config, ready, start, waitUntil} from 'bedrock-web';

describe('bedrock-web API', () => {
  describe('API', () => {
    it('exports the proper APIs', async () => {
      should.exist(config);
      config.should.be.an('object');
      should.exist(start);
      start.should.be.instanceof(Function);
      console.log(ready);
      should.exist(ready);
      ready.should.be.instanceof(Promise);
      should.exist(waitUntil);
      waitUntil.should.be.instanceof(Function);
    });
  }); // end API
});
