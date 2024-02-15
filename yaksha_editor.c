// YK
#include "yk__lib.h"
// --forward declarations-- 
#define yy__c_Size size_t
#define yy__c_CStr char*
#define yy__webui_new_window webui_new_window
#define yy__webui_show webui_show
#define yy__webui_wait webui_wait
#define yy__webui_set_root_folder webui_set_root_folder
#define yy__webui_clean webui_clean
yy__c_CStr const  yy__refs_unwrap(struct yk__bstr);
int32_t yy__main();
// --structs-- 
// --functions-- 
yy__c_CStr const  yy__refs_unwrap(struct yk__bstr nn__a) { return yk__bstr_get_reference(nn__a); }
int32_t yy__main() 
{
    yy__c_Size yy__mw = yy__webui_new_window();
    yy__webui_set_root_folder(yy__mw, yy__refs_unwrap(yk__bstr_s("frontend", 8)));
    yy__webui_show(yy__mw, yy__refs_unwrap(yk__bstr_s("index.html", 10)));
    yy__webui_wait();
    yy__webui_clean();
    return INT32_C(0);
}
#if defined(YK__MINIMAL_MAIN)
int main(void) { return yy__main(); }
#endif