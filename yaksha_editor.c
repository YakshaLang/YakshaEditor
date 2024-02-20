// YK:arrayutils,console,process,whereami#
#include "yk__lib.h"
// --forward declarations-- 
#define yy__dtraverse_DT_REG (DT_REG)
#define yy__dtraverse_DT_DIR (DT_DIR)
struct yy__dtraverse_Entry;
#define yy__dtraverse_DirEntryObject struct dirent *
#define yy__dtraverse_DirObject DIR *
#define yy__dtraverse_opendir opendir
#define yy__dtraverse_readdir readdir
#define yy__dtraverse_closedir closedir
#define yy__path_exists yk__exists
#define yy__path_executable yk__executable
#define yy__array_del_str_array yk__delsdsarray
#define yy__os_chdir yk__change_current_dir_path
#define yy__refs_unwrap yk__bstr_get_reference
#define yy__refs_wrap_cstr yk__bstr_c
#define yy__c_Size size_t
#define yy__c_CStr char*
#define yy__c_CInt int
#define yy__c_cstrlen strlen
#define yy__webui_Event webui_event_t*
#define yy__webui_new_window webui_new_window
#define yy__webui_bind webui_bind
#define yy__webui_show webui_show
#define yy__webui_wait webui_wait
#define yy__webui_set_root_folder webui_set_root_folder
#define yy__webui_clean webui_clean
#define yy__webui_get_string webui_get_string
#define yy__webui_return_string webui_return_string
struct yy__dtraverse_Entry** yy__dtraverse_listdir(struct yk__bstr);
bool yy__path_forward_slash();
bool yy__path_end_with_slash(yk__sds);
yk__sds yy__path_join(yk__sds, yk__sds);
yk__sds* yy__strings_split(yk__sds, yk__sds);
yk__sds yy__os_exe_path();
yk__sds yy__os_cwd();
bool yy__os_is_windows();
yk__sds yy__os_getenv(yk__sds);
yk__sds yy__os_which(yk__sds);
yk__sds yy__io_readfile(yk__sds);
int32_t yy__console_getch();
struct yk__bstr yy__refs_wrap_cstr_z(yy__c_CStr);
yk__sds yy__append_char(struct yk__bstr, int32_t);
yk__sds yy__escape_js_string(struct yk__bstr);
yk__sds yy__file_entries_to_json(struct yy__dtraverse_Entry**);
void yy__list_files(yy__webui_Event);
void yy__click_file(yy__webui_Event);
void yy__change_folder(yy__webui_Event);
int32_t yy__main();
// --structs-- 
struct yy__dtraverse_Entry {
    yk__sds yy__dtraverse_name;
    bool yy__dtraverse_is_dir;
};
// --functions-- 
struct yy__dtraverse_Entry** yy__dtraverse_listdir(struct yk__bstr yy__dtraverse_directory) 
{
    struct yy__dtraverse_Entry** yy__dtraverse_entries = NULL;
    yy__dtraverse_DirObject yy__dtraverse_p = yy__dtraverse_opendir(yy__refs_unwrap(yy__dtraverse_directory));
    if (yy__dtraverse_p == NULL)
    {
        struct yy__dtraverse_Entry** t__3 = yy__dtraverse_entries;
        return t__3;
    }
    while (true)
    {
        yy__dtraverse_DirEntryObject yy__dtraverse_de = yy__dtraverse_readdir(yy__dtraverse_p);
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
    yy__dtraverse_closedir(yy__dtraverse_p);
    return t__4;
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
bool yy__path_end_with_slash(yk__sds yy__path_a) 
{
    int32_t yy__path_length = yk__sdslen(yy__path_a);
    if (yy__path_length < INT32_C(1))
    {
        yk__sdsfree(yy__path_a);
        return false;
    }
    int32_t yy__path_chr = (yy__path_a[(yy__path_length - INT32_C(1))]);
    bool yy__path_x = ((yy__path_chr == INT32_C(47)) || (yy__path_chr == INT32_C(92)));
    bool t__0 = yy__path_x;
    yk__sdsfree(yy__path_a);
    return t__0;
}
yk__sds yy__path_join(yk__sds yy__path_a, yk__sds yy__path_b) 
{
    if (yy__path_end_with_slash(yk__sdsdup(yy__path_a)))
    {
        yk__sds t__1 = yk__sdscatsds(yk__sdsdup(yy__path_a), yy__path_b);
        yk__sds t__2 = t__1;
        yk__sdsfree(yy__path_b);
        yk__sdsfree(yy__path_a);
        return t__2;
        yk__sdsfree(t__1);
    }
yk__sds yy__path_result = yk__sdsempty();
    if (yy__path_forward_slash())
    {
        yk__sds t__3 = yk__concat_sds_lit(yy__path_a, "\\", 1);
        yk__sds t__4 = yk__sdscatsds(yk__sdsdup(t__3), yy__path_b);
        yk__sdsfree(yy__path_result);
        yy__path_result = yk__sdsdup(t__4);
        yk__sdsfree(t__4);
        yk__sdsfree(t__3);
    }
    else
    {
        yk__sds t__5 = yk__concat_sds_lit(yy__path_a, "/", 1);
        yk__sds t__6 = yk__sdscatsds(yk__sdsdup(t__5), yy__path_b);
        yk__sdsfree(yy__path_result);
        yy__path_result = yk__sdsdup(t__6);
        yk__sdsfree(t__6);
        yk__sdsfree(t__5);
    }
    yk__sds t__7 = yy__path_result;
    yk__sdsfree(yy__path_b);
    yk__sdsfree(yy__path_a);
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
bool yy__os_is_windows() 
{
    bool win = false;
    #if defined(_WIN32) || defined(_WIN64)
    win = true;
    #endif
    return win;
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
        yk__sds t__4 = yy__path_join(yk__sdsdup(yy__os_cur_path), yk__sdsdup(yy__os_bin1));
        yk__sds yy__os_full_path = yk__sdsdup(t__4);
        if (yy__path_executable(yk__sdsdup(yy__os_full_path)))
        {
            yk__sds t__5 = yy__os_full_path;
            yy__array_del_str_array(yy__os_paths);
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
            yk__sds t__6 = yy__path_join(yk__sdsdup(yy__os_cur_path), yk__sdsdup(yy__os_bin2));
            yk__sdsfree(yy__os_full_path);
            yy__os_full_path = yk__sdsdup(t__6);
            if (yy__path_exists(yk__sdsdup(yy__os_full_path)))
            {
                yk__sds t__7 = yy__os_full_path;
                yy__array_del_str_array(yy__os_paths);
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
            yk__sds t__8 = yy__path_join(yk__sdsdup(yy__os_cur_path), yk__sdsdup(yy__os_bin3));
            yk__sdsfree(yy__os_full_path);
            yy__os_full_path = yk__sdsdup(t__8);
            if (yy__path_exists(yk__sdsdup(yy__os_full_path)))
            {
                yk__sds t__9 = yy__os_full_path;
                yy__array_del_str_array(yy__os_paths);
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
    yk__sds t__11 = yy__path_join(yk__sdsdup(t__10), yk__sdsdup(yy__os_bin1));
    yk__sds yy__os_special = yk__sdsdup(t__11);
    if (yy__path_executable(yk__sdsdup(yy__os_special)))
    {
        yk__sds t__12 = yy__os_special;
        yy__array_del_str_array(yy__os_paths);
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
        yk__sds t__14 = yy__path_join(yk__sdsdup(t__13), yk__sdsdup(yy__os_bin2));
        yk__sdsfree(yy__os_special);
        yy__os_special = yk__sdsdup(t__14);
        if (yy__path_exists(yk__sdsdup(yy__os_special)))
        {
            yk__sds t__15 = yy__os_special;
            yy__array_del_str_array(yy__os_paths);
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
        yk__sds t__17 = yy__path_join(yk__sdsdup(t__16), yk__sdsdup(yy__os_bin3));
        yk__sdsfree(yy__os_special);
        yy__os_special = yk__sdsdup(t__17);
        if (yy__path_exists(yk__sdsdup(yy__os_special)))
        {
            yk__sds t__18 = yy__os_special;
            yy__array_del_str_array(yy__os_paths);
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
    yk__sds t__20 = yy__path_join(yk__sdsdup(t__19), yk__sdsdup(yy__os_bin1));
    yk__sdsfree(yy__os_special);
    yy__os_special = yk__sdsdup(t__20);
    if (yy__path_executable(yk__sdsdup(yy__os_special)))
    {
        yk__sds t__21 = yy__os_special;
        yy__array_del_str_array(yy__os_paths);
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
        yk__sds t__23 = yy__path_join(yk__sdsdup(t__22), yk__sdsdup(yy__os_bin2));
        yk__sdsfree(yy__os_special);
        yy__os_special = yk__sdsdup(t__23);
        if (yy__path_exists(yk__sdsdup(yy__os_special)))
        {
            yk__sds t__24 = yy__os_special;
            yy__array_del_str_array(yy__os_paths);
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
        yk__sds t__26 = yy__path_join(yk__sdsdup(t__25), yk__sdsdup(yy__os_bin3));
        yk__sdsfree(yy__os_special);
        yy__os_special = yk__sdsdup(t__26);
        if (yy__path_exists(yk__sdsdup(yy__os_special)))
        {
            yk__sds t__27 = yy__os_special;
            yy__array_del_str_array(yy__os_paths);
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
    yy__array_del_str_array(yy__os_paths);
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
int32_t yy__console_getch() 
{
    return yk__getch();
}
struct yk__bstr yy__refs_wrap_cstr_z(yy__c_CStr yy__refs_s) 
{
    struct yk__bstr t__0 = yy__refs_wrap_cstr(yy__refs_s, ((int32_t)yy__c_cstrlen(yy__refs_s)));
    return t__0;
}
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
        if (yy__cur == '\"')
        {
            yy__result = yk__append_sds_lit(yy__result, "\\\"" , 2);
        }
        else
        {
            if (yy__cur == '\\')
            {
                yy__result = yk__append_sds_lit(yy__result, "\\\\" , 2);
            }
            else
            {
                if (yy__cur == '\b')
                {
                    yy__result = yk__append_sds_lit(yy__result, "\\b" , 2);
                }
                else
                {
                    if (yy__cur == '\f')
                    {
                        yy__result = yk__append_sds_lit(yy__result, "\\f" , 2);
                    }
                    else
                    {
                        if (yy__cur == '\n')
                        {
                            yy__result = yk__append_sds_lit(yy__result, "\\n" , 2);
                        }
                        else
                        {
                            if (yy__cur == '\r')
                            {
                                yy__result = yk__append_sds_lit(yy__result, "\\r" , 2);
                            }
                            else
                            {
                                if (yy__cur == '\t')
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
    yk__sds yy__json = yk__sdsnewlen("[" , 1);
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
        yk__sds t__5 = yy__escape_js_string(yk__bstr_h((yy__0t[yy__1t])->yy__dtraverse_name));
        yk__sds t__6 = yk__concat_lit_sds("\"name\": \"", 9, t__5);
        yk__sds t__7 = yk__concat_sds_lit(t__6, "\",", 2);
        yy__json = yk__append_sds_sds(yy__json, t__7);
        yk__sds t__8 = yk__concat_lit_bstr("\"type\": \"", 9, ((yy__0t[yy__1t])->yy__dtraverse_is_dir ? yk__bstr_s("d", 1) : yk__bstr_s("f", 1)));
        yk__sds t__9 = yk__concat_sds_lit(t__8, "\"", 1);
        yy__json = yk__append_sds_sds(yy__json, t__9);
        yy__json = yk__append_sds_lit(yy__json, "}" , 1);
        if (yy__counter < (yk__arrlen(yy__entries) - INT32_C(1)))
        {
            yy__json = yk__append_sds_lit(yy__json, "," , 1);
        }
        yy__counter += INT32_C(1);
        yy__1t += INT32_C(1);
        yk__sdsfree(t__9);
        yk__sdsfree(t__8);
        yk__sdsfree(t__7);
        yk__sdsfree(t__6);
        yk__sdsfree(t__5);
    }
    yy__json = yk__append_sds_lit(yy__json, "]" , 1);
    yk__sds t__10 = yy__json;
    return t__10;
}
void yy__list_files(yy__webui_Event yy__event) 
{
    struct yy__dtraverse_Entry** yy__f = yy__dtraverse_listdir(yk__bstr_s(".", 1));
    yk__sds t__11 = yy__file_entries_to_json(yy__f);
    yk__sds yy__json = yk__sdsdup(t__11);
    yy__webui_return_string(yy__event, ((yy__c_CStr)yy__json));
    yk__sdsfree(yy__json);
    yk__sdsfree(t__11);
    return;
}
void yy__click_file(yy__webui_Event yy__event) 
{
    yy__c_CStr yy__path_cstr = yy__webui_get_string(yy__event);
    struct yk__bstr yy__path = yy__refs_wrap_cstr_z(yy__path_cstr);
    yk__sds t__12 = yy__io_readfile(yk__bstr_copy_to_sds(yy__path));
    yk__sds yy__content = yk__sdsdup(t__12);
    yy__webui_return_string(yy__event, ((yy__c_CStr)yy__content));
    yk__sdsfree(yy__content);
    yk__sdsfree(t__12);
    return;
}
void yy__change_folder(yy__webui_Event yy__event) 
{
    yy__c_CStr yy__path_cstr = yy__webui_get_string(yy__event);
    struct yk__bstr yy__path = yy__refs_wrap_cstr_z(yy__path_cstr);
    bool yy__success = yy__os_chdir(yk__bstr_copy_to_sds(yy__path));
    if (!yy__success)
    {
        yy__webui_return_string(yy__event, "Failed to change directory");
    }
    else
    {
        yy__webui_return_string(yy__event, "OK");
    }
    return;
}
int32_t yy__main() 
{
    yy__c_Size yy__mw = yy__webui_new_window();
    yk__printlnstr("created window");
    yk__sds t__13 = yy__os_which(yk__sdsnewlen("yaksha", 6));
    yk__sds yy__yaksha = yk__sdsdup(t__13);
    if (yk__cmp_sds_lit(yy__yaksha, "", 0) == 0)
    {
        yk__printlnstr("yaksha not found");
        yk__sdsfree(yy__yaksha);
        yk__sdsfree(t__13);
        return INT32_C(1);
    }
    yk__sds t__14 = yk__concat_lit_sds("yaksha binary found at: ", 24, yy__yaksha);
    yk__printlnstr(t__14);
    yy__webui_set_root_folder(yy__mw, "frontend");
    yy__webui_show(yy__mw, "index.html");
    yy__webui_bind(yy__mw, "listfiles", yy__list_files);
    yy__webui_bind(yy__mw, "clickfile", yy__click_file);
    yy__webui_bind(yy__mw, "cd", yy__change_folder);
    yk__printlnstr("waiting ... ");
    yy__webui_wait();
    yk__printlnstr("done");
    yy__webui_clean();
    yk__printlnstr("cleaned");
    yk__printlnstr("press any key to exit");
    yy__console_getch();
    yk__sdsfree(t__14);
    yk__sdsfree(yy__yaksha);
    yk__sdsfree(t__13);
    return INT32_C(0);
}
#if defined(YK__MINIMAL_MAIN)
int main(void) { return yy__main(); }
#endif