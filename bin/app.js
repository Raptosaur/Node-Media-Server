#!/usr/bin/env node

const NodeMediaServer = require("..");
let argv = require("minimist")(process.argv.slice(2), {
  string: ["rtmp_port", "http_port", "secret", "api_password"],
  alias: {
    rtmp_port: "r",
    http_port: "h",
    secret: "s",
    api_password: "pw",
  },
  default: {
    rtmp_port: 1935,
    http_port: 8000,
    secret:
      process.env.SECRET_KEY ?? (Math.random() + 1).toString(36).substring(2),
    api_password: process.env.API_PASSWORD ?? "admin",
  },
});

if (argv.help) {
  console.log("Usage:");
  console.log("  node-media-server --help // print help information");
  console.log("  node-media-server --rtmp_port 1935 or -r 1935");
  console.log("  node-media-server --http_port 8000 or -h 8000");
  process.exit(0);
}

const config = {
  rtmp: {
    port: argv.rtmp_port,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: argv.http_port,
    mediaroot: __dirname + "/media",
    webroot: __dirname + "/www",
    allow_origin: "*",
    api: true,
  },
  auth: {
    api: true,
    api_user: "admin",
    api_pass: argv.api_password,
    play: false,
    publish: true,
    secret: argv.secret,
  },
};

console.log("environment", process.env);

let nms = new NodeMediaServer(config);
nms.run();

nms.on("preConnect", (id, args) => {
  console.log(
    "[NodeEvent on preConnect]",
    `id=${id} args=${JSON.stringify(args)}`
  );
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on("postConnect", (id, args) => {
  console.log(
    "[NodeEvent on postConnect]",
    `id=${id} args=${JSON.stringify(args)}`
  );
});

nms.on("doneConnect", (id, args) => {
  console.log(
    "[NodeEvent on doneConnect]",
    `id=${id} args=${JSON.stringify(args)}`
  );
});

nms.on("prePublish", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on prePublish]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on("postPublish", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on postPublish]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.on("donePublish", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on donePublish]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.on("prePlay", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on prePlay]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on("postPlay", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on postPlay]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.on("donePlay", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on donePlay]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});
