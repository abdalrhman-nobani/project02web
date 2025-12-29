export function logSuccessfulCreate(req, res, next) {
  if (req.method !== "POST") return next();

  res.on("finish", () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const ts = new Date().toISOString();
      console.log(`[CREATE] ${ts} userId=${req.session.userId}`);
    }
  });

  next();
}
