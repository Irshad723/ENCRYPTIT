// Function to validate input text (Only allows letters)
function isValidText(text) {
    return /^[A-Za-z\s]+$/.test(text); // Only allows letters and spaces
}

// Function to validate key (For Caesar & XOR, only numbers are allowed)
function isValidKey(key, cipher) {
    if (cipher === "caesar" || cipher === "xor") {
        return /^\d+$/.test(key); // Only numbers allowed
    }
    return /^[A-Za-z]+$/.test(key); // For Vigenère, only letters allowed
}

// Caesar Cipher
function caesarEncrypt(text, shift) {
    let result = "";
    for (let char of text) {
        if (/[a-zA-Z]/.test(char)) {
            const shiftBase = char >= 'a' ? 97 : 65;
            result += String.fromCharCode((char.charCodeAt(0) - shiftBase + shift) % 26 + shiftBase);
        } else {
            result += char;
        }
    }
    return result;
}

function caesarDecrypt(text, shift) {
    return caesarEncrypt(text, -shift);
}

// Vigenère Cipher
function vigenereEncrypt(text, key) {
    let result = "";
    let keyIndex = 0;
    key = key.toLowerCase();

    for (let char of text) {
        if (/[a-zA-Z]/.test(char)) {
            const shiftBase = char >= 'a' ? 97 : 65;
            const shift = key.charCodeAt(keyIndex % key.length) - 97;
            result += String.fromCharCode((char.charCodeAt(0) - shiftBase + shift) % 26 + shiftBase);
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

function vigenereDecrypt(text, key) {
    let result = "";
    let keyIndex = 0;
    key = key.toLowerCase();

    for (let char of text) {
        if (/[a-zA-Z]/.test(char)) {
            const shiftBase = char >= 'a' ? 97 : 65;
            const shift = key.charCodeAt(keyIndex % key.length) - 97;
            result += String.fromCharCode((char.charCodeAt(0) - shiftBase - shift + 26) % 26 + shiftBase);
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

// XOR Cipher
function xorEncrypt(text, key) {
    let result = "";
    for (let char of text) {
        result += String.fromCharCode(char.charCodeAt(0) ^ key);
    }
    return result;
}

function xorDecrypt(text, key) {
    let result = "";
    for (let char of text) {
        result += String.fromCharCode(char.charCodeAt(0) ^ key);
    }
    return result;
}

// Atbash Cipher
function atbashEncrypt(text) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const reversedAlphabet = alphabet.split("").reverse().join("");
    let result = "";

    for (let char of text) {
        if (/[a-zA-Z]/.test(char)) {
            const isUpper = char === char.toUpperCase();
            const index = alphabet.indexOf(char.toLowerCase());
            const encryptedChar = reversedAlphabet[index];
            result += isUpper ? encryptedChar.toUpperCase() : encryptedChar;
        } else {
            result += char;
        }
    }
    return result;
}

// Rot13 Cipher
function rot13Encrypt(text) {
    let result = "";
    for (let char of text) {
        if (/[a-zA-Z]/.test(char)) {
            const shift = char >= 'a' ? 97 : 65;
            result += String.fromCharCode(((char.charCodeAt(0) - shift + 13) % 26) + shift);
        } else {
            result += char;
        }
    }
    return result;
}

// Function to show error messages
function showError(message) {
    alert(message);
}

// Encrypt Button
document.getElementById('encrypt-btn').addEventListener('click', function () {
    const cipher = document.getElementById('cipher').value;
    const message = document.getElementById('message').value.trim();
    const key = document.getElementById('key').value.trim();
    let result = "";

    // Validate Message
    if (!isValidText(message)) {
        showError("Invalid message! Only letters and spaces are allowed.");
        return;
    }

    // Validate Key
    if (key !== "" && !isValidKey(key, cipher)) {
        showError("Invalid key! Caesar & XOR require numbers. Vigenère requires letters.");
        return;
    }

    // Encryption Logic
    if (cipher === "caesar") {
        result = caesarEncrypt(message, parseInt(key) || 0);
    } else if (cipher === "vigenere") {
        result = vigenereEncrypt(message, key);
    } else if (cipher === "xor") {
        result = xorEncrypt(message, parseInt(key) || 0);
    } else if (cipher === "atbash") {
        result = atbashEncrypt(message);
    } else if (cipher === "rot13") {
        result = rot13Encrypt(message);
    }

    document.getElementById('result').value = result;
});

// Decrypt Button
document.getElementById('decrypt-btn').addEventListener('click', function () {
    const cipher = document.getElementById('cipher').value;
    const message = document.getElementById('message').value.trim();
    const key = document.getElementById('key').value.trim();
    let result = "";

    // Validate Message
    if (!isValidText(message)) {
        showError("Invalid message! Only letters and spaces are allowed.");
        return;
    }

    // Validate Key
    if (key !== "" && !isValidKey(key, cipher)) {
        showError("Invalid key! Caesar & XOR require numbers. Vigenère requires letters.");
        return;
    }

    // Decryption Logic
    if (cipher === "caesar") {
        result = caesarDecrypt(message, parseInt(key) || 0);
    } else if (cipher === "vigenere") {
        result = vigenereDecrypt(message, key);
    } else if (cipher === "xor") {
        result = xorDecrypt(message, parseInt(key) || 0);
    } else if (cipher === "atbash") {
        result = atbashEncrypt(message); // Atbash is symmetric
    } else if (cipher === "rot13") {
        result = rot13Encrypt(message); // Rot13 is symmetric
    }

    document.getElementById('result').value = result;
});

// About Algorithms Button
document.getElementById('about-btn').addEventListener('click', function () {
    window.location.href = 'about.html';
});

// Exit Button
document.getElementById('exit-btn').addEventListener('click', function () {
    alert("Exiting the application!");
    window.close();
});




    
