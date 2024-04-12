const NEVER_CHANGED_VERSION_INDICATOR = "---";
let STATE = {
    file_list: [],
    listfiles_init: false,
    listfiles_err: 0,
    cwd: "",
    default_retries: 3,
    default_timeout: 300,
    current_file: "",
    current_file_type: "",
    current_file_dirty: false,
    last_saved_version_id: NEVER_CHANGED_VERSION_INDICATOR,
    last_edit_version_id: NEVER_CHANGED_VERSION_INDICATOR,
    set_unload_warning: false,
};

function is_dirty() {
    return STATE.last_saved_version_id !== STATE.last_edit_version_id;
}

function update_file_list() {
    const data = STATE.file_list;
    const files_data = JSON.parse(data);
    STATE.cwd = files_data.cwd;
    let html = "";
    const files = files_data.files.sort((a, b) => {
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
            + (is_dirty() && f.name === STATE.current_file ? " dirty-file" : "")
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
        STATE.file_list = data;
        update_file_list();
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
        console.error("listfiles error", error);
    });
}

function set_editor_value(data) {
    editor.getModel().setValue('');
    editor.getModel().setValue(data);
    editor.setScrollPosition({scrollTop: 0});
    editor.focus();
}

function set_editor_language(filename) {
    const ext = extension(filename);
    let lang = FILENAME_TO_LANGUAGE[filename] || EXTENSION_TO_LANGUAGE[ext] ||
        "plaintext";
    monaco.editor.setModelLanguage(editor.getModel(), lang);
    console.log("set language", lang);
}

function save_then_continue(callback) {
    // If this is a new file which we haven't saved yet, we should
    //  prompt the user to save it first.
    if (STATE.current_file === "" && is_dirty()) {
        if (!confirm("You have unsaved changes. Do you want to discard" +
            " these changes and continue?")) {
            return;
        }
    }
    // Nothing to save
    if (!is_dirty()) {
        if (callback) {
            callback();
        }
        return;
    }
    // We can save the file
    const data = editor.getValue();
    webui.call('savefile', STATE.current_file, data).then(function (data) {
        STATE.last_saved_version_id = window.editor.getModel().getVersionId();
        if (callback) {
            callback();
        }
    });
}

function save_current() {
    if (!is_dirty()) {
        return;
    }
    if (STATE.current_file === "") {
        // new file we haven't saved yet
        webui.call('newfile').then(function (data) {
            if (!data) {
                return;
            }
            STATE.current_file = data;
            save_then_continue(function () {
                listfiles();
            });
        });
    } else {
        save_then_continue(function () {
            listfiles();
        });
    }
}

function compile() {
    save_then_continue(function () {
        webui.call('compile').then(function (data) {
            monaco.editor.setModelMarkers(window.editor.getModel(), "owner",
                []);
            if (data) {
                console.log("compile error\n", data);
                // parse the data string and get line number and column
                // number, then set the marker
                const lines = data.split("\n");
                const markers = [];
                for (let line of lines) {
                    if (line === "" || !line.startsWith("{\"file\":")) {
                        continue;
                    }
                    console.log("line", line);
                    const errorData = JSON.parse(line);
                    console.log("errorData", errorData);
                    if (!errorData.file || errorData.relative_file !==
                        STATE.current_file) {
                        continue;
                    }
                    markers.push({
                        startLineNumber: errorData.line,
                        startColumn: errorData.pos,
                        endLineNumber: errorData.line,
                        endColumn: errorData.pos + errorData.token.length,
                        message: errorData.message,
                        severity: monaco.MarkerSeverity.Error
                    });
                }
                console.log("markers", markers);
                monaco.editor.setModelMarkers(window.editor.getModel(), "owner",
                    markers);
            } else {
                console.log("no compile error");
            }
        });
    });
}

function explore() {
    webui.call('explore').then(function (data) {
        console.log("explore", data);
    });
}

function open_folder() {
    save_then_continue(function () {
        webui.call('openfolder').then(function (data) {
            if (data) {
                const path = data;
                webui.call('cd', path).then(function (data) {
                    console.log("cd", path, data);
                    if (data === "OK") {
                        listfiles();
                    }
                });
            }
        });
    });
}

function clickfile(name, type) {
    save_then_continue(function () {
        if (type === "folder") {
            webui.call('cd', name).then(function (data) {
                console.log("cd", name, data);
                if (data === "OK") {
                    listfiles();
                }
            });
        } else {
            webui.call('clickfile', name).then(function (data) {
                set_editor_value(data);
                STATE.current_file = name;
                STATE.last_saved_version_id =
                    window.editor.getModel().getVersionId();
                STATE.last_edit_version_id =
                    window.editor.getModel().getVersionId();
                setTimeout(function () {
                    listfiles();
                    set_editor_language(name);
                }, 0);
            });
        }
    });
}

function newfile() {
    save_then_continue(function () {
        webui.call('newfile').then(function (data) {
            listfiles();
        });
    });
}

function load_doc() {
    // TODO get rid of this and just use the doc json
    webui.call('getdocumentation').then(function (data) {
        try {
            doc_editor.getModel().setValue(data);
            console.log("doc loaded");
        } catch (e) {
            console.log("Error loading documentation");
            setTimeout(load_doc, STATE.default_timeout);
        }
    });
}

function load_doc_json() {
    webui.call('getdocjson').then(function (data) {
        try {
            setup_docs(JSON.parse(data), monaco);
            console.log("doc json loaded");
        } catch (e) {
            console.log("Error parsing doc json");
            setTimeout(load_doc_json, STATE.default_timeout);
        }
    });
}

function setup_zoom(editor_ob) {
    editor_ob.getDomNode().addEventListener('wheel', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.deltaY) {
            event.preventDefault();
            if (event.deltaY > 0) {
                editor_ob.trigger('keyboard', 'editor.action.fontZoomOut', {});
            } else {
                editor_ob.trigger('keyboard', 'editor.action.fontZoomIn', {});
            }
        }
    });
}


$(document).ready(function () {
    $('#container').layout({
        initClosed: false,
        east__initClosed: true
    });
    $(document).bind('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === "s")) {
            e.preventDefault();
            save_current();
            return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === "o")) {
            e.preventDefault();
            console.log("Ctrl + O pressed!");
            return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === "z")) {
            e.preventDefault();
            console.log("Ctrl + Z pressed!");
            return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === "n")) {
            e.preventDefault();
            console.log("Ctrl + N pressed!");
            return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === "p")) {
            e.preventDefault();
            console.log("Ctrl + P pressed!");
            return false;
        }
    });
    // Save on visibility change
    document.addEventListener("visibilitychange", save_current);
    const values1 = Object.values(EXTENSION_TO_LANGUAGE);
    const values2 = Object.values(FILENAME_TO_LANGUAGE);
    console.log("Languages", new Set([...values1, ...values2]));

    setTimeout(listfiles, STATE.default_timeout);
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
            value: "",
            language: 'yaksha',
            wordWrap: "on",
            automaticLayout: true,
            bracketPairColorization: {enabled: true},
        });
    window.doc_editor =
        monaco.editor.create(document.getElementById('doc-editor'), {
            theme: 'vs-yaksha-theme',
            value: "hello world",
            language: 'yaksha',
            automaticLayout: true,
            bracketPairColorization: {enabled: true},
            minimap: {enabled: false},
            wordWrap: "on",
            readOnly: true,
        });
    setTimeout(load_doc, STATE.default_timeout);
    setTimeout(load_doc_json, STATE.default_timeout);
    window.rerender_file_list = debouncer(update_file_list, 100);
    window.save_current_debounced = debouncer(save_current, 300);
    window.compile_debounced = debouncer(compile, 300);
    // When we change the model content, update the last edit version id!
    window.editor.onDidChangeModelContent(function (e) {
        STATE.last_edit_version_id = window.editor.getModel().getVersionId();
        if (is_dirty() && STATE.current_file !== "") {
            window.save_current_debounced();
            window.compile_debounced();
        }
        window.rerender_file_list();
    });
    setup_zoom(window.editor);
    setup_zoom(window.doc_editor);
    STATE.last_saved_version_id = window.editor.getModel().getVersionId();
    STATE.last_edit_version_id = window.editor.getModel().getVersionId();
    $('#loading-animation').remove();
});