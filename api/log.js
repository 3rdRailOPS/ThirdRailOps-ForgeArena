
let hitCount = 0;

export default async function handler(req, res) {
  hitCount++;

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"] || "unknown";
  const referrer = req.headers["referer"] || "none";

  const logEntry = {
    time: new Date().toISOString(),
    ip,
    userAgent,
    referrer,
    totalHits: hitCount
  };

  console.log("[TRIPWIRE HIT]", logEntry);

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-store");

  const buffer = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/QPj9XkAAAAASUVORK5CYII=",
    "base64"
  );

  res.status(200).send(buffer);
}
