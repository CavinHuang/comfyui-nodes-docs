
# Documentation
- Class name: Fans Text Concatenate
- Category: utils
- Output node: False

Fans Text Concatenate节点用于将多个文本输入拼接成一个单一字符串，可选择在每个文本段之间添加换行符。它允许灵活的文本操作和聚合，适用于准备文本数据以供进一步处理或显示。

# Input types
## Required
- linebreak_addition
    - 决定是否在每个拼接的文本段之间添加换行符。"true"值会插入换行符，而"false"则直接拼接文本。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- prompt
    - 作为拼接过程起始的初始文本。它作为其他文本追加的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- text_a
    - 在prompt之后拼接的第一个文本（如果提供了prompt）。
    - Comfy dtype: STRING
    - Python dtype: str
- text_b
    - 在之前文本之后拼接的第二个文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_c
    - 拼接的第三个文本，继续文本聚合序列。
    - Comfy dtype: STRING
    - Python dtype: str
- text_d
    - 拼接序列中的第四个文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_e
    - 要拼接的第五个文本，进一步延长文本字符串。
    - Comfy dtype: STRING
    - Python dtype: str
- text_f
    - 要添加到拼接字符串中的第六个文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_g
    - 拼接顺序中的第七个文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_h
    - 要拼接的第八个文本，为字符串添加更多内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_i
    - 序列中的第九个文本，进一步延长拼接的字符串。
    - Comfy dtype: STRING
    - Python dtype: str
- text_j
    - 要拼接的第十个也是最后一个文本，完成文本聚合过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 最终拼接的文本字符串，由最多十个单独的文本输入和可选的换行符组成。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FansTextConcatenate:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "linebreak_addition": (['false','true'], {"default":"false"} ),
            },
            "optional": {
                "prompt": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_a": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_b": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_c": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_d": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_e": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_f": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_g": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_h": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_i": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_j": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "text_concatenate"
    CATEGORY = "utils"

    def text_concatenate(self, prompt=None, text_a=None, text_b=None, text_c=None, text_d=None, text_e=None, text_f=None, text_g=None, text_h=None, text_i=None, text_j=None, linebreak_addition='false'):
        return_text = ''
        
        if prompt:
            return_text = prompt + ("\n" if linebreak_addition == 'true' else '')
        if text_a:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_a
        if text_b:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_b
        if text_c:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_c
        if text_d:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_d
        if text_e:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_e
        if text_f:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_f
        if text_g:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_g
        if text_h:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_h
        if text_i:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_i
        if text_j:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_j
        return (return_text, )

```
