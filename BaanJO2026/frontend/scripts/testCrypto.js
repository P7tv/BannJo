import crypto from "crypto";

const SALT = "BaanJO2026Salt";

export const hashPhone = (phone) => {
  return crypto.createHash("sha256").update(phone).digest("hex");
};

export const encryptStudent = (phone, studentData) => {
  const key = crypto.pbkdf2Sync(phone, SALT, 1000, 32, "sha256");
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  
  let encrypted = cipher.update(JSON.stringify(studentData), "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag().toString("hex");

  return {
    iv: iv.toString("hex"),
    tag: tag,
    data: encrypted
  };
};

export const decryptStudent = (phone, encryptedObj) => {
  const key = crypto.pbkdf2Sync(phone, SALT, 1000, 32, "sha256");
  const iv = Buffer.from(encryptedObj.iv, "hex");
  const tag = Buffer.from(encryptedObj.tag, "hex");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encryptedObj.data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
};

// Test execution
const sample = { tel: "0812345678", name: "Somchai", group: "CIA" };
const hash = hashPhone(sample.tel);
const encrypted = encryptStudent(sample.tel, sample);
const decrypted = decryptStudent(sample.tel, encrypted);

console.log("Hash:", hash);
console.log("Encrypted Payload:", encrypted);
console.log("Decrypted Payload:", decrypted);
