// Load layout engine
$(document).ready(function () {
    $('#container').layout();
    // Set up the editor
    require(['vs/editor/editor.main'], function () {
        monaco.languages.register({
            id: 'yaksha'
        });
        monaco.languages.setMonarchTokensProvider('yaksha', {
            tokenizer: {
                root: [
                    [/\[error.*/, 'custom-error'],
                    [/\[notice.*/, 'custom-notice'],
                    [/\[info.*/, 'custom-info'],
                    [/\[[a-zA-Z 0-9:]+\]/, 'custom-date']
                ]
            }
        });

        // Define a new theme that constains only rules that match this language
        monaco.editor.defineTheme('yaksha-theme', {
            colors: {},
            base: 'vs',
            inherit: false,
            rules: [
                {token: 'custom-info', foreground: '808080'},
                {token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold'},
                {token: 'custom-notice', foreground: 'FFA500'},
                {token: 'custom-date', foreground: '008800'}
            ]
        });

        window.editor = monaco.editor.create(document.getElementById('editor'), {
            theme: 'yaksha-theme',
            value: "getCode()",
            language: 'yaksha',
            automaticLayout: true,
        });
        $('#loading-animation').remove();
    });
});