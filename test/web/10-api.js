/*!
 * Copyright 2019 - 2024 Digital Bazaar, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {config, extend, isObject, ready, start, waitUntil} from '@bedrock/web';

describe('bedrock-web API', () => {
  describe('API', () => {
    it('should wait for a promise to resolve', async () => {
      let waited = false;
      waitUntil(new Promise(resolve => setTimeout(() => {
        waited = true;
        resolve();
      }), 100));
      await start();
      waited.should.equal(true);
    });
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
    it('should deep extend an object with array source', async () => {
      const target = {a: 1, foo: {bar: 1}, baz: {x: 1}};
      const source = [{foo: {bar: 2}, baz: {y: 2}}];
      const result = extend({target, source, deep: true});
      const expect = {
        a: 1, foo: {bar: 2}, baz: {x: 1, y: 2}
      };
      result.should.deep.equal(expect);
      target.should.deep.equal(expect);
    });
    it('should deep extend an object with no existing key', async () => {
      const target = {a: 1, foo: {bar: 1}};
      const source = {foo: {bar: 2}, baz: {y: 2}};
      const result = extend({target, source, deep: true});
      const expect = {
        a: 1, foo: {bar: 2}, baz: {y: 2}
      };
      result.should.deep.equal(expect);
      target.should.deep.equal(expect);
    });
    it('should fail to extend a non-object', async () => {
      const target = {};
      const source = 'non-object';
      let err;
      try {
        extend({target, source});
      } catch(e) {
        err = e;
      }
      should.exist(err);
      err.name.should.equal('TypeError');
      err.message.should.equal(
        '"source" must be an object or an array of objects.');
    });
    it('should fail on empty params', async () => {
      let err;
      try {
        extend();
      } catch(e) {
        err = e;
      }
      should.exist(err);
      err.name.should.equal('TypeError');
    });
    it('should detect an object', async () => {
      const result = isObject({});
      result.should.equal(true);
    });
    it('should detect a non-object', async () => {
      const result = isObject('');
      result.should.equal(false);
    });
  }); // end API
});
