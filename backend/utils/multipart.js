import path from "node:path";

const getHeaderValue = (headers, name) => {
  const match = headers.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match?.[1] || "";
};

export const parseMultipartResume = (body, contentType) => {
  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  const boundary = boundaryMatch?.[1] || boundaryMatch?.[2];
  if (!boundary) return null;

  const boundaryBuffer = Buffer.from(`--${boundary}`);
  let cursor = body.indexOf(boundaryBuffer);

  while (cursor !== -1) {
    const next = body.indexOf(boundaryBuffer, cursor + boundaryBuffer.length);
    if (next === -1) break;

    const part = body.subarray(cursor + boundaryBuffer.length + 2, next - 2);
    const headerEnd = part.indexOf(Buffer.from("\r\n\r\n"));

    if (headerEnd !== -1) {
      const headers = part.subarray(0, headerEnd).toString("utf8");
      const content = part.subarray(headerEnd + 4);
      const fieldName = getHeaderValue(headers, "name");
      const originalName = path.basename(getHeaderValue(headers, "filename"));

      if (fieldName === "resume" && originalName && content.length > 0) {
        return { originalName, content };
      }
    }

    cursor = next;
  }

  return null;
};
