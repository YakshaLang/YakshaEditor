function yaksha_tokenizer_rules() {
    return {
        // Set defaultToken to invalid to see what you do not tokenize yet
        defaultToken: 'invalid',

        keywords: ["as", "break", "class", "struct", "continue", "def",
            "del", "defer", "else", "if", "elif", "import", "pass", "return",
            "while", "True", "False", "None", "runtimefeature", "for", "in",
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
                [/#[a-zA-Z_][a-zA-Z0-9_]*$/, 'c-preprocessor'],
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