// YK:arrayutils,console,ini,process,whereami#
#include "yk__lib.h"
// --forward declarations-- 
#define yy__dtraverse_DT_REG (DT_REG)
#define yy__dtraverse_DT_DIR (DT_DIR)
#define yy__webui_Event webui_event_t*
struct yy__dtraverse_Entry;
#define yy__dtraverse_DirEntryObject struct dirent *
#define yy__dtraverse_DirObject DIR *
#define yy__ini_Ini ini_t*
#define yy__os_ProcessResult struct yk__process_result*
#define yy__c_Size size_t
#define yy__c_CStr char*
#define yy__c_CInt int
struct yy__State;
struct yy__dtraverse_Entry** yy__dtraverse_listdir(struct yk__bstr);
void yy__ini_del_ini(yy__ini_Ini);
yy__ini_Ini yy__ini_from_str(struct yk__bstr);
yk__sds yy__ini_get(yy__ini_Ini, struct yk__bstr, struct yk__bstr);
bool yy__path_forward_slash();
bool yy__path_end_with_slash(struct yk__bstr);
yk__sds yy__path_join(struct yk__bstr, struct yk__bstr);
yk__sds* yy__strings_split(yk__sds, yk__sds);
yk__sds yy__os_exe_path();
yk__sds yy__os_cwd();
yy__os_ProcessResult yy__os_run(yk__sds*);
void yy__os_del_process_result(yy__os_ProcessResult);
bool yy__os_is_windows();
bool yy__os_is_macos();
yk__sds yy__os_getenv(yk__sds);
yk__sds yy__os_which(yk__sds);
yk__sds yy__io_readfile(yk__sds);
bool yy__io_writefile(yk__sds, yk__sds);
struct yk__bstr yy__refs_wrap_cstr_z(yy__c_CStr);
yk__sds yy__append_char(struct yk__bstr, int32_t);
yk__sds yy__escape_js_string(struct yk__bstr);
yk__sds yy__file_entries_to_json(struct yy__dtraverse_Entry**);
void yy__get_compilation_errors(yy__webui_Event);
void yy__list_files(yy__webui_Event);
void yy__get_documentation(yy__webui_Event);
void yy__get_doc_json(yy__webui_Event);
void yy__click_file(yy__webui_Event);
void yy__save_file(yy__webui_Event);
void yy__show_open_folder_dialog(yy__webui_Event);
void yy__explore(yy__webui_Event);
void yy__create_new_file(yy__webui_Event);
void yy__change_folder(yy__webui_Event);
yk__sds yy__get_yaksha_binary(struct yk__bstr);
int32_t yy__main();
// --structs-- 
struct yy__dtraverse_Entry {
    yk__sds yy__dtraverse_name;
    bool yy__dtraverse_is_dir;
};
struct yy__State {
    struct yk__bstr yy__yaksha;
    struct yk__bstr yy__exe;
};
// --functions-- 
struct yy__dtraverse_Entry** yy__dtraverse_listdir(struct yk__bstr yy__dtraverse_directory) 
{
    struct yy__dtraverse_Entry** yy__dtraverse_entries = NULL;
    yy__dtraverse_DirObject yy__dtraverse_p = opendir(yk__bstr_get_reference(yy__dtraverse_directory));
    if (yy__dtraverse_p == NULL)
    {
        struct yy__dtraverse_Entry** t__3 = yy__dtraverse_entries;
        return t__3;
    }
    while (true)
    {
        yy__dtraverse_DirEntryObject yy__dtraverse_de = readdir(yy__dtraverse_p);
        if (yy__dtraverse_de == NULL)
        {
            break;
        }
        if ((yy__dtraverse_de->d_type != yy__dtraverse_DT_DIR) && (yy__dtraverse_de->d_type != yy__dtraverse_DT_REG))
        {
            continue;
        }
        struct yk__bstr yy__dtraverse_name = yy__refs_wrap_cstr_z(yy__dtraverse_de->d_name);
        struct yy__dtraverse_Entry* yy__dtraverse_item = calloc(1, sizeof(struct yy__dtraverse_Entry));
        yy__dtraverse_item->yy__dtraverse_name = yk__bstr_copy_to_sds(yy__dtraverse_name);
        yy__dtraverse_item->yy__dtraverse_is_dir = (yy__dtraverse_de->d_type == yy__dtraverse_DT_DIR);
        yk__arrput(yy__dtraverse_entries, yy__dtraverse_item);
    }
    struct yy__dtraverse_Entry** t__4 = yy__dtraverse_entries;
    closedir(yy__dtraverse_p);
    return t__4;
}
void yy__ini_del_ini(yy__ini_Ini nn__object) 
{
    ini_destroy(nn__object);
}
yy__ini_Ini yy__ini_from_str(struct yk__bstr nn__ini_data) 
{
    ini_t* ini = ini_load(yk__bstr_get_reference(nn__ini_data), NULL);
    return ini;
}
yk__sds yy__ini_get(yy__ini_Ini nn__object, struct yk__bstr nn__section, struct yk__bstr nn__property) 
{
    
    int section = ini_find_section(nn__object, yk__bstr_get_reference(nn__section), yk__bstr_len(nn__section));
    if (section == INI_NOT_FOUND) {
        return yk__sdsempty();
    }
    int prop = ini_find_property(nn__object, section, yk__bstr_get_reference(nn__property), yk__bstr_len(nn__property));
    if (prop == INI_NOT_FOUND) {
        return yk__sdsempty();
    }
    char const* data = ini_property_value(nn__object, section, prop);
    if (data == NULL) {
        return yk__sdsempty();
    }
    return yk__sdsnew(data);
}
bool yy__path_forward_slash() 
{
    #if defined(_WIN32) || defined(_WIN64)
    bool bfwd = true;
    #else
    bool bfwd = false;
    #endif
    return bfwd;
}
bool yy__path_end_with_slash(struct yk__bstr yy__path_a) 
{
    int32_t yy__path_length = yk__bstr_len(yy__path_a);
    if (yy__path_length < INT32_C(1))
    {
        return false;
    }
    int32_t yy__path_chr = (yk__bstr_get_reference(yy__path_a)[(yy__path_length - INT32_C(1))]);
    bool yy__path_x = ((yy__path_chr == INT32_C(47)) || (yy__path_chr == INT32_C(92)));
    bool t__0 = yy__path_x;
    return t__0;
}
yk__sds yy__path_join(struct yk__bstr yy__path_a, struct yk__bstr yy__path_b) 
{
    if (yy__path_end_with_slash(yy__path_a))
    {
        yk__sds t__1 = yk__concat_bstr_bstr(yy__path_a, yy__path_b);
        yk__sds t__2 = t__1;
        return t__2;
        yk__sdsfree(t__1);
    }
yk__sds yy__path_result = yk__sdsempty();
    if (yy__path_forward_slash())
    {
        yk__sds t__3 = yk__concat_bstr_lit(yy__path_a, "\\", 1);
        yk__sds t__4 = yk__concat_sds_bstr(t__3, yy__path_b);
        yk__sdsfree(yy__path_result);
        yy__path_result = yk__sdsdup(t__4);
        yk__sdsfree(t__4);
        yk__sdsfree(t__3);
    }
    else
    {
        yk__sds t__5 = yk__concat_bstr_lit(yy__path_a, "/", 1);
        yk__sds t__6 = yk__concat_sds_bstr(t__5, yy__path_b);
        yk__sdsfree(yy__path_result);
        yy__path_result = yk__sdsdup(t__6);
        yk__sdsfree(t__6);
        yk__sdsfree(t__5);
    }
    yk__sds t__7 = yy__path_result;
    return t__7;
}
yk__sds* yy__strings_split(yk__sds nn__value, yk__sds nn__sep) 
{
    int count;
    yk__sds* result = yk__sdssplitlen(nn__value, yk__sdslen(nn__value),
            nn__sep, yk__sdslen(nn__sep), &count);
    yk__sdsfree(nn__value);
    yk__sdsfree(nn__sep);
    if (NULL == result) {
        return NULL;
    }
    yk__sds* newarr = NULL;
    for (int i = 0; i < count; i++) {
        yk__arrput(newarr, result[i]);
    }
    free(result); // free array itself.
    return newarr;
}
yk__sds yy__os_exe_path() 
{
    int length = wai_getExecutablePath(NULL, 0, NULL);
    char* path = malloc(length + 1);
    if (path == NULL) return yk__sdsempty();
    int path_len;
    wai_getExecutablePath(path, length, &path_len);
    path[path_len] = '\0';
    yk__sds value = yk__sdsnewlen(path, path_len);
    free(path);
    return value;
}
yk__sds yy__os_cwd() 
{
    char* path = yk__get_current_dir_path();
    if (path == NULL) return yk__sdsempty();
    yk__sds value = yk__sdsnewlen(path, strlen(path));
    free(path);
    return value;
}
yy__os_ProcessResult yy__os_run(yk__sds* nn__args) { return yk__run(nn__args); }
void yy__os_del_process_result(yy__os_ProcessResult nn__pr) { yk__free_process_result(nn__pr); }
bool yy__os_is_windows() 
{
    bool win = false;
    #if defined(_WIN32) || defined(_WIN64)
    win = true;
    #endif
    return win;
}
bool yy__os_is_macos() 
{
    bool mach_os = false;
    #if defined(__APPLE__) && defined(__MACH__)
    mach_os = true;
    #endif
    return mach_os;
}
yk__sds yy__os_getenv(yk__sds nn__name) { return yk__getenv(nn__name); }
yk__sds yy__os_which(yk__sds yy__os_binary) 
{
    yk__sds yy__os_bin1 = yk__sdsdup(yy__os_binary);
    yk__sds yy__os_bin2 = yk__sdsdup(yy__os_binary);
    yk__sds yy__os_bin3 = yk__sdsdup(yy__os_binary);
    yk__sds t__0 = yy__os_getenv(yk__sdsnewlen("PATH", 4));
    yk__sds yy__os_env = yk__sdsdup(t__0);
    yk__sds yy__os_sep = yk__sdsnewlen(":" , 1);
    if (yy__os_is_windows())
    {
        yk__sdsfree(yy__os_sep);
        yy__os_sep = yk__sdsnewlen(";", 1);
        yk__sds t__1 = yk__concat_sds_lit(yy__os_bin1, ".exe", 4);
        yk__sdsfree(yy__os_bin1);
        yy__os_bin1 = yk__sdsdup(t__1);
        yk__sds t__2 = yk__concat_sds_lit(yy__os_bin2, ".bat", 4);
        yk__sdsfree(yy__os_bin2);
        yy__os_bin2 = yk__sdsdup(t__2);
        yk__sds t__3 = yk__concat_sds_lit(yy__os_bin3, ".cmd", 4);
        yk__sdsfree(yy__os_bin3);
        yy__os_bin3 = yk__sdsdup(t__3);
        yk__sdsfree(t__3);
        yk__sdsfree(t__2);
        yk__sdsfree(t__1);
    }
    yk__sds* yy__os_paths = yy__strings_split(yk__sdsdup(yy__os_env), yk__sdsdup(yy__os_sep));
    int32_t yy__os_length = yk__arrlen(yy__os_paths);
    while (true)
    {
        if (!(((yy__os_length > INT32_C(0)))))
        {
            break;
        }
        yy__os_length = (yy__os_length - INT32_C(1));
        yk__sds yy__os_cur_path = yk__sdsdup(yy__os_paths[yy__os_length]);
        yk__sds t__4 = yy__path_join(yk__bstr_h(yy__os_cur_path), yk__bstr_h(yy__os_bin1));
        yk__sds yy__os_full_path = yk__sdsdup(t__4);
        if (yk__executable(yk__sdsdup(yy__os_full_path)))
        {
            yk__sds t__5 = yy__os_full_path;
            yk__delsdsarray(yy__os_paths);
            yk__sdsfree(t__4);
            yk__sdsfree(yy__os_cur_path);
            yk__sdsfree(yy__os_sep);
            yk__sdsfree(yy__os_env);
            yk__sdsfree(t__0);
            yk__sdsfree(yy__os_bin3);
            yk__sdsfree(yy__os_bin2);
            yk__sdsfree(yy__os_bin1);
            yk__sdsfree(yy__os_binary);
            return t__5;
        }
        if (yy__os_is_windows())
        {
            yk__sds t__6 = yy__path_join(yk__bstr_h(yy__os_cur_path), yk__bstr_h(yy__os_bin2));
            yk__sdsfree(yy__os_full_path);
            yy__os_full_path = yk__sdsdup(t__6);
            if (yk__exists(yk__sdsdup(yy__os_full_path)))
            {
                yk__sds t__7 = yy__os_full_path;
                yk__delsdsarray(yy__os_paths);
                yk__sdsfree(t__6);
                yk__sdsfree(t__4);
                yk__sdsfree(yy__os_cur_path);
                yk__sdsfree(yy__os_sep);
                yk__sdsfree(yy__os_env);
                yk__sdsfree(t__0);
                yk__sdsfree(yy__os_bin3);
                yk__sdsfree(yy__os_bin2);
                yk__sdsfree(yy__os_bin1);
                yk__sdsfree(yy__os_binary);
                return t__7;
            }
            yk__sds t__8 = yy__path_join(yk__bstr_h(yy__os_cur_path), yk__bstr_h(yy__os_bin3));
            yk__sdsfree(yy__os_full_path);
            yy__os_full_path = yk__sdsdup(t__8);
            if (yk__exists(yk__sdsdup(yy__os_full_path)))
            {
                yk__sds t__9 = yy__os_full_path;
                yk__delsdsarray(yy__os_paths);
                yk__sdsfree(t__8);
                yk__sdsfree(t__6);
                yk__sdsfree(t__4);
                yk__sdsfree(yy__os_cur_path);
                yk__sdsfree(yy__os_sep);
                yk__sdsfree(yy__os_env);
                yk__sdsfree(t__0);
                yk__sdsfree(yy__os_bin3);
                yk__sdsfree(yy__os_bin2);
                yk__sdsfree(yy__os_bin1);
                yk__sdsfree(yy__os_binary);
                return t__9;
            }
            yk__sdsfree(t__8);
            yk__sdsfree(t__6);
        }
        yk__sdsfree(yy__os_full_path);
        yk__sdsfree(t__4);
        yk__sdsfree(yy__os_cur_path);
    }
    yk__sds t__10 = yy__os_cwd();
    yk__sds t__11 = yy__path_join(yk__bstr_h(t__10), yk__bstr_h(yy__os_bin1));
    yk__sds yy__os_special = yk__sdsdup(t__11);
    if (yk__executable(yk__sdsdup(yy__os_special)))
    {
        yk__sds t__12 = yy__os_special;
        yk__delsdsarray(yy__os_paths);
        yk__sdsfree(t__11);
        yk__sdsfree(t__10);
        yk__sdsfree(yy__os_sep);
        yk__sdsfree(yy__os_env);
        yk__sdsfree(t__0);
        yk__sdsfree(yy__os_bin3);
        yk__sdsfree(yy__os_bin2);
        yk__sdsfree(yy__os_bin1);
        yk__sdsfree(yy__os_binary);
        return t__12;
    }
    if (yy__os_is_windows())
    {
        yk__sds t__13 = yy__os_cwd();
        yk__sds t__14 = yy__path_join(yk__bstr_h(t__13), yk__bstr_h(yy__os_bin2));
        yk__sdsfree(yy__os_special);
        yy__os_special = yk__sdsdup(t__14);
        if (yk__exists(yk__sdsdup(yy__os_special)))
        {
            yk__sds t__15 = yy__os_special;
            yk__delsdsarray(yy__os_paths);
            yk__sdsfree(t__14);
            yk__sdsfree(t__13);
            yk__sdsfree(t__11);
            yk__sdsfree(t__10);
            yk__sdsfree(yy__os_sep);
            yk__sdsfree(yy__os_env);
            yk__sdsfree(t__0);
            yk__sdsfree(yy__os_bin3);
            yk__sdsfree(yy__os_bin2);
            yk__sdsfree(yy__os_bin1);
            yk__sdsfree(yy__os_binary);
            return t__15;
        }
        yk__sds t__16 = yy__os_cwd();
        yk__sds t__17 = yy__path_join(yk__bstr_h(t__16), yk__bstr_h(yy__os_bin3));
        yk__sdsfree(yy__os_special);
        yy__os_special = yk__sdsdup(t__17);
        if (yk__exists(yk__sdsdup(yy__os_special)))
        {
            yk__sds t__18 = yy__os_special;
            yk__delsdsarray(yy__os_paths);
            yk__sdsfree(t__17);
            yk__sdsfree(t__16);
            yk__sdsfree(t__14);
            yk__sdsfree(t__13);
            yk__sdsfree(t__11);
            yk__sdsfree(t__10);
            yk__sdsfree(yy__os_sep);
            yk__sdsfree(yy__os_env);
            yk__sdsfree(t__0);
            yk__sdsfree(yy__os_bin3);
            yk__sdsfree(yy__os_bin2);
            yk__sdsfree(yy__os_bin1);
            yk__sdsfree(yy__os_binary);
            return t__18;
        }
        yk__sdsfree(t__17);
        yk__sdsfree(t__16);
        yk__sdsfree(t__14);
        yk__sdsfree(t__13);
    }
    yk__sds t__19 = yy__os_exe_path();
    yk__sds t__20 = yy__path_join(yk__bstr_h(t__19), yk__bstr_h(yy__os_bin1));
    yk__sdsfree(yy__os_special);
    yy__os_special = yk__sdsdup(t__20);
    if (yk__executable(yk__sdsdup(yy__os_special)))
    {
        yk__sds t__21 = yy__os_special;
        yk__delsdsarray(yy__os_paths);
        yk__sdsfree(t__20);
        yk__sdsfree(t__19);
        yk__sdsfree(t__11);
        yk__sdsfree(t__10);
        yk__sdsfree(yy__os_sep);
        yk__sdsfree(yy__os_env);
        yk__sdsfree(t__0);
        yk__sdsfree(yy__os_bin3);
        yk__sdsfree(yy__os_bin2);
        yk__sdsfree(yy__os_bin1);
        yk__sdsfree(yy__os_binary);
        return t__21;
    }
    if (yy__os_is_windows())
    {
        yk__sds t__22 = yy__os_exe_path();
        yk__sds t__23 = yy__path_join(yk__bstr_h(t__22), yk__bstr_h(yy__os_bin2));
        yk__sdsfree(yy__os_special);
        yy__os_special = yk__sdsdup(t__23);
        if (yk__exists(yk__sdsdup(yy__os_special)))
        {
            yk__sds t__24 = yy__os_special;
            yk__delsdsarray(yy__os_paths);
            yk__sdsfree(t__23);
            yk__sdsfree(t__22);
            yk__sdsfree(t__20);
            yk__sdsfree(t__19);
            yk__sdsfree(t__11);
            yk__sdsfree(t__10);
            yk__sdsfree(yy__os_sep);
            yk__sdsfree(yy__os_env);
            yk__sdsfree(t__0);
            yk__sdsfree(yy__os_bin3);
            yk__sdsfree(yy__os_bin2);
            yk__sdsfree(yy__os_bin1);
            yk__sdsfree(yy__os_binary);
            return t__24;
        }
        yk__sds t__25 = yy__os_exe_path();
        yk__sds t__26 = yy__path_join(yk__bstr_h(t__25), yk__bstr_h(yy__os_bin3));
        yk__sdsfree(yy__os_special);
        yy__os_special = yk__sdsdup(t__26);
        if (yk__exists(yk__sdsdup(yy__os_special)))
        {
            yk__sds t__27 = yy__os_special;
            yk__delsdsarray(yy__os_paths);
            yk__sdsfree(t__26);
            yk__sdsfree(t__25);
            yk__sdsfree(t__23);
            yk__sdsfree(t__22);
            yk__sdsfree(t__20);
            yk__sdsfree(t__19);
            yk__sdsfree(t__11);
            yk__sdsfree(t__10);
            yk__sdsfree(yy__os_sep);
            yk__sdsfree(yy__os_env);
            yk__sdsfree(t__0);
            yk__sdsfree(yy__os_bin3);
            yk__sdsfree(yy__os_bin2);
            yk__sdsfree(yy__os_bin1);
            yk__sdsfree(yy__os_binary);
            return t__27;
        }
        yk__sdsfree(t__26);
        yk__sdsfree(t__25);
        yk__sdsfree(t__23);
        yk__sdsfree(t__22);
    }
    yk__delsdsarray(yy__os_paths);
    yk__sdsfree(t__20);
    yk__sdsfree(t__19);
    yk__sdsfree(yy__os_special);
    yk__sdsfree(t__11);
    yk__sdsfree(t__10);
    yk__sdsfree(yy__os_sep);
    yk__sdsfree(yy__os_env);
    yk__sdsfree(t__0);
    yk__sdsfree(yy__os_bin3);
    yk__sdsfree(yy__os_bin2);
    yk__sdsfree(yy__os_bin1);
    yk__sdsfree(yy__os_binary);
    return yk__sdsnewlen("", 0);
}
yk__sds yy__io_readfile(yk__sds nn__fname) { return yk__io_readfile(nn__fname); }
bool yy__io_writefile(yk__sds nn__fname, yk__sds nn__data) { return yk__io_writefile(nn__fname, nn__data); }
struct yk__bstr yy__refs_wrap_cstr_z(yy__c_CStr yy__refs_s) 
{
    struct yk__bstr t__0 = yk__bstr_c(yy__refs_s, ((int32_t)strlen(yy__refs_s)));
    return t__0;
}

static void* ye_data = NULL;
void* ye_get_state() { return ye_data; }
void ye_set_state(void* data) { ye_data = data; }

;
yk__sds yy__append_char(struct yk__bstr nn__s, int32_t nn__character) 
{
    size_t length = yk__bstr_len(nn__s);
    size_t new_length = length + 1;
    yk__sds result = yk__sdsnewlen(yk__bstr_get_reference(nn__s), length);
    result = yk__sdsgrowzero(result, new_length);
    result[length] = nn__character;
    return result;
}
yk__sds yy__escape_js_string(struct yk__bstr yy__s) 
{
    int32_t yy__length = yk__bstr_len(yy__s);
    yk__sds yy__result = yk__sdsnewlen("" , 0);
    int32_t yy__cur = INT32_C(0);
    for (int32_t yy__i = INT32_C(0);(yy__i < yy__length);yy__i += INT32_C(1))
    {
        yy__cur = (yk__bstr_get_reference(yy__s)[yy__i]);
        if (yy__cur == ((int32_t)'\"'))
        {
            yy__result = yk__append_sds_lit(yy__result, "\\\"" , 2);
        }
        else
        {
            if (yy__cur == ((int32_t)'\\'))
            {
                yy__result = yk__append_sds_lit(yy__result, "\\\\" , 2);
            }
            else
            {
                if (yy__cur == ((int32_t)'\b'))
                {
                    yy__result = yk__append_sds_lit(yy__result, "\\b" , 2);
                }
                else
                {
                    if (yy__cur == ((int32_t)'\f'))
                    {
                        yy__result = yk__append_sds_lit(yy__result, "\\f" , 2);
                    }
                    else
                    {
                        if (yy__cur == ((int32_t)'\n'))
                        {
                            yy__result = yk__append_sds_lit(yy__result, "\\n" , 2);
                        }
                        else
                        {
                            if (yy__cur == ((int32_t)'\r'))
                            {
                                yy__result = yk__append_sds_lit(yy__result, "\\r" , 2);
                            }
                            else
                            {
                                if (yy__cur == ((int32_t)'\t'))
                                {
                                    yy__result = yk__append_sds_lit(yy__result, "\\t" , 2);
                                }
                                else
                                {
                                    yk__sds t__3 = yy__append_char(yk__bstr_h(yy__result), yy__cur);
                                    yk__sdsfree(yy__result);
                                    yy__result = yk__sdsdup(t__3);
                                    yk__sdsfree(t__3);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    yk__sds t__4 = yy__result;
    return t__4;
}
yk__sds yy__file_entries_to_json(struct yy__dtraverse_Entry** yy__entries) 
{
    yk__sds t__5 = yy__os_cwd();
    yk__sds yy__current_dir = yk__sdsdup(t__5);
    yk__sds yy__json = yk__sdsnewlen("{\"cwd\": \"" , 9);
    yk__sds t__6 = yy__escape_js_string(yk__bstr_h(yy__current_dir));
    yy__json = yk__append_sds_sds(yy__json, t__6);
    yy__json = yk__append_sds_lit(yy__json, "\", \"files\": [" , 13);
    int32_t yy__counter = INT32_C(0);
    struct yy__dtraverse_Entry** yy__0t = yy__entries;
    int32_t yy__1t = INT32_C(0);
    int32_t yy__2t = yk__arrlen(yy__0t);
    while (true)
    {
        if (!(yy__1t < yy__2t))
        {
            break;
        }
        yy__json = yk__append_sds_lit(yy__json, "{" , 1);
        yk__sds t__7 = yy__escape_js_string(yk__bstr_h((yy__0t[yy__1t])->yy__dtraverse_name));
        yk__sds t__8 = yk__concat_lit_sds("\"name\": \"", 9, t__7);
        yk__sds t__9 = yk__concat_sds_lit(t__8, "\",", 2);
        yy__json = yk__append_sds_sds(yy__json, t__9);
        yk__sds t__10 = yk__concat_lit_bstr("\"type\": \"", 9, ((yy__0t[yy__1t])->yy__dtraverse_is_dir ? yk__bstr_s("d", 1) : yk__bstr_s("f", 1)));
        yk__sds t__11 = yk__concat_sds_lit(t__10, "\"", 1);
        yy__json = yk__append_sds_sds(yy__json, t__11);
        yy__json = yk__append_sds_lit(yy__json, "}" , 1);
        if (yy__counter < (yk__arrlen(yy__entries) - INT32_C(1)))
        {
            yy__json = yk__append_sds_lit(yy__json, "," , 1);
        }
        yy__counter += INT32_C(1);
        yy__1t += INT32_C(1);
        yk__sdsfree(t__11);
        yk__sdsfree(t__10);
        yk__sdsfree(t__9);
        yk__sdsfree(t__8);
        yk__sdsfree(t__7);
    }
    yy__json = yk__append_sds_lit(yy__json, "]}" , 2);
    yk__sds t__12 = yy__json;
    yk__sdsfree(t__6);
    yk__sdsfree(yy__current_dir);
    yk__sdsfree(t__5);
    return t__12;
}
void yy__get_compilation_errors(yy__webui_Event yy__event) 
{
    yk__printlnstr("compiling ...");
    struct yy__State* yy__state = ye_get_state();
    yk__sds yy__compiler = yk__bstr_copy_to_sds(yy__state->yy__yaksha);
    yk__sds* t__13 = NULL;
    yk__arrsetcap(t__13, 4);
    yk__arrput(t__13, yk__sdsdup(yy__compiler));
    yk__arrput(t__13, yk__sdsnewlen("compile", 7));
    yk__arrput(t__13, yk__sdsnewlen("-d", 2));
    yk__arrput(t__13, yk__sdsnewlen("main.yaka", 9));
    yk__sds* yy__arguments = t__13;
    yy__os_ProcessResult yy__result = yy__os_run(yy__arguments);
    webui_return_string(yy__event, ((yy__c_CStr)yy__result->output));
    yy__os_del_process_result(yy__result);
    yk__delsdsarray(yy__arguments);
    yk__sdsfree(yy__compiler);
    return;
}
void yy__list_files(yy__webui_Event yy__event) 
{
    struct yy__dtraverse_Entry** yy__f = yy__dtraverse_listdir(yk__bstr_s(".", 1));
    yk__sds t__14 = yy__file_entries_to_json(yy__f);
    yk__sds yy__json = yk__sdsdup(t__14);
    webui_return_string(yy__event, ((yy__c_CStr)yy__json));
    yk__sdsfree(yy__json);
    yk__sdsfree(t__14);
    return;
}
void yy__get_documentation(yy__webui_Event yy__event) 
{
    struct yy__State* yy__state = ye_get_state();
    struct yk__bstr yy__exe_path = yy__state->yy__exe;
    yk__sds t__15 = yy__path_join(yy__exe_path, yk__bstr_s("frontend/docs.yaka", 18));
    struct yk__bstr yy__doc_path = yk__bstr_h(t__15);
    yk__sds t__16 = yy__io_readfile(yk__bstr_copy_to_sds(yy__doc_path));
    yk__sds yy__doc = yk__sdsdup(t__16);
    webui_return_string(yy__event, ((yy__c_CStr)yy__doc));
    yk__sdsfree(yy__doc);
    yk__sdsfree(t__16);
    yk__sdsfree(t__15);
    return;
}
void yy__get_doc_json(yy__webui_Event yy__event) 
{
    struct yy__State* yy__state = ye_get_state();
    struct yk__bstr yy__exe_path = yy__state->yy__exe;
    yk__sds t__17 = yy__path_join(yy__exe_path, yk__bstr_s("frontend/docs.json", 18));
    struct yk__bstr yy__doc_path = yk__bstr_h(t__17);
    yk__sds t__18 = yy__io_readfile(yk__bstr_copy_to_sds(yy__doc_path));
    yk__sds yy__doc = yk__sdsdup(t__18);
    webui_return_string(yy__event, ((yy__c_CStr)yy__doc));
    yk__sdsfree(yy__doc);
    yk__sdsfree(t__18);
    yk__sdsfree(t__17);
    return;
}
void yy__click_file(yy__webui_Event yy__event) 
{
    yy__c_CStr yy__path_cstr = webui_get_string(yy__event);
    struct yk__bstr yy__path = yy__refs_wrap_cstr_z(yy__path_cstr);
    yk__sds t__19 = yy__io_readfile(yk__bstr_copy_to_sds(yy__path));
    yk__sds yy__content = yk__sdsdup(t__19);
    webui_return_string(yy__event, ((yy__c_CStr)yy__content));
    yk__sdsfree(yy__content);
    yk__sdsfree(t__19);
    return;
}
void yy__save_file(yy__webui_Event yy__event) 
{
    yy__c_CStr yy__path_cstr = webui_get_string_at(yy__event, ((yy__c_Size)INT32_C(0)));
    struct yk__bstr yy__path = yy__refs_wrap_cstr_z(yy__path_cstr);
    yy__c_CStr yy__content_cstr = webui_get_string_at(yy__event, ((yy__c_Size)INT32_C(1)));
    struct yk__bstr yy__content = yy__refs_wrap_cstr_z(yy__content_cstr);
    bool yy__success = yy__io_writefile(yk__bstr_copy_to_sds(yy__path), yk__bstr_copy_to_sds(yy__content));
    webui_return_string(yy__event, (yy__success ? "OK" : "Failed to save file"));
    return;
}
void yy__show_open_folder_dialog(yy__webui_Event yy__event) 
{
    yk__sds t__20 = yy__os_cwd();
    yk__sds yy__path = yk__sdsdup(t__20);
    yy__c_CStr yy__selected = tinyfd_selectFolderDialog("YakshaEditor", ((yy__c_CStr)yy__path));
    if (yy__selected == NULL)
    {
        webui_return_string(yy__event, "");
    }
    else
    {
        webui_return_string(yy__event, yy__selected);
    }
    yk__sdsfree(yy__path);
    yk__sdsfree(t__20);
    return;
}
void yy__explore(yy__webui_Event yy__event) 
{
    yk__sds t__21 = yy__os_cwd();
    yk__sds yy__path = yk__sdsdup(t__21);
yk__sds yy__program = yk__sdsempty();
    if (yy__os_is_windows())
    {
        yk__sds t__22 = yy__os_which(yk__sdsnewlen("explorer", 8));
        yk__sdsfree(yy__program);
        yy__program = yk__sdsdup(t__22);
        yk__sdsfree(t__22);
    }
    else
    {
        if (yy__os_is_macos())
        {
            yk__sds t__23 = yy__os_which(yk__sdsnewlen("open", 4));
            yk__sdsfree(yy__program);
            yy__program = yk__sdsdup(t__23);
            yk__sdsfree(t__23);
        }
        else
        {
            yk__sds t__24 = yy__os_which(yk__sdsnewlen("xdg-open", 8));
            yk__sdsfree(yy__program);
            yy__program = yk__sdsdup(t__24);
            yk__sdsfree(t__24);
        }
    }
    if (yk__cmp_sds_lit(yy__program, "", 0) == 0)
    {
        webui_return_string(yy__event, "Failed to locate file explorer");
        yk__sdsfree(yy__program);
        yk__sdsfree(yy__path);
        yk__sdsfree(t__21);
        return;
    }
    yy__program = yk__append_sds_lit(yy__program, " \"" , 2);
    yy__program = yk__append_sds_sds(yy__program, yy__path);
    yy__program = yk__append_sds_lit(yy__program, "\"" , 1);
    yk__sds t__25 = yk__concat_lit_sds("running: ", 9, yy__program);
    yk__printlnstr(t__25);
    system(((yy__c_CStr)yy__program));
    yk__sdsfree(t__25);
    yk__sdsfree(yy__program);
    yk__sdsfree(yy__path);
    yk__sdsfree(t__21);
    return;
}
void yy__create_new_file(yy__webui_Event yy__event) 
{
    yy__c_CStr yy__default_filename = "newfile.yaka";
    yy__c_CStr yy__filename = tinyfd_inputBox("YakshaEditor", "Enter file name", yy__default_filename);
    if (yy__filename == NULL)
    {
        webui_return_string(yy__event, "");
        return;
    }
    struct yk__bstr yy__path = yy__refs_wrap_cstr_z(yy__filename);
    bool yy__success = yy__io_writefile(yk__bstr_copy_to_sds(yy__path), yk__sdsnewlen("", 0));
    webui_return_string(yy__event, (yy__success ? yy__filename : ""));
    return;
}
void yy__change_folder(yy__webui_Event yy__event) 
{
    yy__c_CStr yy__path_cstr = webui_get_string(yy__event);
    struct yk__bstr yy__path = yy__refs_wrap_cstr_z(yy__path_cstr);
    bool yy__success = yk__change_current_dir_path(yk__bstr_copy_to_sds(yy__path));
    if (!yy__success)
    {
        webui_return_string(yy__event, "Failed to change directory");
    }
    else
    {
        webui_return_string(yy__event, "OK");
    }
    return;
}
yk__sds yy__get_yaksha_binary(struct yk__bstr yy__exe_path) 
{
    yk__sds t__26 = yy__path_join(yy__exe_path, yk__bstr_s("settings.ini", 12));
    yk__sds yy__ini_path = yk__sdsdup(t__26);
    yk__sds t__27 = yy__os_which(yk__sdsnewlen("yaksha", 6));
    yk__sds yy__from_which = yk__sdsdup(t__27);
    if (!(yk__exists(yk__sdsdup(yy__ini_path))))
    {
        yk__sds t__28 = yy__from_which;
        yk__sdsfree(t__27);
        yk__sdsfree(yy__ini_path);
        yk__sdsfree(t__26);
        return t__28;
    }
    yk__sds t__29 = yy__io_readfile(yk__sdsdup(yy__ini_path));
    yy__ini_Ini yy__data = yy__ini_from_str(yk__bstr_h(t__29));
    yk__sds t__30 = yy__ini_get(yy__data, yk__bstr_s("compiler", 8), yk__bstr_s("yaksha", 6));
    yk__sds yy__path = yk__sdsdup(t__30);
    if ((yk__sdslen(yy__path) > INT32_C(0)) && yk__executable(yk__sdsdup(yy__path)))
    {
        yk__sds t__31 = yy__path;
        yy__ini_del_ini(yy__data);
        yk__sdsfree(t__30);
        yk__sdsfree(t__29);
        yk__sdsfree(yy__from_which);
        yk__sdsfree(t__27);
        yk__sdsfree(yy__ini_path);
        yk__sdsfree(t__26);
        return t__31;
    }
    yk__sds t__32 = yy__from_which;
    yy__ini_del_ini(yy__data);
    yk__sdsfree(yy__path);
    yk__sdsfree(t__30);
    yk__sdsfree(t__29);
    yk__sdsfree(t__27);
    yk__sdsfree(yy__ini_path);
    yk__sdsfree(t__26);
    return t__32;
}
int32_t yy__main() 
{
    yk__sds t__33 = yy__os_exe_path();
    yk__sds yy__exe_path = yk__sdsdup(t__33);
    yk__sds t__34 = yy__get_yaksha_binary(yk__bstr_h(yy__exe_path));
    yk__sds yy__yaksha_bin = yk__sdsdup(t__34);
    yk__printstr("exe_path = ");
    yk__printlnstr(yy__exe_path);
    struct yy__State* yy__state = calloc(1, sizeof(struct yy__State));
    yy__state->yy__yaksha = yk__bstr_h(yy__yaksha_bin);
    yy__state->yy__exe = yk__bstr_h(yy__exe_path);
    ye_set_state(yy__state);
    yy__c_Size yy__mw = webui_new_window();
    yk__printlnstr("created window");
    if (yk__cmp_bstr_lit(yy__state->yy__yaksha, "", 0) == 0)
    {
        yk__printlnstr("failed to find yaksha binary");
        free(yy__state);
        yk__sdsfree(yy__yaksha_bin);
        yk__sdsfree(t__34);
        yk__sdsfree(yy__exe_path);
        yk__sdsfree(t__33);
        return INT32_C(-1);
    }
    else
    {
        yk__sds t__35 = yk__concat_lit_bstr("yaksha binary found at: ", 24, yy__state->yy__yaksha);
        yk__printlnstr(t__35);
        yk__sdsfree(t__35);
    }
    yk__sds t__36 = yy__path_join(yk__bstr_h(yy__exe_path), yk__bstr_s("frontend", 8));
    yk__sds yy__frontend = yk__sdsdup(t__36);
    webui_set_root_folder(yy__mw, ((yy__c_CStr)yy__frontend));
    webui_show(yy__mw, "index.html");
    webui_bind(yy__mw, "listfiles", yy__list_files);
    webui_bind(yy__mw, "clickfile", yy__click_file);
    webui_bind(yy__mw, "savefile", yy__save_file);
    webui_bind(yy__mw, "cd", yy__change_folder);
    webui_bind(yy__mw, "openfolder", yy__show_open_folder_dialog);
    webui_bind(yy__mw, "explore", yy__explore);
    webui_bind(yy__mw, "newfile", yy__create_new_file);
    webui_bind(yy__mw, "getdocumentation", yy__get_documentation);
    webui_bind(yy__mw, "getdocjson", yy__get_doc_json);
    webui_bind(yy__mw, "compile", yy__get_compilation_errors);
    yk__printlnstr("waiting ... ");
    webui_wait();
    yk__printlnstr("done");
    webui_clean();
    yk__printlnstr("cleaned");
    free(yy__state);
    yk__sdsfree(yy__frontend);
    yk__sdsfree(t__36);
    yk__sdsfree(yy__yaksha_bin);
    yk__sdsfree(t__34);
    yk__sdsfree(yy__exe_path);
    yk__sdsfree(t__33);
    return INT32_C(0);
}
#if defined(YK__MINIMAL_MAIN)
int main(void) { return yy__main(); }
#endif