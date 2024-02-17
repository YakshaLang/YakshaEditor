cmake_minimum_required(VERSION 3.27)
project(YakshaEditor C)

set(CMAKE_C_STANDARD 99)

get_filename_component(YK_PATH "../Yaksha/compiler" ABSOLUTE)
set(YK_RT_PATH "${YK_PATH}/runtime")
set(YK_COMPILER_PATH "${YK_PATH}/bin/yaksha")
get_filename_component(CODE_PATH "." ABSOLUTE)
set(yaksha_main "${CODE_PATH}/main.yaka")
set(yaksha_webui "${CODE_PATH}/webui.yaka")
set(yaksha_dtraverse "${CODE_PATH}/dtraverse.yaka")
set(yaksha_dialogs "${CODE_PATH}/dialogs.yaka")
set(yaksha_editor "${CODE_PATH}/yaksha_editor.c")

set(YAKSHA_RUNTIME_FILES
        ${YK_RT_PATH}/_include_bstr.h ${YK_RT_PATH}/_include_io.h ${YK_RT_PATH}/_include_mman_win.h ${YK_RT_PATH}/argparse.h ${YK_RT_PATH}/cr.h ${YK_RT_PATH}/cr_userdata.h ${YK_RT_PATH}/endianness.h ${YK_RT_PATH}/ini.h ${YK_RT_PATH}/stmmr.h ${YK_RT_PATH}/subprocess.h ${YK_RT_PATH}/tinycthread.h ${YK_RT_PATH}/toml.h ${YK_RT_PATH}/utf8proc.h ${YK_RT_PATH}/wasm4.h ${YK_RT_PATH}/whereami.h ${YK_RT_PATH}/yk__argparse.h ${YK_RT_PATH}/yk__arrayutils.h ${YK_RT_PATH}/yk__console.h ${YK_RT_PATH}/yk__cpu.h ${YK_RT_PATH}/yk__graphic_utils.h ${YK_RT_PATH}/yk__lib.h ${YK_RT_PATH}/yk__process.h ${YK_RT_PATH}/yk__system.h ${YK_RT_PATH}/yk__utf8iter.h ${YK_RT_PATH}/yk__wasm4_libc.h ${YK_RT_PATH}/argparse.c ${YK_RT_PATH}/tinycthread.c ${YK_RT_PATH}/toml.c ${YK_RT_PATH}/utf8proc.c ${YK_RT_PATH}/whereami.c ${YK_RT_PATH}/yk__argparse.c ${YK_RT_PATH}/yk__arrayutils.c ${YK_RT_PATH}/yk__console.c ${YK_RT_PATH}/yk__cpu.c ${YK_RT_PATH}/yk__graphic_utils.c ${YK_RT_PATH}/yk__main.c ${YK_RT_PATH}/yk__process.c ${YK_RT_PATH}/yk__system.c)

# --------------------------------------------------------------------------------------------------
# Compile Yaksha source
add_custom_command(OUTPUT ${yaksha_editor}
        COMMAND ${YK_COMPILER_PATH} compile ${yaksha_main} > ${yaksha_editor}
        COMMAND ${CMAKE_COMMAND} -E touch ${yaksha_editor}
        DEPENDS ${yaksha_main} ${yaksha_webui} ${yaksha_dtraverse} ${yaksha_dialogs}
        COMMENT "Compiling Yaksha source")

add_custom_target(compile_yaksha_code DEPENDS yaksha_editor.c
        COMMENT "Checking if re-compilation is required")
# --------------------------------------------------------------------------------------------------
# Compile YakshaEditor
IF (WIN32)
    include_directories(3rd/dirent/include 3rd/webui/include ${YK_RT_PATH})
ELSE()
    include_directories(3rd/webui/include ${YK_RT_PATH})
ENDIF()
add_executable(YakshaEditor ${YAKSHA_RUNTIME_FILES} 3rd/webui/src/civetweb/civetweb.c 3rd/webui/src/webui.c main.c)
target_link_libraries(YakshaEditor ws2_32)
add_dependencies(YakshaEditor compile_yaksha_code)
target_compile_features(YakshaEditor PRIVATE c_std_99)
target_compile_definitions(YakshaEditor PUBLIC UTF8PROC_STATIC)
target_compile_definitions(YakshaEditor PUBLIC NO_SSL NO_CACHING NO_CGI USE_WEBSOCKET)