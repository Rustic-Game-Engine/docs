"""Optional parse checks using Python AST and the host's Lua 5.4 library."""
import ast
import ctypes
import ctypes.util
import json
import sys

snippets = json.load(sys.stdin)
library = ctypes.util.find_library("lua5.4")
lua = ctypes.CDLL(library) if library else None
if lua:
    lua.luaL_newstate.restype = ctypes.c_void_p
    lua.luaL_loadbufferx.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_size_t, ctypes.c_char_p, ctypes.c_char_p]
    lua.lua_tolstring.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.c_void_p]
    lua.lua_tolstring.restype = ctypes.c_char_p
    lua.lua_close.argtypes = [ctypes.c_void_p]
counts = {"python": 0, "lua": 0}
errors = []
for snippet in snippets:
    language = snippet["language"]
    if language == "python":
        counts[language] += 1
        try:
            ast.parse(snippet["code"])
        except SyntaxError as error:
            errors.append(f"{snippet['slug']}/{snippet['index']}: {error}")
    elif language == "lua" and lua:
        counts[language] += 1
        state = lua.luaL_newstate()
        try:
            source = snippet["code"].encode()
            if lua.luaL_loadbufferx(state, source, len(source), snippet["slug"].encode(), b"t"):
                errors.append(lua.lua_tolstring(state, -1, None).decode())
        finally:
            lua.lua_close(state)
if errors:
    print("\n".join(errors), file=sys.stderr)
    sys.exit(1)
print(f"Syntax passes: {counts['python']} Python and {counts['lua']} Lua snippets (not engine execution).")
if not lua:
    print("Lua parse checks skipped: install a host Lua 5.4 shared library to enable them.")
