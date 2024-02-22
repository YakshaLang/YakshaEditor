import os.path
import shutil

PARENT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(PARENT, 'dist')
TARGET = os.path.join(os.path.dirname(PARENT), 'frontend')

FILES = sorted(os.listdir(SRC))

with open(os.path.join(TARGET, 'lang.bundle.js'), 'w') as outfile:
    for file in FILES:
        if not file.endswith(".js"):
            continue
        if file == "editor.worker.bundle.js":
            shutil.copy(os.path.join(SRC, file), os.path.join(TARGET, file))
            continue
        if file == "app.bundle.js":
            shutil.copy(os.path.join(SRC, file), os.path.join(TARGET, "monaco-main.bundle.js"))
            continue
        with open(os.path.join(SRC, file)) as infile:
            outfile.write(infile.read())
            outfile.write('\n')