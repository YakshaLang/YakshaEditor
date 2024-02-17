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
#define yy__c_Size size_t
#define yy__c_CStr char*
#define yy__c_CInt int
#define yy__webui_new_window webui_new_window
#define yy__webui_show webui_show
#define yy__webui_wait webui_wait
#define yy__webui_set_root_folder webui_set_root_folder
#define yy__webui_clean webui_clean
struct yy__dtraverse_Entry** yy__dtraverse_listdir(struct yk__bstr);
int32_t yy__console_getch();
yy__c_CStr const  yy__refs_unwrap(struct yk__bstr);
struct yk__bstr yy__refs_wrap_cstr(yy__c_CStr, int32_t);
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
        struct yk__bstr yy__dtraverse_name = yy__refs_wrap_cstr(yy__dtraverse_de->d_name, ((int32_t)yy__dtraverse_de->d_namlen));
        struct yy__dtraverse_Entry* yy__dtraverse_item = calloc(1, sizeof(struct yy__dtraverse_Entry));
        yy__dtraverse_item->yy__dtraverse_name = yk__bstr_copy_to_sds(yy__dtraverse_name);
        yy__dtraverse_item->yy__dtraverse_is_dir = (yy__dtraverse_de->d_type == yy__dtraverse_DT_DIR);
        yk__arrput(yy__dtraverse_entries, yy__dtraverse_item);
    }
    struct yy__dtraverse_Entry** t__4 = yy__dtraverse_entries;
    yy__dtraverse_closedir(yy__dtraverse_p);
    return t__4;
}
int32_t yy__console_getch() 
{
    return yk__getch();
}
yy__c_CStr const  yy__refs_unwrap(struct yk__bstr nn__a) { return yk__bstr_get_reference(nn__a); }
struct yk__bstr yy__refs_wrap_cstr(yy__c_CStr nn__s, int32_t nn__length) { return yk__bstr_c(nn__s, nn__length); }
int32_t yy__main() 
{
    struct yy__dtraverse_Entry** yy__f = yy__dtraverse_listdir(yk__bstr_s(".", 1));
    yy__c_Size yy__mw = yy__webui_new_window();
    yk__printlnstr("created window");
    yy__webui_set_root_folder(yy__mw, "frontend");
    yy__webui_show(yy__mw, "index.html");
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