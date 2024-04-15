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
    show_hidden: false,
    library_docs_original: {},
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
        if (!STATE.show_hidden && f.name !== "..") {
            if (f.name.startsWith(".") || f.name.startsWith("cmake") ||
                f.name === "build" ||
                f.name === "CMakeLists.txt" || f.name === "Makefile" ||
                f.name === "Makefile.am" || f.name === "Makefile.in" ||
                f.name === "configure" || f.name === "configure.ac" ||
                f.name === "config.h" || f.name === "config.h.in" ||
                f.name === "config.log" || f.name === "config.status" ||
                f.name.endsWith(".o") || f.name.endsWith(".a") ||
                f.name.endsWith(".so") || f.name.endsWith(".dll") ||
                f.name.endsWith(".dylib") || f.name.endsWith(".exe") ||
                f.name.endsWith(".out") || f.name.endsWith(".bin") ||
                f.name.endsWith(".tmp") || f.name.endsWith(".log") ||
                f.name.endsWith(".swp") || f.name.endsWith("~")) {
                continue;
            }
        }
        const fType = (f.type === "d" ? "folder" : "file");
        const htmlClass = fType
            + (f.name === STATE.current_file ? " current-file" : "")
            + (is_dirty() && f.name === STATE.current_file ? " dirty-file" : "")
            + (f.name === ".." ? " red-folder" : "");
        const icon = fType === "folder" ? FOLDER :
            (f.name.endsWith(".yaka") ? FILE_CODE : FILE);
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

function toggle_hidden() {
    STATE.show_hidden = !STATE.show_hidden;
    rerender_file_list();
}

function compile() {
    save_then_continue(function () {
        webui.call('compile').then(function (data) {
            monaco.editor.removeAllMarkers("owner");
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

function load_doc_json() {
    try {
        webui.call('getdocjson').then(function (data) {
            try {
                const parsed_docs = JSON.parse(data);
                STATE.library_docs_original = parsed_docs;
                setup_docs(parsed_docs, monaco);
                $("#doc-editor").html(build_tree_html(parsed_docs));
                console.log("doc json loaded");
            } catch (e) {
                console.error("Error parsing doc json", e);
                setTimeout(load_doc_json, STATE.default_timeout);
            }
        }).catch(function (error) {
            console.error("Error loading doc json", error);
            setTimeout(load_doc_json, STATE.default_timeout);
        });
    } catch (e) {
        console.error("Error loading doc json", e);
        setTimeout(load_doc_json, STATE.default_timeout);
    }
}

function refreshdocs() {
    webui.call('getlocaljson').then(function (data) {
        const u = JSON.parse(data);
        console.log("local docs", u);
        const parsed_local_docs = cleanup_docs_output(u);
        const original_docs = STATE.library_docs_original;
        const original_keys = Object.keys(original_docs).sort(function (a, b) {
            a.localeCompare(b)
        });
        const local_keys = Object.keys(parsed_local_docs).sort(function (a, b) {
            a.localeCompare(b)
        });
        const merged_keys = [...local_keys, ...original_keys];
        const merged_docs = {};
        for (let key of local_keys) {
            merged_docs[key] = parsed_local_docs[key];
        }
        for (let key of original_keys) {
            merged_docs[key] = original_docs[key];
        }
        $("#doc-editor").html(build_tree_html(merged_docs, merged_keys));
        setup_local_docs(parsed_local_docs, monaco);
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
        } else {
            window.rerender_file_list();
        }
    });
    setup_zoom(window.editor);
    STATE.last_saved_version_id = window.editor.getModel().getVersionId();
    STATE.last_edit_version_id = window.editor.getModel().getVersionId();
    $('#loading-animation').remove();
});