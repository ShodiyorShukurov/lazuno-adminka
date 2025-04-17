import http from "stream-http";
import zlib from "browserify-zlib";
import path from "path-browserify";
import stream from "stream-browserify";
import util from "util/";
import crypto from "crypto-browserify";

export default function override(config, env) {
  console.log("override");
  let loaders = config.resolve;
  loaders.fallback = {
    fs: false,
    tls: false,
    net: false,
    http,
    https: false,
    zlib,
    path,
    stream,
    util,
    crypto,
  };

  return config;
}
