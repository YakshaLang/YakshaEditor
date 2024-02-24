const NEVER_CHANGED_VERSION_INDICATOR = "---";
let STATE = {
    file_list: [],
    listfiles_init: false,
    listfiles_err: 0,
    default_retries: 3,
    default_timeout: 300,
    current_file: "",
    current_file_type: "",
    current_file_dirty: false,
    last_saved_version_id: NEVER_CHANGED_VERSION_INDICATOR,
    last_edit_version_id: NEVER_CHANGED_VERSION_INDICATOR,
};

function is_dirty() {
    return STATE.last_saved_version_id !== STATE.last_edit_version_id;
}

function update_file_list() {
    const data = STATE.file_list;
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
    const values1 = Object.values(EXTENSION_TO_LANGUAGE);
    const values2 = Object.values(FILENAME_TO_LANGUAGE);
    console.log("Languages", new Set([...values1, ...values2]));

    const combinedValues = new Set([...values1, ...values2]);
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
            automaticLayout: true,
            bracketPairColorization: {enabled: true},
        });
    window.rerender_file_list = debouncer(update_file_list, 100);
    // When we change the model content, update the last edit version id!
    window.editor.onDidChangeModelContent(function (e) {
        STATE.last_edit_version_id = window.editor.getModel().getVersionId();
        window.rerender_file_list();
    });
    STATE.last_saved_version_id = window.editor.getModel().getVersionId();
    STATE.last_edit_version_id = window.editor.getModel().getVersionId();
    $('#loading-animation').remove();
});