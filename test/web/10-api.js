/*!
 * Copyright (c) 2019-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {config, extend, isObject, ready, start, waitUntil} from '@bedrock/web';

describe('bedrock-web API', () => {
  describe('API', () => {
    it('exports the proper APIs', async () => {
      should.exist(config);
      config.should.be.an('object');
      should.exist(extend);
      extend.should.be.a('function');
      should.exist(isObject);
      isObject.should.be.a('function');
      should.exist(start);
      start.should.be.instanceof(Function);
      should.exist(ready);
      ready.should.be.instanceof(Promise);
      should.exist(waitUntil);
      waitUntil.should.be.instanceof(Function);
    });
    it('should shallow extend an object', async () => {
      const target = {a: 1, foo: {bar: 1}, baz: {x: 1}};
      const source = {foo: {bar: 2}, baz: {y: 2}};
      const result = extend({target, source});
      const expect = {
        a: 1, foo: {bar: 2}, baz: {y: 2}
      };
      result.should.deep.equal(expect);
      target.should.deep.equal(expect);
    });
    it('should deep extend an object', async () => {
      const target = {a: 1, foo: {bar: 1}, baz: {x: 1}};
      const source = {foo: {bar: 2}, baz: {y: 2}};
      const result = extend({target, source, deep: true});
      const expect = {
        a: 1, foo: {bar: 2}, baz: {x: 1, y: 2}
      };
      result.should.deep.equal(expect);
      target.should.deep.equal(expect);
    });
  }); // end API
});
