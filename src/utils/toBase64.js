import { fromByteArray } from "base64-js";

const encoder = new TextEncoder();
export const toBase64 = (str) => fromByteArray(encoder.encode(str));
