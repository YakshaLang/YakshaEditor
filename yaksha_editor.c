// YK:console#
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
yk__sds yy__io_readfile(yk__sds);
int32_t yy__console_getch();
struct yk__bstr yy__refs_wrap_cstr_z(yy__c_CStr);
yk__sds yy__append_char(struct yk__bstr, int32_t);
yk__sds yy__escape_js_string(struct yk__bstr);
yk__sds yy__file_entries_to_json(struct yy__dtraverse_Entry**);
void yy__list_files(yy__webui_Event);
void yy__click_file(yy__webui_Event);
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
int32_t yy__main() 
{
    yy__c_Size yy__mw = yy__webui_new_window();
    yk__printlnstr("created window");
    yy__webui_set_root_folder(yy__mw, "frontend");
    yy__webui_show(yy__mw, "index.html");
    yy__webui_bind(yy__mw, "listfiles", yy__list_files);
    yy__webui_bind(yy__mw, "clickfile", yy__click_file);
    yk__printlnstr("waiting ... ");
    yy__webui_wait();
    yk__printlnstr("done");
    yy__webui_clean();
    yk__printlnstr("cleaned");
    yk__printlnstr("press any key to exit");
    yy__console_getch();
    return INT32_C(0);
}
#if defined(YK__MINIMAL_MAIN)
int main(void) { return yy__main(); }
#endif