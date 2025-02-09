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

// Event Handlers for Buttons
document.getElementById('encrypt-btn').addEventListener('click', function() {
    const cipher = document.getElementById('cipher').value;
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;
    let result = "";

    if (cipher === 'caesar') {
        result = caesarEncrypt(message, parseInt(key));
    } else if (cipher === 'vigenere') {
        result = vigenereEncrypt(message, key);
    } else if (cipher === 'xor') {
        result = xorEncrypt(message, parseInt(key));
    } else if (cipher === 'atbash') {
        result = atbashEncrypt(message);
    } else if (cipher === 'rot13') {
        result = rot13Encrypt(message);
    }

    document.getElementById('result').value = result;
});

document.getElementById('decrypt-btn').addEventListener('click', function() {
    const cipher = document.getElementById('cipher').value;
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;
    let result = "";

    if (cipher === 'caesar') {
        result = caesarDecrypt(message, parseInt(key));
    } else if (cipher === 'vigenere') {
        result = vigenereDecrypt(message, key);
    } else if (cipher === 'xor') {
        result = xorDecrypt(message, parseInt(key));
    } else if (cipher === 'atbash') {
        result = atbashEncrypt(message);
    } else if (cipher === 'rot13') {
        result = rot13Encrypt(message);
    }

    document.getElementById('result').value = result;
});

document.getElementById('exit-btn').addEventListener('click', function() {
    alert("Exiting the application!");
    window.close();
});
document.getElementById('about-btn').addEventListener('click', function() {
    window.location.href = 'about.html';  // Redirect to the About page
});