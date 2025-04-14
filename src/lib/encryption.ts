export const caesarCipher = {
  // Encrypts the given text using Caesar cipher with the specified shift
  encrypt: (text: string, shift: number): string => {
    // Normalize shift to be within 0-25 range
    shift = ((shift % 26) + 26) % 26;

    return text
      .split("") // Convert text into array of characters
      .map((char) => {
        // Check if character is a letter (ignores numbers, symbols, etc.)
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0); // Get ASCII code

          // Uppercase letters (A-Z)
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
          }
          // Lowercase letters (a-z)
          else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
          }
        }

        // Return non-alphabetic characters unchanged
        return char;
      })
      .join(""); // Reconstruct the encrypted string
  },

  // Decrypts the text by shifting in the opposite direction
  decrypt: (text: string, shift: number): string => {
    // Decryption is just encryption with (26 - shift)
    return caesarCipher.encrypt(text, 26 - shift);
  },
};

export const hillCipher = {
  // Converts a string to a numeric matrix (A=0 to Z=25)
  stringToMatrix: (str: string): number[] => {
    // Pad with 'X' if the length isn't a multiple of 3
    while (str.length % 3 !== 0) str += "X";

    return str
      .toUpperCase()
      .replace(/[^A-Z]/g, "") // Remove non-alphabetic characters
      .split("")
      .map((char) => char.charCodeAt(0) - 65); // Convert A-Z to 0-25
  },

  // Converts a numeric matrix back to a string
  matrixToString: (matrix: number[]): string =>
    matrix
      .map((num) => String.fromCharCode((((num % 26) + 26) % 26) + 65))
      .join(""),

  // Multiplies a 3x3 matrix by a 3x1 vector mod 26
  multiplyMatrix: (keyMatrix: number[][], vector: number[]): number[] => {
    const result = [0, 0, 0];
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        result[i] = (result[i] + keyMatrix[i][j] * vector[j]) % 26;

    // Ensure all values are positive
    return result.map((val) => (val + 26) % 26);
  },

  // Converts a 9-letter string into a 3x3 matrix
  keyToMatrix: (key: string): number[][] => {
    key = key.toUpperCase().replace(/[^A-Z]/g, "");
    if (key.length !== 9) throw new Error("Hill cipher key must be 9 letters");

    const matrix = Array.from({ length: 3 }, () => Array(3).fill(0));
    for (let i = 0; i < 9; i++)
      matrix[Math.floor(i / 3)][i % 3] = key.charCodeAt(i) - 65;

    return matrix;
  },

  // Calculates the determinant of a 3x3 matrix
  determinant: (m: number[][]): number =>
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]),

  // Finds the modular inverse of a number under modulo m
  modInverse: (a: number, m: number): number => {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
    throw new Error("No modular inverse exists");
  },

  // Returns the adjugate (adjoint) of a 3x3 matrix mod 26
  adjugateMatrix: (m: number[][]): number[][] => {
    const adj = Array.from({ length: 3 }, () => Array(3).fill(0));

    // Helper to calculate 2x2 cofactors
    const cofactor = (r1: number, r2: number, c1: number, c2: number): number =>
      m[r1][c1] * m[r2][c2] - m[r1][c2] * m[r2][c1];

    // Calculate cofactors for each element of the matrix
    adj[0][0] = cofactor(1, 2, 1, 2);
    adj[0][1] = -cofactor(1, 2, 0, 2);
    adj[0][2] = cofactor(1, 2, 0, 1);

    adj[1][0] = -cofactor(0, 2, 1, 2);
    adj[1][1] = cofactor(0, 2, 0, 2);
    adj[1][2] = -cofactor(0, 2, 0, 1);

    adj[2][0] = cofactor(0, 1, 1, 2);
    adj[2][1] = -cofactor(0, 1, 0, 2);
    adj[2][2] = cofactor(0, 1, 0, 1);

    // Transpose and ensure positivity mod 26
    return adj[0].map((_, i) => adj.map((row) => ((row[i] % 26) + 26) % 26));
  },

  // Returns the inverse of a matrix mod 26
  inverseMatrix: (matrix: number[][]): number[][] => {
    const det = hillCipher.determinant(matrix);
    const modInv = hillCipher.modInverse(det, 26); // Inverse of determinant mod 26
    const adj = hillCipher.adjugateMatrix(matrix); // Adjugate matrix

    // Multiply adjugate by modular inverse of determinant, mod 26
    return adj.map((row) =>
      row.map((val) => (modInv * val) % 26).map((v) => (v + 26) % 26),
    );
  },

  // Encrypts the text using Hill Cipher and the given key
  encrypt: (text: string, key: string): string => {
    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    const keyMatrix = hillCipher.keyToMatrix(key);

    let result = "";
    for (let i = 0; i < text.length; i += 3) {
      // Take block of 3 characters, pad if necessary
      const block = text.substring(i, i + 3).padEnd(3, "X");
      const vector = hillCipher.stringToMatrix(block);
      const encrypted = hillCipher.multiplyMatrix(keyMatrix, vector);
      result += hillCipher.matrixToString(encrypted);
    }
    return result;
  },

  // Decrypts the text using Hill Cipher and the given key
  decrypt: (text: string, key: string): string => {
    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    const keyMatrix = hillCipher.keyToMatrix(key);
    const inverseKeyMatrix = hillCipher.inverseMatrix(keyMatrix);

    let result = "";
    for (let i = 0; i < text.length; i += 3) {
      const block = text.substring(i, i + 3).padEnd(3, "X");
      const vector = hillCipher.stringToMatrix(block);
      const decrypted = hillCipher.multiplyMatrix(inverseKeyMatrix, vector);
      result += hillCipher.matrixToString(decrypted);
    }

    return result;
  },
};

export const rsaEncryption = {
  // Generates a public-private key pair using RSA-OAEP with SHA-256
  generateKeys: async () => {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048, // Key length
        publicExponent: new Uint8Array([1, 0, 1]), // Common exponent 65537
        hash: "SHA-256", // Hash algorithm
      },
      true, // Whether the key is extractable
      ["encrypt", "decrypt"], // Key usages
    );

    // Export public key as base64 string
    const publicKeyExported = await window.crypto.subtle.exportKey(
      "spki",
      keyPair.publicKey,
    );

    // Export private key as base64 string
    const privateKeyExported = await window.crypto.subtle.exportKey(
      "pkcs8",
      keyPair.privateKey,
    );

    const publicKeyString = btoa(
      String.fromCharCode(...new Uint8Array(publicKeyExported)),
    );
    const privateKeyString = btoa(
      String.fromCharCode(...new Uint8Array(privateKeyExported)),
    );

    return {
      publicKey: publicKeyString,
      privateKey: privateKeyString,
      publicKeyObj: keyPair.publicKey, // raw key object
      privateKeyObj: keyPair.privateKey,
    };
  },

  // Import a public key from a base64 string
  importPublicKey: async (publicKeyString: string) => {
    const binaryKey = Uint8Array.from(atob(publicKeyString), (c) =>
      c.charCodeAt(0),
    );

    return await window.crypto.subtle.importKey(
      "spki", // Format
      binaryKey,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false, // not extractable
      ["encrypt"],
    );
  },

  // Import a private key from a base64 string
  importPrivateKey: async (privateKeyString: string) => {
    const binaryKey = Uint8Array.from(atob(privateKeyString), (c) =>
      c.charCodeAt(0),
    );

    return await window.crypto.subtle.importKey(
      "pkcs8", // Format
      binaryKey,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false, // not extractable
      ["decrypt"],
    );
  },

  // Encrypt a string using a public key
  encrypt: async (text: string, publicKeyString: string) => {
    const publicKey = await rsaEncryption.importPublicKey(publicKeyString);
    const encodedText = new TextEncoder().encode(text);

    const encrypted = await window.crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      publicKey,
      encodedText,
    );

    return btoa(String.fromCharCode(...new Uint8Array(encrypted))); // return as base64 string
  },

  // Decrypt an encrypted base64 string using a private key
  decrypt: async (encryptedText: string, privateKeyString: string) => {
    const privateKey = await rsaEncryption.importPrivateKey(privateKeyString);
    const encryptedBuffer = Uint8Array.from(atob(encryptedText), (c) =>
      c.charCodeAt(0),
    );

    const decrypted = await window.crypto.subtle.decrypt(
      { name: "RSA-OAEP" },
      privateKey,
      encryptedBuffer,
    );

    return new TextDecoder().decode(decrypted); // return plaintext
  },
};

export const playfairCipher = {
  // Generate the 5x5 key square used for encryption/decryption
  generateKeySquare: (key: string): string[][] => {
    // Prepare key: uppercase, remove non-letters, replace J with I
    key = key
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .replace(/J/g, "I");

    // Remove duplicate letters while preserving order
    const uniqueLetters = [...new Set(key.split(""))];

    // Append remaining letters from the alphabet (excluding J)
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    for (const letter of alphabet) {
      if (!uniqueLetters.includes(letter)) {
        uniqueLetters.push(letter);
      }
    }

    // Convert the flat array into a 5x5 matrix
    const keySquare: string[][] = [];
    for (let i = 0; i < 5; i++) {
      keySquare.push(uniqueLetters.slice(i * 5, (i + 1) * 5));
    }

    return keySquare;
  },

  // Find the row and column of a letter in the key square
  findPosition: (keySquare: string[][], letter: string): [number, number] => {
    letter = letter.toUpperCase();
    if (letter === "J") letter = "I";

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (keySquare[row][col] === letter) {
          return [row, col];
        }
      }
    }

    throw new Error(`Letter ${letter} not found in key square`);
  },

  // Prepare plaintext by handling double letters and ensuring even length
  prepareText: (text: string): string => {
    text = text
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .replace(/J/g, "I");

    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += text[i];
      if (i < text.length - 1 && text[i] === text[i + 1]) {
        result += "X"; // Insert filler letter for repeated pairs
      }
    }

    if (result.length % 2 !== 0) {
      result += "X"; // Pad with X to make even
    }

    return result;
  },

  // Encrypt a message using the Playfair cipher
  encrypt: (text: string, key: string): string => {
    const keySquare = playfairCipher.generateKeySquare(key);
    const preparedText = playfairCipher.prepareText(text);
    let result = "";

    for (let i = 0; i < preparedText.length; i += 2) {
      const char1 = preparedText[i];
      const char2 = preparedText[i + 1];
      const [row1, col1] = playfairCipher.findPosition(keySquare, char1);
      const [row2, col2] = playfairCipher.findPosition(keySquare, char2);

      let newChar1: string, newChar2: string;

      if (row1 === row2) {
        // Same row: take letter to the right
        newChar1 = keySquare[row1][(col1 + 1) % 5];
        newChar2 = keySquare[row2][(col2 + 1) % 5];
      } else if (col1 === col2) {
        // Same column: take letter below
        newChar1 = keySquare[(row1 + 1) % 5][col1];
        newChar2 = keySquare[(row2 + 1) % 5][col2];
      } else {
        // Rectangle rule: swap columns
        newChar1 = keySquare[row1][col2];
        newChar2 = keySquare[row2][col1];
      }

      result += newChar1 + newChar2;
    }

    return result;
  },

  // Decrypt a message using the Playfair cipher
  decrypt: (text: string, key: string): string => {
    const keySquare = playfairCipher.generateKeySquare(key);

    text = text.toUpperCase().replace(/[^A-Z]/g, "");

    if (text.length % 2 !== 0) {
      throw new Error("Ciphertext length must be even");
    }

    let result = "";

    for (let i = 0; i < text.length; i += 2) {
      const char1 = text[i];
      const char2 = text[i + 1];
      const [row1, col1] = playfairCipher.findPosition(keySquare, char1);
      const [row2, col2] = playfairCipher.findPosition(keySquare, char2);

      let newChar1: string, newChar2: string;

      if (row1 === row2) {
        // Same row: take letter to the left
        newChar1 = keySquare[row1][(col1 + 4) % 5];
        newChar2 = keySquare[row2][(col2 + 4) % 5];
      } else if (col1 === col2) {
        // Same column: take letter above
        newChar1 = keySquare[(row1 + 4) % 5][col1];
        newChar2 = keySquare[(row2 + 4) % 5][col2];
      } else {
        // Rectangle rule: swap columns
        newChar1 = keySquare[row1][col2];
        newChar2 = keySquare[row2][col1];
      }

      result += newChar1 + newChar2;
    }

    return result;
  },
};

export const railFenceCipher = {
  encrypt: (text: string, rails: number): string => {
    if (rails < 2) throw new Error("Number of rails must be at least 2");

    text = text.replace(/\s/g, ""); // Remove whitespace

    // Initialize empty rails
    const fence: string[][] = Array(rails)
      .fill(0)
      .map(() => []);

    let direction = 1;
    let rail = 0;

    // Distribute characters in a zig-zag pattern
    for (const char of text) {
      fence[rail].push(char);

      if (rail === 0) direction = 1;
      else if (rail === rails - 1) direction = -1;

      rail += direction;
    }

    // Flatten and join the rails
    return fence.flat().join("");
  },

  decrypt: (text: string, rails: number): string => {
    if (rails < 2) throw new Error("Number of rails must be at least 2");

    const fence: string[][] = Array(rails)
      .fill(0)
      .map(() => []);
    const pattern: number[] = [];

    let direction = 1;
    let rail = 0;

    // Build zig-zag pattern
    for (let i = 0; i < text.length; i++) {
      pattern.push(rail);
      if (rail === 0) direction = 1;
      else if (rail === rails - 1) direction = -1;
      rail += direction;
    }

    // Place characters into the correct rail using pattern
    let charIndex = 0;
    for (let r = 0; r < rails; r++) {
      for (let i = 0; i < text.length; i++) {
        if (pattern[i] === r) {
          fence[r].push(text[charIndex++]);
        }
      }
    }

    let result = "";
    direction = 1;
    rail = 0;

    // Reconstruct the message by zig-zagging again
    for (let i = 0; i < text.length; i++) {
      result += fence[rail].shift() || "";
      if (rail === 0) direction = 1;
      else if (rail === rails - 1) direction = -1;
      rail += direction;
    }

    return result;
  },
};

export const vernamCipher = {
  // Generate random uppercase key of given length
  generateKey: (length: number): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  },

  // Convert A-Z to 0-25
  charToNum: (char: string): number => {
    return char.toUpperCase().charCodeAt(0) - 65;
  },

  // Convert 0-25 to A-Z
  numToChar: (num: number): string => {
    return String.fromCharCode((num % 26) + 65);
  },

  // Encrypt using modular addition
  encrypt: (text: string, key: string): string => {
    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    key = key.toUpperCase().replace(/[^A-Z]/g, "");

    if (key.length < text.length) {
      throw new Error("Key must be at least as long as the plaintext");
    }

    let result = "";
    for (let i = 0; i < text.length; i++) {
      const encryptedNum =
        (vernamCipher.charToNum(text[i]) + vernamCipher.charToNum(key[i])) % 26;
      result += vernamCipher.numToChar(encryptedNum);
    }

    return result;
  },

  // Decrypt using modular subtraction
  decrypt: (text: string, key: string): string => {
    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    key = key.toUpperCase().replace(/[^A-Z]/g, "");

    if (key.length < text.length) {
      throw new Error("Key must be at least as long as the ciphertext");
    }

    let result = "";
    for (let i = 0; i < text.length; i++) {
      const decryptedNum =
        (vernamCipher.charToNum(text[i]) -
          vernamCipher.charToNum(key[i]) +
          26) %
        26;
      result += vernamCipher.numToChar(decryptedNum);
    }

    return result;
  },
};
