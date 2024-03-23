// @ts-nocheck

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as jwt from "jose";
import cookies from "vue-cookies";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getToken() {
  const token = cookies.get("token");
  if (!token) {
    return null;
  }

  const decodedToken = jwt.decodeJwt(token);

  return decodedToken;
}

export const serverString = "http://localhost:8080";
