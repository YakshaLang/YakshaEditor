// YK:console#
#include "yk__lib.h"
// --forward declarations-- 
#define yy__c_Size size_t
#define yy__c_CStr char*
#define yy__webui_new_window webui_new_window
#define yy__webui_show webui_show
#define yy__webui_wait webui_wait
#define yy__webui_set_root_folder webui_set_root_folder
#define yy__webui_clean webui_clean
int32_t yy__console_getch();
int32_t yy__main();
// --structs-- 
// --functions-- 
int32_t yy__console_getch() 
{
    return yk__getch();
}
int32_t yy__main() 
{
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