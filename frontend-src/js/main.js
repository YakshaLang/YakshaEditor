let STATE = {
    listfiles_init: false,
    listfiles_err: 0,
    default_retries: 3,
    default_timeout: 300,
    current_file: "",
    current_file_type: "",
    current_file_dirty: false,
    last_saved_version_id: "---",
};

// dirty state --> https://github.com/Microsoft/monaco-editor/issues/353

function update_file_list(data) {
    let html = "";
    const files = JSON.parse(data).sort((a, b) => {
        if (a.type === "d" && b.type === "f") {
            return -1;
        }
        if (a.type === "f" && b.type === "d") {
            return 1;
        }
        return a.name.localeCompare(b.name);

    });

    for (let f of files) {
        if (f.name === ".") {
            continue;
        }
        const fType = (f.type === "d" ? "folder" : "file");
        const htmlClass = fType
            + (f.name === STATE.current_file ? " current-file" : "")
            + (f.name === ".." ? " red-folder" : "");
        const icon = fType === "folder" ? FOLDER : FILE;
        html += "<div onclick='clickfile(" + quoteJsThenEscapeHtml(f.name)
            + "," + quoteJsThenEscapeHtml(fType) + ")' class='" +
            htmlClass + "'>"
            + icon + " <span>" + escapeHtml(f.name) + "</span></div>"
    }
    $("#filebrowser").html(html);
}

function listfiles() {
    webui.call('listfiles').then(function (data) {
        update_file_list(data);
        STATE.listfiles_init = true;
        STATE.listfiles_err = 0;
        console.log("file list completed");
    }).catch(function (error) {
        if (!STATE.listfiles_init) {
            STATE.listfiles_err++;
        }
        if (!STATE.listfiles_init && STATE.listfiles_err <
            STATE.default_retries) {
            setTimeout(listfiles, STATE.default_timeout);
        }
    });
}

function set_editor_value(data) {
    editor.getModel().setValue('');
    editor.getModel().setValue(data);
    editor.setScrollPosition({scrollTop: 0});
    editor.focus();
}

const EXTENSION_TO_LANGUAGE = {
    "yaka": "yaksha",
    "l": "lisp",
    "json": "json",
    "js": "javascript",
    "html": "html",
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
    "py": "python",
    "java": "java",
    "sh": "shell",
    "yaml": "yaml",
    "xml": "xml",
    "sql": "sql",
    "php": "php",
    "go": "go",
    "rb": "ruby",
    "rs": "rust",
    "swift": "swift",
    "kt": "kotlin",
    "cs": "csharp",
    "ts": "typescript",
    "tsx": "typescript",
    "jsx": "javascript",
    "rst": "restructuredtext",
    "mdx": "markdown",
    "mjs": "javascript",
    "cmd": "powershell",
    "bat": "powershell",
    "ps1": "powershell",
    "lua": "lua",
};

const FILENAME_TO_LANGUAGE = {
    "Makefile": "shell",
    "Dockerfile": "shell",
    "CMakeLists.txt": "yaksha",
    ".gitignore": "yaksha",
    ".clang-format": "yaksha",
    ".gitattributes": "yaksha",
    ".gitmodules": "yaksha",
}

function set_editor_language(filename) {
    const ext = extension(filename);
    let lang = FILENAME_TO_LANGUAGE[filename] ||  EXTENSION_TO_LANGUAGE[ext] || "plaintext";
    monaco.editor.setModelLanguage(editor.getModel(), lang);
}

function clickfile(name, type) {
    if (type === "folder") {

    } else {
        webui.call('clickfile', name).then(function (data) {
            set_editor_value(data);
            STATE.current_file = name;
            set_editor_language(name);
        });
    }

}

$(document).ready(function () {
    $('#container').layout();
    $(document).bind('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && (e.code === e.KeyS)) {
            e.preventDefault();
            console.log("Ctrl + S pressed!");
            return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.code === e.KeyO)) {
            e.preventDefault();
            console.log("Ctrl + O pressed!");
            return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.code === e.KeyO)) {
            e.preventDefault();
            console.log("Ctrl + Z pressed!");
            return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.code === e.KeyN)) {
            e.preventDefault();
            console.log("Ctrl + N pressed!");
            return false;
        }
    });
    monaco.languages.register({
        id: 'yaksha'
    });
    monaco.languages.setMonarchTokensProvider('yaksha',
        yaksha_tokenizer_rules());
    monaco.languages.setLanguageConfiguration('yaksha',
        yaksha_configuration());
    monaco.editor.defineTheme('vs-yaksha-theme', {
        colors: {"editor.background": '#0a0a1b'},
        base: 'vs-dark',
        inherit: true,
        rules: yaksha_vs_extend_colors(),
    });

    window.editor =
        monaco.editor.create(document.getElementById('editor'), {
            theme: 'vs-yaksha-theme',
            value: yaksha_init_code() + "\n",
            language: 'yaksha',
            automaticLayout: true,
            bracketPairColorization: {enabled: true},
        });

    $('#loading-animation').remove();
    setTimeout(listfiles, STATE.default_timeout);
});