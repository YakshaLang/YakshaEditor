function yaksha_tokenizer_rules() {
    return {
        // Set defaultToken to invalid to see what you do not tokenize yet
        defaultToken: 'invalid',

        keywords: ["as", "break", "class", "struct", "ccode", "continue", "def",
            "del", "defer", "else", "if", "elif", "import", "pass", "return",
            "while", "True", "False", "None", "runtimefeature", "for", "in",
        ],

        typeKeywords: ["int", "i8", "i16", "i32", "i64", "u8", "u16", "u32",
            "u64", "str", "float", "bool", "f32", "f64", "sr", "Array",
            "FixedArr", "SMEntry", "MEntry", "Tuple", "AnyPtr", "AnyPtrToConst",
            "Const"
        ],

        lispBuiltins: [
            "yk_import_ref",
            "ykt_xor_eq", "ykt_xor", "ykt_tilde", "ykt_sub_eq",
            "ykt_sub", "ykt_string", "ykt_square_bracket_open",
            "ykt_square_bracket_close", "ykt_shr_eq", "ykt_shr",
            "ykt_shl_eq", "ykt_shl", "ykt_semicolon", "ykt_power_eq",
            "ykt_power", "ykt_plus_eq", "ykt_plus",
            "ykt_paren_open", "ykt_paren_close", "ykt_or_eq", "ykt_or",
            "ykt_not_symbol", "ykt_not_eq", "ykt_newline"
            , "ykt_mul_eq", "ykt_mul", "ykt_mod_eq", "ykt_mod", "ykt_less_eq",
            "ykt_less", "ykt_keyword_while",
            "ykt_keyword_try", "ykt_keyword_true", "ykt_keyword_struct",
            "ykt_keyword_runtimefeature",
            "ykt_keyword_return", "ykt_keyword_pass", "ykt_keyword_or",
            "ykt_keyword_not", "ykt_keyword_none",
            "ykt_keyword_macros", "ykt_keyword_in", "ykt_keyword_import",
            "ykt_keyword_if", "ykt_keyword_from",
            "ykt_keyword_for", "ykt_keyword_false", "ykt_keyword_else",
            "ykt_keyword_elif", "ykt_keyword_del",
            "ykt_keyword_defer", "ykt_keyword_def", "ykt_keyword_continue",
            "ykt_keyword_class", "ykt_keyword_ccode",
            "ykt_keyword_break", "ykt_keyword_assert", "ykt_keyword_as",
            "ykt_keyword_and", "ykt_integer_decimal",
            "ykt_int_div_eq", "ykt_int_div", "ykt_indent", "ykt_great_eq",
            "ykt_great", "ykt_float", "ykt_eq_eq",
            "ykt_eq", "ykt_ellipsis", "ykt_double", "ykt_dot", "ykt_div_eq",
            "ykt_div", "ykt_dedent",
            "ykt_curly_bracket_open", "ykt_curly_bracket_close", "ykt_comma",
            "ykt_colon", "ykt_at", "ykt_arrow",
            "ykt_and_eq", "ykt_and", "yk_what", "yk_register", "yk_is_token",
            "yk_is_stmt", "yk_is_expr",
            "yk_get_type", "yk_create_token", "yk_assert_token", "while",
            "try_catch", "try", "true", "to_string",
            "to_int", "time", "this", "tail", "system_unlock_root_scope",
            "system_lock_root_scope",
            "system_enable_print", "system_enable_gc", "system_disable_print",
            "system_disable_gc", "sorted", "setq",
            "scope", "reversed", "repr", "remove", "reduce", "range", "random",
            "raise_error", "quote", "push",
            "println", "print", "pop", "parse", "parent", "os_shell", "os_exec",
            "or", "not", "noop", "nil", "newline"
            , "modulo", "metamacro", "map_values", "map_set", "map_remove",
            "map_keys", "map_has", "map_get", "map",
            "magic_dot", "list", "len", "lambda", "is_truthy", "is_string",
            "is_nil", "is_module", "is_metamacro",
            "is_list", "is_int", "is_callable", "io_write_file", "io_read_file",
            "insert", "input", "index", "if",
            "head", "ghost", "for", "filter", "false", "eval", "do", "defun",
            "define", "def", "cons", "cond",
            "bitwise_xor", "bitwise_right_shift", "bitwise_or", "bitwise_not",
            "bitwise_left_shift", "bitwise_and",
            "and", "access_module", "YK_TYPE_TOKEN", "YK_TOKEN_XOR_EQ",
            "YK_TOKEN_XOR", "YK_TOKEN_UINTEGER_OCT_8",
            "YK_TOKEN_UINTEGER_OCT_64", "YK_TOKEN_UINTEGER_OCT_16",
            "YK_TOKEN_UINTEGER_OCT", "YK_TOKEN_UINTEGER_HEX_8"
            , "YK_TOKEN_UINTEGER_HEX_64", "YK_TOKEN_UINTEGER_HEX_16",
            "YK_TOKEN_UINTEGER_HEX",
            "YK_TOKEN_UINTEGER_DECIMAL_8", "YK_TOKEN_UINTEGER_DECIMAL_64",
            "YK_TOKEN_UINTEGER_DECIMAL_16",
            "YK_TOKEN_UINTEGER_DECIMAL", "YK_TOKEN_UINTEGER_BIN_8",
            "YK_TOKEN_UINTEGER_BIN_64",
            "YK_TOKEN_UINTEGER_BIN_16", "YK_TOKEN_UINTEGER_BIN",
            "YK_TOKEN_TILDE", "YK_TOKEN_THREE_QUOTE_STRING",
            "YK_TOKEN_SUB_EQ", "YK_TOKEN_SUB", "YK_TOKEN_STRING",
            "YK_TOKEN_SQUARE_BRACKET_OPEN",
            "YK_TOKEN_SQUARE_BRACKET_CLOSE", "YK_TOKEN_SHR_EQ", "YK_TOKEN_SHR",
            "YK_TOKEN_SHL_EQ", "YK_TOKEN_SHL",
            "YK_TOKEN_SEMICOLON", "YK_TOKEN_POWER_EQ", "YK_TOKEN_POWER",
            "YK_TOKEN_PLUS_EQ", "YK_TOKEN_PLUS",
            "YK_TOKEN_PAREN_OPEN", "YK_TOKEN_PAREN_CLOSE", "YK_TOKEN_OR_EQ",
            "YK_TOKEN_OR", "YK_TOKEN_NOT_SYMBOL",
            "YK_TOKEN_NOT_EQ", "YK_TOKEN_NEW_LINE", "YK_TOKEN_NAME",
            "YK_TOKEN_MUL_EQ", "YK_TOKEN_MUL",
            "YK_TOKEN_MOD_EQ", "YK_TOKEN_MOD", "YK_TOKEN_LESS_EQ",
            "YK_TOKEN_LESS", "YK_TOKEN_KEYWORD_WHILE",
            "YK_TOKEN_KEYWORD_TRY", "YK_TOKEN_KEYWORD_TRUE",
            "YK_TOKEN_KEYWORD_STRUCT",
            "YK_TOKEN_KEYWORD_RUNTIMEFEATURE", "YK_TOKEN_KEYWORD_RETURN",
            "YK_TOKEN_KEYWORD_PASS",
            "YK_TOKEN_KEYWORD_OR", "YK_TOKEN_KEYWORD_NOT",
            "YK_TOKEN_KEYWORD_NONE", "YK_TOKEN_KEYWORD_MACROS",
            "YK_TOKEN_KEYWORD_IN", "YK_TOKEN_KEYWORD_IMPORT",
            "YK_TOKEN_KEYWORD_IF", "YK_TOKEN_KEYWORD_FROM",
            "YK_TOKEN_KEYWORD_FOR", "YK_TOKEN_KEYWORD_FALSE",
            "YK_TOKEN_KEYWORD_ELSE", "YK_TOKEN_KEYWORD_ELIF",
            "YK_TOKEN_KEYWORD_DEL", "YK_TOKEN_KEYWORD_DEFER",
            "YK_TOKEN_KEYWORD_DEF", "YK_TOKEN_KEYWORD_CONTINUE",
            "YK_TOKEN_KEYWORD_CLASS", "YK_TOKEN_KEYWORD_CCODE",
            "YK_TOKEN_KEYWORD_BREAK", "YK_TOKEN_KEYWORD_ASSERT",
            "YK_TOKEN_KEYWORD_AS", "YK_TOKEN_KEYWORD_AND",
            "YK_TOKEN_INT_DIV_EQ", "YK_TOKEN_INT_DIV",
            "YK_TOKEN_INTEGER_OCT_8", "YK_TOKEN_INTEGER_OCT_64",
            "YK_TOKEN_INTEGER_OCT_16", "YK_TOKEN_INTEGER_OCT",
            "YK_TOKEN_INTEGER_HEX_8", "YK_TOKEN_INTEGER_HEX_64",
            "YK_TOKEN_INTEGER_HEX_16", "YK_TOKEN_INTEGER_HEX",
            "YK_TOKEN_INTEGER_DECIMAL_8", "YK_TOKEN_INTEGER_DECIMAL_64",
            "YK_TOKEN_INTEGER_DECIMAL_16",
            "YK_TOKEN_INTEGER_DECIMAL", "YK_TOKEN_INTEGER_BIN_8",
            "YK_TOKEN_INTEGER_BIN_64", "YK_TOKEN_INTEGER_BIN_16"
            , "YK_TOKEN_INTEGER_BIN", "YK_TOKEN_GREAT_EQ", "YK_TOKEN_GREAT",
            "YK_TOKEN_FLOAT_NUMBER", "YK_TOKEN_EQ_EQ"
            , "YK_TOKEN_EQ", "YK_TOKEN_ELLIPSIS", "YK_TOKEN_DOUBLE_NUMBER",
            "YK_TOKEN_DOT", "YK_TOKEN_DIV_EQ",
            "YK_TOKEN_DIV", "YK_TOKEN_CURLY_BRACKET_OPEN",
            "YK_TOKEN_CURLY_BRACKET_CLOSE", "YK_TOKEN_COMMA",
            "YK_TOKEN_COLON", "YK_TOKEN_BA_INDENT", "YK_TOKEN_BA_DEDENT",
            "YK_TOKEN_AT", "YK_TOKEN_ARROW",
            "YK_TOKEN_AND_EQ", "YK_TOKEN_AND", "YK_PRELUDE_INCLUDED",
            "YK_OBJECT_TYPE", "YK_KEY_WHAT", ">=", ">",
            "==", "=", "<=", "<", "/", "-", "+", "*", "!="
        ],

        // TODO add all the builtins here
        builtins: [
            "print",
            "println",
            "len",
            "arrput",
            "arrpop",
            "arrnew",
            "arrsetcap",
            "arrsetlen",
            "array",
            "getref",
            "unref",
            "charat",
            "shnew",
            "shput",
            "shget",
            "shgeti",
            "hmnew",
            "hmput",
            "hmget",
            "hmgeti",
            "cast",
            "qsort",
            "iif",
            "foreach",
            "countif",
            "filter",
            "map",
            "binarydata",
            "inlinec",
            "make",
            "fixedarr",
        ],

        operators: ["->", "+", "-", "*", "/", "%",
            "<<", ">>", "&", "|", "^", "<", ">", "<=", ">=", "==", "!=", "@",
            ":", ".", ",", "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=",
            "&=", "|=", "^=", "!", ";", "~"],

        operatorWords: ["and", "or", "not"],

        symbols: /[=><!~?:&|+\-*\/\^%a-z]+/,

        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

        tokenizer: {
            root: [
                [/macros\s*!\s*[{]/, {
                    token: 'macros-block.start',
                    bracket: '@open',
                    next: '@mb'
                }],
                [/([a-zA-Z_][a-zA-Z0-9_]*[.])?[a-zA-Z_][a-zA-Z0-9_]*\s*!/,
                    'macros-invoke'],
                // matches things like -- Node, c.CStr
                [/([a-zA-Z_][a-zA-Z0-9_]*[.])?[A-Z]\w*/, 'type.identifier'],

                [/[a-z_]\w*/, {
                    cases: {
                        '@typeKeywords': 'type.identifier',
                        '@keywords': 'keyword',
                        '@builtins': 'builtins',
                        '@operatorWords': 'operator',
                        '@default': 'identifier'
                    }
                }],


                {include: '@whitespace'},

                [/[{}()\[\]]/, 'brackets'],
                [/@symbols/, {
                    cases: {
                        '@operators': 'operator',
                        '@default': ''
                    }
                }],

                // @ annotations.
                // As an example, we emit a debugging log message on these
                // tokens. Note: message are suppressed during the first load --
                // change some lines to see them.
                [/@\s*[a-zA-Z_]\w*/,
                    {token: 'annotation', log: 'annotation token: $0'}],

                // numbers
                [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                [/0[xX][0-9a-fA-F]+/, 'number.hex'],
                [/\d+/, 'number'],

                // delimiter: after number because of .\d floats
                [/[;,.]/, 'delimiter'],

                // strings
                [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
                [/"/,
                    {token: 'string.quote', bracket: '@open', next: '@string'}],

                // characters
                [/'[^\\']'/, 'string'],
                [/'/, 'string.invalid']
            ],

            string: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, {
                    token: 'string.quote', bracket: '@close', next: '@pop'
                }]
            ],

            mb: [
                [/"/,
                    {token: 'string.quote', bracket: '@open', next: '@string'}],
                [/[a-zA-Z_][a-zA-Z0-9_]*/, {
                    'cases': {
                        '@lispBuiltins': 'lisp-builtins',
                        '@default': 'identifier'
                    }
                }],
                [/[{]/, 'brackets', '@push'],
                [/[}]/, 'brackets', '@pop'],
                [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                [/0[xX][0-9a-fA-F]+/, 'number.hex'],
                [/\d+/, 'number'],
                [/#.*$/, 'comment'],
                [/[}]/, {
                    token: 'macros-block.end',
                    bracket: '@close',
                    next: '@pop'
                }],
            ],

            whitespace: [
                [/[ \t\r\n]+/, 'white'],
                [/#.*$/, 'comment'],
            ],
        },
    };
}

function yaksha_configuration() {
    return {
        comments: {
            lineComment: "#",
            blockComment: ["'''", "'''"]
        },
        brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"]
        ],
        autoClosingPairs: [
            {open: "{", close: "}"},
            {open: "[", close: "]"},
            {open: "(", close: ")"},
            {open: '"', close: '"', notIn: ["string"]},
            {open: "'", close: "'", notIn: ["string", "comment"]}
        ],
        surroundingPairs: [
            {open: "{", close: "}"},
            {open: "[", close: "]"},
            {open: "(", close: ")"},
            {open: '"', close: '"'},
            {open: "'", close: "'"}
        ],
        folding: {
            offSide: true,
            markers: {
                start: new RegExp("^\\s*#region\\b"),
                end: new RegExp("^\\s*#endregion\\b")
            }
        }
    };
}

function yaksha_init_code() {
    return "import libs.c\r\n\r\nmacros! {\r\n    (defun const_str (elem)\r\n        (list (yk_create_token YK_TOKEN_NAME \"inlinec\")\r\n            (ykt_paren_open)\r\n            (ykt_string (+ \"Const[Ptr[Const[\" yk_import_ref \".Char]]]\")) (ykt_comma)\r\n            (ykt_string (repr elem::value)) (ykt_paren_close)))\r\n    (defun cstr (elem)\r\n        (list (yk_create_token YK_TOKEN_NAME \"inlinec\")\r\n            (ykt_paren_open)\r\n            (ykt_string (+ yk_import_ref \".CStr\")) (ykt_comma)\r\n            (ykt_string (repr elem::value)) (ykt_paren_close)))\r\n    (defun character (elem)\r\n        (list (yk_create_token YK_TOKEN_NAME \"inlinec\")\r\n            (ykt_paren_open)\r\n            (ykt_string (+ \"Const[\" yk_import_ref \".Char]\")) (ykt_comma)\r\n            (ykt_string (+ \"'\" elem::value \"'\") (ykt_paren_close))))\r\n    (yk_register {dsl const_str const_str})\r\n    (yk_register {dsl cstr cstr})\r\n    # c.const_str!{\"Hi\"} --> create a const char * const --> inlinec(\"Const[Ptr[Const[Char]]]\", \"\\\"Hi\\\"\")\r\n    # c.cstr!{\"Hi\"} --> create a c.CStr\r\n    (yk_register {dsl char character})\r\n    # c.char!{\"a\"} --> create a char --> inlinec(\"Const[Char]\", \"'a'\")\r\n}\r\n\r\n\r\nNoBrowser: Const[c.Size] = ccode \"NoBrowser\"\r\nAnyBrowser: Const[c.Size] = ccode \"AnyBrowser\"\r\nChrome: Const[c.Size] = ccode \"Chrome\"\r\nFirefox: Const[c.Size] = ccode \"Firefox\"\r\nEdge: Const[c.Size] = ccode \"Edge\"\r\nSafari: Const[c.Size] = ccode \"Safari\"\r\nChromium: Const[c.Size] = ccode \"Chromium\"\r\nOpera: Const[c.Size] = ccode \"Opera\"\r\nBrave: Const[c.Size] = ccode \"Brave\"\r\nVivaldi: Const[c.Size] = ccode \"Vivaldi\"\r\nEpic: Const[c.Size] = ccode \"Epic\"\r\nYandex: Const[c.Size] = ccode \"Yandex\"\r\nChromiumBased: Const[c.Size] = ccode \"ChromiumBased\"\r\n\r\nNoRuntime: Const[c.Size] = ccode \"NoRunTime\"\r\nDeno: Const[c.Size] = ccode \"Deno\"\r\nNodeJS: Const[c.Size] = ccode \"NodeJS\"\r\n\r\nWEBUI_EVENT_DISCONNECTED: Const[c.Size] = ccode \"WEBUI_EVENT_DISCONNECTED\"\r\nWEBUI_EVENT_CONNECTED: Const[c.Size] = ccode \"WEBUI_EVENT_CONNECTED\"\r\nWEBUI_EVENT_MOUSE_CLICK: Const[c.Size] = ccode \"WEBUI_EVENT_MOUSE_CLICK\"\r\nWEBUI_EVENT_NAVIGATION: Const[c.Size] = ccode \"WEBUI_EVENT_NAVIGATION\"\r\nWEBUI_EVENT_CALLBACK: Const[c.Size] = ccode \"WEBUI_EVENT_CALLBACK\"\r\n\r\n@nativedefine(\"webui_event_t*\")\r\nclass Event:\r\n    window: c.Size\r\n    event_type: c.Size\r\n    element: c.CStr\r\n    event_number: c.Size\r\n    bind_id: c.Size\r\n\r\n# WEBUI_EXPORT size_t webui_new_window(void);\r\n@nativedefine(\"webui_new_window\")\r\ndef new_window() -> c.Size:\r\n    pass\r\n\r\n# WEBUI_EXPORT size_t webui_new_window_id(size_t window_number);\r\n@nativedefine(\"webui_new_window_id\")\r\ndef new_window_id(window_number: c.Size) -> c.Size:\r\n    pass\r\n\r\n# WEBUI_EXPORT size_t webui_get_new_window_id(void);\r\n@nativedefine(\"webui_get_new_window_id\")\r\ndef get_new_window_id() -> c.Size:\r\n    pass\r\n\r\n\r\nclass BObject:\r\n    args: Array[str]\r\n    c_file: str\r\n    object_file_path: str\r\n    always_build: bool\r\n    print_info: bool\r\n    # For this object we only keep a reference to str array, everything else can be deleted (except bool)\r\n\r\ndef prepare_code(c: carp.Config, code: str) -> str:\r\n    # Prepare code for compilation based on configuration\r\n    # Injects includes, defines, etc\r\n    # Then return final code\r\n    buf: sbuf.StringBuffer = sbuf.new()\r\n    defer sbuf.del_buf(buf)\r\n    # --\r\n    length: int = 0\r\n    x: int = 0\r\n    # write #runtime_defines\r\n    length = len(c.c_code.runtime_feature_defines)\r\n    x = 0\r\n    while x < length:\r\n        sbuf.append(buf, \"#define \" + c.c_code.runtime_feature_defines[x] + \"\\n\")\r\n        x = x + 1\r\n    # write #defines\r\n    length = len(c.c_code.defines)\r\n    x = 0\r\n    while x < length:\r\n        sbuf.append(buf, \"#define \" + c.c_code.defines[x] + \"\\n\")\r\n        x = x + 1\r\n    # write #include <>\r\n    length = len(c.c_code.system_includes)\r\n    x = 0\r\n    while x < length:\r\n        sbuf.append(buf, \"#include <\" + c.c_code.system_includes[x] + \">\\n\")\r\n        x = x + 1\r\n    # Add raylib.h & friends\r\n    if c.compilation.raylib:\r\n        sbuf.append(buf, \"#include \\\"raylib.h\\\"\\n\")\r\n        sbuf.append(buf, \"#include \\\"raygui.h\\\"\\n\")\r\n        sbuf.append(buf, \"#include \\\"raymath.h\\\"\\n\")\r\n        sbuf.append(buf, \"#include \\\"rlgl.h\\\"\\n\")\r\n        sbuf.append(buf, \"#include \\\"rayextras.h\\\"\\n\")\r\n    # write runtime feature #include \"\"\r\n    length = len(c.c_code.runtime_feature_includes)\r\n    x = 0\r\n    while x < length:\r\n        sbuf.append(buf, \"#include \\\"\" + c.c_code.runtime_feature_includes[x] + \"\\\"\\n\")\r\n        x = x + 1\r\n    # write #include \"\"\r\n    length = len(c.c_code.includes)\r\n    x = 0\r\n    while x < length:\r\n        sbuf.append(buf, \"#include \\\"\" + c.c_code.includes[x] + \"\\\"\\n\")\r\n        x = x + 1\r\n    # code itself\r\n    sbuf.append(buf, code)\r\n    sbuf.append(buf, \"\\n\")\r\n    # to string\r\n    result: str = sbuf.to_str(buf)\r\n    return result\r\n\r\ndef is_target_macos(target_to_check: str) -> bool:\r\n    # Check if given target is macos, if target == native, check if we are running macos\r\n    native: bool = len(target_to_check) == 0\r\n    if native:\r\n        return os.is_macos()\r\n    return strings.contains(target_to_check, \"macos\")\r\n\r\ndef is_target_windows(target_to_check: str) -> bool:\r\n    # Check if given target is windows, if target == native, check if we are running windows\r\n    native: bool = len(target_to_check) == 0\r\n    if native:\r\n        return os.is_windows()\r\n    return strings.contains(target_to_check, \"windows\")\r\n\r\ndef produce_obj_function(arg: AnyPtr) -> None:\r\n    # Produce a single object from given build_object\r\n    data: BObject = cast(\"BObject\", arg)\r\n    my_args: Array[str] = sarr.dup(data.args)\r\n    # Copy the arguments so we can add -c and -o of our own\r\n    defer sarr.del_str_array(my_args)\r\n\r\n    object_file: str = path.remove_extension(path.basename(data.c_file))\r\n\r\n    if data.print_info:\r\n        console.cyan(\"runtime::\")\r\n        console.yellow(object_file)\r\n        console.cyan(\" := \")\r\n\r\n    if not data.always_build and path.readable(data.object_file_path):\r\n        if data.print_info:\r\n            console.green(\"ok.\\n\")\r\n        return\r\n\r\n    arrput(my_args, \"-c\")\r\n    arrput(my_args, data.c_file)\r\n    arrput(my_args, \"-o\")\r\n    arrput(my_args, data.object_file_path)\r\n\r\n    pr: os.ProcessResult = os.run(my_args)\r\n\r\n    if data.print_info:\r\n        if pr.ok:\r\n            console.green(\"ok.\\n\")\r\n        else:\r\n            console.red(\"failed.\\n\")\r\n            console.cyan(\"--c compiler output---\\n\")\r\n            console.red(\"command := \")\r\n            console.cyan(sarr.join(my_args, \" \") + \"\\n\")\r\n            console.red(pr.output)\r\n            console.cyan(\"--end c compiler output---\\n\")\r\n\r\n    os.del_process_result(pr)\r\n";
}

function yaksha_vs_extend_colors() {
    return [
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
}