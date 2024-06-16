# Documentation
- Class name: TextJoin
- Category: 😺dzNodes/LayerUtility/Data
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

将多段文字组合为一段。

# Input types

## Required

- text_1
    - 文本1。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional

- text_2
    - 文本2。
    - Comfy dtype: STRING
    - Python dtype: str

- text_3
    - 文本3。
    - Comfy dtype: STRING
    - Python dtype: str

- text_4
    - 文本4。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types

- text
    - 文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class TextJoin:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text_1": ("STRING", {"multiline": False}),

            },
            "optional": {
                "text_2": ("STRING", {"multiline": False}),
                "text_3": ("STRING", {"multiline": False}),
                "text_4": ("STRING", {"multiline": False}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "text_join"
    CATEGORY = '😺dzNodes/LayerUtility/Data'

    def text_join(self, **kwargs):

        texts = [kwargs[key] for key in kwargs if key.startswith('text')]
        combined_text = ', '.join(texts)
        return (combined_text,)
```