
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

  await fetch("https://discordapp.com/api/webhooks/1393117963829248061/4Ll5FEzqM8bEEDhY9x0Vt_U-5dKXi6F0eEUjlmTV-rBTbfHkDY--wB-Od8yq8Sn7r7kl", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    content: `🚨 TRIPWIRE HIT 🚨\nIP: ${ip}\nUser Agent: ${userAgent}\nReferrer: ${referrer}\nTime: ${logEntry.time}`
  })
});


  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-store");

  const buffer = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/QPj9XkAAAAASUVORK5CYII=",
    "base64"
  );

  res.status(200).send(buffer);
}
