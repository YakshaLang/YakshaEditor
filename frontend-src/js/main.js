function listfiles() {
    webui.call('listfiles').then(function (data) {
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
                // + (f.path === path ? " current-file" : "")
                + (f.name === ".." ? " red-folder" : "");
            const icon = fType === "folder" ? FOLDER : FILE;
            html += "<div onclick='clickFile(" + quoteJsThenEscapeHtml(f.name)
                + "," + quoteJsThenEscapeHtml(fType) + ")' class='" +
                htmlClass + "'>"
                + icon + " <span>" + escapeHtml(f.name) + "</span></div>"
        }
        $("#filebrowser").html(html);
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
            console.log("Ctrl + Z pressed!");
            return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.code === e.KeyN)) {
            e.preventDefault();
            console.log("Ctrl + N pressed!");
            return false;
        }
    });
    // Set up the editor
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
        rules: yaksha_vs_extend_colors()
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
    setTimeout(listfiles, 300);
});