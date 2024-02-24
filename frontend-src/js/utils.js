const FOLDER = "<span class='codicon codicon-folder'></span>";
const FILE = "<span class='codicon codicon-file'></span>";
const EXTENSION_TO_LANGUAGE = {
    "yaka": "yaksha",
    "l": "yaksha", // TODO yaksha lisp?
    "json": "typescript",
    "js": "typescript",
    "html": "html",
    "htm": "html",
    "css": "css",
    "md": "markdown",
    "txt": "plaintext",
    "": "plaintext",
    "c": "cpp",
    "cpp": "cpp",
    "h": "cpp",
    "hpp": "cpp",
    "cc": "cpp",
    "hh": "cpp",
    "cxx": "cpp",
    "hxx": "cpp",
    "inl": "cpp",
    "py": "python",
    "java": "java",
    "sh": "shell",
    "yaml": "yaml",
    "yml": "yaml",
    "xml": "xml",
    "sql": "sql",
    "rs": "rust",
    "ts": "typescript",
    "tsx": "typescript",
    "jsx": "typescript",
    "rst": "restructuredtext",
    "mdx": "markdown",
    "mjs": "typescript",
    "cmd": "shell",
    "bat": "shell",
    "ps1": "powershell",
    "lua": "lua",
    "ninja": "yaksha",
    "cmake": "yaksha",
};
const FILENAME_TO_LANGUAGE = {
    "Makefile": "shell",
    "Dockerfile": "shell",
    "GNUmakefile": "shell",
    "CMakeLists.txt": "yaksha",
    "CMakeCache.txt": "yaksha",
    ".ninja_log": "yaksha",
    ".ninja_deps": "yaksha",
    ".gitignore": "yaksha",
    ".clang-format": "yaksha",
    ".gitattributes": "yaksha",
    ".gitmodules": "yaksha",
    "requirements.txt": "python",
    "LICENSE": "markdown",
}

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
