// Tools to handle docs

// Tree looks like this
//
// <ul className="tree">
//     <li>
//         <details open>
//             <summary>Giant planets</summary>
//             <ul>
//                 <li>
//                     <details>
//                         <summary>Gas giants</summary>
//                         <ul>
//                             <li>Jupiter</li>
//                             <li>Saturn</li>
//                         </ul>
//                     </details>
//                 </li>
//                 <li>
//                     <details>
//                         <summary>Ice giants</summary>
//                         <ul>
//                             <li>Uranus</li>
//                             <li>Neptune</li>
//                         </ul>
//                     </details>
//                 </li>
//             </ul>
//         </details>
//     </li>
// </ul>

const MODULE = '<span class="codicon codicon-package red-icon"></span>';
const COMMENT = '<span class="codicon codicon-comment-discussion green-icon"></span>';
const CLASS_NODE = '<span class="codicon codicon-symbol-class' +
    ' blue-icon"></span>';
const STRUCT_NODE = '<span class="codicon codicon-symbol-class' +
    ' pink-icon"></span>';
const MEMBER_NODE = '<span class="codicon codicon-symbol-field yellow-icon"></span>';
const FUNCTION_NODE = '<span class="codicon codicon-symbol-namespace' +
    ' orange-icon"></span>';
const CONST_NODE = '<span class="codicon codicon-symbol-constant cyan-icon"></span>';
const MACRO_NODE = '<span class="codicon codicon-symbol-snippet' +
    ' purple-icon"></span>';

function create_node_begin(name, prefix = '') {
    return '<li><details><summary>' + prefix + escapeHtml(name) +
        '</summary><ul>';
}

function create_node_end() {
    return '</ul></details></li>';
}

function create_leaf_node(name, prefix = '') {
    return '<li>' + prefix + escapeHtml(name) + '</li>';
}

function datatype_to_string(data_type) {
    if (!data_type) {
        return '';
    }
    const module = data_type['module'];
    const arguments = data_type['arguments'];
    if (arguments) {
        return data_type['type'] + '[' +
            arguments.map(datatype_to_string).join(",") + ']';
    }
    if (module) {
        return module + '.' + data_type['type'];
    }
    return data_type['type'];
}

function param_to_string(param) {
    return param.name + ": " + datatype_to_string(param.datatype);
}

function build_tree_html(docs) {
    const keys = Object.keys(docs).sort();
    let html = '<ul class="tree">';
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = docs[key];
        html += create_node_begin(key, MODULE);
        const item_macros = value['macros'];
        for (let j = 0; j < item_macros.length; j++) {
            const macro = item_macros[j].name;
            const has_comment = !!item_macros[j]['comment'];
            if (has_comment) {
                html += create_node_begin(macro, MACRO_NODE);
                html += create_leaf_node(item_macros[j]['comment'], COMMENT);
                html += create_node_end();
            } else {
                html += create_leaf_node(macro, MACRO_NODE);
            }
        }
        const item_consts = value['global_consts'];
        for (let j = 0; j < item_consts.length; j++) {
            const constant = item_consts[j].name + ": " +
                datatype_to_string(item_consts[j].datatype);
            const has_comment = !!item_consts[j]['comment'];
            if (has_comment) {
                html += create_node_begin(constant, CONST_NODE);
                html += create_leaf_node(item_consts[j]['comment'], COMMENT);
                html += create_node_end();
            } else {
                html += create_leaf_node(constant, CONST_NODE);
            }
        }
        const item_classes = value['classes'];
        for (let j = 0; j < item_classes.length; j++) {
            const annotations = item_classes[j].annotations;
            const has_onstack_annotation = annotations.some(
                function (annotation) {
                    return annotation.name === '@onstack';
                });
            let class_icon = CLASS_NODE;
            if (has_onstack_annotation) {
                class_icon = STRUCT_NODE;
            }
            const has_members_or_comments = item_classes[j]['members'].length >
                0 || !!item_classes[j]['comment'];
            if (has_members_or_comments) {
                html += create_node_begin(item_classes[j].name, class_icon);
                if (item_classes[j]['comment']) {
                    html +=
                        create_leaf_node(item_classes[j]['comment'], COMMENT);
                }
                const item_members = item_classes[j]['members'];
                for (let k = 0; k < item_members.length; k++) {
                    const member = item_members[k].name + ": " +
                        datatype_to_string(item_members[k].datatype);
                    const has_comment = !!item_members[k]['comment'];
                    if (has_comment) {
                        html += create_node_begin(member, MEMBER_NODE);
                        html += create_leaf_node(item_members[k]['comment'],
                            COMMENT);
                        html += create_node_end();
                    } else {
                        html += create_leaf_node(member, MEMBER_NODE);
                    }
                }

                html += create_node_end();
            } else {
                html += create_leaf_node(item_classes[j].name, class_icon);
            }
        }
        const item_functions = value['functions'];
        for (let k = 0; k < item_functions.length; k++) {
            const function_name = item_functions[k].name + "(" +
                item_functions[k].parameters.map(param_to_string).join(", ") +
                ") -> " +
                datatype_to_string(item_functions[k].return_type) + ":";
            const has_comment = !!item_functions[k]['comment'];
            if (has_comment) {
                html += create_node_begin(function_name, FUNCTION_NODE);
                html += create_leaf_node(item_functions[k]['comment'], COMMENT);
                html += create_node_end();
            } else {
                html += create_leaf_node(function_name, FUNCTION_NODE);
            }
        }
        html += create_node_end();
    }
    html += '</ul>';
    return html;
}