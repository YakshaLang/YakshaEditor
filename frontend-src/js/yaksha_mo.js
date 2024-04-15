const YAKSHA_RULES = {
    // Set defaultToken to invalid to see what you do not tokenize yet
    defaultToken: 'invalid',

    keywords: ["as", "break", "class", "struct", "continue", "def",
        "del", "defer", "else", "if", "elif", "import", "pass", "return",
        "while", "True", "False", "None", "runtimefeature", "for", "in",
        "directive"
    ],

    typeKeywords: ["int", "i8", "i16", "i32", "i64", "u8", "u16", "u32",
        "u64", "str", "float", "bool", "f32", "f64", "sr", "Array",
        "FixedArr", "SMEntry", "MEntry", "Tuple", "AnyPtr", "AnyPtrToConst",
        "Const"
    ],

    lispBuiltins: [
        "while",
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
        "and", "access_module", "explode_string", ">=", ">",
        "==", "=", "<=", "<", "/", "-", "+", "*", "!="
    ],

    lispYakshaSpecificBuiltins: [
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
        "yk_get_type", "yk_create_token", "yk_assert_token",
    ],

    lispYakshaTokenTypes: [
        "YK_TYPE_TOKEN",
        "YK_TOKEN_XOR_EQ",
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
        "YK_OBJECT_TYPE", "YK_KEY_WHAT",
    ],

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

    cKeywords: [
        "size_t",
        "ptrdiff_t",
        "intptr_t",
        "uintptr_t",
        "int8_t",
        "int16_t",
        "int32_t",
        "int64_t",
        "uint8_t",
        "uint16_t",
        "uint32_t",
        "uint64_t",
        "intmax_t",
        "uintmax_t",
        "abstract",
        "amp",
        "array",
        "auto",
        "bool",
        "break",
        "case",
        "catch",
        "char",
        "class",
        "const",
        "constexpr",
        "const_cast",
        "continue",
        "cpu",
        "decltype",
        "default",
        "delegate",
        "delete",
        "do",
        "double",
        "dynamic_cast",
        "each",
        "else",
        "enum",
        "event",
        "explicit",
        "export",
        "extern",
        "false",
        "final",
        "finally",
        "float",
        "for",
        "friend",
        "gcnew",
        "generic",
        "goto",
        "if",
        "in",
        "initonly",
        "inline",
        "int",
        "interface",
        "interior_ptr",
        "internal",
        "literal",
        "long",
        "mutable",
        "namespace",
        "new",
        "noexcept",
        "nullptr",
        "__nullptr",
        "operator",
        "override",
        "partial",
        "pascal",
        "pin_ptr",
        "private",
        "property",
        "protected",
        "public",
        "ref",
        "register",
        "reinterpret_cast",
        "restrict",
        "return",
        "safe_cast",
        "sealed",
        "short",
        "signed",
        "sizeof",
        "static",
        "static_assert",
        "static_cast",
        "struct",
        "switch",
        "template",
        "this",
        "thread_local",
        "throw",
        "tile_static",
        "true",
        "try",
        "typedef",
        "typeid",
        "typename",
        "union",
        "unsigned",
        "using",
        "virtual",
        "void",
        "volatile",
        "wchar_t",
        "where",
        "while",
        "_asm",
        // reserved word with one underscores
        "_based",
        "_cdecl",
        "_declspec",
        "_fastcall",
        "_if_exists",
        "_if_not_exists",
        "_inline",
        "_multiple_inheritance",
        "_pascal",
        "_single_inheritance",
        "_stdcall",
        "_virtual_inheritance",
        "_w64",
        "__abstract",
        // reserved word with two underscores
        "__alignof",
        "__asm",
        "__assume",
        "__based",
        "__box",
        "__builtin_alignof",
        "__cdecl",
        "__clrcall",
        "__declspec",
        "__delegate",
        "__event",
        "__except",
        "__fastcall",
        "__finally",
        "__forceinline",
        "__gc",
        "__hook",
        "__identifier",
        "__if_exists",
        "__if_not_exists",
        "__inline",
        "__int128",
        "__int16",
        "__int32",
        "__int64",
        "__int8",
        "__interface",
        "__leave",
        "__m128",
        "__m128d",
        "__m128i",
        "__m256",
        "__m256d",
        "__m256i",
        "__m512",
        "__m512d",
        "__m512i",
        "__m64",
        "__multiple_inheritance",
        "__newslot",
        "__nogc",
        "__noop",
        "__nounwind",
        "__novtordisp",
        "__pascal",
        "__pin",
        "__pragma",
        "__property",
        "__ptr32",
        "__ptr64",
        "__raise",
        "__restrict",
        "__resume",
        "__sealed",
        "__single_inheritance",
        "__stdcall",
        "__super",
        "__thiscall",
        "__try",
        "__try_cast",
        "__typeof",
        "__unaligned",
        "__unhook",
        "__uuidof",
        "__value",
        "__virtual_inheritance",
        "__w64",
        "__wchar_t"
    ],
    cOperators: [
        "=",
        ">",
        "<",
        "!",
        "~",
        "?",
        ":",
        "==",
        "<=",
        ">=",
        "!=",
        "&&",
        "||",
        "++",
        "--",
        "+",
        "-",
        "*",
        "/",
        "&",
        "|",
        "^",
        "%",
        "<<",
        ">>",
        "+=",
        "-=",
        "*=",
        "/=",
        "&=",
        "|=",
        "^=",
        "%=",
        "<<=",
        ">>="
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
            [/macros!\s*[{]/, {
                token: 'macros-block.start',
                bracket: '@open',
                next: '@mb'
            }],
            [/([a-zA-Z_][a-zA-Z0-9_]*[.])?[a-zA-Z_][a-zA-Z0-9_]*!/,
                'macros-invoke'],
            // matches things like -- Node, c.CStr
            [/([a-zA-Z_][a-zA-Z0-9_]*[.])?[A-Z]\w*/, 'type.identifier'],

            [/ccode\s+"""/, {
                token: 'ccode-block.start',
                bracket: '@open',
                next: '@ccode'
            }],

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
                {token: 'annotation'}],

            // numbers
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/\d+/, 'number'],

            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],

            // strings
            [/"""/, {
                token: 'string.multi',
                bracket: '@open',
                next: '@stringmulti'
            }],
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

        stringmulti: [
            [/"""/, {
                token: 'string.multi', bracket: '@close', next: '@pop'
            }],
            [/[^\\"]+/, 'string.multi'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
        ],

        mb: [
            [/"""/, {
                token: 'string.multi',
                bracket: '@open',
                next: '@stringmulti'
            }],
            [/"/,
                {token: 'string.quote', bracket: '@open', next: '@string'}],
            [/[a-zA-Z_][a-zA-Z0-9_]*/, {
                'cases': {
                    '@lispBuiltins': 'lisp-builtins',
                    '@lispYakshaSpecificBuiltins': 'lisp-builtins-yaksha',
                    '@lispYakshaTokenTypes': 'lisp-builtins-yaksha-tokens',
                    '@default': 'identifier'
                }
            }],
            [/[{]/, 'brackets', '@push'],
            [/[}]/, 'brackets', '@pop'],
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/\d+/, 'number'],
            [/#.*$/, 'comment'],
            [/[ \t\r\n]+/, 'white'],
            [/[}]/, {
                token: 'macros-block.end',
                bracket: '@close',
                next: '@pop'
            }],
        ],

        ccode: [
            [/"""/, {
                token: 'ccode-block.end',
                bracket: '@close',
                next: '@pop'
            }],
            [/[a-zA-Z_][a-zA-Z0-9_]*/, {
                'cases': {
                    '@cKeywords': 'c-keywords',
                    '@default': 'identifier'
                }
            }],
            [/^\s*#[a-zA-Z_][a-zA-Z0-9_]*/, 'c-preprocessor'],
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/\d+/, 'number'],
            [/\/\/.*$/, 'comment'],
            [/[{}()\[\]]/, 'brackets'],
            [/@symbols/, {
                cases: {
                    '@operators': 'operator',
                    '@default': ''
                }
            }],
            [/[ \t\r\n]+/, 'white'],
        ],

        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/#.*$/, 'comment'],
        ],
    },
};

function yaksha_tokenizer_rules() {
    return YAKSHA_RULES;
}

function yaksha_configuration() {
    return {
        comments: {
            lineComment: "#",
            blockComment: ['"""', '"""']
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

function yaksha_vs_extend_colors() {
    return [
        {
            token: 'macros-block',
            foreground: '987303',
            fontStyle: 'bold underline'
        },
        {
            token: 'ccode-block',
            foreground: '00ec0f',
            fontStyle: 'italic',
        },
        {
            token: 'c-keywords',
            foreground: 'c39400',
            fontStyle: 'bold'
        },
        {
            token: 'c-preprocessor',
            foreground: '4591ff',
            fontStyle: 'bold'
        },
        {
            token: 'lisp-builtins',
            foreground: '4591ff',
            fontStyle: 'bold'
        },
        {
            token: 'builtins',
            foreground: '4591ff',
            fontStyle: 'bold'
        },
        {
            token: 'lisp-builtins-yaksha',
            foreground: 'e83cac',
        },
        {
            token: 'lisp-builtins-yaksha-tokens',
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

const YAKSHA_STATE = {
    docs: null,
    editor: null,
    monaco: null,
    text: "",
    imports: [],
    defs: [],
    local_docs: null,
};

function get_imports() {
    const current_file = YAKSHA_STATE.text;
    const matched = [...current_file.matchAll(
        /^import\s+([a-zA-Z_][a-zA-Z0-9_]*.*)$/gm)];
    const imports = [];
    for (const match of matched) {
        imports.push(match[1]);
    }
    return imports;
}

function get_defs() {
    const current_file = YAKSHA_STATE.text;
    const matched = [...current_file.matchAll(
        /def\s+([a-zA-Z_][a-zA-Z0-9_]*)(.*)$/gm)];
    const defs = [];
    for (const match of matched) {
        defs.push({"name": match[1], "types": match[2]});
    }
    return defs;
}

function generate_word_completes() {
    const completes = [];
    const defs = YAKSHA_STATE.defs;
    for (const def of defs) {
        completes.push({
            label: {
                label: def.name,
                description: '',
                detail: def.types

            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: def.name + def.types,
            insertText: def.name,
            range: null,
        });
    }
    return completes;
}

function get_word_after_last_dot(string_value) {
    const parts = string_value.split(".");
    return parts[parts.length - 1];
}

function datatype_to_string(datatype) {
    const type = datatype.type;
    const arguments = datatype.arguments;
    let args_str = "";
    args_str += type;
    if (!!arguments && arguments.length > 0) {
        args_str += "[";
        for (let i = 0; i < arguments.length; i++) {
            args_str += datatype_to_string(arguments[i]);
            if (i < arguments.length - 1) {
                args_str += ", ";
            }
        }
        args_str += "]";
    }
    return args_str;
}

function args_to_string(args) {
    let args_str = "";
    for (let i = 0; i < args.length; i++) {
        args_str += args[i].name + ": " + datatype_to_string(args[i].datatype);
        if (i < args.length - 1) {
            args_str += ", ";
        }
    }
    return args_str;
}

function get_library_completes(range, import_name, use_local_docs = false) {
    let library_completes = [];
    let doc;
    if (use_local_docs) {
        doc = YAKSHA_STATE.local_docs[import_name];
    } else {
        doc = YAKSHA_STATE.docs[import_name];
    }
    if (doc) {
        const functions = doc.functions;
        for (const func of functions) {
            const func_name = func.name;
            const func_args = func.parameters;
            const func_returns = func.return_type;
            const func_description = func.comment;
            library_completes.push({
                label: {
                    label: func_name,
                    description: func_description,
                    detail: "(" + args_to_string(func_args) + ") -> " +
                        datatype_to_string(func_returns)
                },
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: func_description,
                insertText: func_name,
                range: range,
            });
        }
        const classes = doc.classes;
        for (const class_ of classes) {
            const class_name = class_.name;
            const class_description = class_.comment;
            library_completes.push({
                label: {
                    label: class_name,
                    description: class_description
                },
                kind: monaco.languages.CompletionItemKind.Class,
                documentation: class_description,
                insertText: class_name,
                range: range
            });
        }
        const global_constants = doc.global_consts;
        for (const constant of global_constants) {
            const constant_name = constant.name;
            const constant_description = constant.comment;
            library_completes.push({
                label: {
                    label: constant_name,
                    description: constant_description
                },
                kind: monaco.languages.CompletionItemKind.Constant,
                documentation: constant_description,
                insertText: constant_name,
                range: range
            });
        }
        const macros = doc.macros;
        for (const macro of macros) {
            const macro_name = macro.name;
            const macro_description = macro.comment;
            library_completes.push({
                label: {
                    label: macro_name,
                    description: macro_description
                },
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: macro_description,
                insertText: macro_name,
                range: range
            });
        }
    }
    return library_completes;
}

function generate_dot_completes(full_word, line, range) {
    const word_without_last_char = full_word.slice(0, -1);
    if (word_without_last_char === "") {
        return [];
    }
    const imports = YAKSHA_STATE.imports;
    for (const import_ of imports) {
        const tokens = import_.split(/\s+/);
        let name = "";
        let current_import = tokens[0];
        if (tokens.length === 1) {
            name = get_word_after_last_dot(tokens[0]);
        } else if (tokens.length === 3) {
            name = tokens[2];
        } else {
            continue;
        }
        if (name !== word_without_last_char) {
            continue;
        }
        if ((current_import.startsWith("libs") ||
                current_import.startsWith("w4") ||
                current_import.startsWith("raylib"))) {
            // get the lib docs for current import
            return get_library_completes(range, current_import);
        } else {
            const local_completes = get_library_completes(range, current_import,
                true);
            if (local_completes.length > 0) {
                return local_completes;
            }
        }
    }
    // TODO
    //   -- PART 4
    //   if it is from a local class?
    //   list members
    //   -- PART 5
    //   if it is from an imported library class
    //   list members
    //   -- PART 6
    //   if it is from a local imported class
    //   list members
    return [];
}

function get_statement_snippets(range) {
    return [
        {
            label: {
                label: 'print',
                description: 'print a primitive',
                detail: '(any_primitive) -> None'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Print a primitive.",
            insertText: 'print("${1:text}")',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        {
            label: {
                label: 'println', description: 'print a primitive and a' +
                    ' newline', detail: '(any_primitive) -> None'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Print a primitive and a newline.",
            insertText: 'println("${1:text}")',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // arrput(arr, value)
        {
            label: {
                label: 'arrput',
                description: 'append a value to an array',
                detail: '(arr: Array[T], value: T) -> None'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Append a value to an array.",
            insertText: 'arrput(${1:arr}, ${2:value})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // arrsetcap(arr, cap)
        {
            label: {
                label: 'arrsetcap',
                description: 'set the capacity of an array',
                detail: '(arr: Array[T], cap: int) -> None'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Set the capacity of an array.",
            insertText: 'arrsetcap(${1:arr}, ${2:cap})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // arrsetlen(arr, len)
        {
            label: {
                label: 'arrsetlen',
                description: 'set the length of an array',
                detail: '(arr: Array[T], len: int) -> None'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Set the length of an array.",
            insertText: 'arrsetlen(${1:arr}, ${2:len})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // shnew(arr)
        {
            label: {
                label: 'shnew', description: 'create a new string hash' +
                    ' map', detail: '(arr: Array[SMEntry[T]]) -> None'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Create a new string hash map.",
            insertText: 'shnew(${1:arr})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // shput(sh, key, value)
        {
            label: {
                label: 'shput', description: 'put a value in a string hash' +
                    ' map', detail: '(sh: Array[SMEntry[T]], key: str,' +
                    ' value: T) -> None'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Put a value in a string hash map.",
            insertText: 'shput(${1:sh}, ${2:key}, ${3:value})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // hmnew(arr)
        {
            label: {
                label: 'hmnew', description: 'create a new struct key' +
                    ' hash map', detail: '(arr: Array[MEntry[K,V]]) -> None'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Create a new struct key hash map.",
            insertText: 'hmnew(${1:arr})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // hmput(hm, key, value)
        {
            label: {
                label: 'hmput', description: 'put a value in a struct key' +
                    ' hash map', detail: '(hm: Array[MEntry[K,V]], key: K,' +
                    ' value: V) -> None'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Put a value in a struct key hash map.",
            insertText: 'hmput(${1:hm}, ${2:key}, ${3:value})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // qsort(arr, cmp)
        {
            label: {
                label: 'qsort',
                description: 'sort an array in place',
                detail: '(arr: Array[T], cmp: Function[In[Const' +
                    '[AnyPtrToConst],Const[AnyPtrToConst]],Out[int]]) -> bool'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Sort an array in place.",
            insertText: 'qsort(${1:arr}, ${2:cmp})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // for a in arr:
        {
            label: {
                label: 'for', description: 'iterate over an array using' +
                    ' for each loop', detail: ''
            },
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Iterate over an array.",
            insertText: 'for ${1:a} in ${2:arr}:',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // for(a: int = 0; a < 10; a++):
        {
            label: {label: 'for', description: 'c like for loop', detail: ''},
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "C like for loop.",
            insertText: 'for(${1:a}: int = 0; ${1:a} < ${2:10}; ${1:a}++):',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
    ];
}

function get_global_statement_snippets(range) {
    return [
        // @nativedefine("name")\ndef func() -> value: pass
        {
            label: {label: 'def', description: 'declare a native function'},
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Declare a native function.",
            insertText: '@nativedefine("${1:name}")\ndef ${2:func}() ->' +
                ' ${3:value}: pass',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // @nativemacro("name")\ndef func() -> value: pass
        {
            label: {label: 'macro', description: 'declare a native macro'},
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Declare a native macro.",
            insertText: '@nativemacro("${1:name}")\ndef ${2:func}() ->' +
                ' ${3:value}: pass',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // class Name:
        {
            label: {label: 'class', description: 'create a class'},
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Create a class.",
            insertText: 'class ${1:Name}:',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // struct Name:
        {
            label: {label: 'struct', description: 'create a struct'},
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Create a struct.",
            insertText: 'struct ${1:Name}:',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // @nativedefine("name")\nclass Name:
        {
            label: {label: 'class', description: 'declare a native class'},
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Declare a native class.",
            insertText: '@nativedefine("${1:name}")\nclass ${2:Name}:',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
    ];
}

function get_builtins_snippets(range) {
    return [
        {
            label: {
                label: 'cast',
                detail: '("T", value) -> T',
                description: 'print a primitive'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Unsafely cast a value to a type.",
            insertText: 'cast("${1:T}", ${2:value})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // len
        {
            label: {
                label: 'len',
                detail: '(item) -> int',
                description: 'get the length of a array/string'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Get the length of a collection.",
            insertText: 'len(${1:collection})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        //arrpop(arr)
        {
            label: {
                label: 'arrpop',
                detail: '(arr: Array[T]) -> T',
                description: 'remove and return the last value of an array'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Remove and return the last value of an array.",
            insertText: 'arrpop(${1:arr})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // arrnew("T", size)
        {
            label: 'arrnew',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Create a new array.",
            detail: "create a new array",
            insertText: 'arrnew("${1:T}", ${2:size})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // array("T", element1, element2, ...)
        {
            label: {
                label: 'array', detail: '("T", element1, element2, ...)' +
                    ' -> Array[T]', description: 'create an array with given' +
                    ' elements'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Create an array.",
            insertText: 'array("${1:T}", ${2:e1}, ${3:e2}, ${4:e3}, ${5:e4})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // getref(value)
        {
            label: {
                label: 'getref',
                detail: '(value: T) -> Ptr[T]',
                description: 'get a reference to a value'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Get a reference to a value.",
            insertText: 'getref(${1:value})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // unref(value)
        {
            label: {
                label: 'unref',
                detail: '(value: Ptr[T]) -> T',
                description: 'dereference a Ptr[T] to T'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Get the value of a reference.",
            insertText: 'unref(${1:value})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // charat(str, index)
        {
            label: {
                label: 'charat',
                detail: '(str: string, index: int) -> int',
                description: 'get the character at an index in a string'

            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Get the character at an index in a string.",
            insertText: 'charat(${1:str}, ${2:index})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // shget(sh, key)
        {
            label: {
                label: 'shget',
                detail: '(sh: Array[SMEntry[T]], key: str) -> T',
                description: 'get a value from a string hash map'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Get a value from a string hash map.",
            insertText: 'shget(${1:sh}, ${2:key})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // shgeti(sh, key)
        {
            label: {
                label: 'shgeti',
                detail: '(sh: Array[SMEntry[T]], key: str) -> int',
                description: 'get a element index from a string hash map'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Get a element index from a string hash map.",
            insertText: 'shgeti(${1:sh}, ${2:key})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // hmget(hm, key)
        {
            label: {
                label: 'hmget',
                detail: '(hm: Array[MEntry[K,V]], key: K) -> V',
                description: 'get a value from a struct key hash map'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Get a value from a struct key hash map.",
            insertText: 'hmget(${1:hm}, ${2:key})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // hmgeti(hm, key)
        {
            label: {
                label: 'hmgeti',
                detail: '(hm: Array[MEntry[K,V]], key: K) -> int',
                description: 'get a element index from a struct key hash map'

            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Get a element index from a struct key hash map.",
            insertText: 'hmgeti(${1:hm}, ${2:key})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // iif(cond, true_value, false_value)
        {
            label: {
                label: 'iif',
                detail: '(cond: bool, true_value: T, false_value: T) -> T',
                description: 'conditional expression'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Conditional expression.",
            insertText: 'iif(${1:cond}, ${2:true_value}, ${3:false_value})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // foreach(arr, func, additional_argument)
        {
            label: {
                label: 'foreach',
                detail: '(arr: Array[T], func: Function[In[T,V],Out[bool],V)' +
                    ' -> bool',
                description: 'iterate over an array'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Iterate over an array.",
            detail: "iterate over an array",
            insertText: 'foreach(${1:arr}, ${2:func}, ${3:None})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // countif(arr, func, additional_argument
        {
            label: {
                label: 'countif',
                detail: '(arr: Array[T], func: Function[In[T,V],Out[bool],V)' +
                    ' -> int',
                description: 'count elements in an array'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Count elements in an array.",
            insertText: 'countif(${1:arr}, ${2:func}, ${3:None})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // filter(arr, func, additional_argument)
        {
            label: {
                label: 'filter',
                detail: '(arr: Array[T], func: Function[In[T,V],Out[bool],V)' +
                    ' -> Array[T]',
                description: 'filter elements in an array'

            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Filter elements in an array.",
            insertText: 'filter(${1:arr}, ${2:func}, ${3:None})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // map(arr, func, additional_argument)
        {
            label: {
                label: 'map',
                detail: '(arr: Array[T], func: Function[In[T,V],Out[K],V)' +
                    ' -> Array[K]',
                description: 'map elements in an array'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Map elements in an array.",
            insertText: 'map(${1:arr}, ${2:func}, ${3:None})',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // binarydata("data")
        {
            label: {
                label: 'binarydata',
                detail: '(data: str) -> Const[Ptr[Const[Ptr[u8]]]',
                description: 'embedded binary data'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Embedded binary data.",
            insertText: 'binarydata("${1:data}")',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // inlinec("T", "ccode")
        {
            label: {
                label: 'inlinec',
                detail: '("T", "ccode") -> T',
                description: 'inline C code'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Inline C code.",
            insertText: 'inlinec("${1:T}", "${2:ccode}")',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
        // make("T")
        {
            label: {
                label: 'make',
                detail: '("T") -> T',
                description: 'allocate a new value on heap'
            },
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Allocate a new value on heap.",
            insertText: 'make("${1:T}")',
            insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        },
    ];
}

function get_snippet_completions(range, word, full_word, line) {
    const empty_line = line.trim() === "";
    const line_start_with_indent = line.startsWith("    ");
    const suggest_statement_snippets = empty_line && line_start_with_indent;
    const suggest_builtins = !empty_line && line_start_with_indent;
    const suggest_global_statements = empty_line && !line_start_with_indent;
    let completions = [];
    if (suggest_statement_snippets) {
        completions = [...completions, ...get_statement_snippets(range)];
    }
    if (suggest_builtins) {
        completions = [...completions, ...get_builtins_snippets(range)];
    }
    if (suggest_global_statements) {
        completions = [...completions, ...get_global_statement_snippets(range)];
    }
    completions = [...completions, ...generate_word_completes()]
    return completions;

}

function gen_completions(range, word, full_word, line) {
    const replace_word_from_line = line.replace(full_word, "");

    if (full_word.endsWith(".")) {
        return generate_dot_completes(full_word, replace_word_from_line, range);
    }

    return get_snippet_completions(range, word, full_word,
        replace_word_from_line);
}

function setup_yaksha_completion_provider() {
    YAKSHA_STATE.monaco.languages.registerCompletionItemProvider("yaksha", {
        triggerCharacters: ["."],
        provideCompletionItems: function (model, position) {
            YAKSHA_STATE.text = editor.getValue();
            YAKSHA_STATE.imports = get_imports();
            YAKSHA_STATE.defs = get_defs();
            const word = model.getWordUntilPosition(position);
            const line = model.getLineContent(position.lineNumber);
            let line_mid = line.substring(0, position.column);
            line_mid = line_mid.substring(line_mid.lastIndexOf(" ") + 1).trim();

            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
            };
            return {
                suggestions: gen_completions(range, word, line_mid, line),
            };
        },
    });
}

function setup_docs(docs, monaco) {
    YAKSHA_STATE.docs = docs;
    YAKSHA_STATE.editor = window.editor;
    YAKSHA_STATE.monaco = monaco;
    setup_yaksha_completion_provider();
}

function setup_local_docs(docs) {
    YAKSHA_STATE.local_docs = docs;
}