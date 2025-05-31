import { API_KEY, API_URL } from "@/constant/constant";
import * as crypto from 'crypto';

export const fetchFromApi = async (apiFunction, bodyData = {}) => {
  const myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=3u01lnipofpe8o5f83sbu8mm41");

  // Create FormData and append api_function
  const formData = new FormData();
  formData.append("api_function", apiFunction);

  // Append extra body data if provided
  for (const [key, value] of Object.entries(bodyData)) {
    formData.append(key, value);
  }

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
    cache: 'force-cache',

  };

  try {
    const response = await fetch(API_URL, requestOptions);

    if (!response.ok) {
      console.error("API Error: HTTP status", response.status, response.statusText);
      return null;
    }

    let text = await response.text();
    if (!text) {
      console.error("API returned empty response");
      return null;
    }

    // 🛠 Clean up: Remove unexpected prefix before JSON
    const firstBraceIndex = text.indexOf('{');
    if (firstBraceIndex !== -1) {
      text = text.slice(firstBraceIndex);
    } else {
      console.error("No JSON found in response:", text);
      return null;
    }

    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError, "Cleaned Response text:", text);
      throw parseError;
    }
  } catch (error) {
    console.error("Network or other error:", error);
    throw error;
  }

};

// export function encrypt(data) {
//   const iv = Buffer.alloc(16, 0); // Fixed IV (for short output)
//   const cipher = crypto.createCipheriv('aes-256-cbc', API_KEY, iv);
//   const encrypted = Buffer.concat([
//     cipher.update(JSON.stringify(data)),
//     cipher.final()
//   ]);
//   return encrypted.toString('base64'); // Shorter than hex
// }

// // Decrypt (AES-256-CBC)
// export function decrypt(encryptedBase64) {
//   const iv = Buffer.alloc(16, 0);
//   const decipher = crypto.createDecipheriv('aes-256-cbc', API_KEY, iv);
//   const decrypted = Buffer.concat([
//     decipher.update(Buffer.from(encryptedBase64, 'base64')),
//     decipher.final()
//   ]);
//   return JSON.parse(decrypted.toString());
// }


export function encrypt(inputText) {
  return btoa(inputText); // Base64 encode
};

export function decrypt(encodedText) {
  try {
    return atob(encodedText); // Base64 decode
  } catch (error) {
    alert("Invalid Base64 input!");
  }
};
