const FOLDER = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-folder\" viewBox=\"0 0 16 16\">\n" +
    "  <path d=\"M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z\"/>\n" +
    "</svg>";
const FILE = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-file-earmark\" viewBox=\"0 0 16 16\">\n" +
    "  <path d=\"M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z\"/>\n" +
    "</svg>";

const makeCRCTable = function () {
    let c;
    const crcTable = [];
    for (let n = 0; n < 256; n++) {
        c = n;
        for (let k = 0; k < 8; k++) {
            c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    return crcTable;
};

const crc32 = function (str) {
    const crcTable = window.crcTable || (window.crcTable = makeCRCTable());
    let crc = 0 ^ (-1);

    for (let i = 0; i < str.length; i++) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;
};

const colorize = function (s) {
    let color_hash = 0;
    for (let i = 0; i < s.length; i++) {
        color_hash = s.charCodeAt(i) + ((color_hash << 5) - color_hash);
    }

    color_hash = (color_hash ^ crc32(s)) & 0xFFFFFFFF;

    let color = '#'
    for (let i = 0; i < 3; i++) {
        const value = ((color_hash >> (i * 8)) & 0xFF) * 0.60;
        color += ('00' + value.toString(16).slice(0, 2)).slice(-2);
    }
    return color;
}

const escapeHtml = (unsafe) => {
    return unsafe.replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

const quoteJsThenEscapeHtml = (unsafe) => {
    return escapeHtml(JSON.stringify(unsafe));
}

function extension(f) {
    const a = f.split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
        return "txt";
    }
    return a.pop().toLowerCase();
}

function uniqueChecker() {
    const unique = new Set();

    function isUnique(word) {
        let w = word.replace("\u200d", "");
        if (unique.has(w)) {
            return false;
        }
        unique.add(w);
        return true;
    }

    return isUnique;
}

function debouncer(func, timeout = 50) {
    let timer = null;
    return (...args) => {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            func(...args);
        }, timeout);
    };
}
