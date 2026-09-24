import { appendFileSync, mkdirSync } from "node:fs";
import path from "node:path";

export function saveInquiry(
  kind: "lien-he" | "dang-ky",
  fields: Record<string, string>,
) {
  const dir = path.join(process.cwd(), "data");
  mkdirSync(dir, { recursive: true });
  const prefix = kind === "lien-he" ? "LH" : "TV";
  const code = `${prefix}-${Date.now().toString(36).toUpperCase()}`;
  const row = {
    code,
    kind,
    at: new Date().toISOString(),
    ...fields,
  };
  appendFileSync(path.join(dir, "inquiries.jsonl"), `${JSON.stringify(row)}\n`, "utf8");
  return code;
}
