/*
Jimp v1.1.1
https://github.com/oliver-moran/jimp
Ported for the Web by Phil Seaton

The MIT License (MIT)

Original Work Copyright (c) 2014 Oliver Moran
Modified Work Copyright 2016 Ryan Leonard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var window = window || self;


(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    (function (global, Buffer) {
      var window = window || self;if (function t(r, e, n) {
        function i(f, u) {
          if (!e[f]) {
            if (!r[f]) {
              var s = "function" == typeof require && require;if (!u && s) return s(f, !0);if (o) return o(f, !0);var a = new Error("Cannot find module '" + f + "'");throw a.code = "MODULE_NOT_FOUND", a;
            }var h = e[f] = { exports: {} };r[f][0].call(h.exports, function (t) {
              var e = r[f][1][t];return i(e ? e : t);
            }, h, h.exports, t, r, e, n);
          }return e[f].exports;
        }for (var o = "function" == typeof require && require, f = 0; f < n.length; f++) {
          i(n[f]);
        }return i;
      }({ 1: [function (t, r, e) {
          (function (t) {
            var r = r || self;if (!self.Buffer && !r.Buffer) throw new Error("Node's Buffer() not available");if (!self.Jimp && !r.Jimp) throw new Error("Could not Jimp object");!function () {
              function r(t, r) {
                var e = new XMLHttpRequest();e.open("GET", t, !0), e.responseType = "arraybuffer", e.onload = function () {
                  e.status < 400 ? r(this.response, null) : r(null, "HTTP Status " + e.status + " for url " + t);
                }, e.onerror = function (t) {
                  r(null, t);
                }, e.send();
              }function e(r) {
                for (var e = new t(r.byteLength), n = new Uint8Array(r), i = 0; i < e.length; ++i) {
                  e[i] = n[i];
                }return e;
              }function n(t) {
                return Object.prototype.toString.call(t).toLowerCase().indexOf("arraybuffer") > -1;
              }delete Jimp.prototype.write, delete Jimp.read, Jimp.read = function (t, i) {
                return new Promise(function (o, f) {
                  i = i || function (t, r) {
                    t ? f(t) : o(r);
                  }, "string" == typeof t ? r(t, function (r, o) {
                    r ? n(r) ? new Jimp(e(r), i) : i(new Error("Unrecognized data received for " + t)) : o && i(o);
                  }) : n(t) ? new Jimp(e(t), i) : i(new Error("Jimp expects a single ArrayBuffer or image URL"));
                });
              };
            }();
          }).call(this, t("buffer").Buffer);
        }, { buffer: 3 }], 2: [function (t, r, e) {
          "use strict";
          function n(t) {
            var r = t.length;if (r % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");return "=" === t[r - 2] ? 2 : "=" === t[r - 1] ? 1 : 0;
          }function i(t) {
            return 3 * t.length / 4 - n(t);
          }function o(t) {
            var r,
                e,
                i,
                o,
                f,
                u,
                s = t.length;f = n(t), u = new c(3 * s / 4 - f), i = f > 0 ? s - 4 : s;var a = 0;for (r = 0, e = 0; r < i; r += 4, e += 3) {
              o = h[t.charCodeAt(r)] << 18 | h[t.charCodeAt(r + 1)] << 12 | h[t.charCodeAt(r + 2)] << 6 | h[t.charCodeAt(r + 3)], u[a++] = o >> 16 & 255, u[a++] = o >> 8 & 255, u[a++] = 255 & o;
            }return 2 === f ? (o = h[t.charCodeAt(r)] << 2 | h[t.charCodeAt(r + 1)] >> 4, u[a++] = 255 & o) : 1 === f && (o = h[t.charCodeAt(r)] << 10 | h[t.charCodeAt(r + 1)] << 4 | h[t.charCodeAt(r + 2)] >> 2, u[a++] = o >> 8 & 255, u[a++] = 255 & o), u;
          }function f(t) {
            return a[t >> 18 & 63] + a[t >> 12 & 63] + a[t >> 6 & 63] + a[63 & t];
          }function u(t, r, e) {
            for (var n, i = [], o = r; o < e; o += 3) {
              n = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2], i.push(f(n));
            }return i.join("");
          }function s(t) {
            for (var r, e = t.length, n = e % 3, i = "", o = [], f = 16383, s = 0, h = e - n; s < h; s += f) {
              o.push(u(t, s, s + f > h ? h : s + f));
            }return 1 === n ? (r = t[e - 1], i += a[r >> 2], i += a[r << 4 & 63], i += "==") : 2 === n && (r = (t[e - 2] << 8) + t[e - 1], i += a[r >> 10], i += a[r >> 4 & 63], i += a[r << 2 & 63], i += "="), o.push(i), o.join("");
          }e.byteLength = i, e.toByteArray = o, e.fromByteArray = s;for (var a = [], h = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", p = 0, g = l.length; p < g; ++p) {
            a[p] = l[p], h[l.charCodeAt(p)] = p;
          }h["-".charCodeAt(0)] = 62, h["_".charCodeAt(0)] = 63;
        }, {}], 3: [function (t, r, e) {
          (function (r) {
            "use strict";
            function n() {
              try {
                var t = new Uint8Array(1);return t.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
                    return 42;
                  } }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
              } catch (t) {
                return !1;
              }
            }function i() {
              return f.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
            }function o(t, r) {
              if (i() < r) throw new RangeError("Invalid typed array length");return f.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(r), t.__proto__ = f.prototype) : (null === t && (t = new f(r)), t.length = r), t;
            }function f(t, r, e) {
              if (!(f.TYPED_ARRAY_SUPPORT || this instanceof f)) return new f(t, r, e);if ("number" == typeof t) {
                if ("string" == typeof r) throw new Error("If encoding is specified then the first argument must be a string");return h(this, t);
              }return u(this, t, r, e);
            }function u(t, r, e, n) {
              if ("number" == typeof r) throw new TypeError('"value" argument must not be a number');return "undefined" != typeof ArrayBuffer && r instanceof ArrayBuffer ? p(t, r, e, n) : "string" == typeof r ? c(t, r, e) : g(t, r);
            }function s(t) {
              if ("number" != typeof t) throw new TypeError('"size" argument must be a number');if (t < 0) throw new RangeError('"size" argument must not be negative');
            }function a(t, r, e, n) {
              return s(r), r <= 0 ? o(t, r) : void 0 !== e ? "string" == typeof n ? o(t, r).fill(e, n) : o(t, r).fill(e) : o(t, r);
            }function h(t, r) {
              if (s(r), t = o(t, r < 0 ? 0 : 0 | y(r)), !f.TYPED_ARRAY_SUPPORT) for (var e = 0; e < r; ++e) {
                t[e] = 0;
              }return t;
            }function c(t, r, e) {
              if ("string" == typeof e && "" !== e || (e = "utf8"), !f.isEncoding(e)) throw new TypeError('"encoding" must be a valid string encoding');var n = 0 | d(r, e);t = o(t, n);var i = t.write(r, e);return i !== n && (t = t.slice(0, i)), t;
            }function l(t, r) {
              var e = r.length < 0 ? 0 : 0 | y(r.length);t = o(t, e);for (var n = 0; n < e; n += 1) {
                t[n] = 255 & r[n];
              }return t;
            }function p(t, r, e, n) {
              if (r.byteLength, e < 0 || r.byteLength < e) throw new RangeError("'offset' is out of bounds");if (r.byteLength < e + (n || 0)) throw new RangeError("'length' is out of bounds");return r = void 0 === e && void 0 === n ? new Uint8Array(r) : void 0 === n ? new Uint8Array(r, e) : new Uint8Array(r, e, n), f.TYPED_ARRAY_SUPPORT ? (t = r, t.__proto__ = f.prototype) : t = l(t, r), t;
            }function g(t, r) {
              if (f.isBuffer(r)) {
                var e = 0 | y(r.length);return t = o(t, e), 0 === t.length ? t : (r.copy(t, 0, 0, e), t);
              }if (r) {
                if ("undefined" != typeof ArrayBuffer && r.buffer instanceof ArrayBuffer || "length" in r) return "number" != typeof r.length || K(r.length) ? o(t, 0) : l(t, r);if ("Buffer" === r.type && $(r.data)) return l(t, r.data);
              }throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }function y(t) {
              if (t >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");return 0 | t;
            }function w(t) {
              return +t != t && (t = 0), f.alloc(+t);
            }function d(t, r) {
              if (f.isBuffer(t)) return t.length;if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;"string" != typeof t && (t = "" + t);var e = t.length;if (0 === e) return 0;for (var n = !1;;) {
                switch (r) {case "ascii":case "latin1":case "binary":
                    return e;case "utf8":case "utf-8":case void 0:
                    return H(t).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                    return 2 * e;case "hex":
                    return e >>> 1;case "base64":
                    return V(t).length;default:
                    if (n) return H(t).length;r = ("" + r).toLowerCase(), n = !0;}
              }
            }function v(t, r, e) {
              var n = !1;if ((void 0 === r || r < 0) && (r = 0), r > this.length) return "";if ((void 0 === e || e > this.length) && (e = this.length), e <= 0) return "";if (e >>>= 0, r >>>= 0, e <= r) return "";for (t || (t = "utf8");;) {
                switch (t) {case "hex":
                    return C(this, r, e);case "utf8":case "utf-8":
                    return S(this, r, e);case "ascii":
                    return I(this, r, e);case "latin1":case "binary":
                    return L(this, r, e);case "base64":
                    return U(this, r, e);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                    return O(this, r, e);default:
                    if (n) throw new TypeError("Unknown encoding: " + t);t = (t + "").toLowerCase(), n = !0;}
              }
            }function E(t, r, e) {
              var n = t[r];t[r] = t[e], t[e] = n;
            }function A(t, r, e, n, i) {
              if (0 === t.length) return -1;if ("string" == typeof e ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, isNaN(e) && (e = i ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
                if (i) return -1;e = t.length - 1;
              } else if (e < 0) {
                if (!i) return -1;e = 0;
              }if ("string" == typeof r && (r = f.from(r, n)), f.isBuffer(r)) return 0 === r.length ? -1 : b(t, r, e, n, i);if ("number" == typeof r) return r &= 255, f.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : b(t, [r], e, n, i);throw new TypeError("val must be string, number or Buffer");
            }function b(t, r, e, n, i) {
              function o(t, r) {
                return 1 === f ? t[r] : t.readUInt16BE(r * f);
              }var f = 1,
                  u = t.length,
                  s = r.length;if (void 0 !== n && (n = String(n).toLowerCase(), "ucs2" === n || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                if (t.length < 2 || r.length < 2) return -1;f = 2, u /= 2, s /= 2, e /= 2;
              }var a;if (i) {
                var h = -1;for (a = e; a < u; a++) {
                  if (o(t, a) === o(r, h === -1 ? 0 : a - h)) {
                    if (h === -1 && (h = a), a - h + 1 === s) return h * f;
                  } else h !== -1 && (a -= a - h), h = -1;
                }
              } else for (e + s > u && (e = u - s), a = e; a >= 0; a--) {
                for (var c = !0, l = 0; l < s; l++) {
                  if (o(t, a + l) !== o(r, l)) {
                    c = !1;break;
                  }
                }if (c) return a;
              }return -1;
            }function m(t, r, e, n) {
              e = Number(e) || 0;var i = t.length - e;n ? (n = Number(n), n > i && (n = i)) : n = i;var o = r.length;if (o % 2 !== 0) throw new TypeError("Invalid hex string");n > o / 2 && (n = o / 2);for (var f = 0; f < n; ++f) {
                var u = parseInt(r.substr(2 * f, 2), 16);if (isNaN(u)) return f;t[e + f] = u;
              }return f;
            }function R(t, r, e, n) {
              return Z(H(r, t.length - e), t, e, n);
            }function _(t, r, e, n) {
              return Z(X(r), t, e, n);
            }function B(t, r, e, n) {
              return _(t, r, e, n);
            }function T(t, r, e, n) {
              return Z(V(r), t, e, n);
            }function P(t, r, e, n) {
              return Z(G(r, t.length - e), t, e, n);
            }function U(t, r, e) {
              return 0 === r && e === t.length ? Q.fromByteArray(t) : Q.fromByteArray(t.slice(r, e));
            }function S(t, r, e) {
              e = Math.min(t.length, e);for (var n = [], i = r; i < e;) {
                var o = t[i],
                    f = null,
                    u = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;if (i + u <= e) {
                  var s, a, h, c;switch (u) {case 1:
                      o < 128 && (f = o);break;case 2:
                      s = t[i + 1], 128 === (192 & s) && (c = (31 & o) << 6 | 63 & s, c > 127 && (f = c));break;case 3:
                      s = t[i + 1], a = t[i + 2], 128 === (192 & s) && 128 === (192 & a) && (c = (15 & o) << 12 | (63 & s) << 6 | 63 & a, c > 2047 && (c < 55296 || c > 57343) && (f = c));break;case 4:
                      s = t[i + 1], a = t[i + 2], h = t[i + 3], 128 === (192 & s) && 128 === (192 & a) && 128 === (192 & h) && (c = (15 & o) << 18 | (63 & s) << 12 | (63 & a) << 6 | 63 & h, c > 65535 && c < 1114112 && (f = c));}
                }null === f ? (f = 65533, u = 1) : f > 65535 && (f -= 65536, n.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), n.push(f), i += u;
              }return Y(n);
            }function Y(t) {
              var r = t.length;if (r <= tt) return String.fromCharCode.apply(String, t);for (var e = "", n = 0; n < r;) {
                e += String.fromCharCode.apply(String, t.slice(n, n += tt));
              }return e;
            }function I(t, r, e) {
              var n = "";e = Math.min(t.length, e);for (var i = r; i < e; ++i) {
                n += String.fromCharCode(127 & t[i]);
              }return n;
            }function L(t, r, e) {
              var n = "";e = Math.min(t.length, e);for (var i = r; i < e; ++i) {
                n += String.fromCharCode(t[i]);
              }return n;
            }function C(t, r, e) {
              var n = t.length;(!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);for (var i = "", o = r; o < e; ++o) {
                i += q(t[o]);
              }return i;
            }function O(t, r, e) {
              for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2) {
                i += String.fromCharCode(n[o] + 256 * n[o + 1]);
              }return i;
            }function M(t, r, e) {
              if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");if (t + r > e) throw new RangeError("Trying to access beyond buffer length");
            }function x(t, r, e, n, i, o) {
              if (!f.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');if (r > i || r < o) throw new RangeError('"value" argument is out of bounds');if (e + n > t.length) throw new RangeError("Index out of range");
            }function D(t, r, e, n) {
              r < 0 && (r = 65535 + r + 1);for (var i = 0, o = Math.min(t.length - e, 2); i < o; ++i) {
                t[e + i] = (r & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i);
              }
            }function N(t, r, e, n) {
              r < 0 && (r = 4294967295 + r + 1);for (var i = 0, o = Math.min(t.length - e, 4); i < o; ++i) {
                t[e + i] = r >>> 8 * (n ? i : 3 - i) & 255;
              }
            }function J(t, r, e, n, i, o) {
              if (e + n > t.length) throw new RangeError("Index out of range");if (e < 0) throw new RangeError("Index out of range");
            }function k(t, r, e, n, i) {
              return i || J(t, r, e, 4, 3.4028234663852886e38, -3.4028234663852886e38), W.write(t, r, e, n, 23, 4), e + 4;
            }function j(t, r, e, n, i) {
              return i || J(t, r, e, 8, 1.7976931348623157e308, -1.7976931348623157e308), W.write(t, r, e, n, 52, 8), e + 8;
            }function z(t) {
              if (t = F(t).replace(rt, ""), t.length < 2) return "";for (; t.length % 4 !== 0;) {
                t += "=";
              }return t;
            }function F(t) {
              return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
            }function q(t) {
              return t < 16 ? "0" + t.toString(16) : t.toString(16);
            }function H(t, r) {
              r = r || 1 / 0;for (var e, n = t.length, i = null, o = [], f = 0; f < n; ++f) {
                if (e = t.charCodeAt(f), e > 55295 && e < 57344) {
                  if (!i) {
                    if (e > 56319) {
                      (r -= 3) > -1 && o.push(239, 191, 189);continue;
                    }if (f + 1 === n) {
                      (r -= 3) > -1 && o.push(239, 191, 189);continue;
                    }i = e;continue;
                  }if (e < 56320) {
                    (r -= 3) > -1 && o.push(239, 191, 189), i = e;continue;
                  }e = (i - 55296 << 10 | e - 56320) + 65536;
                } else i && (r -= 3) > -1 && o.push(239, 191, 189);if (i = null, e < 128) {
                  if ((r -= 1) < 0) break;o.push(e);
                } else if (e < 2048) {
                  if ((r -= 2) < 0) break;o.push(e >> 6 | 192, 63 & e | 128);
                } else if (e < 65536) {
                  if ((r -= 3) < 0) break;o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128);
                } else {
                  if (!(e < 1114112)) throw new Error("Invalid code point");if ((r -= 4) < 0) break;o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128);
                }
              }return o;
            }function X(t) {
              for (var r = [], e = 0; e < t.length; ++e) {
                r.push(255 & t.charCodeAt(e));
              }return r;
            }function G(t, r) {
              for (var e, n, i, o = [], f = 0; f < t.length && !((r -= 2) < 0); ++f) {
                e = t.charCodeAt(f), n = e >> 8, i = e % 256, o.push(i), o.push(n);
              }return o;
            }function V(t) {
              return Q.toByteArray(z(t));
            }function Z(t, r, e, n) {
              for (var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i) {
                r[i + e] = t[i];
              }return i;
            }function K(t) {
              return t !== t;
            }var Q = t("base64-js"),
                W = t("ieee754"),
                $ = t("isarray");e.Buffer = f, e.SlowBuffer = w, e.INSPECT_MAX_BYTES = 50, f.TYPED_ARRAY_SUPPORT = void 0 !== r.TYPED_ARRAY_SUPPORT ? r.TYPED_ARRAY_SUPPORT : n(), e.kMaxLength = i(), f.poolSize = 8192, f._augment = function (t) {
              return t.__proto__ = f.prototype, t;
            }, f.from = function (t, r, e) {
              return u(null, t, r, e);
            }, f.TYPED_ARRAY_SUPPORT && (f.prototype.__proto__ = Uint8Array.prototype, f.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && f[Symbol.species] === f && Object.defineProperty(f, Symbol.species, { value: null, configurable: !0 })), f.alloc = function (t, r, e) {
              return a(null, t, r, e);
            }, f.allocUnsafe = function (t) {
              return h(null, t);
            }, f.allocUnsafeSlow = function (t) {
              return h(null, t);
            }, f.isBuffer = function (t) {
              return !(null == t || !t._isBuffer);
            }, f.compare = function (t, r) {
              if (!f.isBuffer(t) || !f.isBuffer(r)) throw new TypeError("Arguments must be Buffers");if (t === r) return 0;for (var e = t.length, n = r.length, i = 0, o = Math.min(e, n); i < o; ++i) {
                if (t[i] !== r[i]) {
                  e = t[i], n = r[i];break;
                }
              }return e < n ? -1 : n < e ? 1 : 0;
            }, f.isEncoding = function (t) {
              switch (String(t).toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "latin1":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                  return !0;default:
                  return !1;}
            }, f.concat = function (t, r) {
              if (!$(t)) throw new TypeError('"list" argument must be an Array of Buffers');if (0 === t.length) return f.alloc(0);var e;if (void 0 === r) for (r = 0, e = 0; e < t.length; ++e) {
                r += t[e].length;
              }var n = f.allocUnsafe(r),
                  i = 0;for (e = 0; e < t.length; ++e) {
                var o = t[e];if (!f.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');o.copy(n, i), i += o.length;
              }return n;
            }, f.byteLength = d, f.prototype._isBuffer = !0, f.prototype.swap16 = function () {
              var t = this.length;if (t % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");for (var r = 0; r < t; r += 2) {
                E(this, r, r + 1);
              }return this;
            }, f.prototype.swap32 = function () {
              var t = this.length;if (t % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");for (var r = 0; r < t; r += 4) {
                E(this, r, r + 3), E(this, r + 1, r + 2);
              }return this;
            }, f.prototype.swap64 = function () {
              var t = this.length;if (t % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");for (var r = 0; r < t; r += 8) {
                E(this, r, r + 7), E(this, r + 1, r + 6), E(this, r + 2, r + 5), E(this, r + 3, r + 4);
              }return this;
            }, f.prototype.toString = function () {
              var t = 0 | this.length;return 0 === t ? "" : 0 === arguments.length ? S(this, 0, t) : v.apply(this, arguments);
            }, f.prototype.equals = function (t) {
              if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");return this === t || 0 === f.compare(this, t);
            }, f.prototype.inspect = function () {
              var t = "",
                  r = e.INSPECT_MAX_BYTES;return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t += " ... ")), "<Buffer " + t + ">";
            }, f.prototype.compare = function (t, r, e, n, i) {
              if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");if (void 0 === r && (r = 0), void 0 === e && (e = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), r < 0 || e > t.length || n < 0 || i > this.length) throw new RangeError("out of range index");if (n >= i && r >= e) return 0;if (n >= i) return -1;if (r >= e) return 1;if (r >>>= 0, e >>>= 0, n >>>= 0, i >>>= 0, this === t) return 0;for (var o = i - n, u = e - r, s = Math.min(o, u), a = this.slice(n, i), h = t.slice(r, e), c = 0; c < s; ++c) {
                if (a[c] !== h[c]) {
                  o = a[c], u = h[c];break;
                }
              }return o < u ? -1 : u < o ? 1 : 0;
            }, f.prototype.includes = function (t, r, e) {
              return this.indexOf(t, r, e) !== -1;
            }, f.prototype.indexOf = function (t, r, e) {
              return A(this, t, r, e, !0);
            }, f.prototype.lastIndexOf = function (t, r, e) {
              return A(this, t, r, e, !1);
            }, f.prototype.write = function (t, r, e, n) {
              if (void 0 === r) n = "utf8", e = this.length, r = 0;else if (void 0 === e && "string" == typeof r) n = r, e = this.length, r = 0;else {
                if (!isFinite(r)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r |= 0, isFinite(e) ? (e |= 0, void 0 === n && (n = "utf8")) : (n = e, e = void 0);
              }var i = this.length - r;if ((void 0 === e || e > i) && (e = i), t.length > 0 && (e < 0 || r < 0) || r > this.length) throw new RangeError("Attempt to write outside buffer bounds");n || (n = "utf8");for (var o = !1;;) {
                switch (n) {case "hex":
                    return m(this, t, r, e);case "utf8":case "utf-8":
                    return R(this, t, r, e);case "ascii":
                    return _(this, t, r, e);case "latin1":case "binary":
                    return B(this, t, r, e);case "base64":
                    return T(this, t, r, e);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                    return P(this, t, r, e);default:
                    if (o) throw new TypeError("Unknown encoding: " + n);n = ("" + n).toLowerCase(), o = !0;}
              }
            }, f.prototype.toJSON = function () {
              return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
            };var tt = 4096;f.prototype.slice = function (t, r) {
              var e = this.length;t = ~~t, r = void 0 === r ? e : ~~r, t < 0 ? (t += e, t < 0 && (t = 0)) : t > e && (t = e), r < 0 ? (r += e, r < 0 && (r = 0)) : r > e && (r = e), r < t && (r = t);var n;if (f.TYPED_ARRAY_SUPPORT) n = this.subarray(t, r), n.__proto__ = f.prototype;else {
                var i = r - t;n = new f(i, void 0);for (var o = 0; o < i; ++o) {
                  n[o] = this[o + t];
                }
              }return n;
            }, f.prototype.readUIntLE = function (t, r, e) {
              t |= 0, r |= 0, e || M(t, r, this.length);for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) {
                n += this[t + o] * i;
              }return n;
            }, f.prototype.readUIntBE = function (t, r, e) {
              t |= 0, r |= 0, e || M(t, r, this.length);for (var n = this[t + --r], i = 1; r > 0 && (i *= 256);) {
                n += this[t + --r] * i;
              }return n;
            }, f.prototype.readUInt8 = function (t, r) {
              return r || M(t, 1, this.length), this[t];
            }, f.prototype.readUInt16LE = function (t, r) {
              return r || M(t, 2, this.length), this[t] | this[t + 1] << 8;
            }, f.prototype.readUInt16BE = function (t, r) {
              return r || M(t, 2, this.length), this[t] << 8 | this[t + 1];
            }, f.prototype.readUInt32LE = function (t, r) {
              return r || M(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
            }, f.prototype.readUInt32BE = function (t, r) {
              return r || M(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
            }, f.prototype.readIntLE = function (t, r, e) {
              t |= 0, r |= 0, e || M(t, r, this.length);for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) {
                n += this[t + o] * i;
              }return i *= 128, n >= i && (n -= Math.pow(2, 8 * r)), n;
            }, f.prototype.readIntBE = function (t, r, e) {
              t |= 0, r |= 0, e || M(t, r, this.length);for (var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) {
                o += this[t + --n] * i;
              }return i *= 128, o >= i && (o -= Math.pow(2, 8 * r)), o;
            }, f.prototype.readInt8 = function (t, r) {
              return r || M(t, 1, this.length), 128 & this[t] ? (255 - this[t] + 1) * -1 : this[t];
            }, f.prototype.readInt16LE = function (t, r) {
              r || M(t, 2, this.length);var e = this[t] | this[t + 1] << 8;return 32768 & e ? 4294901760 | e : e;
            }, f.prototype.readInt16BE = function (t, r) {
              r || M(t, 2, this.length);var e = this[t + 1] | this[t] << 8;return 32768 & e ? 4294901760 | e : e;
            }, f.prototype.readInt32LE = function (t, r) {
              return r || M(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
            }, f.prototype.readInt32BE = function (t, r) {
              return r || M(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
            }, f.prototype.readFloatLE = function (t, r) {
              return r || M(t, 4, this.length), W.read(this, t, !0, 23, 4);
            }, f.prototype.readFloatBE = function (t, r) {
              return r || M(t, 4, this.length), W.read(this, t, !1, 23, 4);
            }, f.prototype.readDoubleLE = function (t, r) {
              return r || M(t, 8, this.length), W.read(this, t, !0, 52, 8);
            }, f.prototype.readDoubleBE = function (t, r) {
              return r || M(t, 8, this.length), W.read(this, t, !1, 52, 8);
            }, f.prototype.writeUIntLE = function (t, r, e, n) {
              if (t = +t, r |= 0, e |= 0, !n) {
                var i = Math.pow(2, 8 * e) - 1;x(this, t, r, e, i, 0);
              }var o = 1,
                  f = 0;for (this[r] = 255 & t; ++f < e && (o *= 256);) {
                this[r + f] = t / o & 255;
              }return r + e;
            }, f.prototype.writeUIntBE = function (t, r, e, n) {
              if (t = +t, r |= 0, e |= 0, !n) {
                var i = Math.pow(2, 8 * e) - 1;x(this, t, r, e, i, 0);
              }var o = e - 1,
                  f = 1;for (this[r + o] = 255 & t; --o >= 0 && (f *= 256);) {
                this[r + o] = t / f & 255;
              }return r + e;
            }, f.prototype.writeUInt8 = function (t, r, e) {
              return t = +t, r |= 0, e || x(this, t, r, 1, 255, 0), f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[r] = 255 & t, r + 1;
            }, f.prototype.writeUInt16LE = function (t, r, e) {
              return t = +t, r |= 0, e || x(this, t, r, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8) : D(this, t, r, !0), r + 2;
            }, f.prototype.writeUInt16BE = function (t, r, e) {
              return t = +t, r |= 0, e || x(this, t, r, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 8, this[r + 1] = 255 & t) : D(this, t, r, !1), r + 2;
            }, f.prototype.writeUInt32LE = function (t, r, e) {
              return t = +t, r |= 0, e || x(this, t, r, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = 255 & t) : N(this, t, r, !0), r + 4;
            }, f.prototype.writeUInt32BE = function (t, r, e) {
              return t = +t, r |= 0, e || x(this, t, r, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t) : N(this, t, r, !1), r + 4;
            }, f.prototype.writeIntLE = function (t, r, e, n) {
              if (t = +t, r |= 0, !n) {
                var i = Math.pow(2, 8 * e - 1);x(this, t, r, e, i - 1, -i);
              }var o = 0,
                  f = 1,
                  u = 0;for (this[r] = 255 & t; ++o < e && (f *= 256);) {
                t < 0 && 0 === u && 0 !== this[r + o - 1] && (u = 1), this[r + o] = (t / f >> 0) - u & 255;
              }return r + e;
            }, f.prototype.writeIntBE = function (t, r, e, n) {
              if (t = +t, r |= 0, !n) {
                var i = Math.pow(2, 8 * e - 1);x(this, t, r, e, i - 1, -i);
              }var o = e - 1,
                  f = 1,
                  u = 0;for (this[r + o] = 255 & t; --o >= 0 && (f *= 256);) {
                t < 0 && 0 === u && 0 !== this[r + o + 1] && (u = 1), this[r + o] = (t / f >> 0) - u & 255;
              }return r + e;
            }, f.prototype.writeInt8 = function (t, r, e) {
              return t = +t, r |= 0, e || x(this, t, r, 1, 127, -128), f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[r] = 255 & t, r + 1;
            }, f.prototype.writeInt16LE = function (t, r, e) {
              return t = +t, r |= 0, e || x(this, t, r, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8) : D(this, t, r, !0), r + 2;
            }, f.prototype.writeInt16BE = function (t, r, e) {
              return t = +t, r |= 0, e || x(this, t, r, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 8, this[r + 1] = 255 & t) : D(this, t, r, !1), r + 2;
            }, f.prototype.writeInt32LE = function (t, r, e) {
              return t = +t, r |= 0, e || x(this, t, r, 4, 2147483647, -2147483648), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24) : N(this, t, r, !0), r + 4;
            }, f.prototype.writeInt32BE = function (t, r, e) {
              return t = +t, r |= 0, e || x(this, t, r, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t) : N(this, t, r, !1), r + 4;
            }, f.prototype.writeFloatLE = function (t, r, e) {
              return k(this, t, r, !0, e);
            }, f.prototype.writeFloatBE = function (t, r, e) {
              return k(this, t, r, !1, e);
            }, f.prototype.writeDoubleLE = function (t, r, e) {
              return j(this, t, r, !0, e);
            }, f.prototype.writeDoubleBE = function (t, r, e) {
              return j(this, t, r, !1, e);
            }, f.prototype.copy = function (t, r, e, n) {
              if (e || (e = 0), n || 0 === n || (n = this.length), r >= t.length && (r = t.length), r || (r = 0), n > 0 && n < e && (n = e), n === e) return 0;if (0 === t.length || 0 === this.length) return 0;if (r < 0) throw new RangeError("targetStart out of bounds");if (e < 0 || e >= this.length) throw new RangeError("sourceStart out of bounds");if (n < 0) throw new RangeError("sourceEnd out of bounds");n > this.length && (n = this.length), t.length - r < n - e && (n = t.length - r + e);var i,
                  o = n - e;if (this === t && e < r && r < n) for (i = o - 1; i >= 0; --i) {
                t[i + r] = this[i + e];
              } else if (o < 1e3 || !f.TYPED_ARRAY_SUPPORT) for (i = 0; i < o; ++i) {
                t[i + r] = this[i + e];
              } else Uint8Array.prototype.set.call(t, this.subarray(e, e + o), r);return o;
            }, f.prototype.fill = function (t, r, e, n) {
              if ("string" == typeof t) {
                if ("string" == typeof r ? (n = r, r = 0, e = this.length) : "string" == typeof e && (n = e, e = this.length), 1 === t.length) {
                  var i = t.charCodeAt(0);i < 256 && (t = i);
                }if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");if ("string" == typeof n && !f.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
              } else "number" == typeof t && (t &= 255);if (r < 0 || this.length < r || this.length < e) throw new RangeError("Out of range index");if (e <= r) return this;r >>>= 0, e = void 0 === e ? this.length : e >>> 0, t || (t = 0);var o;if ("number" == typeof t) for (o = r; o < e; ++o) {
                this[o] = t;
              } else {
                var u = f.isBuffer(t) ? t : H(new f(t, n).toString()),
                    s = u.length;for (o = 0; o < e - r; ++o) {
                  this[o + r] = u[o % s];
                }
              }return this;
            };var rt = /[^+\/0-9A-Za-z-_]/g;
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, { "base64-js": 2, ieee754: 4, isarray: 5 }], 4: [function (t, r, e) {
          e.read = function (t, r, e, n, i) {
            var o,
                f,
                u = 8 * i - n - 1,
                s = (1 << u) - 1,
                a = s >> 1,
                h = -7,
                c = e ? i - 1 : 0,
                l = e ? -1 : 1,
                p = t[r + c];for (c += l, o = p & (1 << -h) - 1, p >>= -h, h += u; h > 0; o = 256 * o + t[r + c], c += l, h -= 8) {}for (f = o & (1 << -h) - 1, o >>= -h, h += n; h > 0; f = 256 * f + t[r + c], c += l, h -= 8) {}if (0 === o) o = 1 - a;else {
              if (o === s) return f ? NaN : (p ? -1 : 1) * (1 / 0);f += Math.pow(2, n), o -= a;
            }return (p ? -1 : 1) * f * Math.pow(2, o - n);
          }, e.write = function (t, r, e, n, i, o) {
            var f,
                u,
                s,
                a = 8 * o - i - 1,
                h = (1 << a) - 1,
                c = h >> 1,
                l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                p = n ? 0 : o - 1,
                g = n ? 1 : -1,
                y = r < 0 || 0 === r && 1 / r < 0 ? 1 : 0;for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (u = isNaN(r) ? 1 : 0, f = h) : (f = Math.floor(Math.log(r) / Math.LN2), r * (s = Math.pow(2, -f)) < 1 && (f--, s *= 2), r += f + c >= 1 ? l / s : l * Math.pow(2, 1 - c), r * s >= 2 && (f++, s /= 2), f + c >= h ? (u = 0, f = h) : f + c >= 1 ? (u = (r * s - 1) * Math.pow(2, i), f += c) : (u = r * Math.pow(2, c - 1) * Math.pow(2, i), f = 0)); i >= 8; t[e + p] = 255 & u, p += g, u /= 256, i -= 8) {}for (f = f << i | u, a += i; a > 0; t[e + p] = 255 & f, p += g, f /= 256, a -= 8) {}t[e + p - g] |= 128 * y;
          };
        }, {}], 5: [function (t, r, e) {
          var n = {}.toString;r.exports = Array.isArray || function (t) {
            return "[object Array]" == n.call(t);
          };
        }, {}] }, {}, [1]), !self.Buffer && !window.Buffer) throw new Error("Node's Buffer() not available");if (!self.Jimp && !window.Jimp) throw new Error("Could not Jimp object");!function () {
        function t(t, r) {
          var e = new XMLHttpRequest();e.open("GET", t, !0), e.responseType = "arraybuffer", e.onload = function () {
            e.status < 400 ? r(this.response, null) : r(null, "HTTP Status " + e.status + " for url " + t);
          }, e.onerror = function (t) {
            r(null, t);
          }, e.send();
        }function r(t) {
          for (var r = new Buffer(t.byteLength), e = new Uint8Array(t), n = 0; n < r.length; ++n) {
            r[n] = e[n];
          }return r;
        }function e(t) {
          return Object.prototype.toString.call(t).toLowerCase().indexOf("arraybuffer") > -1;
        }delete Jimp.prototype.write, delete Jimp.read, Jimp.read = function (n, i) {
          return new Promise(function (o, f) {
            i = i || function (t, r) {
              t ? f(t) : o(r);
            }, "string" == typeof n ? t(n, function (t, o) {
              t ? e(t) ? new Jimp(r(t), i) : i(new Error("Unrecognized data received for " + n)) : o && i(o);
            }) : e(n) ? new Jimp(r(n), i) : i(new Error("Jimp expects a single ArrayBuffer or image URL"));
          });
        };
      }();
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer);
  }, { "buffer": 3 }], 2: [function (require, module, exports) {
    'use strict';

    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;

    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }

    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;

    function placeHoldersCount(b64) {
      var len = b64.length;
      if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
      }

      // the number of equal signs (place holders)
      // if there are two placeholders, than the two characters before it
      // represent one byte
      // if there is only one, then the three characters before it represent 2 bytes
      // this is just a cheap hack to not do indexOf twice
      return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
    }

    function byteLength(b64) {
      // base64 is 4/3 + up to two characters of the original data
      return b64.length * 3 / 4 - placeHoldersCount(b64);
    }

    function toByteArray(b64) {
      var i, j, l, tmp, placeHolders, arr;
      var len = b64.length;
      placeHolders = placeHoldersCount(b64);

      arr = new Arr(len * 3 / 4 - placeHolders);

      // if there are placeholders, only get up to the last complete 4 chars
      l = placeHolders > 0 ? len - 4 : len;

      var L = 0;

      for (i = 0, j = 0; i < l; i += 4, j += 3) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[L++] = tmp >> 16 & 0xFF;
        arr[L++] = tmp >> 8 & 0xFF;
        arr[L++] = tmp & 0xFF;
      }

      if (placeHolders === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[L++] = tmp & 0xFF;
      } else if (placeHolders === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[L++] = tmp >> 8 & 0xFF;
        arr[L++] = tmp & 0xFF;
      }

      return arr;
    }

    function tripletToBase64(num) {
      return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
    }

    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
        output.push(tripletToBase64(tmp));
      }
      return output.join('');
    }

    function fromByteArray(uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
      var output = '';
      var parts = [];
      var maxChunkLength = 16383; // must be multiple of 3

      // go through the array every three bytes, we'll deal with trailing stuff later
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      }

      // pad the end with zeros, but make sure to not forget the extra bytes
      if (extraBytes === 1) {
        tmp = uint8[len - 1];
        output += lookup[tmp >> 2];
        output += lookup[tmp << 4 & 0x3F];
        output += '==';
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        output += lookup[tmp >> 10];
        output += lookup[tmp >> 4 & 0x3F];
        output += lookup[tmp << 2 & 0x3F];
        output += '=';
      }

      parts.push(output);

      return parts.join('');
    }
  }, {}], 3: [function (require, module, exports) {
    (function (global) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */
      /* eslint-disable no-proto */

      'use strict';

      var base64 = require('base64-js');
      var ieee754 = require('ieee754');
      var isArray = require('isarray');

      exports.Buffer = Buffer;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;

      /**
       * If `Buffer.TYPED_ARRAY_SUPPORT`:
       *   === true    Use Uint8Array implementation (fastest)
       *   === false   Use Object implementation (most compatible, even IE6)
       *
       * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
       * Opera 11.6+, iOS 4.2+.
       *
       * Due to various browser bugs, sometimes the Object implementation will be used even
       * when the browser supports typed arrays.
       *
       * Note:
       *
       *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
       *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
       *
       *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
       *
       *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
       *     incorrect length in some situations.
      
       * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
       * get the Object implementation, which is slower but behaves correctly.
       */
      Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

      /*
       * Export kMaxLength after typed array support is determined.
       */
      exports.kMaxLength = kMaxLength();

      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
              return 42;
            } };
          return arr.foo() === 42 && // typed array instances can be augmented
          typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
          arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
        } catch (e) {
          return false;
        }
      }

      function kMaxLength() {
        return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
      }

      function createBuffer(that, length) {
        if (kMaxLength() < length) {
          throw new RangeError('Invalid typed array length');
        }
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          // Return an augmented `Uint8Array` instance, for best performance
          that = new Uint8Array(length);
          that.__proto__ = Buffer.prototype;
        } else {
          // Fallback: Return an object instance of the Buffer class
          if (that === null) {
            that = new Buffer(length);
          }
          that.length = length;
        }

        return that;
      }

      /**
       * The Buffer constructor returns instances of `Uint8Array` that have their
       * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
       * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
       * and the `Uint8Array` methods. Square bracket notation works as expected -- it
       * returns a single octet.
       *
       * The `Uint8Array` prototype remains unmodified.
       */

      function Buffer(arg, encodingOrOffset, length) {
        if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
          return new Buffer(arg, encodingOrOffset, length);
        }

        // Common case.
        if (typeof arg === 'number') {
          if (typeof encodingOrOffset === 'string') {
            throw new Error('If encoding is specified then the first argument must be a string');
          }
          return allocUnsafe(this, arg);
        }
        return from(this, arg, encodingOrOffset, length);
      }

      Buffer.poolSize = 8192; // not used by this implementation

      // TODO: Legacy, not needed anymore. Remove in next major version.
      Buffer._augment = function (arr) {
        arr.__proto__ = Buffer.prototype;
        return arr;
      };

      function from(that, value, encodingOrOffset, length) {
        if (typeof value === 'number') {
          throw new TypeError('"value" argument must not be a number');
        }

        if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
          return fromArrayBuffer(that, value, encodingOrOffset, length);
        }

        if (typeof value === 'string') {
          return fromString(that, value, encodingOrOffset);
        }

        return fromObject(that, value);
      }

      /**
       * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
       * if value is a number.
       * Buffer.from(str[, encoding])
       * Buffer.from(array)
       * Buffer.from(buffer)
       * Buffer.from(arrayBuffer[, byteOffset[, length]])
       **/
      Buffer.from = function (value, encodingOrOffset, length) {
        return from(null, value, encodingOrOffset, length);
      };

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        Buffer.prototype.__proto__ = Uint8Array.prototype;
        Buffer.__proto__ = Uint8Array;
        if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
          // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
          Object.defineProperty(Buffer, Symbol.species, {
            value: null,
            configurable: true
          });
        }
      }

      function assertSize(size) {
        if (typeof size !== 'number') {
          throw new TypeError('"size" argument must be a number');
        } else if (size < 0) {
          throw new RangeError('"size" argument must not be negative');
        }
      }

      function alloc(that, size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(that, size);
        }
        if (fill !== undefined) {
          // Only pay attention to encoding if it's a string. This
          // prevents accidentally sending in a number that would
          // be interpretted as a start offset.
          return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
        }
        return createBuffer(that, size);
      }

      /**
       * Creates a new filled Buffer instance.
       * alloc(size[, fill[, encoding]])
       **/
      Buffer.alloc = function (size, fill, encoding) {
        return alloc(null, size, fill, encoding);
      };

      function allocUnsafe(that, size) {
        assertSize(size);
        that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
        if (!Buffer.TYPED_ARRAY_SUPPORT) {
          for (var i = 0; i < size; ++i) {
            that[i] = 0;
          }
        }
        return that;
      }

      /**
       * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
       * */
      Buffer.allocUnsafe = function (size) {
        return allocUnsafe(null, size);
      };
      /**
       * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
       */
      Buffer.allocUnsafeSlow = function (size) {
        return allocUnsafe(null, size);
      };

      function fromString(that, string, encoding) {
        if (typeof encoding !== 'string' || encoding === '') {
          encoding = 'utf8';
        }

        if (!Buffer.isEncoding(encoding)) {
          throw new TypeError('"encoding" must be a valid string encoding');
        }

        var length = byteLength(string, encoding) | 0;
        that = createBuffer(that, length);

        var actual = that.write(string, encoding);

        if (actual !== length) {
          // Writing a hex string, for example, that contains invalid characters will
          // cause everything after the first invalid character to be ignored. (e.g.
          // 'abxxcd' will be treated as 'ab')
          that = that.slice(0, actual);
        }

        return that;
      }

      function fromArrayLike(that, array) {
        var length = array.length < 0 ? 0 : checked(array.length) | 0;
        that = createBuffer(that, length);
        for (var i = 0; i < length; i += 1) {
          that[i] = array[i] & 255;
        }
        return that;
      }

      function fromArrayBuffer(that, array, byteOffset, length) {
        array.byteLength; // this throws if `array` is not a valid ArrayBuffer

        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('\'offset\' is out of bounds');
        }

        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('\'length\' is out of bounds');
        }

        if (byteOffset === undefined && length === undefined) {
          array = new Uint8Array(array);
        } else if (length === undefined) {
          array = new Uint8Array(array, byteOffset);
        } else {
          array = new Uint8Array(array, byteOffset, length);
        }

        if (Buffer.TYPED_ARRAY_SUPPORT) {
          // Return an augmented `Uint8Array` instance, for best performance
          that = array;
          that.__proto__ = Buffer.prototype;
        } else {
          // Fallback: Return an object instance of the Buffer class
          that = fromArrayLike(that, array);
        }
        return that;
      }

      function fromObject(that, obj) {
        if (Buffer.isBuffer(obj)) {
          var len = checked(obj.length) | 0;
          that = createBuffer(that, len);

          if (that.length === 0) {
            return that;
          }

          obj.copy(that, 0, 0, len);
          return that;
        }

        if (obj) {
          if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
            if (typeof obj.length !== 'number' || isnan(obj.length)) {
              return createBuffer(that, 0);
            }
            return fromArrayLike(that, obj);
          }

          if (obj.type === 'Buffer' && isArray(obj.data)) {
            return fromArrayLike(that, obj.data);
          }
        }

        throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
      }

      function checked(length) {
        // Note: cannot use `length < kMaxLength()` here because that fails when
        // length is NaN (which is otherwise coerced to zero.)
        if (length >= kMaxLength()) {
          throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
        }
        return length | 0;
      }

      function SlowBuffer(length) {
        if (+length != length) {
          // eslint-disable-line eqeqeq
          length = 0;
        }
        return Buffer.alloc(+length);
      }

      Buffer.isBuffer = function isBuffer(b) {
        return !!(b != null && b._isBuffer);
      };

      Buffer.compare = function compare(a, b) {
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
          throw new TypeError('Arguments must be Buffers');
        }

        if (a === b) return 0;

        var x = a.length;
        var y = b.length;

        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }

        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };

      Buffer.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'latin1':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return true;
          default:
            return false;
        }
      };

      Buffer.concat = function concat(list, length) {
        if (!isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }

        if (list.length === 0) {
          return Buffer.alloc(0);
        }

        var i;
        if (length === undefined) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }

        var buffer = Buffer.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (!Buffer.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };

      function byteLength(string, encoding) {
        if (Buffer.isBuffer(string)) {
          return string.length;
        }
        if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== 'string') {
          string = '' + string;
        }

        var len = string.length;
        if (len === 0) return 0;

        // Use a for loop to avoid recursion
        var loweredCase = false;
        for (;;) {
          switch (encoding) {
            case 'ascii':
            case 'latin1':
            case 'binary':
              return len;
            case 'utf8':
            case 'utf-8':
            case undefined:
              return utf8ToBytes(string).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return len * 2;
            case 'hex':
              return len >>> 1;
            case 'base64':
              return base64ToBytes(string).length;
            default:
              if (loweredCase) return utf8ToBytes(string).length; // assume utf8
              encoding = ('' + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer.byteLength = byteLength;

      function slowToString(encoding, start, end) {
        var loweredCase = false;

        // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
        // property of a typed array.

        // This behaves neither like String nor Uint8Array in that we set start/end
        // to their upper/lower bounds if the value passed is out of range.
        // undefined is handled specially as per ECMA-262 6th Edition,
        // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
        if (start === undefined || start < 0) {
          start = 0;
        }
        // Return early if start > this.length. Done here to prevent potential uint32
        // coercion fail below.
        if (start > this.length) {
          return '';
        }

        if (end === undefined || end > this.length) {
          end = this.length;
        }

        if (end <= 0) {
          return '';
        }

        // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
        end >>>= 0;
        start >>>= 0;

        if (end <= start) {
          return '';
        }

        if (!encoding) encoding = 'utf8';

        while (true) {
          switch (encoding) {
            case 'hex':
              return hexSlice(this, start, end);

            case 'utf8':
            case 'utf-8':
              return utf8Slice(this, start, end);

            case 'ascii':
              return asciiSlice(this, start, end);

            case 'latin1':
            case 'binary':
              return latin1Slice(this, start, end);

            case 'base64':
              return base64Slice(this, start, end);

            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return utf16leSlice(this, start, end);

            default:
              if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
              encoding = (encoding + '').toLowerCase();
              loweredCase = true;
          }
        }
      }

      // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
      // Buffer instances.
      Buffer.prototype._isBuffer = true;

      function swap(b, n, m) {
        var i = b[n];
        b[n] = b[m];
        b[m] = i;
      }

      Buffer.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError('Buffer size must be a multiple of 16-bits');
        }
        for (var i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };

      Buffer.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError('Buffer size must be a multiple of 32-bits');
        }
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };

      Buffer.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError('Buffer size must be a multiple of 64-bits');
        }
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };

      Buffer.prototype.toString = function toString() {
        var length = this.length | 0;
        if (length === 0) return '';
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };

      Buffer.prototype.equals = function equals(b) {
        if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
        if (this === b) return true;
        return Buffer.compare(this, b) === 0;
      };

      Buffer.prototype.inspect = function inspect() {
        var str = '';
        var max = exports.INSPECT_MAX_BYTES;
        if (this.length > 0) {
          str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
          if (this.length > max) str += ' ... ';
        }
        return '<Buffer ' + str + '>';
      };

      Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (!Buffer.isBuffer(target)) {
          throw new TypeError('Argument must be a Buffer');
        }

        if (start === undefined) {
          start = 0;
        }
        if (end === undefined) {
          end = target ? target.length : 0;
        }
        if (thisStart === undefined) {
          thisStart = 0;
        }
        if (thisEnd === undefined) {
          thisEnd = this.length;
        }

        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError('out of range index');
        }

        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }

        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;

        if (this === target) return 0;

        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);

        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);

        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }

        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };

      // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
      // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
      //
      // Arguments:
      // - buffer - a Buffer to search
      // - val - a string, Buffer, or number
      // - byteOffset - an index into `buffer`; will be clamped to an int32
      // - encoding - an optional encoding, relevant is val is a string
      // - dir - true for indexOf, false for lastIndexOf
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        // Empty buffer means no match
        if (buffer.length === 0) return -1;

        // Normalize byteOffset
        if (typeof byteOffset === 'string') {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 0x7fffffff) {
          byteOffset = 0x7fffffff;
        } else if (byteOffset < -0x80000000) {
          byteOffset = -0x80000000;
        }
        byteOffset = +byteOffset; // Coerce to Number.
        if (isNaN(byteOffset)) {
          // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
          byteOffset = dir ? 0 : buffer.length - 1;
        }

        // Normalize byteOffset: negative offsets start from the end of the buffer
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;else return -1;
        }

        // Normalize val
        if (typeof val === 'string') {
          val = Buffer.from(val, encoding);
        }

        // Finally, search either indexOf (if dir is true) or lastIndexOf
        if (Buffer.isBuffer(val)) {
          // Special case: looking for empty string/buffer always fails
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === 'number') {
          val = val & 0xFF; // Search for a byte value [0-255]
          if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }

        throw new TypeError('val must be string, number or Buffer');
      }

      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;

        if (encoding !== undefined) {
          encoding = String(encoding).toLowerCase();
          if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }

        function read(buf, i) {
          if (indexSize === 1) {
            return buf[i];
          } else {
            return buf.readUInt16BE(i * indexSize);
          }
        }

        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }

        return -1;
      }

      Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };

      Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };

      Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };

      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }

        // must be an even number of digits
        var strLen = string.length;
        if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(i * 2, 2), 16);
          if (isNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }

      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }

      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }

      function latin1Write(buf, string, offset, length) {
        return asciiWrite(buf, string, offset, length);
      }

      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }

      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }

      Buffer.prototype.write = function write(string, offset, length, encoding) {
        // Buffer#write(string)
        if (offset === undefined) {
          encoding = 'utf8';
          length = this.length;
          offset = 0;
          // Buffer#write(string, encoding)
        } else if (length === undefined && typeof offset === 'string') {
          encoding = offset;
          length = this.length;
          offset = 0;
          // Buffer#write(string, offset[, length][, encoding])
        } else if (isFinite(offset)) {
          offset = offset | 0;
          if (isFinite(length)) {
            length = length | 0;
            if (encoding === undefined) encoding = 'utf8';
          } else {
            encoding = length;
            length = undefined;
          }
          // legacy write(string, encoding, offset, length) - remove in v0.13
        } else {
          throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
        }

        var remaining = this.length - offset;
        if (length === undefined || length > remaining) length = remaining;

        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError('Attempt to write outside buffer bounds');
        }

        if (!encoding) encoding = 'utf8';

        var loweredCase = false;
        for (;;) {
          switch (encoding) {
            case 'hex':
              return hexWrite(this, string, offset, length);

            case 'utf8':
            case 'utf-8':
              return utf8Write(this, string, offset, length);

            case 'ascii':
              return asciiWrite(this, string, offset, length);

            case 'latin1':
            case 'binary':
              return latin1Write(this, string, offset, length);

            case 'base64':
              // Warning: maxLength not taken into account in base64Write
              return base64Write(this, string, offset, length);

            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return ucs2Write(this, string, offset, length);

            default:
              if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
              encoding = ('' + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };

      Buffer.prototype.toJSON = function toJSON() {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };

      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }

      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];

        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;

            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 0x80) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                  if (tempCodePoint > 0x7F) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                  if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                  if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }

          if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
          } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
          }

          res.push(codePoint);
          i += bytesPerSequence;
        }

        return decodeCodePointsArray(res);
      }

      // Based on http://stackoverflow.com/a/22747272/680742, the browser with
      // the lowest limit is Chrome, with 0x10000 args.
      // We go 1 magnitude less, for safety
      var MAX_ARGUMENTS_LENGTH = 0x1000;

      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
        }

        // Decode in chunks to avoid "call stack size exceeded".
        var res = '';
        var i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        }
        return res;
      }

      function asciiSlice(buf, start, end) {
        var ret = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 0x7F);
        }
        return ret;
      }

      function latin1Slice(buf, start, end) {
        var ret = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }

      function hexSlice(buf, start, end) {
        var len = buf.length;

        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;

        var out = '';
        for (var i = start; i < end; ++i) {
          out += toHex(buf[i]);
        }
        return out;
      }

      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = '';
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }

      Buffer.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === undefined ? len : ~~end;

        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }

        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }

        if (end < start) end = start;

        var newBuf;
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer(sliceLen, undefined);
          for (var i = 0; i < sliceLen; ++i) {
            newBuf[i] = this[i + start];
          }
        }

        return newBuf;
      };

      /*
       * Need to make sure that buffer isn't trying to write out of bounds.
       */
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
        if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
      }

      Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert) checkOffset(offset, byteLength, this.length);

        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 0x100)) {
          val += this[offset + i] * mul;
        }

        return val;
      };

      Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert) {
          checkOffset(offset, byteLength, this.length);
        }

        var val = this[offset + --byteLength];
        var mul = 1;
        while (byteLength > 0 && (mul *= 0x100)) {
          val += this[offset + --byteLength] * mul;
        }

        return val;
      };

      Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };

      Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };

      Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };

      Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 4, this.length);

        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
      };

      Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 4, this.length);

        return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };

      Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert) checkOffset(offset, byteLength, this.length);

        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 0x100)) {
          val += this[offset + i] * mul;
        }
        mul *= 0x80;

        if (val >= mul) val -= Math.pow(2, 8 * byteLength);

        return val;
      };

      Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert) checkOffset(offset, byteLength, this.length);

        var i = byteLength;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 0x100)) {
          val += this[offset + --i] * mul;
        }
        mul *= 0x80;

        if (val >= mul) val -= Math.pow(2, 8 * byteLength);

        return val;
      };

      Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 0x80)) return this[offset];
        return (0xff - this[offset] + 1) * -1;
      };

      Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 0x8000 ? val | 0xFFFF0000 : val;
      };

      Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 0x8000 ? val | 0xFFFF0000 : val;
      };

      Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 4, this.length);

        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };

      Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 4, this.length);

        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };

      Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };

      Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };

      Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };

      Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };

      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError('Index out of range');
      }

      Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }

        var mul = 1;
        var i = 0;
        this[offset] = value & 0xFF;
        while (++i < byteLength && (mul *= 0x100)) {
          this[offset + i] = value / mul & 0xFF;
        }

        return offset + byteLength;
      };

      Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }

        var i = byteLength - 1;
        var mul = 1;
        this[offset + i] = value & 0xFF;
        while (--i >= 0 && (mul *= 0x100)) {
          this[offset + i] = value / mul & 0xFF;
        }

        return offset + byteLength;
      };

      Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
        if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
        this[offset] = value & 0xff;
        return offset + 1;
      };

      function objectWriteUInt16(buf, value, offset, littleEndian) {
        if (value < 0) value = 0xffff + value + 1;
        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
          buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }

      Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 0xff;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16(this, value, offset, true);
        }
        return offset + 2;
      };

      Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 0xff;
        } else {
          objectWriteUInt16(this, value, offset, false);
        }
        return offset + 2;
      };

      function objectWriteUInt32(buf, value, offset, littleEndian) {
        if (value < 0) value = 0xffffffff + value + 1;
        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
          buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
        }
      }

      Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = value & 0xff;
        } else {
          objectWriteUInt32(this, value, offset, true);
        }
        return offset + 4;
      };

      Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 0xff;
        } else {
          objectWriteUInt32(this, value, offset, false);
        }
        return offset + 4;
      };

      Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);

          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }

        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 0xFF;
        while (++i < byteLength && (mul *= 0x100)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 0xFF;
        }

        return offset + byteLength;
      };

      Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);

          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }

        var i = byteLength - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 0xFF;
        while (--i >= 0 && (mul *= 0x100)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 0xFF;
        }

        return offset + byteLength;
      };

      Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
        if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
        if (value < 0) value = 0xff + value + 1;
        this[offset] = value & 0xff;
        return offset + 1;
      };

      Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 0xff;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16(this, value, offset, true);
        }
        return offset + 2;
      };

      Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 0xff;
        } else {
          objectWriteUInt16(this, value, offset, false);
        }
        return offset + 2;
      };

      Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 0xff;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else {
          objectWriteUInt32(this, value, offset, true);
        }
        return offset + 4;
      };

      Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
        if (value < 0) value = 0xffffffff + value + 1;
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 0xff;
        } else {
          objectWriteUInt32(this, value, offset, false);
        }
        return offset + 4;
      };

      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError('Index out of range');
        if (offset < 0) throw new RangeError('Index out of range');
      }

      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }

      Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };

      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }

      Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };

      // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
      Buffer.prototype.copy = function copy(target, targetStart, start, end) {
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;

        // Copy 0 bytes; we're done
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;

        // Fatal error conditions
        if (targetStart < 0) {
          throw new RangeError('targetStart out of bounds');
        }
        if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
        if (end < 0) throw new RangeError('sourceEnd out of bounds');

        // Are we oob?
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }

        var len = end - start;
        var i;

        if (this === target && start < targetStart && targetStart < end) {
          // descending copy from end
          for (i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start];
          }
        } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
          // ascending copy from start
          for (i = 0; i < len; ++i) {
            target[i + targetStart] = this[i + start];
          }
        } else {
          Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
        }

        return len;
      };

      // Usage:
      //    buffer.fill(number[, offset[, end]])
      //    buffer.fill(buffer[, offset[, end]])
      //    buffer.fill(string[, offset[, end]][, encoding])
      Buffer.prototype.fill = function fill(val, start, end, encoding) {
        // Handle string cases:
        if (typeof val === 'string') {
          if (typeof start === 'string') {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === 'string') {
            encoding = end;
            end = this.length;
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (code < 256) {
              val = code;
            }
          }
          if (encoding !== undefined && typeof encoding !== 'string') {
            throw new TypeError('encoding must be a string');
          }
          if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
            throw new TypeError('Unknown encoding: ' + encoding);
          }
        } else if (typeof val === 'number') {
          val = val & 255;
        }

        // Invalid ranges are not set to a default, so can range check early.
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError('Out of range index');
        }

        if (end <= start) {
          return this;
        }

        start = start >>> 0;
        end = end === undefined ? this.length : end >>> 0;

        if (!val) val = 0;

        var i;
        if (typeof val === 'number') {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }

        return this;
      };

      // HELPER FUNCTIONS
      // ================

      var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

      function base64clean(str) {
        // Node strips out invalid characters like \n and \t from the string, base64-js does not
        str = stringtrim(str).replace(INVALID_BASE64_RE, '');
        // Node converts strings with length < 2 to ''
        if (str.length < 2) return '';
        // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
        while (str.length % 4 !== 0) {
          str = str + '=';
        }
        return str;
      }

      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, '');
      }

      function toHex(n) {
        if (n < 16) return '0' + n.toString(16);
        return n.toString(16);
      }

      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];

        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);

          // is surrogate component
          if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
              // no lead yet
              if (codePoint > 0xDBFF) {
                // unexpected trail
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                continue;
              } else if (i + 1 === length) {
                // unpaired lead
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                continue;
              }

              // valid lead
              leadSurrogate = codePoint;

              continue;
            }

            // 2 leads in a row
            if (codePoint < 0xDC00) {
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              leadSurrogate = codePoint;
              continue;
            }

            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
          } else if (leadSurrogate) {
            // valid bmp char, but last char was a lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          }

          leadSurrogate = null;

          // encode utf8
          if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
          } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
          } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
          } else {
            throw new Error('Invalid code point');
          }
        }

        return bytes;
      }

      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          // Node's code seems to be doing this and not & 0x7F..
          byteArray.push(str.charCodeAt(i) & 0xFF);
        }
        return byteArray;
      }

      function utf16leToBytes(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;

          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }

        return byteArray;
      }

      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }

      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }

      function isnan(val) {
        return val !== val; // eslint-disable-line no-self-compare
      }
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, { "base64-js": 2, "ieee754": 4, "isarray": 5 }], 4: [function (require, module, exports) {
    exports.read = function (buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];

      i += d;

      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };

    exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

      value = Math.abs(value);

      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }

        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }

      for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

      buffer[offset + i - d] |= s * 128;
    };
  }, {}], 5: [function (require, module, exports) {
    var toString = {}.toString;

    module.exports = Array.isArray || function (arr) {
      return toString.call(arr) == '[object Array]';
    };
  }, {}] }, {}, [1]);
//    The MIT License (MIT)
//
//    Copyright (c) 2015 Phil Seaton
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy
//    of this software and associated documentation files (the "Software"), to deal
//    in the Software without restriction, including without limitation the rights
//    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//    copies of the Software, and to permit persons to whom the Software is
//    furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all
//    copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//    SOFTWARE.

if (!self.Buffer && !window.Buffer){
    throw new Error("Node's Buffer() not available");
} else if (!self.Jimp && !window.Jimp) {
    throw new Error("Could not Jimp object");
}

(function(){
    
    function fetchImageDataFromUrl(url, cb) {
        // Fetch image data via xhr. Note that this will not work
        // without cross-domain allow-origin headers because of CORS restrictions
        var xhr = new XMLHttpRequest();
        xhr.open( "GET", url, true );
        xhr.responseType = "arraybuffer";
        xhr.onload = function() {
            if (xhr.status < 400) cb(this.response,null);
            else cb(null,"HTTP Status " + xhr.status + " for url "+url);
        };
        xhr.onerror = function(e){
            cb(null,e);
        };

        xhr.send();
    };
    
    function bufferFromArrayBuffer(arrayBuffer) {
        // Prepare a Buffer object from the arrayBuffer. Necessary in the browser > node conversion,
        // But this function is not useful when running in node directly
        var buffer = new Buffer(arrayBuffer.byteLength);
        var view = new Uint8Array(arrayBuffer);
        for (var i = 0; i < buffer.length; ++i) {
            buffer[i] = view[i];
        }

        return buffer;
    }
    
    function isArrayBuffer(test) {
        return Object.prototype.toString.call(test).toLowerCase().indexOf("arraybuffer") > -1;
    }

    // delete the write method
    delete Jimp.prototype.write;
    
    // Override the nodejs implementation of Jimp.read()
    delete Jimp.read;
    Jimp.read = function(src, cb) {
        return new Promise(function(resolve, reject) {
                cb = cb || function(err, image) {
                    if (err) reject(err);
                    else resolve(image);
                };

                if ("string" == typeof src) {
                    // Download via xhr
                    fetchImageDataFromUrl(src,function(arrayBuffer,error){
                        if (arrayBuffer) {
                            if (!isArrayBuffer(arrayBuffer)) {
                                cb(new Error("Unrecognized data received for " + src));
                            } else {
                                new Jimp(bufferFromArrayBuffer(arrayBuffer),cb);
                            }
                        } else if (error) {
                            cb(error);
                        }
                    });
                } else if (isArrayBuffer(src)) {
                    // src is an ArrayBuffer already
                    new Jimp(bufferFromArrayBuffer(src), cb);
                } else {
                    // src is not a string or ArrayBuffer
                    cb(new Error("Jimp expects a single ArrayBuffer or image URL"));
                }
        });
    }
    
})();