(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/is-buffer/index.js
  var require_is_buffer = __commonJS({
    "node_modules/is-buffer/index.js"(exports, module) {
      module.exports = function isBuffer2(obj) {
        return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
      };
    }
  });

  // node_modules/@vercel/oidc/dist/get-context.js
  var require_get_context = __commonJS({
    "node_modules/@vercel/oidc/dist/get-context.js"(exports, module) {
      "use strict";
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export2 = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var get_context_exports = {};
      __export2(get_context_exports, {
        SYMBOL_FOR_REQ_CONTEXT: () => SYMBOL_FOR_REQ_CONTEXT,
        getContext: () => getContext2
      });
      module.exports = __toCommonJS2(get_context_exports);
      var SYMBOL_FOR_REQ_CONTEXT = /* @__PURE__ */ Symbol.for("@vercel/request-context");
      function getContext2() {
        const fromSymbol = globalThis;
        return fromSymbol[SYMBOL_FOR_REQ_CONTEXT]?.get?.() ?? {};
      }
    }
  });

  // node_modules/jose/dist/browser/runtime/webcrypto.js
  var webcrypto_default, isCryptoKey;
  var init_webcrypto = __esm({
    "node_modules/jose/dist/browser/runtime/webcrypto.js"() {
      webcrypto_default = crypto;
      isCryptoKey = (key) => key instanceof CryptoKey;
    }
  });

  // node_modules/jose/dist/browser/runtime/digest.js
  var digest, digest_default;
  var init_digest = __esm({
    "node_modules/jose/dist/browser/runtime/digest.js"() {
      init_webcrypto();
      digest = async (algorithm, data) => {
        const subtleDigest = `SHA-${algorithm.slice(-3)}`;
        return new Uint8Array(await webcrypto_default.subtle.digest(subtleDigest, data));
      };
      digest_default = digest;
    }
  });

  // node_modules/jose/dist/browser/lib/buffer_utils.js
  function concat(...buffers) {
    const size = buffers.reduce((acc, { length }) => acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    for (const buffer of buffers) {
      buf.set(buffer, i);
      i += buffer.length;
    }
    return buf;
  }
  function p2s(alg, p2sInput) {
    return concat(encoder.encode(alg), new Uint8Array([0]), p2sInput);
  }
  function writeUInt32BE(buf, value, offset) {
    if (value < 0 || value >= MAX_INT32) {
      throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
    }
    buf.set([value >>> 24, value >>> 16, value >>> 8, value & 255], offset);
  }
  function uint64be(value) {
    const high = Math.floor(value / MAX_INT32);
    const low = value % MAX_INT32;
    const buf = new Uint8Array(8);
    writeUInt32BE(buf, high, 0);
    writeUInt32BE(buf, low, 4);
    return buf;
  }
  function uint32be(value) {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, value);
    return buf;
  }
  function lengthAndInput(input) {
    return concat(uint32be(input.length), input);
  }
  async function concatKdf(secret, bits, value) {
    const iterations = Math.ceil((bits >> 3) / 32);
    const res = new Uint8Array(iterations * 32);
    for (let iter = 0; iter < iterations; iter++) {
      const buf = new Uint8Array(4 + secret.length + value.length);
      buf.set(uint32be(iter + 1));
      buf.set(secret, 4);
      buf.set(value, 4 + secret.length);
      res.set(await digest_default("sha256", buf), iter * 32);
    }
    return res.slice(0, bits >> 3);
  }
  var encoder, decoder, MAX_INT32;
  var init_buffer_utils = __esm({
    "node_modules/jose/dist/browser/lib/buffer_utils.js"() {
      init_digest();
      encoder = new TextEncoder();
      decoder = new TextDecoder();
      MAX_INT32 = 2 ** 32;
    }
  });

  // node_modules/jose/dist/browser/runtime/base64url.js
  var encodeBase64, encode, decodeBase64, decode;
  var init_base64url = __esm({
    "node_modules/jose/dist/browser/runtime/base64url.js"() {
      init_buffer_utils();
      encodeBase64 = (input) => {
        let unencoded = input;
        if (typeof unencoded === "string") {
          unencoded = encoder.encode(unencoded);
        }
        const CHUNK_SIZE2 = 32768;
        const arr = [];
        for (let i = 0; i < unencoded.length; i += CHUNK_SIZE2) {
          arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE2)));
        }
        return btoa(arr.join(""));
      };
      encode = (input) => {
        return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      };
      decodeBase64 = (encoded) => {
        const binary = atob(encoded);
        const bytes2 = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes2[i] = binary.charCodeAt(i);
        }
        return bytes2;
      };
      decode = (input) => {
        let encoded = input;
        if (encoded instanceof Uint8Array) {
          encoded = decoder.decode(encoded);
        }
        encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
        try {
          return decodeBase64(encoded);
        } catch {
          throw new TypeError("The input to be decoded is not correctly encoded.");
        }
      };
    }
  });

  // node_modules/jose/dist/browser/util/errors.js
  var errors_exports = {};
  __export(errors_exports, {
    JOSEAlgNotAllowed: () => JOSEAlgNotAllowed,
    JOSEError: () => JOSEError,
    JOSENotSupported: () => JOSENotSupported,
    JWEDecryptionFailed: () => JWEDecryptionFailed,
    JWEInvalid: () => JWEInvalid,
    JWKInvalid: () => JWKInvalid,
    JWKSInvalid: () => JWKSInvalid,
    JWKSMultipleMatchingKeys: () => JWKSMultipleMatchingKeys,
    JWKSNoMatchingKey: () => JWKSNoMatchingKey,
    JWKSTimeout: () => JWKSTimeout,
    JWSInvalid: () => JWSInvalid,
    JWSSignatureVerificationFailed: () => JWSSignatureVerificationFailed,
    JWTClaimValidationFailed: () => JWTClaimValidationFailed,
    JWTExpired: () => JWTExpired,
    JWTInvalid: () => JWTInvalid
  });
  var JOSEError, JWTClaimValidationFailed, JWTExpired, JOSEAlgNotAllowed, JOSENotSupported, JWEDecryptionFailed, JWEInvalid, JWSInvalid, JWTInvalid, JWKInvalid, JWKSInvalid, JWKSNoMatchingKey, JWKSMultipleMatchingKeys, JWKSTimeout, JWSSignatureVerificationFailed;
  var init_errors = __esm({
    "node_modules/jose/dist/browser/util/errors.js"() {
      JOSEError = class extends Error {
        constructor(message2, options) {
          super(message2, options);
          this.code = "ERR_JOSE_GENERIC";
          this.name = this.constructor.name;
          Error.captureStackTrace?.(this, this.constructor);
        }
      };
      JOSEError.code = "ERR_JOSE_GENERIC";
      JWTClaimValidationFailed = class extends JOSEError {
        constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
          super(message2, { cause: { claim, reason, payload } });
          this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
          this.claim = claim;
          this.reason = reason;
          this.payload = payload;
        }
      };
      JWTClaimValidationFailed.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
      JWTExpired = class extends JOSEError {
        constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
          super(message2, { cause: { claim, reason, payload } });
          this.code = "ERR_JWT_EXPIRED";
          this.claim = claim;
          this.reason = reason;
          this.payload = payload;
        }
      };
      JWTExpired.code = "ERR_JWT_EXPIRED";
      JOSEAlgNotAllowed = class extends JOSEError {
        constructor() {
          super(...arguments);
          this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
        }
      };
      JOSEAlgNotAllowed.code = "ERR_JOSE_ALG_NOT_ALLOWED";
      JOSENotSupported = class extends JOSEError {
        constructor() {
          super(...arguments);
          this.code = "ERR_JOSE_NOT_SUPPORTED";
        }
      };
      JOSENotSupported.code = "ERR_JOSE_NOT_SUPPORTED";
      JWEDecryptionFailed = class extends JOSEError {
        constructor(message2 = "decryption operation failed", options) {
          super(message2, options);
          this.code = "ERR_JWE_DECRYPTION_FAILED";
        }
      };
      JWEDecryptionFailed.code = "ERR_JWE_DECRYPTION_FAILED";
      JWEInvalid = class extends JOSEError {
        constructor() {
          super(...arguments);
          this.code = "ERR_JWE_INVALID";
        }
      };
      JWEInvalid.code = "ERR_JWE_INVALID";
      JWSInvalid = class extends JOSEError {
        constructor() {
          super(...arguments);
          this.code = "ERR_JWS_INVALID";
        }
      };
      JWSInvalid.code = "ERR_JWS_INVALID";
      JWTInvalid = class extends JOSEError {
        constructor() {
          super(...arguments);
          this.code = "ERR_JWT_INVALID";
        }
      };
      JWTInvalid.code = "ERR_JWT_INVALID";
      JWKInvalid = class extends JOSEError {
        constructor() {
          super(...arguments);
          this.code = "ERR_JWK_INVALID";
        }
      };
      JWKInvalid.code = "ERR_JWK_INVALID";
      JWKSInvalid = class extends JOSEError {
        constructor() {
          super(...arguments);
          this.code = "ERR_JWKS_INVALID";
        }
      };
      JWKSInvalid.code = "ERR_JWKS_INVALID";
      JWKSNoMatchingKey = class extends JOSEError {
        constructor(message2 = "no applicable key found in the JSON Web Key Set", options) {
          super(message2, options);
          this.code = "ERR_JWKS_NO_MATCHING_KEY";
        }
      };
      JWKSNoMatchingKey.code = "ERR_JWKS_NO_MATCHING_KEY";
      JWKSMultipleMatchingKeys = class extends JOSEError {
        constructor(message2 = "multiple matching keys found in the JSON Web Key Set", options) {
          super(message2, options);
          this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        }
      };
      JWKSMultipleMatchingKeys.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
      JWKSTimeout = class extends JOSEError {
        constructor(message2 = "request timed out", options) {
          super(message2, options);
          this.code = "ERR_JWKS_TIMEOUT";
        }
      };
      JWKSTimeout.code = "ERR_JWKS_TIMEOUT";
      JWSSignatureVerificationFailed = class extends JOSEError {
        constructor(message2 = "signature verification failed", options) {
          super(message2, options);
          this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        }
      };
      JWSSignatureVerificationFailed.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    }
  });

  // node_modules/jose/dist/browser/runtime/random.js
  var random_default;
  var init_random = __esm({
    "node_modules/jose/dist/browser/runtime/random.js"() {
      init_webcrypto();
      random_default = webcrypto_default.getRandomValues.bind(webcrypto_default);
    }
  });

  // node_modules/jose/dist/browser/lib/iv.js
  function bitLength(alg) {
    switch (alg) {
      case "A128GCM":
      case "A128GCMKW":
      case "A192GCM":
      case "A192GCMKW":
      case "A256GCM":
      case "A256GCMKW":
        return 96;
      case "A128CBC-HS256":
      case "A192CBC-HS384":
      case "A256CBC-HS512":
        return 128;
      default:
        throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
  }
  var iv_default;
  var init_iv = __esm({
    "node_modules/jose/dist/browser/lib/iv.js"() {
      init_errors();
      init_random();
      iv_default = (alg) => random_default(new Uint8Array(bitLength(alg) >> 3));
    }
  });

  // node_modules/jose/dist/browser/lib/check_iv_length.js
  var checkIvLength, check_iv_length_default;
  var init_check_iv_length = __esm({
    "node_modules/jose/dist/browser/lib/check_iv_length.js"() {
      init_errors();
      init_iv();
      checkIvLength = (enc, iv) => {
        if (iv.length << 3 !== bitLength(enc)) {
          throw new JWEInvalid("Invalid Initialization Vector length");
        }
      };
      check_iv_length_default = checkIvLength;
    }
  });

  // node_modules/jose/dist/browser/runtime/check_cek_length.js
  var checkCekLength, check_cek_length_default;
  var init_check_cek_length = __esm({
    "node_modules/jose/dist/browser/runtime/check_cek_length.js"() {
      init_errors();
      checkCekLength = (cek, expected) => {
        const actual = cek.byteLength << 3;
        if (actual !== expected) {
          throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
        }
      };
      check_cek_length_default = checkCekLength;
    }
  });

  // node_modules/jose/dist/browser/runtime/timing_safe_equal.js
  var timingSafeEqual, timing_safe_equal_default;
  var init_timing_safe_equal = __esm({
    "node_modules/jose/dist/browser/runtime/timing_safe_equal.js"() {
      timingSafeEqual = (a, b) => {
        if (!(a instanceof Uint8Array)) {
          throw new TypeError("First argument must be a buffer");
        }
        if (!(b instanceof Uint8Array)) {
          throw new TypeError("Second argument must be a buffer");
        }
        if (a.length !== b.length) {
          throw new TypeError("Input buffers must have the same length");
        }
        const len = a.length;
        let out = 0;
        let i = -1;
        while (++i < len) {
          out |= a[i] ^ b[i];
        }
        return out === 0;
      };
      timing_safe_equal_default = timingSafeEqual;
    }
  });

  // node_modules/jose/dist/browser/lib/crypto_key.js
  function unusable(name, prop = "algorithm.name") {
    return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
  }
  function isAlgorithm(algorithm, name) {
    return algorithm.name === name;
  }
  function getHashLength(hash) {
    return parseInt(hash.name.slice(4), 10);
  }
  function getNamedCurve(alg) {
    switch (alg) {
      case "ES256":
        return "P-256";
      case "ES384":
        return "P-384";
      case "ES512":
        return "P-521";
      default:
        throw new Error("unreachable");
    }
  }
  function checkUsage(key, usages) {
    if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
      let msg = "CryptoKey does not support this operation, its usages must include ";
      if (usages.length > 2) {
        const last = usages.pop();
        msg += `one of ${usages.join(", ")}, or ${last}.`;
      } else if (usages.length === 2) {
        msg += `one of ${usages[0]} or ${usages[1]}.`;
      } else {
        msg += `${usages[0]}.`;
      }
      throw new TypeError(msg);
    }
  }
  function checkSigCryptoKey(key, alg, ...usages) {
    switch (alg) {
      case "HS256":
      case "HS384":
      case "HS512": {
        if (!isAlgorithm(key.algorithm, "HMAC"))
          throw unusable("HMAC");
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected)
          throw unusable(`SHA-${expected}`, "algorithm.hash");
        break;
      }
      case "RS256":
      case "RS384":
      case "RS512": {
        if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
          throw unusable("RSASSA-PKCS1-v1_5");
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected)
          throw unusable(`SHA-${expected}`, "algorithm.hash");
        break;
      }
      case "PS256":
      case "PS384":
      case "PS512": {
        if (!isAlgorithm(key.algorithm, "RSA-PSS"))
          throw unusable("RSA-PSS");
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected)
          throw unusable(`SHA-${expected}`, "algorithm.hash");
        break;
      }
      case "EdDSA": {
        if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
          throw unusable("Ed25519 or Ed448");
        }
        break;
      }
      case "Ed25519": {
        if (!isAlgorithm(key.algorithm, "Ed25519"))
          throw unusable("Ed25519");
        break;
      }
      case "ES256":
      case "ES384":
      case "ES512": {
        if (!isAlgorithm(key.algorithm, "ECDSA"))
          throw unusable("ECDSA");
        const expected = getNamedCurve(alg);
        const actual = key.algorithm.namedCurve;
        if (actual !== expected)
          throw unusable(expected, "algorithm.namedCurve");
        break;
      }
      default:
        throw new TypeError("CryptoKey does not support this operation");
    }
    checkUsage(key, usages);
  }
  function checkEncCryptoKey(key, alg, ...usages) {
    switch (alg) {
      case "A128GCM":
      case "A192GCM":
      case "A256GCM": {
        if (!isAlgorithm(key.algorithm, "AES-GCM"))
          throw unusable("AES-GCM");
        const expected = parseInt(alg.slice(1, 4), 10);
        const actual = key.algorithm.length;
        if (actual !== expected)
          throw unusable(expected, "algorithm.length");
        break;
      }
      case "A128KW":
      case "A192KW":
      case "A256KW": {
        if (!isAlgorithm(key.algorithm, "AES-KW"))
          throw unusable("AES-KW");
        const expected = parseInt(alg.slice(1, 4), 10);
        const actual = key.algorithm.length;
        if (actual !== expected)
          throw unusable(expected, "algorithm.length");
        break;
      }
      case "ECDH": {
        switch (key.algorithm.name) {
          case "ECDH":
          case "X25519":
          case "X448":
            break;
          default:
            throw unusable("ECDH, X25519, or X448");
        }
        break;
      }
      case "PBES2-HS256+A128KW":
      case "PBES2-HS384+A192KW":
      case "PBES2-HS512+A256KW":
        if (!isAlgorithm(key.algorithm, "PBKDF2"))
          throw unusable("PBKDF2");
        break;
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512": {
        if (!isAlgorithm(key.algorithm, "RSA-OAEP"))
          throw unusable("RSA-OAEP");
        const expected = parseInt(alg.slice(9), 10) || 1;
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected)
          throw unusable(`SHA-${expected}`, "algorithm.hash");
        break;
      }
      default:
        throw new TypeError("CryptoKey does not support this operation");
    }
    checkUsage(key, usages);
  }
  var init_crypto_key = __esm({
    "node_modules/jose/dist/browser/lib/crypto_key.js"() {
    }
  });

  // node_modules/jose/dist/browser/lib/invalid_key_input.js
  function message(msg, actual, ...types2) {
    types2 = types2.filter(Boolean);
    if (types2.length > 2) {
      const last = types2.pop();
      msg += `one of type ${types2.join(", ")}, or ${last}.`;
    } else if (types2.length === 2) {
      msg += `one of type ${types2[0]} or ${types2[1]}.`;
    } else {
      msg += `of type ${types2[0]}.`;
    }
    if (actual == null) {
      msg += ` Received ${actual}`;
    } else if (typeof actual === "function" && actual.name) {
      msg += ` Received function ${actual.name}`;
    } else if (typeof actual === "object" && actual != null) {
      if (actual.constructor?.name) {
        msg += ` Received an instance of ${actual.constructor.name}`;
      }
    }
    return msg;
  }
  function withAlg(alg, actual, ...types2) {
    return message(`Key for the ${alg} algorithm must be `, actual, ...types2);
  }
  var invalid_key_input_default;
  var init_invalid_key_input = __esm({
    "node_modules/jose/dist/browser/lib/invalid_key_input.js"() {
      invalid_key_input_default = (actual, ...types2) => {
        return message("Key must be ", actual, ...types2);
      };
    }
  });

  // node_modules/jose/dist/browser/runtime/is_key_like.js
  var is_key_like_default, types;
  var init_is_key_like = __esm({
    "node_modules/jose/dist/browser/runtime/is_key_like.js"() {
      init_webcrypto();
      is_key_like_default = (key) => {
        if (isCryptoKey(key)) {
          return true;
        }
        return key?.[Symbol.toStringTag] === "KeyObject";
      };
      types = ["CryptoKey"];
    }
  });

  // node_modules/jose/dist/browser/runtime/decrypt.js
  async function cbcDecrypt(enc, cek, ciphertext, iv, tag2, aad) {
    if (!(cek instanceof Uint8Array)) {
      throw new TypeError(invalid_key_input_default(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await webcrypto_default.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["decrypt"]);
    const macKey = await webcrypto_default.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
      hash: `SHA-${keySize << 1}`,
      name: "HMAC"
    }, false, ["sign"]);
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const expectedTag = new Uint8Array((await webcrypto_default.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    let macCheckPassed;
    try {
      macCheckPassed = timing_safe_equal_default(tag2, expectedTag);
    } catch {
    }
    if (!macCheckPassed) {
      throw new JWEDecryptionFailed();
    }
    let plaintext;
    try {
      plaintext = new Uint8Array(await webcrypto_default.subtle.decrypt({ iv, name: "AES-CBC" }, encKey, ciphertext));
    } catch {
    }
    if (!plaintext) {
      throw new JWEDecryptionFailed();
    }
    return plaintext;
  }
  async function gcmDecrypt(enc, cek, ciphertext, iv, tag2, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
      encKey = await webcrypto_default.subtle.importKey("raw", cek, "AES-GCM", false, ["decrypt"]);
    } else {
      checkEncCryptoKey(cek, enc, "decrypt");
      encKey = cek;
    }
    try {
      return new Uint8Array(await webcrypto_default.subtle.decrypt({
        additionalData: aad,
        iv,
        name: "AES-GCM",
        tagLength: 128
      }, encKey, concat(ciphertext, tag2)));
    } catch {
      throw new JWEDecryptionFailed();
    }
  }
  var decrypt, decrypt_default;
  var init_decrypt = __esm({
    "node_modules/jose/dist/browser/runtime/decrypt.js"() {
      init_buffer_utils();
      init_check_iv_length();
      init_check_cek_length();
      init_timing_safe_equal();
      init_errors();
      init_webcrypto();
      init_crypto_key();
      init_invalid_key_input();
      init_is_key_like();
      decrypt = async (enc, cek, ciphertext, iv, tag2, aad) => {
        if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
          throw new TypeError(invalid_key_input_default(cek, ...types, "Uint8Array"));
        }
        if (!iv) {
          throw new JWEInvalid("JWE Initialization Vector missing");
        }
        if (!tag2) {
          throw new JWEInvalid("JWE Authentication Tag missing");
        }
        check_iv_length_default(enc, iv);
        switch (enc) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            if (cek instanceof Uint8Array)
              check_cek_length_default(cek, parseInt(enc.slice(-3), 10));
            return cbcDecrypt(enc, cek, ciphertext, iv, tag2, aad);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            if (cek instanceof Uint8Array)
              check_cek_length_default(cek, parseInt(enc.slice(1, 4), 10));
            return gcmDecrypt(enc, cek, ciphertext, iv, tag2, aad);
          default:
            throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
        }
      };
      decrypt_default = decrypt;
    }
  });

  // node_modules/jose/dist/browser/lib/is_disjoint.js
  var isDisjoint, is_disjoint_default;
  var init_is_disjoint = __esm({
    "node_modules/jose/dist/browser/lib/is_disjoint.js"() {
      isDisjoint = (...headers) => {
        const sources = headers.filter(Boolean);
        if (sources.length === 0 || sources.length === 1) {
          return true;
        }
        let acc;
        for (const header of sources) {
          const parameters = Object.keys(header);
          if (!acc || acc.size === 0) {
            acc = new Set(parameters);
            continue;
          }
          for (const parameter of parameters) {
            if (acc.has(parameter)) {
              return false;
            }
            acc.add(parameter);
          }
        }
        return true;
      };
      is_disjoint_default = isDisjoint;
    }
  });

  // node_modules/jose/dist/browser/lib/is_object.js
  function isObjectLike(value) {
    return typeof value === "object" && value !== null;
  }
  function isObject(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
      return false;
    }
    if (Object.getPrototypeOf(input) === null) {
      return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
  }
  var init_is_object = __esm({
    "node_modules/jose/dist/browser/lib/is_object.js"() {
    }
  });

  // node_modules/jose/dist/browser/runtime/bogus.js
  var bogusWebCrypto, bogus_default;
  var init_bogus = __esm({
    "node_modules/jose/dist/browser/runtime/bogus.js"() {
      bogusWebCrypto = [
        { hash: "SHA-256", name: "HMAC" },
        true,
        ["sign"]
      ];
      bogus_default = bogusWebCrypto;
    }
  });

  // node_modules/jose/dist/browser/runtime/aeskw.js
  function checkKeySize(key, alg) {
    if (key.algorithm.length !== parseInt(alg.slice(1, 4), 10)) {
      throw new TypeError(`Invalid key size for alg: ${alg}`);
    }
  }
  function getCryptoKey(key, alg, usage) {
    if (isCryptoKey(key)) {
      checkEncCryptoKey(key, alg, usage);
      return key;
    }
    if (key instanceof Uint8Array) {
      return webcrypto_default.subtle.importKey("raw", key, "AES-KW", true, [usage]);
    }
    throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
  }
  var wrap, unwrap;
  var init_aeskw = __esm({
    "node_modules/jose/dist/browser/runtime/aeskw.js"() {
      init_bogus();
      init_webcrypto();
      init_crypto_key();
      init_invalid_key_input();
      init_is_key_like();
      wrap = async (alg, key, cek) => {
        const cryptoKey = await getCryptoKey(key, alg, "wrapKey");
        checkKeySize(cryptoKey, alg);
        const cryptoKeyCek = await webcrypto_default.subtle.importKey("raw", cek, ...bogus_default);
        return new Uint8Array(await webcrypto_default.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
      };
      unwrap = async (alg, key, encryptedKey) => {
        const cryptoKey = await getCryptoKey(key, alg, "unwrapKey");
        checkKeySize(cryptoKey, alg);
        const cryptoKeyCek = await webcrypto_default.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", ...bogus_default);
        return new Uint8Array(await webcrypto_default.subtle.exportKey("raw", cryptoKeyCek));
      };
    }
  });

  // node_modules/jose/dist/browser/runtime/ecdhes.js
  async function deriveKey(publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
    if (!isCryptoKey(publicKey)) {
      throw new TypeError(invalid_key_input_default(publicKey, ...types));
    }
    checkEncCryptoKey(publicKey, "ECDH");
    if (!isCryptoKey(privateKey)) {
      throw new TypeError(invalid_key_input_default(privateKey, ...types));
    }
    checkEncCryptoKey(privateKey, "ECDH", "deriveBits");
    const value = concat(lengthAndInput(encoder.encode(algorithm)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength));
    let length;
    if (publicKey.algorithm.name === "X25519") {
      length = 256;
    } else if (publicKey.algorithm.name === "X448") {
      length = 448;
    } else {
      length = Math.ceil(parseInt(publicKey.algorithm.namedCurve.substr(-3), 10) / 8) << 3;
    }
    const sharedSecret = new Uint8Array(await webcrypto_default.subtle.deriveBits({
      name: publicKey.algorithm.name,
      public: publicKey
    }, privateKey, length));
    return concatKdf(sharedSecret, keyLength, value);
  }
  async function generateEpk(key) {
    if (!isCryptoKey(key)) {
      throw new TypeError(invalid_key_input_default(key, ...types));
    }
    return webcrypto_default.subtle.generateKey(key.algorithm, true, ["deriveBits"]);
  }
  function ecdhAllowed(key) {
    if (!isCryptoKey(key)) {
      throw new TypeError(invalid_key_input_default(key, ...types));
    }
    return ["P-256", "P-384", "P-521"].includes(key.algorithm.namedCurve) || key.algorithm.name === "X25519" || key.algorithm.name === "X448";
  }
  var init_ecdhes = __esm({
    "node_modules/jose/dist/browser/runtime/ecdhes.js"() {
      init_buffer_utils();
      init_webcrypto();
      init_crypto_key();
      init_invalid_key_input();
      init_is_key_like();
    }
  });

  // node_modules/jose/dist/browser/lib/check_p2s.js
  function checkP2s(p2s2) {
    if (!(p2s2 instanceof Uint8Array) || p2s2.length < 8) {
      throw new JWEInvalid("PBES2 Salt Input must be 8 or more octets");
    }
  }
  var init_check_p2s = __esm({
    "node_modules/jose/dist/browser/lib/check_p2s.js"() {
      init_errors();
    }
  });

  // node_modules/jose/dist/browser/runtime/pbes2kw.js
  function getCryptoKey2(key, alg) {
    if (key instanceof Uint8Array) {
      return webcrypto_default.subtle.importKey("raw", key, "PBKDF2", false, ["deriveBits"]);
    }
    if (isCryptoKey(key)) {
      checkEncCryptoKey(key, alg, "deriveBits", "deriveKey");
      return key;
    }
    throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
  }
  async function deriveKey2(p2s2, alg, p2c, key) {
    checkP2s(p2s2);
    const salt = p2s(alg, p2s2);
    const keylen = parseInt(alg.slice(13, 16), 10);
    const subtleAlg = {
      hash: `SHA-${alg.slice(8, 11)}`,
      iterations: p2c,
      name: "PBKDF2",
      salt
    };
    const wrapAlg = {
      length: keylen,
      name: "AES-KW"
    };
    const cryptoKey = await getCryptoKey2(key, alg);
    if (cryptoKey.usages.includes("deriveBits")) {
      return new Uint8Array(await webcrypto_default.subtle.deriveBits(subtleAlg, cryptoKey, keylen));
    }
    if (cryptoKey.usages.includes("deriveKey")) {
      return webcrypto_default.subtle.deriveKey(subtleAlg, cryptoKey, wrapAlg, false, ["wrapKey", "unwrapKey"]);
    }
    throw new TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
  }
  var encrypt, decrypt2;
  var init_pbes2kw = __esm({
    "node_modules/jose/dist/browser/runtime/pbes2kw.js"() {
      init_random();
      init_buffer_utils();
      init_base64url();
      init_aeskw();
      init_check_p2s();
      init_webcrypto();
      init_crypto_key();
      init_invalid_key_input();
      init_is_key_like();
      encrypt = async (alg, key, cek, p2c = 2048, p2s2 = random_default(new Uint8Array(16))) => {
        const derived = await deriveKey2(p2s2, alg, p2c, key);
        const encryptedKey = await wrap(alg.slice(-6), derived, cek);
        return { encryptedKey, p2c, p2s: encode(p2s2) };
      };
      decrypt2 = async (alg, key, encryptedKey, p2c, p2s2) => {
        const derived = await deriveKey2(p2s2, alg, p2c, key);
        return unwrap(alg.slice(-6), derived, encryptedKey);
      };
    }
  });

  // node_modules/jose/dist/browser/runtime/subtle_rsaes.js
  function subtleRsaEs(alg) {
    switch (alg) {
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512":
        return "RSA-OAEP";
      default:
        throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
  }
  var init_subtle_rsaes = __esm({
    "node_modules/jose/dist/browser/runtime/subtle_rsaes.js"() {
      init_errors();
    }
  });

  // node_modules/jose/dist/browser/runtime/check_key_length.js
  var check_key_length_default;
  var init_check_key_length = __esm({
    "node_modules/jose/dist/browser/runtime/check_key_length.js"() {
      check_key_length_default = (alg, key) => {
        if (alg.startsWith("RS") || alg.startsWith("PS")) {
          const { modulusLength } = key.algorithm;
          if (typeof modulusLength !== "number" || modulusLength < 2048) {
            throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
          }
        }
      };
    }
  });

  // node_modules/jose/dist/browser/runtime/rsaes.js
  var encrypt2, decrypt3;
  var init_rsaes = __esm({
    "node_modules/jose/dist/browser/runtime/rsaes.js"() {
      init_subtle_rsaes();
      init_bogus();
      init_webcrypto();
      init_crypto_key();
      init_check_key_length();
      init_invalid_key_input();
      init_is_key_like();
      encrypt2 = async (alg, key, cek) => {
        if (!isCryptoKey(key)) {
          throw new TypeError(invalid_key_input_default(key, ...types));
        }
        checkEncCryptoKey(key, alg, "encrypt", "wrapKey");
        check_key_length_default(alg, key);
        if (key.usages.includes("encrypt")) {
          return new Uint8Array(await webcrypto_default.subtle.encrypt(subtleRsaEs(alg), key, cek));
        }
        if (key.usages.includes("wrapKey")) {
          const cryptoKeyCek = await webcrypto_default.subtle.importKey("raw", cek, ...bogus_default);
          return new Uint8Array(await webcrypto_default.subtle.wrapKey("raw", cryptoKeyCek, key, subtleRsaEs(alg)));
        }
        throw new TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
      };
      decrypt3 = async (alg, key, encryptedKey) => {
        if (!isCryptoKey(key)) {
          throw new TypeError(invalid_key_input_default(key, ...types));
        }
        checkEncCryptoKey(key, alg, "decrypt", "unwrapKey");
        check_key_length_default(alg, key);
        if (key.usages.includes("decrypt")) {
          return new Uint8Array(await webcrypto_default.subtle.decrypt(subtleRsaEs(alg), key, encryptedKey));
        }
        if (key.usages.includes("unwrapKey")) {
          const cryptoKeyCek = await webcrypto_default.subtle.unwrapKey("raw", encryptedKey, key, subtleRsaEs(alg), ...bogus_default);
          return new Uint8Array(await webcrypto_default.subtle.exportKey("raw", cryptoKeyCek));
        }
        throw new TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
      };
    }
  });

  // node_modules/jose/dist/browser/lib/is_jwk.js
  function isJWK(key) {
    return isObject(key) && typeof key.kty === "string";
  }
  function isPrivateJWK(key) {
    return key.kty !== "oct" && typeof key.d === "string";
  }
  function isPublicJWK(key) {
    return key.kty !== "oct" && typeof key.d === "undefined";
  }
  function isSecretJWK(key) {
    return isJWK(key) && key.kty === "oct" && typeof key.k === "string";
  }
  var init_is_jwk = __esm({
    "node_modules/jose/dist/browser/lib/is_jwk.js"() {
      init_is_object();
    }
  });

  // node_modules/jose/dist/browser/runtime/jwk_to_key.js
  function subtleMapping(jwk) {
    let algorithm;
    let keyUsages;
    switch (jwk.kty) {
      case "RSA": {
        switch (jwk.alg) {
          case "PS256":
          case "PS384":
          case "PS512":
            algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            algorithm = {
              name: "RSA-OAEP",
              hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
            };
            keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
            break;
          default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
      case "EC": {
        switch (jwk.alg) {
          case "ES256":
            algorithm = { name: "ECDSA", namedCurve: "P-256" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ES384":
            algorithm = { name: "ECDSA", namedCurve: "P-384" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ES512":
            algorithm = { name: "ECDSA", namedCurve: "P-521" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW":
            algorithm = { name: "ECDH", namedCurve: jwk.crv };
            keyUsages = jwk.d ? ["deriveBits"] : [];
            break;
          default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
      case "OKP": {
        switch (jwk.alg) {
          case "Ed25519":
            algorithm = { name: "Ed25519" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "EdDSA":
            algorithm = { name: jwk.crv };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW":
            algorithm = { name: jwk.crv };
            keyUsages = jwk.d ? ["deriveBits"] : [];
            break;
          default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
      default:
        throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
    }
    return { algorithm, keyUsages };
  }
  var parse, jwk_to_key_default;
  var init_jwk_to_key = __esm({
    "node_modules/jose/dist/browser/runtime/jwk_to_key.js"() {
      init_webcrypto();
      init_errors();
      parse = async (jwk) => {
        if (!jwk.alg) {
          throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
        }
        const { algorithm, keyUsages } = subtleMapping(jwk);
        const rest = [
          algorithm,
          jwk.ext ?? false,
          jwk.key_ops ?? keyUsages
        ];
        const keyData = { ...jwk };
        delete keyData.alg;
        delete keyData.use;
        return webcrypto_default.subtle.importKey("jwk", keyData, ...rest);
      };
      jwk_to_key_default = parse;
    }
  });

  // node_modules/jose/dist/browser/runtime/normalize_key.js
  var exportKeyValue, privCache, pubCache, isKeyObject, importAndCache, normalizePublicKey, normalizePrivateKey, normalize_key_default;
  var init_normalize_key = __esm({
    "node_modules/jose/dist/browser/runtime/normalize_key.js"() {
      init_is_jwk();
      init_base64url();
      init_jwk_to_key();
      exportKeyValue = (k) => decode(k);
      isKeyObject = (key) => {
        return key?.[Symbol.toStringTag] === "KeyObject";
      };
      importAndCache = async (cache, key, jwk, alg, freeze = false) => {
        let cached = cache.get(key);
        if (cached?.[alg]) {
          return cached[alg];
        }
        const cryptoKey = await jwk_to_key_default({ ...jwk, alg });
        if (freeze)
          Object.freeze(key);
        if (!cached) {
          cache.set(key, { [alg]: cryptoKey });
        } else {
          cached[alg] = cryptoKey;
        }
        return cryptoKey;
      };
      normalizePublicKey = (key, alg) => {
        if (isKeyObject(key)) {
          let jwk = key.export({ format: "jwk" });
          delete jwk.d;
          delete jwk.dp;
          delete jwk.dq;
          delete jwk.p;
          delete jwk.q;
          delete jwk.qi;
          if (jwk.k) {
            return exportKeyValue(jwk.k);
          }
          pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
          return importAndCache(pubCache, key, jwk, alg);
        }
        if (isJWK(key)) {
          if (key.k)
            return decode(key.k);
          pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
          const cryptoKey = importAndCache(pubCache, key, key, alg, true);
          return cryptoKey;
        }
        return key;
      };
      normalizePrivateKey = (key, alg) => {
        if (isKeyObject(key)) {
          let jwk = key.export({ format: "jwk" });
          if (jwk.k) {
            return exportKeyValue(jwk.k);
          }
          privCache || (privCache = /* @__PURE__ */ new WeakMap());
          return importAndCache(privCache, key, jwk, alg);
        }
        if (isJWK(key)) {
          if (key.k)
            return decode(key.k);
          privCache || (privCache = /* @__PURE__ */ new WeakMap());
          const cryptoKey = importAndCache(privCache, key, key, alg, true);
          return cryptoKey;
        }
        return key;
      };
      normalize_key_default = { normalizePublicKey, normalizePrivateKey };
    }
  });

  // node_modules/jose/dist/browser/lib/cek.js
  function bitLength2(alg) {
    switch (alg) {
      case "A128GCM":
        return 128;
      case "A192GCM":
        return 192;
      case "A256GCM":
      case "A128CBC-HS256":
        return 256;
      case "A192CBC-HS384":
        return 384;
      case "A256CBC-HS512":
        return 512;
      default:
        throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
  }
  var cek_default;
  var init_cek = __esm({
    "node_modules/jose/dist/browser/lib/cek.js"() {
      init_errors();
      init_random();
      cek_default = (alg) => random_default(new Uint8Array(bitLength2(alg) >> 3));
    }
  });

  // node_modules/jose/dist/browser/lib/format_pem.js
  var format_pem_default;
  var init_format_pem = __esm({
    "node_modules/jose/dist/browser/lib/format_pem.js"() {
      format_pem_default = (b64, descriptor) => {
        const newlined = (b64.match(/.{1,64}/g) || []).join("\n");
        return `-----BEGIN ${descriptor}-----
${newlined}
-----END ${descriptor}-----`;
      };
    }
  });

  // node_modules/jose/dist/browser/runtime/asn1.js
  function getElement(seq) {
    const result = [];
    let next = 0;
    while (next < seq.length) {
      const nextPart = parseElement(seq.subarray(next));
      result.push(nextPart);
      next += nextPart.byteLength;
    }
    return result;
  }
  function parseElement(bytes2) {
    let position = 0;
    let tag2 = bytes2[0] & 31;
    position++;
    if (tag2 === 31) {
      tag2 = 0;
      while (bytes2[position] >= 128) {
        tag2 = tag2 * 128 + bytes2[position] - 128;
        position++;
      }
      tag2 = tag2 * 128 + bytes2[position] - 128;
      position++;
    }
    let length = 0;
    if (bytes2[position] < 128) {
      length = bytes2[position];
      position++;
    } else if (length === 128) {
      length = 0;
      while (bytes2[position + length] !== 0 || bytes2[position + length + 1] !== 0) {
        if (length > bytes2.byteLength) {
          throw new TypeError("invalid indefinite form length");
        }
        length++;
      }
      const byteLength2 = position + length + 2;
      return {
        byteLength: byteLength2,
        contents: bytes2.subarray(position, position + length),
        raw: bytes2.subarray(0, byteLength2)
      };
    } else {
      const numberOfDigits = bytes2[position] & 127;
      position++;
      length = 0;
      for (let i = 0; i < numberOfDigits; i++) {
        length = length * 256 + bytes2[position];
        position++;
      }
    }
    const byteLength = position + length;
    return {
      byteLength,
      contents: bytes2.subarray(position, byteLength),
      raw: bytes2.subarray(0, byteLength)
    };
  }
  function spkiFromX509(buf) {
    const tbsCertificate = getElement(getElement(parseElement(buf).contents)[0].contents);
    return encodeBase64(tbsCertificate[tbsCertificate[0].raw[0] === 160 ? 6 : 5].raw);
  }
  function getSPKI(x509) {
    const pem = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, "");
    const raw = decodeBase64(pem);
    return format_pem_default(spkiFromX509(raw), "PUBLIC KEY");
  }
  var genericExport, toSPKI, toPKCS8, findOid, getNamedCurve2, genericImport, fromPKCS8, fromSPKI, fromX509;
  var init_asn1 = __esm({
    "node_modules/jose/dist/browser/runtime/asn1.js"() {
      init_webcrypto();
      init_invalid_key_input();
      init_base64url();
      init_format_pem();
      init_errors();
      init_is_key_like();
      genericExport = async (keyType, keyFormat, key) => {
        if (!isCryptoKey(key)) {
          throw new TypeError(invalid_key_input_default(key, ...types));
        }
        if (!key.extractable) {
          throw new TypeError("CryptoKey is not extractable");
        }
        if (key.type !== keyType) {
          throw new TypeError(`key is not a ${keyType} key`);
        }
        return format_pem_default(encodeBase64(new Uint8Array(await webcrypto_default.subtle.exportKey(keyFormat, key))), `${keyType.toUpperCase()} KEY`);
      };
      toSPKI = (key) => {
        return genericExport("public", "spki", key);
      };
      toPKCS8 = (key) => {
        return genericExport("private", "pkcs8", key);
      };
      findOid = (keyData, oid, from = 0) => {
        if (from === 0) {
          oid.unshift(oid.length);
          oid.unshift(6);
        }
        const i = keyData.indexOf(oid[0], from);
        if (i === -1)
          return false;
        const sub = keyData.subarray(i, i + oid.length);
        if (sub.length !== oid.length)
          return false;
        return sub.every((value, index) => value === oid[index]) || findOid(keyData, oid, i + 1);
      };
      getNamedCurve2 = (keyData) => {
        switch (true) {
          case findOid(keyData, [42, 134, 72, 206, 61, 3, 1, 7]):
            return "P-256";
          case findOid(keyData, [43, 129, 4, 0, 34]):
            return "P-384";
          case findOid(keyData, [43, 129, 4, 0, 35]):
            return "P-521";
          case findOid(keyData, [43, 101, 110]):
            return "X25519";
          case findOid(keyData, [43, 101, 111]):
            return "X448";
          case findOid(keyData, [43, 101, 112]):
            return "Ed25519";
          case findOid(keyData, [43, 101, 113]):
            return "Ed448";
          default:
            throw new JOSENotSupported("Invalid or unsupported EC Key Curve or OKP Key Sub Type");
        }
      };
      genericImport = async (replace, keyFormat, pem, alg, options) => {
        let algorithm;
        let keyUsages;
        const keyData = new Uint8Array(atob(pem.replace(replace, "")).split("").map((c) => c.charCodeAt(0)));
        const isPublic = keyFormat === "spki";
        switch (alg) {
          case "PS256":
          case "PS384":
          case "PS512":
            algorithm = { name: "RSA-PSS", hash: `SHA-${alg.slice(-3)}` };
            keyUsages = isPublic ? ["verify"] : ["sign"];
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${alg.slice(-3)}` };
            keyUsages = isPublic ? ["verify"] : ["sign"];
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            algorithm = {
              name: "RSA-OAEP",
              hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`
            };
            keyUsages = isPublic ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
            break;
          case "ES256":
            algorithm = { name: "ECDSA", namedCurve: "P-256" };
            keyUsages = isPublic ? ["verify"] : ["sign"];
            break;
          case "ES384":
            algorithm = { name: "ECDSA", namedCurve: "P-384" };
            keyUsages = isPublic ? ["verify"] : ["sign"];
            break;
          case "ES512":
            algorithm = { name: "ECDSA", namedCurve: "P-521" };
            keyUsages = isPublic ? ["verify"] : ["sign"];
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            const namedCurve = getNamedCurve2(keyData);
            algorithm = namedCurve.startsWith("P-") ? { name: "ECDH", namedCurve } : { name: namedCurve };
            keyUsages = isPublic ? [] : ["deriveBits"];
            break;
          }
          case "Ed25519":
            algorithm = { name: "Ed25519" };
            keyUsages = isPublic ? ["verify"] : ["sign"];
            break;
          case "EdDSA":
            algorithm = { name: getNamedCurve2(keyData) };
            keyUsages = isPublic ? ["verify"] : ["sign"];
            break;
          default:
            throw new JOSENotSupported('Invalid or unsupported "alg" (Algorithm) value');
        }
        return webcrypto_default.subtle.importKey(keyFormat, keyData, algorithm, options?.extractable ?? false, keyUsages);
      };
      fromPKCS8 = (pem, alg, options) => {
        return genericImport(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", pem, alg, options);
      };
      fromSPKI = (pem, alg, options) => {
        return genericImport(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, "spki", pem, alg, options);
      };
      fromX509 = (pem, alg, options) => {
        let spki;
        try {
          spki = getSPKI(pem);
        } catch (cause) {
          throw new TypeError("Failed to parse the X.509 certificate", { cause });
        }
        return fromSPKI(spki, alg, options);
      };
    }
  });

  // node_modules/jose/dist/browser/key/import.js
  async function importSPKI(spki, alg, options) {
    if (typeof spki !== "string" || spki.indexOf("-----BEGIN PUBLIC KEY-----") !== 0) {
      throw new TypeError('"spki" must be SPKI formatted string');
    }
    return fromSPKI(spki, alg, options);
  }
  async function importX509(x509, alg, options) {
    if (typeof x509 !== "string" || x509.indexOf("-----BEGIN CERTIFICATE-----") !== 0) {
      throw new TypeError('"x509" must be X.509 formatted string');
    }
    return fromX509(x509, alg, options);
  }
  async function importPKCS8(pkcs8, alg, options) {
    if (typeof pkcs8 !== "string" || pkcs8.indexOf("-----BEGIN PRIVATE KEY-----") !== 0) {
      throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
    }
    return fromPKCS8(pkcs8, alg, options);
  }
  async function importJWK(jwk, alg) {
    if (!isObject(jwk)) {
      throw new TypeError("JWK must be an object");
    }
    alg || (alg = jwk.alg);
    switch (jwk.kty) {
      case "oct":
        if (typeof jwk.k !== "string" || !jwk.k) {
          throw new TypeError('missing "k" (Key Value) Parameter value');
        }
        return decode(jwk.k);
      case "RSA":
        if ("oth" in jwk && jwk.oth !== void 0) {
          throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
        }
      case "EC":
      case "OKP":
        return jwk_to_key_default({ ...jwk, alg });
      default:
        throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
  }
  var init_import = __esm({
    "node_modules/jose/dist/browser/key/import.js"() {
      init_base64url();
      init_asn1();
      init_jwk_to_key();
      init_errors();
      init_is_object();
    }
  });

  // node_modules/jose/dist/browser/lib/check_key_type.js
  function checkKeyType(allowJwk, alg, key, usage) {
    const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
    if (symmetric) {
      symmetricTypeCheck(alg, key, usage, allowJwk);
    } else {
      asymmetricTypeCheck(alg, key, usage, allowJwk);
    }
  }
  var tag, jwkMatchesOp, symmetricTypeCheck, asymmetricTypeCheck, check_key_type_default, checkKeyTypeWithJwk;
  var init_check_key_type = __esm({
    "node_modules/jose/dist/browser/lib/check_key_type.js"() {
      init_invalid_key_input();
      init_is_key_like();
      init_is_jwk();
      tag = (key) => key?.[Symbol.toStringTag];
      jwkMatchesOp = (alg, key, usage) => {
        if (key.use !== void 0 && key.use !== "sig") {
          throw new TypeError("Invalid key for this operation, when present its use must be sig");
        }
        if (key.key_ops !== void 0 && key.key_ops.includes?.(usage) !== true) {
          throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${usage}`);
        }
        if (key.alg !== void 0 && key.alg !== alg) {
          throw new TypeError(`Invalid key for this operation, when present its alg must be ${alg}`);
        }
        return true;
      };
      symmetricTypeCheck = (alg, key, usage, allowJwk) => {
        if (key instanceof Uint8Array)
          return;
        if (allowJwk && isJWK(key)) {
          if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage))
            return;
          throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
        }
        if (!is_key_like_default(key)) {
          throw new TypeError(withAlg(alg, key, ...types, "Uint8Array", allowJwk ? "JSON Web Key" : null));
        }
        if (key.type !== "secret") {
          throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
        }
      };
      asymmetricTypeCheck = (alg, key, usage, allowJwk) => {
        if (allowJwk && isJWK(key)) {
          switch (usage) {
            case "sign":
              if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage))
                return;
              throw new TypeError(`JSON Web Key for this operation be a private JWK`);
            case "verify":
              if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage))
                return;
              throw new TypeError(`JSON Web Key for this operation be a public JWK`);
          }
        }
        if (!is_key_like_default(key)) {
          throw new TypeError(withAlg(alg, key, ...types, allowJwk ? "JSON Web Key" : null));
        }
        if (key.type === "secret") {
          throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
        }
        if (usage === "sign" && key.type === "public") {
          throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
        }
        if (usage === "decrypt" && key.type === "public") {
          throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
        }
        if (key.algorithm && usage === "verify" && key.type === "private") {
          throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
        }
        if (key.algorithm && usage === "encrypt" && key.type === "private") {
          throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
        }
      };
      check_key_type_default = checkKeyType.bind(void 0, false);
      checkKeyTypeWithJwk = checkKeyType.bind(void 0, true);
    }
  });

  // node_modules/jose/dist/browser/runtime/encrypt.js
  async function cbcEncrypt(enc, plaintext, cek, iv, aad) {
    if (!(cek instanceof Uint8Array)) {
      throw new TypeError(invalid_key_input_default(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await webcrypto_default.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["encrypt"]);
    const macKey = await webcrypto_default.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
      hash: `SHA-${keySize << 1}`,
      name: "HMAC"
    }, false, ["sign"]);
    const ciphertext = new Uint8Array(await webcrypto_default.subtle.encrypt({
      iv,
      name: "AES-CBC"
    }, encKey, plaintext));
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const tag2 = new Uint8Array((await webcrypto_default.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    return { ciphertext, tag: tag2, iv };
  }
  async function gcmEncrypt(enc, plaintext, cek, iv, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
      encKey = await webcrypto_default.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
    } else {
      checkEncCryptoKey(cek, enc, "encrypt");
      encKey = cek;
    }
    const encrypted = new Uint8Array(await webcrypto_default.subtle.encrypt({
      additionalData: aad,
      iv,
      name: "AES-GCM",
      tagLength: 128
    }, encKey, plaintext));
    const tag2 = encrypted.slice(-16);
    const ciphertext = encrypted.slice(0, -16);
    return { ciphertext, tag: tag2, iv };
  }
  var encrypt3, encrypt_default;
  var init_encrypt = __esm({
    "node_modules/jose/dist/browser/runtime/encrypt.js"() {
      init_buffer_utils();
      init_check_iv_length();
      init_check_cek_length();
      init_webcrypto();
      init_crypto_key();
      init_invalid_key_input();
      init_iv();
      init_errors();
      init_is_key_like();
      encrypt3 = async (enc, plaintext, cek, iv, aad) => {
        if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
          throw new TypeError(invalid_key_input_default(cek, ...types, "Uint8Array"));
        }
        if (iv) {
          check_iv_length_default(enc, iv);
        } else {
          iv = iv_default(enc);
        }
        switch (enc) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            if (cek instanceof Uint8Array) {
              check_cek_length_default(cek, parseInt(enc.slice(-3), 10));
            }
            return cbcEncrypt(enc, plaintext, cek, iv, aad);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            if (cek instanceof Uint8Array) {
              check_cek_length_default(cek, parseInt(enc.slice(1, 4), 10));
            }
            return gcmEncrypt(enc, plaintext, cek, iv, aad);
          default:
            throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
        }
      };
      encrypt_default = encrypt3;
    }
  });

  // node_modules/jose/dist/browser/lib/aesgcmkw.js
  async function wrap2(alg, key, cek, iv) {
    const jweAlgorithm = alg.slice(0, 7);
    const wrapped = await encrypt_default(jweAlgorithm, cek, key, iv, new Uint8Array(0));
    return {
      encryptedKey: wrapped.ciphertext,
      iv: encode(wrapped.iv),
      tag: encode(wrapped.tag)
    };
  }
  async function unwrap2(alg, key, encryptedKey, iv, tag2) {
    const jweAlgorithm = alg.slice(0, 7);
    return decrypt_default(jweAlgorithm, key, encryptedKey, iv, tag2, new Uint8Array(0));
  }
  var init_aesgcmkw = __esm({
    "node_modules/jose/dist/browser/lib/aesgcmkw.js"() {
      init_encrypt();
      init_decrypt();
      init_base64url();
    }
  });

  // node_modules/jose/dist/browser/lib/decrypt_key_management.js
  async function decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
    check_key_type_default(alg, key, "decrypt");
    key = await normalize_key_default.normalizePrivateKey?.(key, alg) || key;
    switch (alg) {
      case "dir": {
        if (encryptedKey !== void 0)
          throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
        return key;
      }
      case "ECDH-ES":
        if (encryptedKey !== void 0)
          throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW": {
        if (!isObject(joseHeader.epk))
          throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
        if (!ecdhAllowed(key))
          throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
        const epk = await importJWK(joseHeader.epk, alg);
        let partyUInfo;
        let partyVInfo;
        if (joseHeader.apu !== void 0) {
          if (typeof joseHeader.apu !== "string")
            throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
          try {
            partyUInfo = decode(joseHeader.apu);
          } catch {
            throw new JWEInvalid("Failed to base64url decode the apu");
          }
        }
        if (joseHeader.apv !== void 0) {
          if (typeof joseHeader.apv !== "string")
            throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
          try {
            partyVInfo = decode(joseHeader.apv);
          } catch {
            throw new JWEInvalid("Failed to base64url decode the apv");
          }
        }
        const sharedSecret = await deriveKey(epk, key, alg === "ECDH-ES" ? joseHeader.enc : alg, alg === "ECDH-ES" ? bitLength2(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
        if (alg === "ECDH-ES")
          return sharedSecret;
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        return unwrap(alg.slice(-6), sharedSecret, encryptedKey);
      }
      case "RSA1_5":
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        return decrypt3(alg, key, encryptedKey);
      }
      case "PBES2-HS256+A128KW":
      case "PBES2-HS384+A192KW":
      case "PBES2-HS512+A256KW": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        if (typeof joseHeader.p2c !== "number")
          throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
        const p2cLimit = options?.maxPBES2Count || 1e4;
        if (joseHeader.p2c > p2cLimit)
          throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
        if (typeof joseHeader.p2s !== "string")
          throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
        let p2s2;
        try {
          p2s2 = decode(joseHeader.p2s);
        } catch {
          throw new JWEInvalid("Failed to base64url decode the p2s");
        }
        return decrypt2(alg, key, encryptedKey, joseHeader.p2c, p2s2);
      }
      case "A128KW":
      case "A192KW":
      case "A256KW": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        return unwrap(alg, key, encryptedKey);
      }
      case "A128GCMKW":
      case "A192GCMKW":
      case "A256GCMKW": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        if (typeof joseHeader.iv !== "string")
          throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
        if (typeof joseHeader.tag !== "string")
          throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
        let iv;
        try {
          iv = decode(joseHeader.iv);
        } catch {
          throw new JWEInvalid("Failed to base64url decode the iv");
        }
        let tag2;
        try {
          tag2 = decode(joseHeader.tag);
        } catch {
          throw new JWEInvalid("Failed to base64url decode the tag");
        }
        return unwrap2(alg, key, encryptedKey, iv, tag2);
      }
      default: {
        throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
      }
    }
  }
  var decrypt_key_management_default;
  var init_decrypt_key_management = __esm({
    "node_modules/jose/dist/browser/lib/decrypt_key_management.js"() {
      init_aeskw();
      init_ecdhes();
      init_pbes2kw();
      init_rsaes();
      init_base64url();
      init_normalize_key();
      init_errors();
      init_cek();
      init_import();
      init_check_key_type();
      init_is_object();
      init_aesgcmkw();
      decrypt_key_management_default = decryptKeyManagement;
    }
  });

  // node_modules/jose/dist/browser/lib/validate_crit.js
  function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) {
      throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === void 0) {
      return /* @__PURE__ */ new Set();
    }
    if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
      throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== void 0) {
      recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
    } else {
      recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit) {
      if (!recognized.has(parameter)) {
        throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
      }
      if (joseHeader[parameter] === void 0) {
        throw new Err(`Extension Header Parameter "${parameter}" is missing`);
      }
      if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
        throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
      }
    }
    return new Set(protectedHeader.crit);
  }
  var validate_crit_default;
  var init_validate_crit = __esm({
    "node_modules/jose/dist/browser/lib/validate_crit.js"() {
      init_errors();
      validate_crit_default = validateCrit;
    }
  });

  // node_modules/jose/dist/browser/lib/validate_algorithms.js
  var validateAlgorithms, validate_algorithms_default;
  var init_validate_algorithms = __esm({
    "node_modules/jose/dist/browser/lib/validate_algorithms.js"() {
      validateAlgorithms = (option, algorithms) => {
        if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
          throw new TypeError(`"${option}" option must be an array of strings`);
        }
        if (!algorithms) {
          return void 0;
        }
        return new Set(algorithms);
      };
      validate_algorithms_default = validateAlgorithms;
    }
  });

  // node_modules/jose/dist/browser/jwe/flattened/decrypt.js
  async function flattenedDecrypt(jwe, key, options) {
    if (!isObject(jwe)) {
      throw new JWEInvalid("Flattened JWE must be an object");
    }
    if (jwe.protected === void 0 && jwe.header === void 0 && jwe.unprotected === void 0) {
      throw new JWEInvalid("JOSE Header missing");
    }
    if (jwe.iv !== void 0 && typeof jwe.iv !== "string") {
      throw new JWEInvalid("JWE Initialization Vector incorrect type");
    }
    if (typeof jwe.ciphertext !== "string") {
      throw new JWEInvalid("JWE Ciphertext missing or incorrect type");
    }
    if (jwe.tag !== void 0 && typeof jwe.tag !== "string") {
      throw new JWEInvalid("JWE Authentication Tag incorrect type");
    }
    if (jwe.protected !== void 0 && typeof jwe.protected !== "string") {
      throw new JWEInvalid("JWE Protected Header incorrect type");
    }
    if (jwe.encrypted_key !== void 0 && typeof jwe.encrypted_key !== "string") {
      throw new JWEInvalid("JWE Encrypted Key incorrect type");
    }
    if (jwe.aad !== void 0 && typeof jwe.aad !== "string") {
      throw new JWEInvalid("JWE AAD incorrect type");
    }
    if (jwe.header !== void 0 && !isObject(jwe.header)) {
      throw new JWEInvalid("JWE Shared Unprotected Header incorrect type");
    }
    if (jwe.unprotected !== void 0 && !isObject(jwe.unprotected)) {
      throw new JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
    }
    let parsedProt;
    if (jwe.protected) {
      try {
        const protectedHeader2 = decode(jwe.protected);
        parsedProt = JSON.parse(decoder.decode(protectedHeader2));
      } catch {
        throw new JWEInvalid("JWE Protected Header is invalid");
      }
    }
    if (!is_disjoint_default(parsedProt, jwe.header, jwe.unprotected)) {
      throw new JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
      ...parsedProt,
      ...jwe.header,
      ...jwe.unprotected
    };
    validate_crit_default(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, parsedProt, joseHeader);
    if (joseHeader.zip !== void 0) {
      throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    }
    const { alg, enc } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
    }
    if (typeof enc !== "string" || !enc) {
      throw new JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
    }
    const keyManagementAlgorithms = options && validate_algorithms_default("keyManagementAlgorithms", options.keyManagementAlgorithms);
    const contentEncryptionAlgorithms = options && validate_algorithms_default("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
    if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg) || !keyManagementAlgorithms && alg.startsWith("PBES2")) {
      throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
    }
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
      throw new JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter value not allowed');
    }
    let encryptedKey;
    if (jwe.encrypted_key !== void 0) {
      try {
        encryptedKey = decode(jwe.encrypted_key);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the encrypted_key");
      }
    }
    let resolvedKey = false;
    if (typeof key === "function") {
      key = await key(parsedProt, jwe);
      resolvedKey = true;
    }
    let cek;
    try {
      cek = await decrypt_key_management_default(alg, key, encryptedKey, joseHeader, options);
    } catch (err) {
      if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported) {
        throw err;
      }
      cek = cek_default(enc);
    }
    let iv;
    let tag2;
    if (jwe.iv !== void 0) {
      try {
        iv = decode(jwe.iv);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the iv");
      }
    }
    if (jwe.tag !== void 0) {
      try {
        tag2 = decode(jwe.tag);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the tag");
      }
    }
    const protectedHeader = encoder.encode(jwe.protected ?? "");
    let additionalData;
    if (jwe.aad !== void 0) {
      additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(jwe.aad));
    } else {
      additionalData = protectedHeader;
    }
    let ciphertext;
    try {
      ciphertext = decode(jwe.ciphertext);
    } catch {
      throw new JWEInvalid("Failed to base64url decode the ciphertext");
    }
    const plaintext = await decrypt_default(enc, cek, ciphertext, iv, tag2, additionalData);
    const result = { plaintext };
    if (jwe.protected !== void 0) {
      result.protectedHeader = parsedProt;
    }
    if (jwe.aad !== void 0) {
      try {
        result.additionalAuthenticatedData = decode(jwe.aad);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the aad");
      }
    }
    if (jwe.unprotected !== void 0) {
      result.sharedUnprotectedHeader = jwe.unprotected;
    }
    if (jwe.header !== void 0) {
      result.unprotectedHeader = jwe.header;
    }
    if (resolvedKey) {
      return { ...result, key };
    }
    return result;
  }
  var init_decrypt2 = __esm({
    "node_modules/jose/dist/browser/jwe/flattened/decrypt.js"() {
      init_base64url();
      init_decrypt();
      init_errors();
      init_is_disjoint();
      init_is_object();
      init_decrypt_key_management();
      init_buffer_utils();
      init_cek();
      init_validate_crit();
      init_validate_algorithms();
    }
  });

  // node_modules/jose/dist/browser/jwe/compact/decrypt.js
  async function compactDecrypt(jwe, key, options) {
    if (jwe instanceof Uint8Array) {
      jwe = decoder.decode(jwe);
    }
    if (typeof jwe !== "string") {
      throw new JWEInvalid("Compact JWE must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag2, length } = jwe.split(".");
    if (length !== 5) {
      throw new JWEInvalid("Invalid Compact JWE");
    }
    const decrypted = await flattenedDecrypt({
      ciphertext,
      iv: iv || void 0,
      protected: protectedHeader,
      tag: tag2 || void 0,
      encrypted_key: encryptedKey || void 0
    }, key, options);
    const result = { plaintext: decrypted.plaintext, protectedHeader: decrypted.protectedHeader };
    if (typeof key === "function") {
      return { ...result, key: decrypted.key };
    }
    return result;
  }
  var init_decrypt3 = __esm({
    "node_modules/jose/dist/browser/jwe/compact/decrypt.js"() {
      init_decrypt2();
      init_errors();
      init_buffer_utils();
    }
  });

  // node_modules/jose/dist/browser/jwe/general/decrypt.js
  async function generalDecrypt(jwe, key, options) {
    if (!isObject(jwe)) {
      throw new JWEInvalid("General JWE must be an object");
    }
    if (!Array.isArray(jwe.recipients) || !jwe.recipients.every(isObject)) {
      throw new JWEInvalid("JWE Recipients missing or incorrect type");
    }
    if (!jwe.recipients.length) {
      throw new JWEInvalid("JWE Recipients has no members");
    }
    for (const recipient of jwe.recipients) {
      try {
        return await flattenedDecrypt({
          aad: jwe.aad,
          ciphertext: jwe.ciphertext,
          encrypted_key: recipient.encrypted_key,
          header: recipient.header,
          iv: jwe.iv,
          protected: jwe.protected,
          tag: jwe.tag,
          unprotected: jwe.unprotected
        }, key, options);
      } catch {
      }
    }
    throw new JWEDecryptionFailed();
  }
  var init_decrypt4 = __esm({
    "node_modules/jose/dist/browser/jwe/general/decrypt.js"() {
      init_decrypt2();
      init_errors();
      init_is_object();
    }
  });

  // node_modules/jose/dist/browser/lib/private_symbols.js
  var unprotected;
  var init_private_symbols = __esm({
    "node_modules/jose/dist/browser/lib/private_symbols.js"() {
      unprotected = /* @__PURE__ */ Symbol();
    }
  });

  // node_modules/jose/dist/browser/runtime/key_to_jwk.js
  var keyToJWK, key_to_jwk_default;
  var init_key_to_jwk = __esm({
    "node_modules/jose/dist/browser/runtime/key_to_jwk.js"() {
      init_webcrypto();
      init_invalid_key_input();
      init_base64url();
      init_is_key_like();
      keyToJWK = async (key) => {
        if (key instanceof Uint8Array) {
          return {
            kty: "oct",
            k: encode(key)
          };
        }
        if (!isCryptoKey(key)) {
          throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
        }
        if (!key.extractable) {
          throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        }
        const { ext, key_ops, alg, use, ...jwk } = await webcrypto_default.subtle.exportKey("jwk", key);
        return jwk;
      };
      key_to_jwk_default = keyToJWK;
    }
  });

  // node_modules/jose/dist/browser/key/export.js
  async function exportSPKI(key) {
    return toSPKI(key);
  }
  async function exportPKCS8(key) {
    return toPKCS8(key);
  }
  async function exportJWK(key) {
    return key_to_jwk_default(key);
  }
  var init_export = __esm({
    "node_modules/jose/dist/browser/key/export.js"() {
      init_asn1();
      init_asn1();
      init_key_to_jwk();
    }
  });

  // node_modules/jose/dist/browser/lib/encrypt_key_management.js
  async function encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
    let encryptedKey;
    let parameters;
    let cek;
    check_key_type_default(alg, key, "encrypt");
    key = await normalize_key_default.normalizePublicKey?.(key, alg) || key;
    switch (alg) {
      case "dir": {
        cek = key;
        break;
      }
      case "ECDH-ES":
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW": {
        if (!ecdhAllowed(key)) {
          throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
        }
        const { apu, apv } = providedParameters;
        let { epk: ephemeralKey } = providedParameters;
        ephemeralKey || (ephemeralKey = (await generateEpk(key)).privateKey);
        const { x, y, crv, kty } = await exportJWK(ephemeralKey);
        const sharedSecret = await deriveKey(key, ephemeralKey, alg === "ECDH-ES" ? enc : alg, alg === "ECDH-ES" ? bitLength2(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
        parameters = { epk: { x, crv, kty } };
        if (kty === "EC")
          parameters.epk.y = y;
        if (apu)
          parameters.apu = encode(apu);
        if (apv)
          parameters.apv = encode(apv);
        if (alg === "ECDH-ES") {
          cek = sharedSecret;
          break;
        }
        cek = providedCek || cek_default(enc);
        const kwAlg = alg.slice(-6);
        encryptedKey = await wrap(kwAlg, sharedSecret, cek);
        break;
      }
      case "RSA1_5":
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512": {
        cek = providedCek || cek_default(enc);
        encryptedKey = await encrypt2(alg, key, cek);
        break;
      }
      case "PBES2-HS256+A128KW":
      case "PBES2-HS384+A192KW":
      case "PBES2-HS512+A256KW": {
        cek = providedCek || cek_default(enc);
        const { p2c, p2s: p2s2 } = providedParameters;
        ({ encryptedKey, ...parameters } = await encrypt(alg, key, cek, p2c, p2s2));
        break;
      }
      case "A128KW":
      case "A192KW":
      case "A256KW": {
        cek = providedCek || cek_default(enc);
        encryptedKey = await wrap(alg, key, cek);
        break;
      }
      case "A128GCMKW":
      case "A192GCMKW":
      case "A256GCMKW": {
        cek = providedCek || cek_default(enc);
        const { iv } = providedParameters;
        ({ encryptedKey, ...parameters } = await wrap2(alg, key, cek, iv));
        break;
      }
      default: {
        throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
      }
    }
    return { cek, encryptedKey, parameters };
  }
  var encrypt_key_management_default;
  var init_encrypt_key_management = __esm({
    "node_modules/jose/dist/browser/lib/encrypt_key_management.js"() {
      init_aeskw();
      init_ecdhes();
      init_pbes2kw();
      init_rsaes();
      init_base64url();
      init_normalize_key();
      init_cek();
      init_errors();
      init_export();
      init_check_key_type();
      init_aesgcmkw();
      encrypt_key_management_default = encryptKeyManagement;
    }
  });

  // node_modules/jose/dist/browser/jwe/flattened/encrypt.js
  var FlattenedEncrypt;
  var init_encrypt2 = __esm({
    "node_modules/jose/dist/browser/jwe/flattened/encrypt.js"() {
      init_base64url();
      init_private_symbols();
      init_encrypt();
      init_encrypt_key_management();
      init_errors();
      init_is_disjoint();
      init_buffer_utils();
      init_validate_crit();
      FlattenedEncrypt = class {
        constructor(plaintext) {
          if (!(plaintext instanceof Uint8Array)) {
            throw new TypeError("plaintext must be an instance of Uint8Array");
          }
          this._plaintext = plaintext;
        }
        setKeyManagementParameters(parameters) {
          if (this._keyManagementParameters) {
            throw new TypeError("setKeyManagementParameters can only be called once");
          }
          this._keyManagementParameters = parameters;
          return this;
        }
        setProtectedHeader(protectedHeader) {
          if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
          }
          this._protectedHeader = protectedHeader;
          return this;
        }
        setSharedUnprotectedHeader(sharedUnprotectedHeader) {
          if (this._sharedUnprotectedHeader) {
            throw new TypeError("setSharedUnprotectedHeader can only be called once");
          }
          this._sharedUnprotectedHeader = sharedUnprotectedHeader;
          return this;
        }
        setUnprotectedHeader(unprotectedHeader) {
          if (this._unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
          }
          this._unprotectedHeader = unprotectedHeader;
          return this;
        }
        setAdditionalAuthenticatedData(aad) {
          this._aad = aad;
          return this;
        }
        setContentEncryptionKey(cek) {
          if (this._cek) {
            throw new TypeError("setContentEncryptionKey can only be called once");
          }
          this._cek = cek;
          return this;
        }
        setInitializationVector(iv) {
          if (this._iv) {
            throw new TypeError("setInitializationVector can only be called once");
          }
          this._iv = iv;
          return this;
        }
        async encrypt(key, options) {
          if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) {
            throw new JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          }
          if (!is_disjoint_default(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) {
            throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
          }
          const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
            ...this._sharedUnprotectedHeader
          };
          validate_crit_default(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, this._protectedHeader, joseHeader);
          if (joseHeader.zip !== void 0) {
            throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
          }
          const { alg, enc } = joseHeader;
          if (typeof alg !== "string" || !alg) {
            throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          }
          if (typeof enc !== "string" || !enc) {
            throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          }
          let encryptedKey;
          if (this._cek && (alg === "dir" || alg === "ECDH-ES")) {
            throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
          }
          let cek;
          {
            let parameters;
            ({ cek, encryptedKey, parameters } = await encrypt_key_management_default(alg, enc, key, this._cek, this._keyManagementParameters));
            if (parameters) {
              if (options && unprotected in options) {
                if (!this._unprotectedHeader) {
                  this.setUnprotectedHeader(parameters);
                } else {
                  this._unprotectedHeader = { ...this._unprotectedHeader, ...parameters };
                }
              } else if (!this._protectedHeader) {
                this.setProtectedHeader(parameters);
              } else {
                this._protectedHeader = { ...this._protectedHeader, ...parameters };
              }
            }
          }
          let additionalData;
          let protectedHeader;
          let aadMember;
          if (this._protectedHeader) {
            protectedHeader = encoder.encode(encode(JSON.stringify(this._protectedHeader)));
          } else {
            protectedHeader = encoder.encode("");
          }
          if (this._aad) {
            aadMember = encode(this._aad);
            additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(aadMember));
          } else {
            additionalData = protectedHeader;
          }
          const { ciphertext, tag: tag2, iv } = await encrypt_default(enc, this._plaintext, cek, this._iv, additionalData);
          const jwe = {
            ciphertext: encode(ciphertext)
          };
          if (iv) {
            jwe.iv = encode(iv);
          }
          if (tag2) {
            jwe.tag = encode(tag2);
          }
          if (encryptedKey) {
            jwe.encrypted_key = encode(encryptedKey);
          }
          if (aadMember) {
            jwe.aad = aadMember;
          }
          if (this._protectedHeader) {
            jwe.protected = decoder.decode(protectedHeader);
          }
          if (this._sharedUnprotectedHeader) {
            jwe.unprotected = this._sharedUnprotectedHeader;
          }
          if (this._unprotectedHeader) {
            jwe.header = this._unprotectedHeader;
          }
          return jwe;
        }
      };
    }
  });

  // node_modules/jose/dist/browser/jwe/general/encrypt.js
  var IndividualRecipient, GeneralEncrypt;
  var init_encrypt3 = __esm({
    "node_modules/jose/dist/browser/jwe/general/encrypt.js"() {
      init_encrypt2();
      init_private_symbols();
      init_errors();
      init_cek();
      init_is_disjoint();
      init_encrypt_key_management();
      init_base64url();
      init_validate_crit();
      IndividualRecipient = class {
        constructor(enc, key, options) {
          this.parent = enc;
          this.key = key;
          this.options = options;
        }
        setUnprotectedHeader(unprotectedHeader) {
          if (this.unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
          }
          this.unprotectedHeader = unprotectedHeader;
          return this;
        }
        addRecipient(...args) {
          return this.parent.addRecipient(...args);
        }
        encrypt(...args) {
          return this.parent.encrypt(...args);
        }
        done() {
          return this.parent;
        }
      };
      GeneralEncrypt = class {
        constructor(plaintext) {
          this._recipients = [];
          this._plaintext = plaintext;
        }
        addRecipient(key, options) {
          const recipient = new IndividualRecipient(this, key, { crit: options?.crit });
          this._recipients.push(recipient);
          return recipient;
        }
        setProtectedHeader(protectedHeader) {
          if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
          }
          this._protectedHeader = protectedHeader;
          return this;
        }
        setSharedUnprotectedHeader(sharedUnprotectedHeader) {
          if (this._unprotectedHeader) {
            throw new TypeError("setSharedUnprotectedHeader can only be called once");
          }
          this._unprotectedHeader = sharedUnprotectedHeader;
          return this;
        }
        setAdditionalAuthenticatedData(aad) {
          this._aad = aad;
          return this;
        }
        async encrypt() {
          if (!this._recipients.length) {
            throw new JWEInvalid("at least one recipient must be added");
          }
          if (this._recipients.length === 1) {
            const [recipient] = this._recipients;
            const flattened = await new FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).encrypt(recipient.key, { ...recipient.options });
            const jwe2 = {
              ciphertext: flattened.ciphertext,
              iv: flattened.iv,
              recipients: [{}],
              tag: flattened.tag
            };
            if (flattened.aad)
              jwe2.aad = flattened.aad;
            if (flattened.protected)
              jwe2.protected = flattened.protected;
            if (flattened.unprotected)
              jwe2.unprotected = flattened.unprotected;
            if (flattened.encrypted_key)
              jwe2.recipients[0].encrypted_key = flattened.encrypted_key;
            if (flattened.header)
              jwe2.recipients[0].header = flattened.header;
            return jwe2;
          }
          let enc;
          for (let i = 0; i < this._recipients.length; i++) {
            const recipient = this._recipients[i];
            if (!is_disjoint_default(this._protectedHeader, this._unprotectedHeader, recipient.unprotectedHeader)) {
              throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
            }
            const joseHeader = {
              ...this._protectedHeader,
              ...this._unprotectedHeader,
              ...recipient.unprotectedHeader
            };
            const { alg } = joseHeader;
            if (typeof alg !== "string" || !alg) {
              throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
            }
            if (alg === "dir" || alg === "ECDH-ES") {
              throw new JWEInvalid('"dir" and "ECDH-ES" alg may only be used with a single recipient');
            }
            if (typeof joseHeader.enc !== "string" || !joseHeader.enc) {
              throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
            }
            if (!enc) {
              enc = joseHeader.enc;
            } else if (enc !== joseHeader.enc) {
              throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients');
            }
            validate_crit_default(JWEInvalid, /* @__PURE__ */ new Map(), recipient.options.crit, this._protectedHeader, joseHeader);
            if (joseHeader.zip !== void 0) {
              throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
            }
          }
          const cek = cek_default(enc);
          const jwe = {
            ciphertext: "",
            iv: "",
            recipients: [],
            tag: ""
          };
          for (let i = 0; i < this._recipients.length; i++) {
            const recipient = this._recipients[i];
            const target = {};
            jwe.recipients.push(target);
            const joseHeader = {
              ...this._protectedHeader,
              ...this._unprotectedHeader,
              ...recipient.unprotectedHeader
            };
            const p2c = joseHeader.alg.startsWith("PBES2") ? 2048 + i : void 0;
            if (i === 0) {
              const flattened = await new FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setContentEncryptionKey(cek).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).setKeyManagementParameters({ p2c }).encrypt(recipient.key, {
                ...recipient.options,
                [unprotected]: true
              });
              jwe.ciphertext = flattened.ciphertext;
              jwe.iv = flattened.iv;
              jwe.tag = flattened.tag;
              if (flattened.aad)
                jwe.aad = flattened.aad;
              if (flattened.protected)
                jwe.protected = flattened.protected;
              if (flattened.unprotected)
                jwe.unprotected = flattened.unprotected;
              target.encrypted_key = flattened.encrypted_key;
              if (flattened.header)
                target.header = flattened.header;
              continue;
            }
            const { encryptedKey, parameters } = await encrypt_key_management_default(recipient.unprotectedHeader?.alg || this._protectedHeader?.alg || this._unprotectedHeader?.alg, enc, recipient.key, cek, { p2c });
            target.encrypted_key = encode(encryptedKey);
            if (recipient.unprotectedHeader || parameters)
              target.header = { ...recipient.unprotectedHeader, ...parameters };
          }
          return jwe;
        }
      };
    }
  });

  // node_modules/jose/dist/browser/runtime/subtle_dsa.js
  function subtleDsa(alg, algorithm) {
    const hash = `SHA-${alg.slice(-3)}`;
    switch (alg) {
      case "HS256":
      case "HS384":
      case "HS512":
        return { hash, name: "HMAC" };
      case "PS256":
      case "PS384":
      case "PS512":
        return { hash, name: "RSA-PSS", saltLength: alg.slice(-3) >> 3 };
      case "RS256":
      case "RS384":
      case "RS512":
        return { hash, name: "RSASSA-PKCS1-v1_5" };
      case "ES256":
      case "ES384":
      case "ES512":
        return { hash, name: "ECDSA", namedCurve: algorithm.namedCurve };
      case "Ed25519":
        return { name: "Ed25519" };
      case "EdDSA":
        return { name: algorithm.name };
      default:
        throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
  }
  var init_subtle_dsa = __esm({
    "node_modules/jose/dist/browser/runtime/subtle_dsa.js"() {
      init_errors();
    }
  });

  // node_modules/jose/dist/browser/runtime/get_sign_verify_key.js
  async function getCryptoKey3(alg, key, usage) {
    if (usage === "sign") {
      key = await normalize_key_default.normalizePrivateKey(key, alg);
    }
    if (usage === "verify") {
      key = await normalize_key_default.normalizePublicKey(key, alg);
    }
    if (isCryptoKey(key)) {
      checkSigCryptoKey(key, alg, usage);
      return key;
    }
    if (key instanceof Uint8Array) {
      if (!alg.startsWith("HS")) {
        throw new TypeError(invalid_key_input_default(key, ...types));
      }
      return webcrypto_default.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
    }
    throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array", "JSON Web Key"));
  }
  var init_get_sign_verify_key = __esm({
    "node_modules/jose/dist/browser/runtime/get_sign_verify_key.js"() {
      init_webcrypto();
      init_crypto_key();
      init_invalid_key_input();
      init_is_key_like();
      init_normalize_key();
    }
  });

  // node_modules/jose/dist/browser/runtime/verify.js
  var verify, verify_default;
  var init_verify = __esm({
    "node_modules/jose/dist/browser/runtime/verify.js"() {
      init_subtle_dsa();
      init_webcrypto();
      init_check_key_length();
      init_get_sign_verify_key();
      verify = async (alg, key, signature, data) => {
        const cryptoKey = await getCryptoKey3(alg, key, "verify");
        check_key_length_default(alg, cryptoKey);
        const algorithm = subtleDsa(alg, cryptoKey.algorithm);
        try {
          return await webcrypto_default.subtle.verify(algorithm, cryptoKey, signature, data);
        } catch {
          return false;
        }
      };
      verify_default = verify;
    }
  });

  // node_modules/jose/dist/browser/jws/flattened/verify.js
  async function flattenedVerify(jws, key, options) {
    if (!isObject(jws)) {
      throw new JWSInvalid("Flattened JWS must be an object");
    }
    if (jws.protected === void 0 && jws.header === void 0) {
      throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== void 0 && typeof jws.protected !== "string") {
      throw new JWSInvalid("JWS Protected Header incorrect type");
    }
    if (jws.payload === void 0) {
      throw new JWSInvalid("JWS Payload missing");
    }
    if (typeof jws.signature !== "string") {
      throw new JWSInvalid("JWS Signature missing or incorrect type");
    }
    if (jws.header !== void 0 && !isObject(jws.header)) {
      throw new JWSInvalid("JWS Unprotected Header incorrect type");
    }
    let parsedProt = {};
    if (jws.protected) {
      try {
        const protectedHeader = decode(jws.protected);
        parsedProt = JSON.parse(decoder.decode(protectedHeader));
      } catch {
        throw new JWSInvalid("JWS Protected Header is invalid");
      }
    }
    if (!is_disjoint_default(parsedProt, jws.header)) {
      throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
      ...parsedProt,
      ...jws.header
    };
    const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has("b64")) {
      b64 = parsedProt.b64;
      if (typeof b64 !== "boolean") {
        throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
      }
    }
    const { alg } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && validate_algorithms_default("algorithms", options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
      throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
    }
    if (b64) {
      if (typeof jws.payload !== "string") {
        throw new JWSInvalid("JWS Payload must be a string");
      }
    } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
      throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
    }
    let resolvedKey = false;
    if (typeof key === "function") {
      key = await key(parsedProt, jws);
      resolvedKey = true;
      checkKeyTypeWithJwk(alg, key, "verify");
      if (isJWK(key)) {
        key = await importJWK(key, alg);
      }
    } else {
      checkKeyTypeWithJwk(alg, key, "verify");
    }
    const data = concat(encoder.encode(jws.protected ?? ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
    let signature;
    try {
      signature = decode(jws.signature);
    } catch {
      throw new JWSInvalid("Failed to base64url decode the signature");
    }
    const verified = await verify_default(alg, key, signature, data);
    if (!verified) {
      throw new JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
      try {
        payload = decode(jws.payload);
      } catch {
        throw new JWSInvalid("Failed to base64url decode the payload");
      }
    } else if (typeof jws.payload === "string") {
      payload = encoder.encode(jws.payload);
    } else {
      payload = jws.payload;
    }
    const result = { payload };
    if (jws.protected !== void 0) {
      result.protectedHeader = parsedProt;
    }
    if (jws.header !== void 0) {
      result.unprotectedHeader = jws.header;
    }
    if (resolvedKey) {
      return { ...result, key };
    }
    return result;
  }
  var init_verify2 = __esm({
    "node_modules/jose/dist/browser/jws/flattened/verify.js"() {
      init_base64url();
      init_verify();
      init_errors();
      init_buffer_utils();
      init_is_disjoint();
      init_is_object();
      init_check_key_type();
      init_validate_crit();
      init_validate_algorithms();
      init_is_jwk();
      init_import();
    }
  });

  // node_modules/jose/dist/browser/jws/compact/verify.js
  async function compactVerify(jws, key, options) {
    if (jws instanceof Uint8Array) {
      jws = decoder.decode(jws);
    }
    if (typeof jws !== "string") {
      throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
    if (length !== 3) {
      throw new JWSInvalid("Invalid Compact JWS");
    }
    const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
    const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
    if (typeof key === "function") {
      return { ...result, key: verified.key };
    }
    return result;
  }
  var init_verify3 = __esm({
    "node_modules/jose/dist/browser/jws/compact/verify.js"() {
      init_verify2();
      init_errors();
      init_buffer_utils();
    }
  });

  // node_modules/jose/dist/browser/jws/general/verify.js
  async function generalVerify(jws, key, options) {
    if (!isObject(jws)) {
      throw new JWSInvalid("General JWS must be an object");
    }
    if (!Array.isArray(jws.signatures) || !jws.signatures.every(isObject)) {
      throw new JWSInvalid("JWS Signatures missing or incorrect type");
    }
    for (const signature of jws.signatures) {
      try {
        return await flattenedVerify({
          header: signature.header,
          payload: jws.payload,
          protected: signature.protected,
          signature: signature.signature
        }, key, options);
      } catch {
      }
    }
    throw new JWSSignatureVerificationFailed();
  }
  var init_verify4 = __esm({
    "node_modules/jose/dist/browser/jws/general/verify.js"() {
      init_verify2();
      init_errors();
      init_is_object();
    }
  });

  // node_modules/jose/dist/browser/lib/epoch.js
  var epoch_default;
  var init_epoch = __esm({
    "node_modules/jose/dist/browser/lib/epoch.js"() {
      epoch_default = (date) => Math.floor(date.getTime() / 1e3);
    }
  });

  // node_modules/jose/dist/browser/lib/secs.js
  var minute, hour, day, week, year, REGEX, secs_default;
  var init_secs = __esm({
    "node_modules/jose/dist/browser/lib/secs.js"() {
      minute = 60;
      hour = minute * 60;
      day = hour * 24;
      week = day * 7;
      year = day * 365.25;
      REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
      secs_default = (str) => {
        const matched = REGEX.exec(str);
        if (!matched || matched[4] && matched[1]) {
          throw new TypeError("Invalid time period format");
        }
        const value = parseFloat(matched[2]);
        const unit = matched[3].toLowerCase();
        let numericDate;
        switch (unit) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            numericDate = Math.round(value);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            numericDate = Math.round(value * minute);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            numericDate = Math.round(value * hour);
            break;
          case "day":
          case "days":
          case "d":
            numericDate = Math.round(value * day);
            break;
          case "week":
          case "weeks":
          case "w":
            numericDate = Math.round(value * week);
            break;
          default:
            numericDate = Math.round(value * year);
            break;
        }
        if (matched[1] === "-" || matched[4] === "ago") {
          return -numericDate;
        }
        return numericDate;
      };
    }
  });

  // node_modules/jose/dist/browser/lib/jwt_claims_set.js
  var normalizeTyp, checkAudiencePresence, jwt_claims_set_default;
  var init_jwt_claims_set = __esm({
    "node_modules/jose/dist/browser/lib/jwt_claims_set.js"() {
      init_errors();
      init_buffer_utils();
      init_epoch();
      init_secs();
      init_is_object();
      normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, "");
      checkAudiencePresence = (audPayload, audOption) => {
        if (typeof audPayload === "string") {
          return audOption.includes(audPayload);
        }
        if (Array.isArray(audPayload)) {
          return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
        }
        return false;
      };
      jwt_claims_set_default = (protectedHeader, encodedPayload, options = {}) => {
        let payload;
        try {
          payload = JSON.parse(decoder.decode(encodedPayload));
        } catch {
        }
        if (!isObject(payload)) {
          throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
        }
        const { typ } = options;
        if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
          throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", "check_failed");
        }
        const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
        const presenceCheck = [...requiredClaims];
        if (maxTokenAge !== void 0)
          presenceCheck.push("iat");
        if (audience !== void 0)
          presenceCheck.push("aud");
        if (subject !== void 0)
          presenceCheck.push("sub");
        if (issuer !== void 0)
          presenceCheck.push("iss");
        for (const claim of new Set(presenceCheck.reverse())) {
          if (!(claim in payload)) {
            throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
          }
        }
        if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
          throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, "iss", "check_failed");
        }
        if (subject && payload.sub !== subject) {
          throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, "sub", "check_failed");
        }
        if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
          throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, "aud", "check_failed");
        }
        let tolerance;
        switch (typeof options.clockTolerance) {
          case "string":
            tolerance = secs_default(options.clockTolerance);
            break;
          case "number":
            tolerance = options.clockTolerance;
            break;
          case "undefined":
            tolerance = 0;
            break;
          default:
            throw new TypeError("Invalid clockTolerance option type");
        }
        const { currentDate } = options;
        const now = epoch_default(currentDate || /* @__PURE__ */ new Date());
        if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
          throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, "iat", "invalid");
        }
        if (payload.nbf !== void 0) {
          if (typeof payload.nbf !== "number") {
            throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, "nbf", "invalid");
          }
          if (payload.nbf > now + tolerance) {
            throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", "check_failed");
          }
        }
        if (payload.exp !== void 0) {
          if (typeof payload.exp !== "number") {
            throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, "exp", "invalid");
          }
          if (payload.exp <= now - tolerance) {
            throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", "check_failed");
          }
        }
        if (maxTokenAge) {
          const age = now - payload.iat;
          const max = typeof maxTokenAge === "number" ? maxTokenAge : secs_default(maxTokenAge);
          if (age - tolerance > max) {
            throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", "check_failed");
          }
          if (age < 0 - tolerance) {
            throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", "check_failed");
          }
        }
        return payload;
      };
    }
  });

  // node_modules/jose/dist/browser/jwt/verify.js
  async function jwtVerify(jwt, key, options) {
    const verified = await compactVerify(jwt, key, options);
    if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) {
      throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
    }
    const payload = jwt_claims_set_default(verified.protectedHeader, verified.payload, options);
    const result = { payload, protectedHeader: verified.protectedHeader };
    if (typeof key === "function") {
      return { ...result, key: verified.key };
    }
    return result;
  }
  var init_verify5 = __esm({
    "node_modules/jose/dist/browser/jwt/verify.js"() {
      init_verify3();
      init_jwt_claims_set();
      init_errors();
    }
  });

  // node_modules/jose/dist/browser/jwt/decrypt.js
  async function jwtDecrypt(jwt, key, options) {
    const decrypted = await compactDecrypt(jwt, key, options);
    const payload = jwt_claims_set_default(decrypted.protectedHeader, decrypted.plaintext, options);
    const { protectedHeader } = decrypted;
    if (protectedHeader.iss !== void 0 && protectedHeader.iss !== payload.iss) {
      throw new JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', payload, "iss", "mismatch");
    }
    if (protectedHeader.sub !== void 0 && protectedHeader.sub !== payload.sub) {
      throw new JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', payload, "sub", "mismatch");
    }
    if (protectedHeader.aud !== void 0 && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
      throw new JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', payload, "aud", "mismatch");
    }
    const result = { payload, protectedHeader };
    if (typeof key === "function") {
      return { ...result, key: decrypted.key };
    }
    return result;
  }
  var init_decrypt5 = __esm({
    "node_modules/jose/dist/browser/jwt/decrypt.js"() {
      init_decrypt3();
      init_jwt_claims_set();
      init_errors();
    }
  });

  // node_modules/jose/dist/browser/jwe/compact/encrypt.js
  var CompactEncrypt;
  var init_encrypt4 = __esm({
    "node_modules/jose/dist/browser/jwe/compact/encrypt.js"() {
      init_encrypt2();
      CompactEncrypt = class {
        constructor(plaintext) {
          this._flattened = new FlattenedEncrypt(plaintext);
        }
        setContentEncryptionKey(cek) {
          this._flattened.setContentEncryptionKey(cek);
          return this;
        }
        setInitializationVector(iv) {
          this._flattened.setInitializationVector(iv);
          return this;
        }
        setProtectedHeader(protectedHeader) {
          this._flattened.setProtectedHeader(protectedHeader);
          return this;
        }
        setKeyManagementParameters(parameters) {
          this._flattened.setKeyManagementParameters(parameters);
          return this;
        }
        async encrypt(key, options) {
          const jwe = await this._flattened.encrypt(key, options);
          return [jwe.protected, jwe.encrypted_key, jwe.iv, jwe.ciphertext, jwe.tag].join(".");
        }
      };
    }
  });

  // node_modules/jose/dist/browser/runtime/sign.js
  var sign, sign_default;
  var init_sign = __esm({
    "node_modules/jose/dist/browser/runtime/sign.js"() {
      init_subtle_dsa();
      init_webcrypto();
      init_check_key_length();
      init_get_sign_verify_key();
      sign = async (alg, key, data) => {
        const cryptoKey = await getCryptoKey3(alg, key, "sign");
        check_key_length_default(alg, cryptoKey);
        const signature = await webcrypto_default.subtle.sign(subtleDsa(alg, cryptoKey.algorithm), cryptoKey, data);
        return new Uint8Array(signature);
      };
      sign_default = sign;
    }
  });

  // node_modules/jose/dist/browser/jws/flattened/sign.js
  var FlattenedSign;
  var init_sign2 = __esm({
    "node_modules/jose/dist/browser/jws/flattened/sign.js"() {
      init_base64url();
      init_sign();
      init_is_disjoint();
      init_errors();
      init_buffer_utils();
      init_check_key_type();
      init_validate_crit();
      FlattenedSign = class {
        constructor(payload) {
          if (!(payload instanceof Uint8Array)) {
            throw new TypeError("payload must be an instance of Uint8Array");
          }
          this._payload = payload;
        }
        setProtectedHeader(protectedHeader) {
          if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
          }
          this._protectedHeader = protectedHeader;
          return this;
        }
        setUnprotectedHeader(unprotectedHeader) {
          if (this._unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
          }
          this._unprotectedHeader = unprotectedHeader;
          return this;
        }
        async sign(key, options) {
          if (!this._protectedHeader && !this._unprotectedHeader) {
            throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
          }
          if (!is_disjoint_default(this._protectedHeader, this._unprotectedHeader)) {
            throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
          }
          const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader
          };
          const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, this._protectedHeader, joseHeader);
          let b64 = true;
          if (extensions.has("b64")) {
            b64 = this._protectedHeader.b64;
            if (typeof b64 !== "boolean") {
              throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
            }
          }
          const { alg } = joseHeader;
          if (typeof alg !== "string" || !alg) {
            throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
          }
          checkKeyTypeWithJwk(alg, key, "sign");
          let payload = this._payload;
          if (b64) {
            payload = encoder.encode(encode(payload));
          }
          let protectedHeader;
          if (this._protectedHeader) {
            protectedHeader = encoder.encode(encode(JSON.stringify(this._protectedHeader)));
          } else {
            protectedHeader = encoder.encode("");
          }
          const data = concat(protectedHeader, encoder.encode("."), payload);
          const signature = await sign_default(alg, key, data);
          const jws = {
            signature: encode(signature),
            payload: ""
          };
          if (b64) {
            jws.payload = decoder.decode(payload);
          }
          if (this._unprotectedHeader) {
            jws.header = this._unprotectedHeader;
          }
          if (this._protectedHeader) {
            jws.protected = decoder.decode(protectedHeader);
          }
          return jws;
        }
      };
    }
  });

  // node_modules/jose/dist/browser/jws/compact/sign.js
  var CompactSign;
  var init_sign3 = __esm({
    "node_modules/jose/dist/browser/jws/compact/sign.js"() {
      init_sign2();
      CompactSign = class {
        constructor(payload) {
          this._flattened = new FlattenedSign(payload);
        }
        setProtectedHeader(protectedHeader) {
          this._flattened.setProtectedHeader(protectedHeader);
          return this;
        }
        async sign(key, options) {
          const jws = await this._flattened.sign(key, options);
          if (jws.payload === void 0) {
            throw new TypeError("use the flattened module for creating JWS with b64: false");
          }
          return `${jws.protected}.${jws.payload}.${jws.signature}`;
        }
      };
    }
  });

  // node_modules/jose/dist/browser/jws/general/sign.js
  var IndividualSignature, GeneralSign;
  var init_sign4 = __esm({
    "node_modules/jose/dist/browser/jws/general/sign.js"() {
      init_sign2();
      init_errors();
      IndividualSignature = class {
        constructor(sig, key, options) {
          this.parent = sig;
          this.key = key;
          this.options = options;
        }
        setProtectedHeader(protectedHeader) {
          if (this.protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
          }
          this.protectedHeader = protectedHeader;
          return this;
        }
        setUnprotectedHeader(unprotectedHeader) {
          if (this.unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
          }
          this.unprotectedHeader = unprotectedHeader;
          return this;
        }
        addSignature(...args) {
          return this.parent.addSignature(...args);
        }
        sign(...args) {
          return this.parent.sign(...args);
        }
        done() {
          return this.parent;
        }
      };
      GeneralSign = class {
        constructor(payload) {
          this._signatures = [];
          this._payload = payload;
        }
        addSignature(key, options) {
          const signature = new IndividualSignature(this, key, options);
          this._signatures.push(signature);
          return signature;
        }
        async sign() {
          if (!this._signatures.length) {
            throw new JWSInvalid("at least one signature must be added");
          }
          const jws = {
            signatures: [],
            payload: ""
          };
          for (let i = 0; i < this._signatures.length; i++) {
            const signature = this._signatures[i];
            const flattened = new FlattenedSign(this._payload);
            flattened.setProtectedHeader(signature.protectedHeader);
            flattened.setUnprotectedHeader(signature.unprotectedHeader);
            const { payload, ...rest } = await flattened.sign(signature.key, signature.options);
            if (i === 0) {
              jws.payload = payload;
            } else if (jws.payload !== payload) {
              throw new JWSInvalid("inconsistent use of JWS Unencoded Payload (RFC7797)");
            }
            jws.signatures.push(rest);
          }
          return jws;
        }
      };
    }
  });

  // node_modules/jose/dist/browser/jwt/produce.js
  function validateInput(label, input) {
    if (!Number.isFinite(input)) {
      throw new TypeError(`Invalid ${label} input`);
    }
    return input;
  }
  var ProduceJWT;
  var init_produce = __esm({
    "node_modules/jose/dist/browser/jwt/produce.js"() {
      init_epoch();
      init_is_object();
      init_secs();
      ProduceJWT = class {
        constructor(payload = {}) {
          if (!isObject(payload)) {
            throw new TypeError("JWT Claims Set MUST be an object");
          }
          this._payload = payload;
        }
        setIssuer(issuer) {
          this._payload = { ...this._payload, iss: issuer };
          return this;
        }
        setSubject(subject) {
          this._payload = { ...this._payload, sub: subject };
          return this;
        }
        setAudience(audience) {
          this._payload = { ...this._payload, aud: audience };
          return this;
        }
        setJti(jwtId) {
          this._payload = { ...this._payload, jti: jwtId };
          return this;
        }
        setNotBefore(input) {
          if (typeof input === "number") {
            this._payload = { ...this._payload, nbf: validateInput("setNotBefore", input) };
          } else if (input instanceof Date) {
            this._payload = { ...this._payload, nbf: validateInput("setNotBefore", epoch_default(input)) };
          } else {
            this._payload = { ...this._payload, nbf: epoch_default(/* @__PURE__ */ new Date()) + secs_default(input) };
          }
          return this;
        }
        setExpirationTime(input) {
          if (typeof input === "number") {
            this._payload = { ...this._payload, exp: validateInput("setExpirationTime", input) };
          } else if (input instanceof Date) {
            this._payload = { ...this._payload, exp: validateInput("setExpirationTime", epoch_default(input)) };
          } else {
            this._payload = { ...this._payload, exp: epoch_default(/* @__PURE__ */ new Date()) + secs_default(input) };
          }
          return this;
        }
        setIssuedAt(input) {
          if (typeof input === "undefined") {
            this._payload = { ...this._payload, iat: epoch_default(/* @__PURE__ */ new Date()) };
          } else if (input instanceof Date) {
            this._payload = { ...this._payload, iat: validateInput("setIssuedAt", epoch_default(input)) };
          } else if (typeof input === "string") {
            this._payload = {
              ...this._payload,
              iat: validateInput("setIssuedAt", epoch_default(/* @__PURE__ */ new Date()) + secs_default(input))
            };
          } else {
            this._payload = { ...this._payload, iat: validateInput("setIssuedAt", input) };
          }
          return this;
        }
      };
    }
  });

  // node_modules/jose/dist/browser/jwt/sign.js
  var SignJWT;
  var init_sign5 = __esm({
    "node_modules/jose/dist/browser/jwt/sign.js"() {
      init_sign3();
      init_errors();
      init_buffer_utils();
      init_produce();
      SignJWT = class extends ProduceJWT {
        setProtectedHeader(protectedHeader) {
          this._protectedHeader = protectedHeader;
          return this;
        }
        async sign(key, options) {
          const sig = new CompactSign(encoder.encode(JSON.stringify(this._payload)));
          sig.setProtectedHeader(this._protectedHeader);
          if (Array.isArray(this._protectedHeader?.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === false) {
            throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
          }
          return sig.sign(key, options);
        }
      };
    }
  });

  // node_modules/jose/dist/browser/jwt/encrypt.js
  var EncryptJWT;
  var init_encrypt5 = __esm({
    "node_modules/jose/dist/browser/jwt/encrypt.js"() {
      init_encrypt4();
      init_buffer_utils();
      init_produce();
      EncryptJWT = class extends ProduceJWT {
        setProtectedHeader(protectedHeader) {
          if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
          }
          this._protectedHeader = protectedHeader;
          return this;
        }
        setKeyManagementParameters(parameters) {
          if (this._keyManagementParameters) {
            throw new TypeError("setKeyManagementParameters can only be called once");
          }
          this._keyManagementParameters = parameters;
          return this;
        }
        setContentEncryptionKey(cek) {
          if (this._cek) {
            throw new TypeError("setContentEncryptionKey can only be called once");
          }
          this._cek = cek;
          return this;
        }
        setInitializationVector(iv) {
          if (this._iv) {
            throw new TypeError("setInitializationVector can only be called once");
          }
          this._iv = iv;
          return this;
        }
        replicateIssuerAsHeader() {
          this._replicateIssuerAsHeader = true;
          return this;
        }
        replicateSubjectAsHeader() {
          this._replicateSubjectAsHeader = true;
          return this;
        }
        replicateAudienceAsHeader() {
          this._replicateAudienceAsHeader = true;
          return this;
        }
        async encrypt(key, options) {
          const enc = new CompactEncrypt(encoder.encode(JSON.stringify(this._payload)));
          if (this._replicateIssuerAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss };
          }
          if (this._replicateSubjectAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub };
          }
          if (this._replicateAudienceAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud };
          }
          enc.setProtectedHeader(this._protectedHeader);
          if (this._iv) {
            enc.setInitializationVector(this._iv);
          }
          if (this._cek) {
            enc.setContentEncryptionKey(this._cek);
          }
          if (this._keyManagementParameters) {
            enc.setKeyManagementParameters(this._keyManagementParameters);
          }
          return enc.encrypt(key, options);
        }
      };
    }
  });

  // node_modules/jose/dist/browser/jwk/thumbprint.js
  async function calculateJwkThumbprint(jwk, digestAlgorithm) {
    if (!isObject(jwk)) {
      throw new TypeError("JWK must be an object");
    }
    digestAlgorithm ?? (digestAlgorithm = "sha256");
    if (digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512") {
      throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
    }
    let components;
    switch (jwk.kty) {
      case "EC":
        check(jwk.crv, '"crv" (Curve) Parameter');
        check(jwk.x, '"x" (X Coordinate) Parameter');
        check(jwk.y, '"y" (Y Coordinate) Parameter');
        components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
        break;
      case "OKP":
        check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
        check(jwk.x, '"x" (Public Key) Parameter');
        components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
        break;
      case "RSA":
        check(jwk.e, '"e" (Exponent) Parameter');
        check(jwk.n, '"n" (Modulus) Parameter');
        components = { e: jwk.e, kty: jwk.kty, n: jwk.n };
        break;
      case "oct":
        check(jwk.k, '"k" (Key Value) Parameter');
        components = { k: jwk.k, kty: jwk.kty };
        break;
      default:
        throw new JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = encoder.encode(JSON.stringify(components));
    return encode(await digest_default(digestAlgorithm, data));
  }
  async function calculateJwkThumbprintUri(jwk, digestAlgorithm) {
    digestAlgorithm ?? (digestAlgorithm = "sha256");
    const thumbprint = await calculateJwkThumbprint(jwk, digestAlgorithm);
    return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
  }
  var check;
  var init_thumbprint = __esm({
    "node_modules/jose/dist/browser/jwk/thumbprint.js"() {
      init_digest();
      init_base64url();
      init_errors();
      init_buffer_utils();
      init_is_object();
      check = (value, description) => {
        if (typeof value !== "string" || !value) {
          throw new JWKInvalid(`${description} missing or invalid`);
        }
      };
    }
  });

  // node_modules/jose/dist/browser/jwk/embedded.js
  async function EmbeddedJWK(protectedHeader, token) {
    const joseHeader = {
      ...protectedHeader,
      ...token?.header
    };
    if (!isObject(joseHeader.jwk)) {
      throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a JSON object');
    }
    const key = await importJWK({ ...joseHeader.jwk, ext: true }, joseHeader.alg);
    if (key instanceof Uint8Array || key.type !== "public") {
      throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a public key');
    }
    return key;
  }
  var init_embedded = __esm({
    "node_modules/jose/dist/browser/jwk/embedded.js"() {
      init_import();
      init_is_object();
      init_errors();
    }
  });

  // node_modules/jose/dist/browser/jwks/local.js
  function getKtyFromAlg(alg) {
    switch (typeof alg === "string" && alg.slice(0, 2)) {
      case "RS":
      case "PS":
        return "RSA";
      case "ES":
        return "EC";
      case "Ed":
        return "OKP";
      default:
        throw new JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
    }
  }
  function isJWKSLike(jwks) {
    return jwks && typeof jwks === "object" && Array.isArray(jwks.keys) && jwks.keys.every(isJWKLike);
  }
  function isJWKLike(key) {
    return isObject(key);
  }
  function clone(obj) {
    if (typeof structuredClone === "function") {
      return structuredClone(obj);
    }
    return JSON.parse(JSON.stringify(obj));
  }
  async function importWithAlgCache(cache, jwk, alg) {
    const cached = cache.get(jwk) || cache.set(jwk, {}).get(jwk);
    if (cached[alg] === void 0) {
      const key = await importJWK({ ...jwk, ext: true }, alg);
      if (key instanceof Uint8Array || key.type !== "public") {
        throw new JWKSInvalid("JSON Web Key Set members must be public keys");
      }
      cached[alg] = key;
    }
    return cached[alg];
  }
  function createLocalJWKSet(jwks) {
    const set = new LocalJWKSet(jwks);
    const localJWKSet = async (protectedHeader, token) => set.getKey(protectedHeader, token);
    Object.defineProperties(localJWKSet, {
      jwks: {
        value: () => clone(set._jwks),
        enumerable: true,
        configurable: false,
        writable: false
      }
    });
    return localJWKSet;
  }
  var LocalJWKSet;
  var init_local = __esm({
    "node_modules/jose/dist/browser/jwks/local.js"() {
      init_import();
      init_errors();
      init_is_object();
      LocalJWKSet = class {
        constructor(jwks) {
          this._cached = /* @__PURE__ */ new WeakMap();
          if (!isJWKSLike(jwks)) {
            throw new JWKSInvalid("JSON Web Key Set malformed");
          }
          this._jwks = clone(jwks);
        }
        async getKey(protectedHeader, token) {
          const { alg, kid } = { ...protectedHeader, ...token?.header };
          const kty = getKtyFromAlg(alg);
          const candidates = this._jwks.keys.filter((jwk2) => {
            let candidate = kty === jwk2.kty;
            if (candidate && typeof kid === "string") {
              candidate = kid === jwk2.kid;
            }
            if (candidate && typeof jwk2.alg === "string") {
              candidate = alg === jwk2.alg;
            }
            if (candidate && typeof jwk2.use === "string") {
              candidate = jwk2.use === "sig";
            }
            if (candidate && Array.isArray(jwk2.key_ops)) {
              candidate = jwk2.key_ops.includes("verify");
            }
            if (candidate) {
              switch (alg) {
                case "ES256":
                  candidate = jwk2.crv === "P-256";
                  break;
                case "ES256K":
                  candidate = jwk2.crv === "secp256k1";
                  break;
                case "ES384":
                  candidate = jwk2.crv === "P-384";
                  break;
                case "ES512":
                  candidate = jwk2.crv === "P-521";
                  break;
                case "Ed25519":
                  candidate = jwk2.crv === "Ed25519";
                  break;
                case "EdDSA":
                  candidate = jwk2.crv === "Ed25519" || jwk2.crv === "Ed448";
                  break;
              }
            }
            return candidate;
          });
          const { 0: jwk, length } = candidates;
          if (length === 0) {
            throw new JWKSNoMatchingKey();
          }
          if (length !== 1) {
            const error = new JWKSMultipleMatchingKeys();
            const { _cached } = this;
            error[Symbol.asyncIterator] = async function* () {
              for (const jwk2 of candidates) {
                try {
                  yield await importWithAlgCache(_cached, jwk2, alg);
                } catch {
                }
              }
            };
            throw error;
          }
          return importWithAlgCache(this._cached, jwk, alg);
        }
      };
    }
  });

  // node_modules/jose/dist/browser/runtime/fetch_jwks.js
  var fetchJwks, fetch_jwks_default;
  var init_fetch_jwks = __esm({
    "node_modules/jose/dist/browser/runtime/fetch_jwks.js"() {
      init_errors();
      fetchJwks = async (url, timeout, options) => {
        let controller;
        let id;
        let timedOut = false;
        if (typeof AbortController === "function") {
          controller = new AbortController();
          id = setTimeout(() => {
            timedOut = true;
            controller.abort();
          }, timeout);
        }
        const response = await fetch(url.href, {
          signal: controller ? controller.signal : void 0,
          redirect: "manual",
          headers: options.headers
        }).catch((err) => {
          if (timedOut)
            throw new JWKSTimeout();
          throw err;
        });
        if (id !== void 0)
          clearTimeout(id);
        if (response.status !== 200) {
          throw new JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
        }
        try {
          return await response.json();
        } catch {
          throw new JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON");
        }
      };
      fetch_jwks_default = fetchJwks;
    }
  });

  // node_modules/jose/dist/browser/jwks/remote.js
  function isCloudflareWorkers() {
    return typeof WebSocketPair !== "undefined" || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime !== "undefined" && EdgeRuntime === "vercel";
  }
  function isFreshJwksCache(input, cacheMaxAge) {
    if (typeof input !== "object" || input === null) {
      return false;
    }
    if (!("uat" in input) || typeof input.uat !== "number" || Date.now() - input.uat >= cacheMaxAge) {
      return false;
    }
    if (!("jwks" in input) || !isObject(input.jwks) || !Array.isArray(input.jwks.keys) || !Array.prototype.every.call(input.jwks.keys, isObject)) {
      return false;
    }
    return true;
  }
  function createRemoteJWKSet(url, options) {
    const set = new RemoteJWKSet(url, options);
    const remoteJWKSet = async (protectedHeader, token) => set.getKey(protectedHeader, token);
    Object.defineProperties(remoteJWKSet, {
      coolingDown: {
        get: () => set.coolingDown(),
        enumerable: true,
        configurable: false
      },
      fresh: {
        get: () => set.fresh(),
        enumerable: true,
        configurable: false
      },
      reload: {
        value: () => set.reload(),
        enumerable: true,
        configurable: false,
        writable: false
      },
      reloading: {
        get: () => !!set._pendingFetch,
        enumerable: true,
        configurable: false
      },
      jwks: {
        value: () => set._local?.jwks(),
        enumerable: true,
        configurable: false,
        writable: false
      }
    });
    return remoteJWKSet;
  }
  var USER_AGENT, jwksCache, RemoteJWKSet, experimental_jwksCache;
  var init_remote = __esm({
    "node_modules/jose/dist/browser/jwks/remote.js"() {
      init_fetch_jwks();
      init_errors();
      init_local();
      init_is_object();
      if (typeof navigator === "undefined" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) {
        const NAME = "jose";
        const VERSION = "v5.10.0";
        USER_AGENT = `${NAME}/${VERSION}`;
      }
      jwksCache = /* @__PURE__ */ Symbol();
      RemoteJWKSet = class {
        constructor(url, options) {
          if (!(url instanceof URL)) {
            throw new TypeError("url must be an instance of URL");
          }
          this._url = new URL(url.href);
          this._options = { agent: options?.agent, headers: options?.headers };
          this._timeoutDuration = typeof options?.timeoutDuration === "number" ? options?.timeoutDuration : 5e3;
          this._cooldownDuration = typeof options?.cooldownDuration === "number" ? options?.cooldownDuration : 3e4;
          this._cacheMaxAge = typeof options?.cacheMaxAge === "number" ? options?.cacheMaxAge : 6e5;
          if (options?.[jwksCache] !== void 0) {
            this._cache = options?.[jwksCache];
            if (isFreshJwksCache(options?.[jwksCache], this._cacheMaxAge)) {
              this._jwksTimestamp = this._cache.uat;
              this._local = createLocalJWKSet(this._cache.jwks);
            }
          }
        }
        coolingDown() {
          return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cooldownDuration : false;
        }
        fresh() {
          return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cacheMaxAge : false;
        }
        async getKey(protectedHeader, token) {
          if (!this._local || !this.fresh()) {
            await this.reload();
          }
          try {
            return await this._local(protectedHeader, token);
          } catch (err) {
            if (err instanceof JWKSNoMatchingKey) {
              if (this.coolingDown() === false) {
                await this.reload();
                return this._local(protectedHeader, token);
              }
            }
            throw err;
          }
        }
        async reload() {
          if (this._pendingFetch && isCloudflareWorkers()) {
            this._pendingFetch = void 0;
          }
          const headers = new Headers(this._options.headers);
          if (USER_AGENT && !headers.has("User-Agent")) {
            headers.set("User-Agent", USER_AGENT);
            this._options.headers = Object.fromEntries(headers.entries());
          }
          this._pendingFetch || (this._pendingFetch = fetch_jwks_default(this._url, this._timeoutDuration, this._options).then((json) => {
            this._local = createLocalJWKSet(json);
            if (this._cache) {
              this._cache.uat = Date.now();
              this._cache.jwks = json;
            }
            this._jwksTimestamp = Date.now();
            this._pendingFetch = void 0;
          }).catch((err) => {
            this._pendingFetch = void 0;
            throw err;
          }));
          await this._pendingFetch;
        }
      };
      experimental_jwksCache = jwksCache;
    }
  });

  // node_modules/jose/dist/browser/jwt/unsecured.js
  var UnsecuredJWT;
  var init_unsecured = __esm({
    "node_modules/jose/dist/browser/jwt/unsecured.js"() {
      init_base64url();
      init_buffer_utils();
      init_errors();
      init_jwt_claims_set();
      init_produce();
      UnsecuredJWT = class extends ProduceJWT {
        encode() {
          const header = encode(JSON.stringify({ alg: "none" }));
          const payload = encode(JSON.stringify(this._payload));
          return `${header}.${payload}.`;
        }
        static decode(jwt, options) {
          if (typeof jwt !== "string") {
            throw new JWTInvalid("Unsecured JWT must be a string");
          }
          const { 0: encodedHeader, 1: encodedPayload, 2: signature, length } = jwt.split(".");
          if (length !== 3 || signature !== "") {
            throw new JWTInvalid("Invalid Unsecured JWT");
          }
          let header;
          try {
            header = JSON.parse(decoder.decode(decode(encodedHeader)));
            if (header.alg !== "none")
              throw new Error();
          } catch {
            throw new JWTInvalid("Invalid Unsecured JWT");
          }
          const payload = jwt_claims_set_default(header, decode(encodedPayload), options);
          return { payload, header };
        }
      };
    }
  });

  // node_modules/jose/dist/browser/util/base64url.js
  var base64url_exports2 = {};
  __export(base64url_exports2, {
    decode: () => decode2,
    encode: () => encode2
  });
  var encode2, decode2;
  var init_base64url2 = __esm({
    "node_modules/jose/dist/browser/util/base64url.js"() {
      init_base64url();
      encode2 = encode;
      decode2 = decode;
    }
  });

  // node_modules/jose/dist/browser/util/decode_protected_header.js
  function decodeProtectedHeader(token) {
    let protectedB64u;
    if (typeof token === "string") {
      const parts = token.split(".");
      if (parts.length === 3 || parts.length === 5) {
        ;
        [protectedB64u] = parts;
      }
    } else if (typeof token === "object" && token) {
      if ("protected" in token) {
        protectedB64u = token.protected;
      } else {
        throw new TypeError("Token does not contain a Protected Header");
      }
    }
    try {
      if (typeof protectedB64u !== "string" || !protectedB64u) {
        throw new Error();
      }
      const result = JSON.parse(decoder.decode(decode2(protectedB64u)));
      if (!isObject(result)) {
        throw new Error();
      }
      return result;
    } catch {
      throw new TypeError("Invalid Token or Protected Header formatting");
    }
  }
  var init_decode_protected_header = __esm({
    "node_modules/jose/dist/browser/util/decode_protected_header.js"() {
      init_base64url2();
      init_buffer_utils();
      init_is_object();
    }
  });

  // node_modules/jose/dist/browser/util/decode_jwt.js
  function decodeJwt(jwt) {
    if (typeof jwt !== "string")
      throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
    const { 1: payload, length } = jwt.split(".");
    if (length === 5)
      throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
    if (length !== 3)
      throw new JWTInvalid("Invalid JWT");
    if (!payload)
      throw new JWTInvalid("JWTs must contain a payload");
    let decoded;
    try {
      decoded = decode2(payload);
    } catch {
      throw new JWTInvalid("Failed to base64url decode the payload");
    }
    let result;
    try {
      result = JSON.parse(decoder.decode(decoded));
    } catch {
      throw new JWTInvalid("Failed to parse the decoded payload as JSON");
    }
    if (!isObject(result))
      throw new JWTInvalid("Invalid JWT Claims Set");
    return result;
  }
  var init_decode_jwt = __esm({
    "node_modules/jose/dist/browser/util/decode_jwt.js"() {
      init_base64url2();
      init_buffer_utils();
      init_is_object();
      init_errors();
    }
  });

  // node_modules/jose/dist/browser/runtime/generate.js
  async function generateSecret(alg, options) {
    let length;
    let algorithm;
    let keyUsages;
    switch (alg) {
      case "HS256":
      case "HS384":
      case "HS512":
        length = parseInt(alg.slice(-3), 10);
        algorithm = { name: "HMAC", hash: `SHA-${length}`, length };
        keyUsages = ["sign", "verify"];
        break;
      case "A128CBC-HS256":
      case "A192CBC-HS384":
      case "A256CBC-HS512":
        length = parseInt(alg.slice(-3), 10);
        return random_default(new Uint8Array(length >> 3));
      case "A128KW":
      case "A192KW":
      case "A256KW":
        length = parseInt(alg.slice(1, 4), 10);
        algorithm = { name: "AES-KW", length };
        keyUsages = ["wrapKey", "unwrapKey"];
        break;
      case "A128GCMKW":
      case "A192GCMKW":
      case "A256GCMKW":
      case "A128GCM":
      case "A192GCM":
      case "A256GCM":
        length = parseInt(alg.slice(1, 4), 10);
        algorithm = { name: "AES-GCM", length };
        keyUsages = ["encrypt", "decrypt"];
        break;
      default:
        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return webcrypto_default.subtle.generateKey(algorithm, options?.extractable ?? false, keyUsages);
  }
  function getModulusLengthOption(options) {
    const modulusLength = options?.modulusLength ?? 2048;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new JOSENotSupported("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
    }
    return modulusLength;
  }
  async function generateKeyPair(alg, options) {
    let algorithm;
    let keyUsages;
    switch (alg) {
      case "PS256":
      case "PS384":
      case "PS512":
        algorithm = {
          name: "RSA-PSS",
          hash: `SHA-${alg.slice(-3)}`,
          publicExponent: new Uint8Array([1, 0, 1]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ["sign", "verify"];
        break;
      case "RS256":
      case "RS384":
      case "RS512":
        algorithm = {
          name: "RSASSA-PKCS1-v1_5",
          hash: `SHA-${alg.slice(-3)}`,
          publicExponent: new Uint8Array([1, 0, 1]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ["sign", "verify"];
        break;
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512":
        algorithm = {
          name: "RSA-OAEP",
          hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`,
          publicExponent: new Uint8Array([1, 0, 1]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ["decrypt", "unwrapKey", "encrypt", "wrapKey"];
        break;
      case "ES256":
        algorithm = { name: "ECDSA", namedCurve: "P-256" };
        keyUsages = ["sign", "verify"];
        break;
      case "ES384":
        algorithm = { name: "ECDSA", namedCurve: "P-384" };
        keyUsages = ["sign", "verify"];
        break;
      case "ES512":
        algorithm = { name: "ECDSA", namedCurve: "P-521" };
        keyUsages = ["sign", "verify"];
        break;
      case "Ed25519":
        algorithm = { name: "Ed25519" };
        keyUsages = ["sign", "verify"];
        break;
      case "EdDSA": {
        keyUsages = ["sign", "verify"];
        const crv = options?.crv ?? "Ed25519";
        switch (crv) {
          case "Ed25519":
          case "Ed448":
            algorithm = { name: crv };
            break;
          default:
            throw new JOSENotSupported("Invalid or unsupported crv option provided");
        }
        break;
      }
      case "ECDH-ES":
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW": {
        keyUsages = ["deriveKey", "deriveBits"];
        const crv = options?.crv ?? "P-256";
        switch (crv) {
          case "P-256":
          case "P-384":
          case "P-521": {
            algorithm = { name: "ECDH", namedCurve: crv };
            break;
          }
          case "X25519":
          case "X448":
            algorithm = { name: crv };
            break;
          default:
            throw new JOSENotSupported("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
        }
        break;
      }
      default:
        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return webcrypto_default.subtle.generateKey(algorithm, options?.extractable ?? false, keyUsages);
  }
  var init_generate = __esm({
    "node_modules/jose/dist/browser/runtime/generate.js"() {
      init_webcrypto();
      init_errors();
      init_random();
    }
  });

  // node_modules/jose/dist/browser/key/generate_key_pair.js
  async function generateKeyPair2(alg, options) {
    return generateKeyPair(alg, options);
  }
  var init_generate_key_pair = __esm({
    "node_modules/jose/dist/browser/key/generate_key_pair.js"() {
      init_generate();
    }
  });

  // node_modules/jose/dist/browser/key/generate_secret.js
  async function generateSecret2(alg, options) {
    return generateSecret(alg, options);
  }
  var init_generate_secret = __esm({
    "node_modules/jose/dist/browser/key/generate_secret.js"() {
      init_generate();
    }
  });

  // node_modules/jose/dist/browser/runtime/runtime.js
  var runtime_default;
  var init_runtime = __esm({
    "node_modules/jose/dist/browser/runtime/runtime.js"() {
      runtime_default = "WebCryptoAPI";
    }
  });

  // node_modules/jose/dist/browser/util/runtime.js
  var runtime_default2;
  var init_runtime2 = __esm({
    "node_modules/jose/dist/browser/util/runtime.js"() {
      init_runtime();
      runtime_default2 = runtime_default;
    }
  });

  // node_modules/jose/dist/browser/index.js
  var browser_exports = {};
  __export(browser_exports, {
    CompactEncrypt: () => CompactEncrypt,
    CompactSign: () => CompactSign,
    EmbeddedJWK: () => EmbeddedJWK,
    EncryptJWT: () => EncryptJWT,
    FlattenedEncrypt: () => FlattenedEncrypt,
    FlattenedSign: () => FlattenedSign,
    GeneralEncrypt: () => GeneralEncrypt,
    GeneralSign: () => GeneralSign,
    SignJWT: () => SignJWT,
    UnsecuredJWT: () => UnsecuredJWT,
    base64url: () => base64url_exports2,
    calculateJwkThumbprint: () => calculateJwkThumbprint,
    calculateJwkThumbprintUri: () => calculateJwkThumbprintUri,
    compactDecrypt: () => compactDecrypt,
    compactVerify: () => compactVerify,
    createLocalJWKSet: () => createLocalJWKSet,
    createRemoteJWKSet: () => createRemoteJWKSet,
    cryptoRuntime: () => runtime_default2,
    decodeJwt: () => decodeJwt,
    decodeProtectedHeader: () => decodeProtectedHeader,
    errors: () => errors_exports,
    experimental_jwksCache: () => experimental_jwksCache,
    exportJWK: () => exportJWK,
    exportPKCS8: () => exportPKCS8,
    exportSPKI: () => exportSPKI,
    flattenedDecrypt: () => flattenedDecrypt,
    flattenedVerify: () => flattenedVerify,
    generalDecrypt: () => generalDecrypt,
    generalVerify: () => generalVerify,
    generateKeyPair: () => generateKeyPair2,
    generateSecret: () => generateSecret2,
    importJWK: () => importJWK,
    importPKCS8: () => importPKCS8,
    importSPKI: () => importSPKI,
    importX509: () => importX509,
    jwksCache: () => jwksCache,
    jwtDecrypt: () => jwtDecrypt,
    jwtVerify: () => jwtVerify
  });
  var init_browser = __esm({
    "node_modules/jose/dist/browser/index.js"() {
      init_decrypt3();
      init_decrypt2();
      init_decrypt4();
      init_encrypt3();
      init_verify3();
      init_verify2();
      init_verify4();
      init_verify5();
      init_decrypt5();
      init_encrypt4();
      init_encrypt2();
      init_sign3();
      init_sign2();
      init_sign4();
      init_sign5();
      init_encrypt5();
      init_thumbprint();
      init_embedded();
      init_local();
      init_remote();
      init_unsecured();
      init_export();
      init_import();
      init_decode_protected_header();
      init_decode_jwt();
      init_errors();
      init_generate_key_pair();
      init_generate_secret();
      init_base64url2();
      init_runtime2();
    }
  });

  // node_modules/@vercel/oidc/dist/verify-vercel-oidc-token.js
  var require_verify_vercel_oidc_token = __commonJS({
    "node_modules/@vercel/oidc/dist/verify-vercel-oidc-token.js"(exports, module) {
      "use strict";
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export2 = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var verify_vercel_oidc_token_exports = {};
      __export2(verify_vercel_oidc_token_exports, {
        verifyVercelOidcToken: () => verifyVercelOidcToken2
      });
      module.exports = __toCommonJS2(verify_vercel_oidc_token_exports);
      var import_jose = (init_browser(), __toCommonJS(browser_exports));
      var VERCEL_OIDC_ISSUER = "https://oidc.vercel.com";
      var VERCEL_OIDC_JWKS_URL = new URL(
        "https://oidc.vercel.com/.well-known/jwks"
      );
      var DEFAULT_ALGORITHMS = ["RS256"];
      var VERCEL_OIDC_JWKS = (0, import_jose.createRemoteJWKSet)(VERCEL_OIDC_JWKS_URL);
      async function verifyVercelOidcToken2(token, options) {
        const {
          algorithms,
          projectId = process.env.VERCEL_PROJECT_ID,
          environment = process.env.VERCEL_TARGET_ENV || process.env.VERCEL_ENV,
          ownerId,
          ...verifyOptions
        } = options ?? {};
        if (projectId === "*" && ownerId === void 0 && !hasAudienceVerification(verifyOptions.audience)) {
          throw new TypeError(
            "Expected ownerId or audience to be provided when projectId is '*'."
          );
        }
        const result = await (0, import_jose.jwtVerify)(token, VERCEL_OIDC_JWKS, {
          ...verifyOptions,
          algorithms: algorithms ?? DEFAULT_ALGORITHMS
        });
        validateIssuer(result.payload.iss);
        validateClaim({
          actual: result.payload.project_id,
          claim: "project_id",
          env: "VERCEL_PROJECT_ID",
          expected: projectId,
          option: "projectId"
        });
        validateClaim({
          actual: result.payload.environment,
          claim: "environment",
          env: "VERCEL_TARGET_ENV or VERCEL_ENV",
          expected: environment,
          option: "environment"
        });
        validateOptionalClaim({
          actual: result.payload.owner_id,
          claim: "owner_id",
          expected: ownerId
        });
        return result;
      }
      function hasAudienceVerification(audience) {
        return Array.isArray(audience) ? audience.length > 0 : audience !== void 0;
      }
      function validateIssuer(actual) {
        if (actual !== VERCEL_OIDC_ISSUER && (typeof actual !== "string" || !actual.startsWith(`${VERCEL_OIDC_ISSUER}/`))) {
          throw new TypeError(
            `Expected Vercel OIDC token iss claim to be "${VERCEL_OIDC_ISSUER}" or to start with "${VERCEL_OIDC_ISSUER}/".`
          );
        }
      }
      function validateClaim({
        actual,
        claim,
        env,
        expected,
        option
      }) {
        if (expected === "*") {
          return;
        }
        if (expected === void 0 || expected.length === 0) {
          throw new TypeError(
            `Expected ${env} to be set or ${option} to be provided. Pass ${option}: '*' to allow any ${claim} claim.`
          );
        }
        if (Array.isArray(expected) && typeof actual === "string" && expected.includes(actual)) {
          return;
        }
        if (actual !== expected) {
          throw new TypeError(
            Array.isArray(expected) ? `Expected Vercel OIDC token ${claim} claim to be one of: ${expected.map((value) => `"${value}"`).join(", ")}.` : `Expected Vercel OIDC token ${claim} claim to be "${expected}".`
          );
        }
      }
      function validateOptionalClaim({
        actual,
        claim,
        expected
      }) {
        if (expected === void 0) {
          return;
        }
        if (actual !== expected) {
          throw new TypeError(
            `Expected Vercel OIDC token ${claim} claim to be "${expected}".`
          );
        }
      }
    }
  });

  // node_modules/@vercel/oidc/dist/auth-errors.js
  var require_auth_errors = __commonJS({
    "node_modules/@vercel/oidc/dist/auth-errors.js"(exports, module) {
      "use strict";
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export2 = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var auth_errors_exports = {};
      __export2(auth_errors_exports, {
        AccessTokenMissingError: () => AccessTokenMissingError2,
        RefreshAccessTokenFailedError: () => RefreshAccessTokenFailedError2
      });
      module.exports = __toCommonJS2(auth_errors_exports);
      var AccessTokenMissingError2 = class extends Error {
        constructor() {
          super(
            "No authentication found. Please log in with the Vercel CLI (vercel login)."
          );
          this.name = "AccessTokenMissingError";
        }
      };
      var RefreshAccessTokenFailedError2 = class extends Error {
        constructor(cause) {
          super("Failed to refresh authentication token.");
          this.name = "RefreshAccessTokenFailedError";
          if (cause !== void 0) {
            this.cause = cause;
          }
        }
      };
    }
  });

  // node_modules/@vercel/oidc/dist/index-browser.js
  var require_index_browser = __commonJS({
    "node_modules/@vercel/oidc/dist/index-browser.js"(exports, module) {
      "use strict";
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export2 = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var index_browser_exports = {};
      __export2(index_browser_exports, {
        AccessTokenMissingError: () => import_auth_errors.AccessTokenMissingError,
        RefreshAccessTokenFailedError: () => import_auth_errors.RefreshAccessTokenFailedError,
        getContext: () => import_get_context.getContext,
        getVercelOidcToken: () => getVercelOidcToken2,
        getVercelOidcTokenSync: () => getVercelOidcTokenSync,
        getVercelToken: () => getVercelToken,
        verifyVercelOidcToken: () => import_verify_vercel_oidc_token.verifyVercelOidcToken
      });
      module.exports = __toCommonJS2(index_browser_exports);
      var import_get_context = require_get_context();
      var import_verify_vercel_oidc_token = require_verify_vercel_oidc_token();
      var import_auth_errors = require_auth_errors();
      async function getVercelOidcToken2() {
        return "";
      }
      function getVercelOidcTokenSync() {
        return "";
      }
      async function getVercelToken() {
        throw new Error("getVercelToken is not supported in browser environments");
      }
    }
  });

  // node_modules/retry/lib/retry_operation.js
  var require_retry_operation = __commonJS({
    "node_modules/retry/lib/retry_operation.js"(exports, module) {
      function RetryOperation(timeouts, options) {
        if (typeof options === "boolean") {
          options = { forever: options };
        }
        this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
        this._timeouts = timeouts;
        this._options = options || {};
        this._maxRetryTime = options && options.maxRetryTime || Infinity;
        this._fn = null;
        this._errors = [];
        this._attempts = 1;
        this._operationTimeout = null;
        this._operationTimeoutCb = null;
        this._timeout = null;
        this._operationStart = null;
        this._timer = null;
        if (this._options.forever) {
          this._cachedTimeouts = this._timeouts.slice(0);
        }
      }
      module.exports = RetryOperation;
      RetryOperation.prototype.reset = function() {
        this._attempts = 1;
        this._timeouts = this._originalTimeouts.slice(0);
      };
      RetryOperation.prototype.stop = function() {
        if (this._timeout) {
          clearTimeout(this._timeout);
        }
        if (this._timer) {
          clearTimeout(this._timer);
        }
        this._timeouts = [];
        this._cachedTimeouts = null;
      };
      RetryOperation.prototype.retry = function(err) {
        if (this._timeout) {
          clearTimeout(this._timeout);
        }
        if (!err) {
          return false;
        }
        var currentTime = (/* @__PURE__ */ new Date()).getTime();
        if (err && currentTime - this._operationStart >= this._maxRetryTime) {
          this._errors.push(err);
          this._errors.unshift(new Error("RetryOperation timeout occurred"));
          return false;
        }
        this._errors.push(err);
        var timeout = this._timeouts.shift();
        if (timeout === void 0) {
          if (this._cachedTimeouts) {
            this._errors.splice(0, this._errors.length - 1);
            timeout = this._cachedTimeouts.slice(-1);
          } else {
            return false;
          }
        }
        var self = this;
        this._timer = setTimeout(function() {
          self._attempts++;
          if (self._operationTimeoutCb) {
            self._timeout = setTimeout(function() {
              self._operationTimeoutCb(self._attempts);
            }, self._operationTimeout);
            if (self._options.unref) {
              self._timeout.unref();
            }
          }
          self._fn(self._attempts);
        }, timeout);
        if (this._options.unref) {
          this._timer.unref();
        }
        return true;
      };
      RetryOperation.prototype.attempt = function(fn, timeoutOps) {
        this._fn = fn;
        if (timeoutOps) {
          if (timeoutOps.timeout) {
            this._operationTimeout = timeoutOps.timeout;
          }
          if (timeoutOps.cb) {
            this._operationTimeoutCb = timeoutOps.cb;
          }
        }
        var self = this;
        if (this._operationTimeoutCb) {
          this._timeout = setTimeout(function() {
            self._operationTimeoutCb();
          }, self._operationTimeout);
        }
        this._operationStart = (/* @__PURE__ */ new Date()).getTime();
        this._fn(this._attempts);
      };
      RetryOperation.prototype.try = function(fn) {
        console.log("Using RetryOperation.try() is deprecated");
        this.attempt(fn);
      };
      RetryOperation.prototype.start = function(fn) {
        console.log("Using RetryOperation.start() is deprecated");
        this.attempt(fn);
      };
      RetryOperation.prototype.start = RetryOperation.prototype.try;
      RetryOperation.prototype.errors = function() {
        return this._errors;
      };
      RetryOperation.prototype.attempts = function() {
        return this._attempts;
      };
      RetryOperation.prototype.mainError = function() {
        if (this._errors.length === 0) {
          return null;
        }
        var counts = {};
        var mainError = null;
        var mainErrorCount = 0;
        for (var i = 0; i < this._errors.length; i++) {
          var error = this._errors[i];
          var message2 = error.message;
          var count = (counts[message2] || 0) + 1;
          counts[message2] = count;
          if (count >= mainErrorCount) {
            mainError = error;
            mainErrorCount = count;
          }
        }
        return mainError;
      };
    }
  });

  // node_modules/retry/lib/retry.js
  var require_retry = __commonJS({
    "node_modules/retry/lib/retry.js"(exports) {
      var RetryOperation = require_retry_operation();
      exports.operation = function(options) {
        var timeouts = exports.timeouts(options);
        return new RetryOperation(timeouts, {
          forever: options && (options.forever || options.retries === Infinity),
          unref: options && options.unref,
          maxRetryTime: options && options.maxRetryTime
        });
      };
      exports.timeouts = function(options) {
        if (options instanceof Array) {
          return [].concat(options);
        }
        var opts = {
          retries: 10,
          factor: 2,
          minTimeout: 1 * 1e3,
          maxTimeout: Infinity,
          randomize: false
        };
        for (var key in options) {
          opts[key] = options[key];
        }
        if (opts.minTimeout > opts.maxTimeout) {
          throw new Error("minTimeout is greater than maxTimeout");
        }
        var timeouts = [];
        for (var i = 0; i < opts.retries; i++) {
          timeouts.push(this.createTimeout(i, opts));
        }
        if (options && options.forever && !timeouts.length) {
          timeouts.push(this.createTimeout(i, opts));
        }
        timeouts.sort(function(a, b) {
          return a - b;
        });
        return timeouts;
      };
      exports.createTimeout = function(attempt, opts) {
        var random = opts.randomize ? Math.random() + 1 : 1;
        var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
        timeout = Math.min(timeout, opts.maxTimeout);
        return timeout;
      };
      exports.wrap = function(obj, options, methods) {
        if (options instanceof Array) {
          methods = options;
          options = null;
        }
        if (!methods) {
          methods = [];
          for (var key in obj) {
            if (typeof obj[key] === "function") {
              methods.push(key);
            }
          }
        }
        for (var i = 0; i < methods.length; i++) {
          var method = methods[i];
          var original = obj[method];
          obj[method] = function retryWrapper(original2) {
            var op = exports.operation(options);
            var args = Array.prototype.slice.call(arguments, 1);
            var callback = args.pop();
            args.push(function(err) {
              if (op.retry(err)) {
                return;
              }
              if (err) {
                arguments[0] = op.mainError();
              }
              callback.apply(this, arguments);
            });
            op.attempt(function() {
              original2.apply(obj, args);
            });
          }.bind(obj, original);
          obj[method].options = options;
        }
      };
    }
  });

  // node_modules/retry/index.js
  var require_retry2 = __commonJS({
    "node_modules/retry/index.js"(exports, module) {
      module.exports = require_retry();
    }
  });

  // node_modules/async-retry/lib/index.js
  var require_lib = __commonJS({
    "node_modules/async-retry/lib/index.js"(exports, module) {
      var retrier = require_retry2();
      function retry2(fn, opts) {
        function run(resolve, reject) {
          var options = opts || {};
          var op;
          if (!("randomize" in options)) {
            options.randomize = true;
          }
          op = retrier.operation(options);
          function bail(err) {
            reject(err || new Error("Aborted"));
          }
          function onError(err, num) {
            if (err.bail) {
              bail(err);
              return;
            }
            if (!op.retry(err)) {
              reject(op.mainError());
            } else if (options.onRetry) {
              options.onRetry(err, num);
            }
          }
          function runAttempt(num) {
            var val;
            try {
              val = fn(bail, num);
            } catch (err) {
              onError(err, num);
              return;
            }
            Promise.resolve(val).then(resolve).catch(function catchIt(err) {
              onError(err, num);
            });
          }
          op.attempt(runAttempt);
        }
        return new Promise(run);
      }
      module.exports = retry2;
    }
  });

  // node_modules/throttleit/index.js
  var require_throttleit = __commonJS({
    "node_modules/throttleit/index.js"(exports, module) {
      function throttle3(function_, wait) {
        if (typeof function_ !== "function") {
          throw new TypeError(`Expected the first argument to be a \`function\`, got \`${typeof function_}\`.`);
        }
        let timeoutId;
        let lastCallTime = 0;
        return function throttled(...arguments_) {
          clearTimeout(timeoutId);
          const now = Date.now();
          const timeSinceLastCall = now - lastCallTime;
          const delayForNextCall = wait - timeSinceLastCall;
          if (delayForNextCall <= 0) {
            lastCallTime = now;
            function_.apply(this, arguments_);
          } else {
            timeoutId = setTimeout(() => {
              lastCallTime = Date.now();
              function_.apply(this, arguments_);
            }, delayForNextCall);
          }
        };
      }
      module.exports = throttle3;
    }
  });

  // node_modules/is-node-process/lib/index.mjs
  function isNodeProcess() {
    if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
      return true;
    }
    if (typeof process !== "undefined") {
      const type = process.type;
      if (type === "renderer" || type === "worker") {
        return false;
      }
      return !!(process.versions && process.versions.node);
    }
    return false;
  }

  // node_modules/@vercel/blob/dist/chunk-OYCIHDFF.js
  var import_is_buffer = __toESM(require_is_buffer(), 1);

  // node_modules/@vercel/blob/dist/stream-browser.js
  var Readable = {
    toWeb() {
      throw new Error(
        "Vercel Blob: Sorry, we cannot get a Readable stream in this environment. If you see this message please open an issue here: https://github.com/vercel/storage/ with details on your environment."
      );
    }
  };

  // node_modules/@vercel/blob/dist/chunk-OYCIHDFF.js
  var import_oidc = __toESM(require_index_browser(), 1);
  var import_async_retry = __toESM(require_lib(), 1);

  // node_modules/@vercel/blob/dist/undici-browser.js
  var fetch2 = globalThis.fetch.bind(globalThis);

  // node_modules/@vercel/blob/dist/chunk-OYCIHDFF.js
  var import_throttleit = __toESM(require_throttleit(), 1);
  var import_throttleit2 = __toESM(require_throttleit(), 1);
  var supportsNewBlobFromArrayBuffer = new Promise((resolve) => {
    try {
      const helloAsArrayBuffer = new Uint8Array([104, 101, 108, 108, 111]);
      const blob = new Blob([helloAsArrayBuffer]);
      blob.text().then((text) => {
        resolve(text === "hello");
      }).catch(() => {
        resolve(false);
      });
    } catch {
      resolve(false);
    }
  });
  async function toReadableStream(value) {
    if (value instanceof ReadableStream) {
      return value;
    }
    if (value instanceof Blob) {
      return value.stream();
    }
    if (isNodeJsReadableStream(value)) {
      return Readable.toWeb(value);
    }
    let streamValue;
    if (value instanceof ArrayBuffer) {
      streamValue = new Uint8Array(value);
    } else if (isNodeJsBuffer(value)) {
      streamValue = value;
    } else {
      streamValue = stringToUint8Array(value);
    }
    if (await supportsNewBlobFromArrayBuffer) {
      return new Blob([streamValue]).stream();
    }
    return new ReadableStream({
      start(controller) {
        controller.enqueue(streamValue);
        controller.close();
      }
    });
  }
  function isNodeJsReadableStream(value) {
    return typeof value === "object" && typeof value.pipe === "function" && value.readable && typeof value._read === "function" && // @ts-expect-error _readableState does exists on Readable
    typeof value._readableState === "object";
  }
  function stringToUint8Array(s) {
    const enc = new TextEncoder();
    return enc.encode(s);
  }
  function isNodeJsBuffer(value) {
    return (0, import_is_buffer.default)(value);
  }
  async function getVercelOidcToken() {
    try {
      const token = (await (0, import_oidc.getVercelOidcToken)()).trim();
      return token === "" ? void 0 : token;
    } catch {
      return void 0;
    }
  }
  var parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
  var map = {
    b: 1,
    kb: 1 << 10,
    mb: 1 << 20,
    gb: 1 << 30,
    tb: 1024 ** 4,
    pb: 1024 ** 5
  };
  function bytes(val) {
    if (typeof val === "number" && !Number.isNaN(val)) {
      return val;
    }
    if (typeof val !== "string") {
      return null;
    }
    const results = parseRegExp.exec(val);
    let floatValue;
    let unit = "b";
    if (!results) {
      floatValue = parseInt(val, 10);
    } else {
      const [, res, , , unitMatch] = results;
      if (!res) {
        return null;
      }
      floatValue = parseFloat(res);
      if (unitMatch) {
        unit = unitMatch.toLowerCase();
      }
    }
    if (Number.isNaN(floatValue)) {
      return null;
    }
    return Math.floor(map[unit] * floatValue);
  }
  var defaultVercelBlobApiUrl = "https://vercel.com/api/blob";
  function readEnv(name) {
    try {
      const value = process.env[name];
      return typeof value === "string" && value.trim() !== "" ? value.trim() : void 0;
    } catch {
      return void 0;
    }
  }
  function parseStoreIdFromReadWriteToken(token) {
    const [, , , storeId = ""] = token.split("_");
    return storeId;
  }
  function base64UrlDecodeDelegationSegment(segment) {
    let base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padding = 4 - base64.length % 4;
    if (padding !== 4) {
      base64 += "=".repeat(padding);
    }
    if (typeof atob === "function") {
      return atob(base64);
    }
    if (typeof Buffer !== "undefined") {
      return Buffer.from(base64, "base64").toString("utf8");
    }
    throw new BlobError("Cannot decode base64: no atob or Buffer available.");
  }
  function parseStoreIdFromDelegationToken(delegationToken) {
    const dot = delegationToken.indexOf(".");
    if (dot < 0) {
      throw new BlobError("Invalid delegation token format.");
    }
    const payloadSeg = delegationToken.slice(0, dot);
    let parsed;
    try {
      parsed = JSON.parse(base64UrlDecodeDelegationSegment(payloadSeg));
    } catch {
      throw new BlobError("Invalid delegation token payload.");
    }
    if (!parsed.storeId || typeof parsed.storeId !== "string") {
      throw new BlobError("Delegation token payload is missing `storeId`.");
    }
    return normalizeStoreId(parsed.storeId);
  }
  function normalizeStoreId(storeId) {
    return storeId.startsWith("store_") ? storeId.slice("store_".length) : storeId;
  }
  async function resolveBlobAuth(options) {
    var _a3, _b2;
    if (options == null ? void 0 : options.presignedUrlPayload) {
      const storeId = parseStoreIdFromDelegationToken(
        options.presignedUrlPayload.delegationToken
      );
      return { kind: "presigned", storeId };
    }
    if (options == null ? void 0 : options.token) {
      const storeId = parseStoreIdFromReadWriteToken(options.token);
      return { kind: "readWrite", token: options.token, storeId };
    }
    const manualOidcToken = (_a3 = options == null ? void 0 : options.oidcToken) == null ? void 0 : _a3.trim();
    const oidcToken = manualOidcToken || await getVercelOidcToken();
    if (oidcToken) {
      const manualStoreId = (_b2 = options == null ? void 0 : options.storeId) == null ? void 0 : _b2.trim();
      if (manualStoreId) {
        return {
          kind: "oidc",
          token: oidcToken,
          storeId: normalizeStoreId(manualStoreId)
        };
      }
      const blobStoreId = readEnv("BLOB_STORE_ID");
      if (blobStoreId) {
        return {
          kind: "oidc",
          token: oidcToken,
          storeId: normalizeStoreId(blobStoreId)
        };
      }
      if (manualOidcToken) {
        throw new BlobError(
          "oidcToken was passed, but no storeId was found. Pass a `storeId` option or set `BLOB_STORE_ID` to use OIDC auth"
        );
      }
    }
    const readWrite = readEnv("BLOB_READ_WRITE_TOKEN");
    if (readWrite) {
      const storeId = parseStoreIdFromReadWriteToken(readWrite);
      return { kind: "readWrite", token: readWrite, storeId };
    }
    throw new BlobError(
      "No blob credentials found. Pass a `token` option, set `BLOB_READ_WRITE_TOKEN`, or use `oidcToken` (or `VERCEL_OIDC_TOKEN`) with `storeId` or `BLOB_STORE_ID`."
    );
  }
  var BlobError = class extends Error {
    constructor(message2) {
      super(`Vercel Blob: ${message2}`);
    }
  };
  function isPlainObject(value) {
    if (typeof value !== "object" || value === null) {
      return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
  }
  var disallowedPathnameCharacters = ["//"];
  var supportsRequestStreams = (() => {
    if (isNodeProcess()) {
      return true;
    }
    const apiUrl = getApiUrl();
    if (apiUrl.startsWith("http://localhost")) {
      return false;
    }
    let duplexAccessed = false;
    const hasContentType = new Request(getApiUrl(), {
      body: new ReadableStream(),
      method: "POST",
      // @ts-expect-error -- TypeScript doesn't yet have duplex but it's in the spec: https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1729
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  })();
  function getApiUrl(pathname = "") {
    let baseUrl = null;
    try {
      baseUrl = process.env.VERCEL_BLOB_API_URL || process.env.NEXT_PUBLIC_VERCEL_BLOB_API_URL;
    } catch {
    }
    return `${baseUrl || defaultVercelBlobApiUrl}${pathname}`;
  }
  var TEXT_ENCODER = typeof TextEncoder === "function" ? new TextEncoder() : null;
  function computeBodyLength(body) {
    if (!body) {
      return 0;
    }
    if (typeof body === "string") {
      if (TEXT_ENCODER) {
        return TEXT_ENCODER.encode(body).byteLength;
      }
      return new Blob([body]).size;
    }
    if ("byteLength" in body && typeof body.byteLength === "number") {
      return body.byteLength;
    }
    if ("size" in body && typeof body.size === "number") {
      return body.size;
    }
    return 0;
  }
  var createChunkTransformStream = (chunkSize, onProgress) => {
    let buffer = new Uint8Array(0);
    return new TransformStream({
      transform(chunk, controller) {
        const newBuffer = new Uint8Array(buffer.length + chunk.byteLength);
        newBuffer.set(buffer);
        newBuffer.set(new Uint8Array(chunk), buffer.length);
        buffer = newBuffer;
        while (buffer.length >= chunkSize) {
          const newChunk = buffer.slice(0, chunkSize);
          controller.enqueue(newChunk);
          onProgress == null ? void 0 : onProgress(newChunk.byteLength);
          buffer = buffer.slice(chunkSize);
        }
      },
      flush(controller) {
        if (buffer.length > 0) {
          controller.enqueue(buffer);
          onProgress == null ? void 0 : onProgress(buffer.byteLength);
        }
      }
    });
  };
  function isReadableStream(value) {
    return globalThis.ReadableStream && // TODO: Can be removed once Node.js 16 is no more required internally
    value instanceof ReadableStream;
  }
  function isStream(value) {
    if (isReadableStream(value)) {
      return true;
    }
    if (isNodeJsReadableStream(value)) {
      return true;
    }
    return false;
  }
  var addPresignedParams = (url, presignedUrlPayload) => {
    const urlObj = new URL(url);
    for (const [key, value] of Object.entries(presignedUrlPayload.params)) {
      urlObj.searchParams.set(key, value);
    }
    urlObj.searchParams.set(
      "vercel-blob-delegation",
      presignedUrlPayload.delegationToken
    );
    urlObj.searchParams.set(
      "vercel-blob-signature",
      presignedUrlPayload.signature
    );
    return urlObj.toString();
  };
  var debugIsActive = false;
  var _a;
  var _b;
  try {
    if (((_a = process.env.DEBUG) == null ? void 0 : _a.includes("blob")) || ((_b = process.env.NEXT_PUBLIC_DEBUG) == null ? void 0 : _b.includes("blob"))) {
      debugIsActive = true;
    }
  } catch {
  }
  function debug(message2, ...args) {
    if (debugIsActive) {
      console.debug(`vercel-blob: ${message2}`, ...args);
    }
  }
  var _a2;
  var DOMException2 = (_a2 = globalThis.DOMException) != null ? _a2 : (() => {
    try {
      atob("~");
    } catch (err) {
      return Object.getPrototypeOf(err).constructor;
    }
  })();
  var objectToString = Object.prototype.toString;
  var isError = (value) => objectToString.call(value) === "[object Error]";
  var errorMessages = /* @__PURE__ */ new Set([
    "network error",
    // Chrome
    "Failed to fetch",
    // Chrome
    "NetworkError when attempting to fetch resource.",
    // Firefox
    "The Internet connection appears to be offline.",
    // Safari 16
    "Load failed",
    // Safari 17+
    "Network request failed",
    // `cross-fetch`
    "fetch failed",
    // Undici (Node.js)
    "terminated"
    // Undici (Node.js)
  ]);
  function isNetworkError(error) {
    const isValid = error && isError(error) && error.name === "TypeError" && typeof error.message === "string";
    if (!isValid) {
      return false;
    }
    if (error.message === "Load failed") {
      return error.stack === void 0;
    }
    return errorMessages.has(error.message);
  }
  var hasFetch = typeof fetch2 === "function";
  var hasFetchWithUploadProgress = hasFetch && supportsRequestStreams;
  var CHUNK_SIZE = 64 * 1024;
  var blobFetch = async ({
    input,
    init,
    onUploadProgress
  }) => {
    debug("using fetch");
    let body;
    if (init.body) {
      if (onUploadProgress) {
        const stream = await toReadableStream(init.body);
        let loaded = 0;
        const chunkTransformStream = createChunkTransformStream(
          CHUNK_SIZE,
          (newLoaded) => {
            loaded += newLoaded;
            onUploadProgress(loaded);
          }
        );
        body = stream.pipeThrough(chunkTransformStream);
      } else {
        body = init.body;
      }
    }
    const duplex = supportsRequestStreams && body && isStream(body) ? "half" : void 0;
    return fetch2(
      input,
      // @ts-expect-error -- Blob and Nodejs Blob are triggering type errors, fine with it
      {
        ...init,
        ...init.body ? { body } : {},
        duplex
      }
    );
  };
  var hasXhr = typeof XMLHttpRequest !== "undefined";
  var blobXhr = async ({
    input,
    init,
    onUploadProgress
  }) => {
    debug("using xhr");
    let body = null;
    if (init.body) {
      if (isReadableStream(init.body)) {
        body = await new Response(init.body).blob();
      } else {
        body = init.body;
      }
    }
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(init.method || "GET", input.toString(), true);
      if (onUploadProgress) {
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            onUploadProgress(event.loaded);
          }
        });
      }
      xhr.onload = () => {
        var _a3;
        if ((_a3 = init.signal) == null ? void 0 : _a3.aborted) {
          reject(new DOMException("The user aborted the request.", "AbortError"));
          return;
        }
        const headers = new Headers();
        const rawHeaders = xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);
        rawHeaders.forEach((line) => {
          const parts = line.split(": ");
          const key = parts.shift();
          const value = parts.join(": ");
          if (key) headers.set(key.toLowerCase(), value);
        });
        const response = new Response(xhr.response, {
          status: xhr.status,
          statusText: xhr.statusText,
          headers
        });
        resolve(response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed"));
      };
      xhr.ontimeout = () => {
        reject(new TypeError("Network request timed out"));
      };
      xhr.onabort = () => {
        reject(new DOMException("The user aborted a request.", "AbortError"));
      };
      if (init.headers) {
        const headers = new Headers(init.headers);
        headers.forEach((value, key) => {
          xhr.setRequestHeader(key, value);
        });
      }
      if (init.signal) {
        init.signal.addEventListener("abort", () => {
          xhr.abort();
        });
        if (init.signal.aborted) {
          xhr.abort();
          return;
        }
      }
      xhr.send(body);
    });
  };
  var blobRequest = async ({
    input,
    init,
    onUploadProgress
  }) => {
    if (onUploadProgress) {
      if (hasFetchWithUploadProgress) {
        return blobFetch({ input, init, onUploadProgress });
      }
      if (hasXhr) {
        return blobXhr({ input, init, onUploadProgress });
      }
    }
    if (hasFetch) {
      return blobFetch({ input, init });
    }
    if (hasXhr) {
      return blobXhr({ input, init });
    }
    throw new Error("No request implementation available");
  };
  var MAXIMUM_PATHNAME_LENGTH = 950;
  var BlobAccessError = class extends BlobError {
    constructor() {
      super("Access denied, please provide a valid token for this resource.");
    }
  };
  var BlobOidcEnvironmentNotAllowedError = class extends BlobError {
    constructor(message2) {
      super(
        message2 != null ? message2 : "OIDC is enabled for this project, but not for this token's environment."
      );
    }
  };
  var BlobContentTypeNotAllowedError = class extends BlobError {
    constructor(message2) {
      super(`Content type mismatch, ${message2}.`);
    }
  };
  var BlobPathnameMismatchError = class extends BlobError {
    constructor(message2) {
      super(
        `Pathname mismatch, ${message2}. Check the pathname used in upload() or put() matches the one from the client token.`
      );
    }
  };
  var BlobClientTokenExpiredError = class extends BlobError {
    constructor() {
      super("Client token has expired.");
    }
  };
  var BlobFileTooLargeError = class extends BlobError {
    constructor(message2) {
      super(`File is too large, ${message2}.`);
    }
  };
  var BlobStoreNotFoundError = class extends BlobError {
    constructor() {
      super("This store does not exist.");
    }
  };
  var BlobStoreSuspendedError = class extends BlobError {
    constructor() {
      super("This store has been suspended.");
    }
  };
  var BlobUnknownError = class extends BlobError {
    constructor() {
      super("Unknown error, please visit https://vercel.com/help.");
    }
  };
  var BlobNotFoundError = class extends BlobError {
    constructor() {
      super("The requested blob does not exist");
    }
  };
  var BlobServiceNotAvailable = class extends BlobError {
    constructor() {
      super("The blob service is currently not available. Please try again.");
    }
  };
  var BlobServiceRateLimited = class extends BlobError {
    constructor(seconds) {
      super(
        `Too many requests please lower the number of concurrent requests ${seconds ? ` - try again in ${seconds} seconds` : ""}.`
      );
      this.retryAfter = seconds != null ? seconds : 0;
    }
  };
  var BlobRequestAbortedError = class extends BlobError {
    constructor() {
      super("The request was aborted.");
    }
  };
  var BlobPreconditionFailedError = class extends BlobError {
    constructor() {
      super("Precondition failed: ETag mismatch.");
    }
  };
  var BLOB_API_VERSION = 12;
  function getApiVersion() {
    let versionOverride = null;
    try {
      versionOverride = process.env.VERCEL_BLOB_API_VERSION_OVERRIDE || process.env.NEXT_PUBLIC_VERCEL_BLOB_API_VERSION_OVERRIDE;
    } catch {
    }
    return `${versionOverride != null ? versionOverride : BLOB_API_VERSION}`;
  }
  function getRetries() {
    try {
      const retries = process.env.VERCEL_BLOB_RETRIES || "10";
      return parseInt(retries, 10);
    } catch {
      return 10;
    }
  }
  function createBlobServiceRateLimited(response) {
    const retryAfter = response.headers.get("retry-after");
    return new BlobServiceRateLimited(
      retryAfter ? parseInt(retryAfter, 10) : void 0
    );
  }
  async function getBlobError(response) {
    var _a3, _b2, _c;
    let code;
    let message2;
    try {
      const data = await response.json();
      code = (_b2 = (_a3 = data.error) == null ? void 0 : _a3.code) != null ? _b2 : "unknown_error";
      message2 = (_c = data.error) == null ? void 0 : _c.message;
    } catch {
      code = "unknown_error";
    }
    if ((message2 == null ? void 0 : message2.includes("contentType")) && message2.includes("is not allowed")) {
      code = "content_type_not_allowed";
    }
    if ((message2 == null ? void 0 : message2.includes('"pathname"')) && message2.includes("does not match the token payload")) {
      code = "client_token_pathname_mismatch";
    }
    if (message2 === "Token expired") {
      code = "client_token_expired";
    }
    if (message2 == null ? void 0 : message2.includes("the file length cannot be greater than")) {
      code = "file_too_large";
    }
    if ((message2 == null ? void 0 : message2.startsWith("OIDC is enabled for this project, but not for the")) && message2.includes("environment.")) {
      code = "oidc_environment_not_allowed";
    }
    let error;
    switch (code) {
      case "store_suspended":
        error = new BlobStoreSuspendedError();
        break;
      case "forbidden":
        error = new BlobAccessError();
        break;
      case "oidc_environment_not_allowed":
        error = new BlobOidcEnvironmentNotAllowedError(message2);
        break;
      case "content_type_not_allowed":
        error = new BlobContentTypeNotAllowedError(message2);
        break;
      case "client_token_pathname_mismatch":
        error = new BlobPathnameMismatchError(message2);
        break;
      case "client_token_expired":
        error = new BlobClientTokenExpiredError();
        break;
      case "file_too_large":
        error = new BlobFileTooLargeError(message2);
        break;
      case "not_found":
        error = new BlobNotFoundError();
        break;
      case "client_token_not_allowed":
        error = new BlobError(
          message2 != null ? message2 : "This operation is not available when using a client token. Use a read\u2013write or OIDC token on the server."
        );
        break;
      case "store_not_found":
        error = new BlobStoreNotFoundError();
        break;
      case "bad_request":
        error = new BlobError(message2 != null ? message2 : "Bad request");
        break;
      case "service_unavailable":
        error = new BlobServiceNotAvailable();
        break;
      case "rate_limited":
        error = createBlobServiceRateLimited(response);
        break;
      case "precondition_failed":
        error = new BlobPreconditionFailedError();
        break;
      case "unknown_error":
      case "not_allowed":
      default:
        error = new BlobUnknownError();
        break;
    }
    return { code, error };
  }
  async function requestApi(pathname, init, commandOptions) {
    const apiVersion = getApiVersion();
    const auth = await resolveBlobAuth(commandOptions);
    const bearerToken = auth.kind === "presigned" ? void 0 : auth.token;
    const extraHeaders = getProxyThroughAlternativeApiHeaderFromEnv();
    let requestInput = getApiUrl(pathname);
    if (commandOptions == null ? void 0 : commandOptions.presignedUrlPayload) {
      requestInput = addPresignedParams(
        requestInput,
        commandOptions.presignedUrlPayload
      );
    }
    const requestId = `${auth.storeId}:${Date.now()}:${Math.random().toString(16).slice(2)}`;
    let retryCount = 0;
    let bodyLength = 0;
    let totalLoaded = 0;
    const sendBodyLength = (commandOptions == null ? void 0 : commandOptions.onUploadProgress) || shouldUseXContentLength();
    if (init.body && // 1. For upload progress we always need to know the total size of the body
    // 2. In development we need the header for put() to work correctly when passing a stream
    sendBodyLength) {
      bodyLength = computeBodyLength(init.body);
    }
    if (commandOptions == null ? void 0 : commandOptions.onUploadProgress) {
      commandOptions.onUploadProgress({
        loaded: 0,
        total: bodyLength,
        percentage: 0
      });
    }
    const apiResponse = await (0, import_async_retry.default)(
      async (bail) => {
        let res;
        try {
          res = await blobRequest({
            input: requestInput,
            init: {
              ...init,
              headers: {
                "x-api-blob-request-id": requestId,
                // Store ID is not encoded in OIDC token, so pass it separately as a header
                "x-vercel-blob-store-id": auth.storeId,
                "x-api-blob-request-attempt": String(retryCount),
                "x-api-version": apiVersion,
                ...sendBodyLength ? { "x-content-length": String(bodyLength) } : {},
                ...bearerToken !== void 0 ? { authorization: `Bearer ${bearerToken}` } : {},
                ...extraHeaders,
                ...init.headers
              }
            },
            onUploadProgress: (commandOptions == null ? void 0 : commandOptions.onUploadProgress) ? (loaded) => {
              var _a3;
              const total = bodyLength !== 0 ? bodyLength : loaded;
              totalLoaded = loaded;
              const percentage = bodyLength > 0 ? Number((loaded / total * 100).toFixed(2)) : 0;
              if (percentage === 100 && bodyLength > 0) {
                return;
              }
              (_a3 = commandOptions.onUploadProgress) == null ? void 0 : _a3.call(commandOptions, {
                loaded,
                // When passing a stream to put(), we have no way to know the total size of the body.
                // Instead of defining total as total?: number we decided to set the total to the currently
                // loaded number. This is not inaccurate and way more practical for DX.
                // Passing down a stream to put() is very rare
                total,
                percentage
              });
            } : void 0
          });
        } catch (error2) {
          if (error2 instanceof DOMException2 && error2.name === "AbortError") {
            bail(new BlobRequestAbortedError());
            return;
          }
          if (isNetworkError(error2)) {
            throw error2;
          }
          if (error2 instanceof TypeError) {
            bail(error2);
            return;
          }
          throw error2;
        }
        if (res.ok) {
          return res;
        }
        const { code, error } = await getBlobError(res);
        if (code === "unknown_error" || code === "service_unavailable" || code === "internal_server_error") {
          throw error;
        }
        bail(error);
      },
      {
        retries: getRetries(),
        onRetry: (error) => {
          if (error instanceof Error) {
            debug(`retrying API request to ${pathname}`, error.message);
          }
          retryCount = retryCount + 1;
        }
      }
    );
    if (!apiResponse) {
      throw new BlobUnknownError();
    }
    if (commandOptions == null ? void 0 : commandOptions.onUploadProgress) {
      commandOptions.onUploadProgress({
        loaded: totalLoaded,
        total: totalLoaded,
        percentage: 100
      });
    }
    return await apiResponse.json();
  }
  function getProxyThroughAlternativeApiHeaderFromEnv() {
    const extraHeaders = {};
    try {
      if ("VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API" in process.env && process.env.VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API !== void 0) {
        extraHeaders["x-proxy-through-alternative-api"] = process.env.VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API;
      } else if ("NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API" in process.env && process.env.NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API !== void 0) {
        extraHeaders["x-proxy-through-alternative-api"] = process.env.NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API;
      }
    } catch {
    }
    return extraHeaders;
  }
  function shouldUseXContentLength() {
    try {
      return process.env.VERCEL_BLOB_USE_X_CONTENT_LENGTH === "1";
    } catch {
      return false;
    }
  }
  var optimizeImageFormatToMimeType = {
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    avif: "image/avif"
  };
  function validateOptimizeImageOptions(optimizeImage) {
    if (typeof optimizeImage !== "object" || optimizeImage === null) {
      throw new BlobError("optimizeImage must be an object, see usage");
    }
    const { width, quality, format } = optimizeImage;
    if (!Number.isInteger(width) || width < 1 || width > 8192) {
      throw new BlobError(
        "optimizeImage.width must be an integer between 1 and 8192"
      );
    }
    if (quality !== void 0 && (!Number.isInteger(quality) || quality < 1 || quality > 100)) {
      throw new BlobError(
        "optimizeImage.quality must be an integer between 1 and 100"
      );
    }
    if (format !== void 0 && !(format in optimizeImageFormatToMimeType)) {
      throw new BlobError(
        `optimizeImage.format must be one of: ${Object.keys(
          optimizeImageFormatToMimeType
        ).join(", ")}`
      );
    }
  }
  function validateOptimizeImageSourceContentType(contentType) {
    if (contentType && contentType !== "application/octet-stream" && !contentType.startsWith("image/")) {
      throw new BlobError(
        `optimizeImage requires an image body, but the content type is "${contentType}"`
      );
    }
  }
  function addOptimizeImageParams(params, optimizeImage) {
    var _a3;
    validateOptimizeImageOptions(optimizeImage);
    params.set("width", String(optimizeImage.width));
    params.set("quality", String((_a3 = optimizeImage.quality) != null ? _a3 : 75));
    if (optimizeImage.format) {
      params.set("format", optimizeImageFormatToMimeType[optimizeImage.format]);
    }
  }
  var putOptionHeaderMap = {
    cacheControlMaxAge: "x-cache-control-max-age",
    addRandomSuffix: "x-add-random-suffix",
    allowOverwrite: "x-allow-overwrite",
    contentType: "x-content-type",
    access: "x-vercel-blob-access",
    ifMatch: "x-if-match"
  };
  function createPutHeaders(allowedOptions, options) {
    const headers = {};
    headers[putOptionHeaderMap.access] = options.access;
    if (allowedOptions.includes("contentType") && options.contentType) {
      headers[putOptionHeaderMap.contentType] = options.contentType;
    }
    if (allowedOptions.includes("addRandomSuffix") && options.addRandomSuffix !== void 0) {
      headers[putOptionHeaderMap.addRandomSuffix] = options.addRandomSuffix ? "1" : "0";
    }
    if (allowedOptions.includes("ifMatch") && options.ifMatch) {
      if (options.allowOverwrite === false) {
        throw new BlobError(
          "ifMatch and allowOverwrite: false are contradictory. ifMatch is used for conditional overwrites, which requires allowOverwrite to be true."
        );
      }
      headers[putOptionHeaderMap.ifMatch] = options.ifMatch;
      if (allowedOptions.includes("allowOverwrite") && options.allowOverwrite === void 0) {
        headers[putOptionHeaderMap.allowOverwrite] = "1";
      }
    }
    if (allowedOptions.includes("allowOverwrite") && options.allowOverwrite !== void 0) {
      headers[putOptionHeaderMap.allowOverwrite] = options.allowOverwrite ? "1" : "0";
    }
    if (allowedOptions.includes("cacheControlMaxAge") && options.cacheControlMaxAge !== void 0) {
      headers[putOptionHeaderMap.cacheControlMaxAge] = options.cacheControlMaxAge.toString();
    }
    return headers;
  }
  async function createPutOptions({
    pathname,
    options,
    extraChecks,
    getToken
  }) {
    if (!pathname) {
      throw new BlobError("pathname is required");
    }
    if (pathname.length > MAXIMUM_PATHNAME_LENGTH) {
      throw new BlobError(
        `pathname is too long, maximum length is ${MAXIMUM_PATHNAME_LENGTH}`
      );
    }
    for (const invalidCharacter of disallowedPathnameCharacters) {
      if (pathname.includes(invalidCharacter)) {
        throw new BlobError(
          `pathname cannot contain "${invalidCharacter}", please encode it if needed`
        );
      }
    }
    if (!options) {
      throw new BlobError("missing options, see usage");
    }
    if (options.access !== "public" && options.access !== "private") {
      throw new BlobError(
        'access must be "private" or "public", see https://vercel.com/docs/vercel-blob'
      );
    }
    if (extraChecks) {
      extraChecks(options);
    }
    if (getToken) {
      options.token = await getToken(pathname, options);
    }
    return options;
  }
  function createCompleteMultipartUploadMethod({ allowedOptions, getToken, extraChecks }) {
    return async (pathname, parts, optionsInput) => {
      const options = await createPutOptions({
        pathname,
        options: optionsInput,
        extraChecks,
        getToken
      });
      const headers = createPutHeaders(allowedOptions, options);
      return completeMultipartUpload({
        uploadId: options.uploadId,
        key: options.key,
        pathname,
        headers,
        options,
        parts
      });
    };
  }
  async function completeMultipartUpload({
    uploadId,
    key,
    pathname,
    parts,
    headers,
    options
  }) {
    const params = new URLSearchParams({ pathname });
    try {
      const response = await requestApi(
        `/mpu?${params.toString()}`,
        {
          method: "POST",
          headers: {
            ...headers,
            "content-type": "application/json",
            "x-mpu-action": "complete",
            "x-mpu-upload-id": uploadId,
            // key can be any utf8 character so we need to encode it as HTTP headers can only be us-ascii
            // https://www.rfc-editor.org/rfc/rfc7230#swection-3.2.4
            "x-mpu-key": encodeURIComponent(key)
          },
          body: JSON.stringify(parts),
          signal: options.abortSignal
        },
        options
      );
      debug("mpu: complete", response);
      return response;
    } catch (error) {
      if (error instanceof TypeError && (error.message === "Failed to fetch" || error.message === "fetch failed")) {
        throw new BlobServiceNotAvailable();
      } else {
        throw error;
      }
    }
  }
  function createCreateMultipartUploadMethod({ allowedOptions, getToken, extraChecks }) {
    return async (pathname, optionsInput) => {
      const options = await createPutOptions({
        pathname,
        options: optionsInput,
        extraChecks,
        getToken
      });
      const headers = createPutHeaders(allowedOptions, options);
      const createMultipartUploadResponse = await createMultipartUpload(
        pathname,
        headers,
        options
      );
      return {
        key: createMultipartUploadResponse.key,
        uploadId: createMultipartUploadResponse.uploadId
      };
    };
  }
  async function createMultipartUpload(pathname, headers, options) {
    debug("mpu: create", "pathname:", pathname);
    const params = new URLSearchParams({ pathname });
    try {
      const response = await requestApi(
        `/mpu?${params.toString()}`,
        {
          method: "POST",
          headers: {
            ...headers,
            "x-mpu-action": "create"
          },
          signal: options.abortSignal
        },
        options
      );
      debug("mpu: create", response);
      return response;
    } catch (error) {
      if (error instanceof TypeError && (error.message === "Failed to fetch" || error.message === "fetch failed")) {
        throw new BlobServiceNotAvailable();
      }
      throw error;
    }
  }
  function createUploadPartMethod({ allowedOptions, getToken, extraChecks }) {
    return async (pathname, body, optionsInput) => {
      const options = await createPutOptions({
        pathname,
        options: optionsInput,
        extraChecks,
        getToken
      });
      const headers = createPutHeaders(allowedOptions, options);
      if (isPlainObject(body)) {
        throw new BlobError(
          "Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload."
        );
      }
      const result = await uploadPart({
        uploadId: options.uploadId,
        key: options.key,
        pathname,
        part: { blob: body, partNumber: options.partNumber },
        headers,
        options
      });
      return {
        etag: result.etag,
        partNumber: options.partNumber
      };
    };
  }
  async function uploadPart({
    uploadId,
    key,
    pathname,
    headers,
    options,
    internalAbortController = new AbortController(),
    part
  }) {
    var _a3, _b2, _c;
    const params = new URLSearchParams({ pathname });
    const responsePromise = requestApi(
      `/mpu?${params.toString()}`,
      {
        signal: internalAbortController.signal,
        method: "POST",
        headers: {
          ...headers,
          "x-mpu-action": "upload",
          "x-mpu-key": encodeURIComponent(key),
          "x-mpu-upload-id": uploadId,
          "x-mpu-part-number": part.partNumber.toString()
        },
        // weird things between undici types and native fetch types
        body: part.blob
      },
      options
    );
    function handleAbort() {
      internalAbortController.abort();
    }
    if ((_a3 = options.abortSignal) == null ? void 0 : _a3.aborted) {
      handleAbort();
    } else {
      (_b2 = options.abortSignal) == null ? void 0 : _b2.addEventListener("abort", handleAbort);
    }
    const response = await responsePromise;
    (_c = options.abortSignal) == null ? void 0 : _c.removeEventListener("abort", handleAbort);
    return response;
  }
  var maxConcurrentUploads = typeof window !== "undefined" ? 6 : 8;
  var partSizeInBytes = 8 * 1024 * 1024;
  var maxBytesInMemory = maxConcurrentUploads * partSizeInBytes * 2;
  function uploadAllParts({
    uploadId,
    key,
    pathname,
    stream,
    headers,
    options,
    totalToLoad
  }) {
    debug("mpu: upload init", "key:", key);
    const internalAbortController = new AbortController();
    return new Promise((resolve, reject) => {
      const partsToUpload = [];
      const completedParts = [];
      const reader = stream.getReader();
      let activeUploads = 0;
      let reading = false;
      let currentPartNumber = 1;
      let rejected = false;
      let currentBytesInMemory = 0;
      let doneReading = false;
      let bytesSent = 0;
      let arrayBuffers = [];
      let currentPartBytesRead = 0;
      let onUploadProgress;
      const totalLoadedPerPartNumber = {};
      if (options.onUploadProgress) {
        onUploadProgress = (0, import_throttleit.default)(() => {
          var _a3;
          const loaded = Object.values(totalLoadedPerPartNumber).reduce(
            (acc, cur) => {
              return acc + cur;
            },
            0
          );
          const total = totalToLoad || loaded;
          const percentage = totalToLoad > 0 ? Number(((loaded / totalToLoad || loaded) * 100).toFixed(2)) : 0;
          (_a3 = options.onUploadProgress) == null ? void 0 : _a3.call(options, { loaded, total, percentage });
        }, 150);
      }
      read().catch(cancel);
      async function read() {
        debug(
          "mpu: upload read start",
          "activeUploads:",
          activeUploads,
          "currentBytesInMemory:",
          `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`,
          "bytesSent:",
          bytes(bytesSent)
        );
        reading = true;
        while (currentBytesInMemory < maxBytesInMemory && !rejected) {
          try {
            const { value, done } = await reader.read();
            if (done) {
              doneReading = true;
              debug("mpu: upload read consumed the whole stream");
              if (arrayBuffers.length > 0) {
                partsToUpload.push({
                  partNumber: currentPartNumber++,
                  blob: new Blob(arrayBuffers, {
                    type: "application/octet-stream"
                  })
                });
                sendParts();
              } else if (activeUploads === 0) {
                reader.releaseLock();
                resolve(completedParts);
              }
              reading = false;
              return;
            }
            currentBytesInMemory += value.byteLength;
            let valueOffset = 0;
            while (valueOffset < value.byteLength) {
              const remainingPartSize = partSizeInBytes - currentPartBytesRead;
              const endOffset = Math.min(
                valueOffset + remainingPartSize,
                value.byteLength
              );
              const chunk = value.slice(valueOffset, endOffset);
              arrayBuffers.push(chunk);
              currentPartBytesRead += chunk.byteLength;
              valueOffset = endOffset;
              if (currentPartBytesRead === partSizeInBytes) {
                partsToUpload.push({
                  partNumber: currentPartNumber++,
                  blob: new Blob(arrayBuffers, {
                    type: "application/octet-stream"
                  })
                });
                arrayBuffers = [];
                currentPartBytesRead = 0;
                sendParts();
              }
            }
          } catch (error) {
            cancel(error);
          }
        }
        debug(
          "mpu: upload read end",
          "activeUploads:",
          activeUploads,
          "currentBytesInMemory:",
          `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`,
          "bytesSent:",
          bytes(bytesSent)
        );
        reading = false;
      }
      async function sendPart(part) {
        activeUploads++;
        debug(
          "mpu: upload send part start",
          "partNumber:",
          part.partNumber,
          "size:",
          part.blob.size,
          "activeUploads:",
          activeUploads,
          "currentBytesInMemory:",
          `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`,
          "bytesSent:",
          bytes(bytesSent)
        );
        try {
          const uploadProgressForPart = options.onUploadProgress ? (event) => {
            totalLoadedPerPartNumber[part.partNumber] = event.loaded;
            if (onUploadProgress) {
              onUploadProgress();
            }
          } : void 0;
          const completedPart = await uploadPart({
            uploadId,
            key,
            pathname,
            headers,
            options: {
              ...options,
              onUploadProgress: uploadProgressForPart
            },
            internalAbortController,
            part
          });
          debug(
            "mpu: upload send part end",
            "partNumber:",
            part.partNumber,
            "activeUploads",
            activeUploads,
            "currentBytesInMemory:",
            `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`,
            "bytesSent:",
            bytes(bytesSent)
          );
          if (rejected) {
            return;
          }
          completedParts.push({
            partNumber: part.partNumber,
            etag: completedPart.etag
          });
          currentBytesInMemory -= part.blob.size;
          activeUploads--;
          bytesSent += part.blob.size;
          if (partsToUpload.length > 0) {
            sendParts();
          }
          if (doneReading) {
            if (activeUploads === 0) {
              reader.releaseLock();
              resolve(completedParts);
            }
            return;
          }
          if (!reading) {
            read().catch(cancel);
          }
        } catch (error) {
          cancel(error);
        }
      }
      function sendParts() {
        if (rejected) {
          return;
        }
        debug(
          "send parts",
          "activeUploads",
          activeUploads,
          "partsToUpload",
          partsToUpload.length
        );
        while (activeUploads < maxConcurrentUploads && partsToUpload.length > 0) {
          const partToSend = partsToUpload.shift();
          if (partToSend) {
            void sendPart(partToSend);
          }
        }
      }
      function cancel(error) {
        if (rejected) {
          return;
        }
        rejected = true;
        internalAbortController.abort();
        reader.releaseLock();
        if (error instanceof TypeError && (error.message === "Failed to fetch" || error.message === "fetch failed")) {
          reject(new BlobServiceNotAvailable());
        } else {
          reject(error);
        }
      }
    });
  }
  function createCreateMultipartUploaderMethod({ allowedOptions, getToken, extraChecks }) {
    return async (pathname, optionsInput) => {
      const options = await createPutOptions({
        pathname,
        options: optionsInput,
        extraChecks,
        getToken
      });
      const headers = createPutHeaders(allowedOptions, options);
      const createMultipartUploadResponse = await createMultipartUpload(
        pathname,
        headers,
        options
      );
      return {
        key: createMultipartUploadResponse.key,
        uploadId: createMultipartUploadResponse.uploadId,
        async uploadPart(partNumber, body) {
          if (isPlainObject(body)) {
            throw new BlobError(
              "Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload."
            );
          }
          const result = await uploadPart({
            uploadId: createMultipartUploadResponse.uploadId,
            key: createMultipartUploadResponse.key,
            pathname,
            part: { partNumber, blob: body },
            headers,
            options
          });
          return {
            etag: result.etag,
            partNumber
          };
        },
        async complete(parts) {
          return completeMultipartUpload({
            uploadId: createMultipartUploadResponse.uploadId,
            key: createMultipartUploadResponse.key,
            pathname,
            parts,
            headers,
            options
          });
        }
      };
    };
  }
  async function uncontrolledMultipartUpload(pathname, body, headers, options) {
    debug("mpu: init", "pathname:", pathname, "headers:", headers);
    const optionsWithoutOnUploadProgress = {
      ...options,
      onUploadProgress: void 0
    };
    if (options.maximumSizeInBytes !== void 0 && !isStream(body) && computeBodyLength(body) > options.maximumSizeInBytes) {
      throw new BlobError(
        `Body size of ${computeBodyLength(body)} bytes exceeds the maximum allowed size of ${options.maximumSizeInBytes} bytes`
      );
    }
    const createMultipartUploadResponse = await createMultipartUpload(
      pathname,
      headers,
      optionsWithoutOnUploadProgress
    );
    const totalToLoad = computeBodyLength(body);
    const stream = await toReadableStream(body);
    const parts = await uploadAllParts({
      uploadId: createMultipartUploadResponse.uploadId,
      key: createMultipartUploadResponse.key,
      pathname,
      // @ts-expect-error ReadableStream<ArrayBuffer | Uint8Array> is compatible at runtime
      stream,
      headers,
      options,
      totalToLoad
    });
    const blob = await completeMultipartUpload({
      uploadId: createMultipartUploadResponse.uploadId,
      key: createMultipartUploadResponse.key,
      pathname,
      parts,
      headers,
      options: optionsWithoutOnUploadProgress
    });
    return blob;
  }
  function createPutMethod({
    allowedOptions,
    getToken,
    getPresignedUrlPayload,
    extraChecks
  }) {
    return async function put2(pathname, body, optionsInput) {
      var _a3;
      if (!body) {
        throw new BlobError("body is required");
      }
      if (isPlainObject(body)) {
        throw new BlobError(
          "Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload."
        );
      }
      const options = await createPutOptions({
        pathname,
        options: optionsInput,
        extraChecks,
        getToken
      });
      const presignedUrlPayload = await (getPresignedUrlPayload == null ? void 0 : getPresignedUrlPayload(
        pathname,
        options
      ));
      const optionsWithPresignedUrlPayload = {
        ...options,
        presignedUrlPayload
      };
      const headers = createPutHeaders(allowedOptions, options);
      if (options.optimizeImage) {
        if (options.multipart === true) {
          throw new BlobError(
            "optimizeImage cannot be combined with multipart uploads"
          );
        }
        validateOptimizeImageSourceContentType(
          (_a3 = options.contentType) != null ? _a3 : typeof Blob !== "undefined" && body instanceof Blob ? body.type : void 0
        );
        const params2 = new URLSearchParams({ pathname });
        addOptimizeImageParams(params2, options.optimizeImage);
        const response2 = await requestApi(
          `/put-optimized?${params2.toString()}`,
          {
            method: "POST",
            body,
            headers,
            signal: options.abortSignal
          },
          optionsWithPresignedUrlPayload
        );
        return {
          url: response2.url,
          downloadUrl: response2.downloadUrl,
          pathname: response2.pathname,
          contentType: response2.contentType,
          contentDisposition: response2.contentDisposition,
          etag: response2.etag
        };
      }
      if (options.multipart === true) {
        return uncontrolledMultipartUpload(
          pathname,
          body,
          headers,
          optionsWithPresignedUrlPayload
        );
      }
      const onUploadProgress = options.onUploadProgress ? (0, import_throttleit2.default)(options.onUploadProgress, 100) : void 0;
      const params = new URLSearchParams({ pathname });
      const response = await requestApi(
        `/?${params.toString()}`,
        {
          method: "PUT",
          body,
          headers,
          signal: options.abortSignal
        },
        {
          ...optionsWithPresignedUrlPayload,
          onUploadProgress
        }
      );
      return {
        url: response.url,
        downloadUrl: response.downloadUrl,
        pathname: response.pathname,
        contentType: response.contentType,
        contentDisposition: response.contentDisposition,
        etag: response.etag
      };
    };
  }
  var MAX_PRESIGN_CACHE_CONTROL_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;
  var utf8Encoder = new TextEncoder();

  // node_modules/@vercel/blob/dist/client.js
  function createPutExtraChecks(methodName) {
    return function extraChecks(options) {
      if (!options.token.startsWith("vercel_blob_client_")) {
        throw new BlobError(`${methodName} must be called with a client token`);
      }
      if (
        // @ts-expect-error -- Runtime check for DX.
        options.addRandomSuffix !== void 0 || // @ts-expect-error -- Runtime check for DX.
        options.allowOverwrite !== void 0 || // @ts-expect-error -- Runtime check for DX.
        options.cacheControlMaxAge !== void 0
      ) {
        throw new BlobError(
          `${methodName} doesn't allow \`addRandomSuffix\`, \`cacheControlMaxAge\` or \`allowOverwrite\`. Configure these options at the server side when generating client tokens.`
        );
      }
    };
  }
  var put = createPutMethod({
    allowedOptions: ["contentType"],
    extraChecks: createPutExtraChecks("client/`put`")
  });
  var createMultipartUpload2 = createCreateMultipartUploadMethod({
    allowedOptions: ["contentType"],
    extraChecks: createPutExtraChecks("client/`createMultipartUpload`")
  });
  var createMultipartUploader = createCreateMultipartUploaderMethod(
    {
      allowedOptions: ["contentType"],
      extraChecks: createPutExtraChecks("client/`createMultipartUpload`")
    }
  );
  var uploadPart2 = createUploadPartMethod({
    allowedOptions: ["contentType"],
    extraChecks: createPutExtraChecks("client/`multipartUpload`")
  });
  var completeMultipartUpload2 = createCompleteMultipartUploadMethod(
    {
      allowedOptions: ["contentType"],
      extraChecks: createPutExtraChecks("client/`completeMultipartUpload`")
    }
  );
  var upload = createPutMethod({
    allowedOptions: ["contentType"],
    extraChecks(options) {
      if (options.handleUploadUrl === void 0) {
        throw new BlobError(
          "client/`upload` requires the 'handleUploadUrl' parameter"
        );
      }
      if (
        // @ts-expect-error -- Runtime check for DX.
        options.addRandomSuffix !== void 0 || // @ts-expect-error -- Runtime check for DX.
        options.allowOverwrite !== void 0 || // @ts-expect-error -- Runtime check for DX.
        options.cacheControlMaxAge !== void 0 || // @ts-expect-error -- Runtime check for DX.
        options.ifMatch !== void 0
      ) {
        throw new BlobError(
          "client/`upload` doesn't allow `addRandomSuffix`, `cacheControlMaxAge`, `allowOverwrite` or `ifMatch`. Configure these options at the server side when generating client tokens."
        );
      }
    },
    async getToken(pathname, options) {
      var _a3, _b2;
      return retrieveClientToken({
        handleUploadUrl: options.handleUploadUrl,
        pathname,
        clientPayload: (_a3 = options.clientPayload) != null ? _a3 : null,
        multipart: (_b2 = options.multipart) != null ? _b2 : false,
        headers: options.headers
      });
    }
  });
  var uploadPresigned = createPutMethod({
    allowedOptions: ["contentType"],
    extraChecks(options) {
      if (options.handleUploadUrl === void 0) {
        throw new BlobError(
          "client/`upload` requires the 'handleUploadUrl' parameter"
        );
      }
      if (
        // @ts-expect-error -- Runtime check for DX.
        options.addRandomSuffix !== void 0 || // @ts-expect-error -- Runtime check for DX.
        options.allowOverwrite !== void 0 || // @ts-expect-error -- Runtime check for DX.
        options.cacheControlMaxAge !== void 0 || // @ts-expect-error -- Runtime check for DX.
        options.ifMatch !== void 0
      ) {
        throw new BlobError(
          "client/`uploadPresigned` doesn't allow `addRandomSuffix`, `cacheControlMaxAge`, `allowOverwrite` or `ifMatch`. Configure these options at the server side when generating presigned URLs."
        );
      }
    },
    async getPresignedUrlPayload(pathname, options) {
      var _a3, _b2;
      return retrievePresignedUrlPayload({
        pathname,
        handleUploadUrl: options.handleUploadUrl,
        clientPayload: (_a3 = options.clientPayload) != null ? _a3 : null,
        multipart: (_b2 = options.multipart) != null ? _b2 : false,
        headers: options.headers
      });
    }
  });
  var EventTypes = {
    generateClientToken: "blob.generate-client-token",
    generatePresignedUrl: "blob.generate-presigned-url",
    uploadCompleted: "blob.upload-completed"
  };
  async function retrieveClientToken(options) {
    const { handleUploadUrl, pathname } = options;
    const url = isAbsoluteUrl(handleUploadUrl) ? handleUploadUrl : toAbsoluteUrl(handleUploadUrl);
    const event = {
      type: EventTypes.generateClientToken,
      payload: {
        pathname,
        clientPayload: options.clientPayload,
        multipart: options.multipart
      }
    };
    const res = await fetch2(url, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "content-type": "application/json",
        ...options.headers
      },
      signal: options.abortSignal
    });
    if (!res.ok) {
      throw new BlobError("Failed to  retrieve the client token");
    }
    try {
      const { clientToken } = await res.json();
      return clientToken;
    } catch {
      throw new BlobError("Failed to retrieve the client token");
    }
  }
  async function retrievePresignedUrlPayload(options) {
    const { handleUploadUrl, pathname } = options;
    const url = isAbsoluteUrl(handleUploadUrl) ? handleUploadUrl : toAbsoluteUrl(handleUploadUrl);
    const event = {
      type: EventTypes.generatePresignedUrl,
      payload: {
        pathname,
        clientPayload: options.clientPayload,
        multipart: options.multipart
      }
    };
    const res = await fetch2(url, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "content-type": "application/json",
        ...options.headers
      },
      signal: options.abortSignal
    });
    if (!res.ok) {
      throw new BlobError("Failed to retrieve the presigned URL");
    }
    try {
      const { presignedUrlPayload } = await res.json();
      if (presignedUrlPayload) {
        return presignedUrlPayload;
      }
      throw new BlobError("Missing presignedUrlPayload");
    } catch (error) {
      if (error instanceof BlobError) {
        throw error;
      }
      throw new BlobError("Failed to retrieve the presigned URL");
    }
  }
  function toAbsoluteUrl(url) {
    return new URL(url, location.href).href;
  }
  function isAbsoluteUrl(url) {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  }

  // blob-entry.js
  window.PortfolioBlob = {
    upload
  };
})();
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@vercel/blob/dist/chunk-OYCIHDFF.js:
  (*!
   * bytes
   * Copyright(c) 2012-2014 TJ Holowaychuk
   * Copyright(c) 2015 Jed Watson
   * MIT Licensed
   *)
*/
