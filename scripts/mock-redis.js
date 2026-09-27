// Local stand-in for Upstash Redis — for testing the feedback section only.
// Data lives in memory and is lost when you stop it.
// Run: npm run mock:redis
const http = require("http");
const kv = new Map();
const z = new Map();

function run([c, ...a]) {
  switch (String(c).toUpperCase()) {
    case "SET": kv.set(a[0], String(a[1])); return "OK";
    case "GET": return kv.get(a[0]) ?? null;
    case "MGET": return a.map((k) => kv.get(k) ?? null);
    case "DEL": return a.reduce((n, k) => n + (kv.delete(k) ? 1 : 0), 0);
    case "INCR": { const v = Number(kv.get(a[0]) ?? 0) + 1; kv.set(a[0], String(v)); return v; }
    case "EXPIRE": return 1;
    case "ZADD": { const s = z.get(a[0]) ?? new Map(); s.set(a[2], Number(a[1])); z.set(a[0], s); return 1; }
    case "ZREM": { const s = z.get(a[0]); return s && s.delete(a[1]) ? 1 : 0; }
    case "ZRANGE": {
      const ids = [...(z.get(a[0]) ?? new Map()).entries()].sort((x, y) => x[1] - y[1]).map((e) => e[0]);
      if (a.includes("REV")) ids.reverse();
      return ids.slice(Number(a[1]), Number(a[2]) + 1);
    }
    default: throw new Error("unsupported command " + c);
  }
}

http
  .createServer((req, res) => {
    let body = "";
    req.on("data", (d) => (body += d));
    req.on("end", () => {
      res.setHeader("content-type", "application/json");
      const cmd = JSON.parse(body || "null");
      try {
        if (req.url === "/pipeline") res.end(JSON.stringify(cmd.map((c) => ({ result: run(c) }))));
        else res.end(JSON.stringify({ result: run(cmd) }));
      } catch (e) {
        res.end(JSON.stringify({ error: e.message }));
      }
    });
  })
  .listen(8079, () => console.log("Mock Redis running on http://localhost:8079 (Ctrl+C to stop)"));
