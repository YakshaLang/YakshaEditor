// Load layout engine
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
    require(['vs/editor/editor.main'], function () {
        monaco.languages.register({
            id: 'yaksha'
        });
        monaco.languages.setMonarchTokensProvider('yaksha', yaksha_mo());
        monaco.languages.setLanguageConfiguration('yaksha', yaksha_co());

        // Define a new theme that contains only rules that match this language
        monaco.editor.defineTheme('yaksha-theme', {
            colors: {},
            base: 'vs',
            inherit: true,
            rules: [
                {
                    token: 'macros-block',
                    foreground: '987303',
                    fontStyle: 'bold underline'
                },
                {
                    token: 'lisp-builtins',
                    foreground: 'e83cac',
                    fontStyle: 'bold'
                },
                {
                    token: 'builtins',
                    foreground: 'e83cac',
                    fontStyle: 'bold'
                },
                {
                    token: 'macros-invoke',
                    foreground: 'c39400',
                    fontStyle: 'underline'
                },
                {
                    token: 'operator',
                    foreground: 'ff6600',
                    fontStyle: 'bold'
                },
                {
                    token: 'brackets',
                    foreground: '0058db',
                    fontStyle: 'bold'
                },
                {
                    token: 'string.escape',
                    foreground: '008591',
                },
                {
                    token: 'string.invalid',
                    foreground: 'ff0000',
                    fontStyle: 'bold'
                }
            ]
        });

        window.editor =
            monaco.editor.create(document.getElementById('editor'), {
                theme: 'yaksha-theme',
                value: yaksha_init_code(),
                language: 'yaksha',
                automaticLayout: true,
                bracketPairColorization: {enabled: true},

            });
        $('#loading-animation').remove();
    });
});