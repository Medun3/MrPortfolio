export const sendJson = (res, status, data) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

export const sendError = (res, status, message) => {
  sendJson(res, status, { message });
};

export const getRequestBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

export const getJsonBody = async (req) => {
  const body = await getRequestBody(req);
  if (!body.length) return {};
  return JSON.parse(body.toString("utf8"));
};
