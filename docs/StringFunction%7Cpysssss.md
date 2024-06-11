# String Function 🐍
## Documentation
- Class name: StringFunction|pysssss
- Category: utils
- Output node: True
- Repo Ref: https://github.com/pythongosssss/ComfyUI-Custom-Scripts

String Function节点提供了操作字符串的实用工具，包括追加、替换以及可选的标签清理。它将复杂的字符串操作抽象为一个简单的界面，满足各种文本处理需求。

## Input types
### Required
- action
    - 指定要执行的字符串操作，如在文本输入中追加或替换内容。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Tuple[List[str], Dict]
- tidy_tags
    - 决定是否清理文本输入中的HTML标签，提供整理或保持原样的选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Tuple[List[str], Dict]
- text_a
    - 用于操作的主要文本输入。
    - Comfy dtype: STRING
    - Python dtype: str
- text_b
    - 用于操作的次要文本输入，与'text_a'一起使用。
    - Comfy dtype: STRING
    - Python dtype: str

### Optional
- text_c
    - 可选的第三个文本输入用于操作。
    - Comfy dtype: STRING
    - Python dtype: str

## Output types
- string
    - Comfy dtype: STRING
    - 字符串操作的结果，作为单个字符串返回。
    - Python dtype: str

## Usage tips
- Infra type: CPU
<!-- - Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md) -->

## Source code
```python
class StringFunction:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "action": (["append", "replace"], {}),
                "tidy_tags": (["yes", "no"], {}),
                "text_a": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                "text_b": ("STRING", {"multiline": True, "dynamicPrompts": False}),
            },
            "optional": {
                "text_c": ("STRING", {"multiline": True, "dynamicPrompts": False})
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "exec"
    CATEGORY = "utils"
    OUTPUT_NODE = True

    def exec(self, action, tidy_tags, text_a, text_b, text_c=""):
        # Converted inputs are sent as the string of 'undefined' if not connected
        if text_a == "undefined":
            text_a = ""
        if text_b == "undefined":
            text_b = ""
        if text_c == "undefined":
            text_c = ""

        tidy_tags = tidy_tags == "yes"
        out = ""
        if action == "append":
            out = (", " if tidy_tags else "").join(filter(None, [text_a, text_b, text_c]))
        else:
           if text_c is None:
               text_c = ""
           if text_b.startswith("/") and text_b.endsWith("/"):
               regex = text_b[1:-1]
               out = re.sub(regex, text_c, text_a)
           else:
               out = text_a.replace(text_b, text_c)
        if tidy_tags:
            out = out.replace("  ", " ").replace(" ,", ",").replace(",,", ",").replace(",,", ",")
        return {"ui": {"text": (out,)}, "result": (out,)}