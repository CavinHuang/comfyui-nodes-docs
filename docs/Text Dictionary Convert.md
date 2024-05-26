# Documentation
- Class name: WAS_Dictionary_Convert
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

`dictionary_convert` 方法旨在将字典的字符串表示形式转换为可用的字典对象。它在基于文本的应用程序的预处理阶段中起着关键作用，确保输入数据被正确格式化以供后续处理使用。

# Input types
## Required
- dictionary_text
    - 参数 `dictionary_text` 是必需的，因为它提供了需要转换为字典的原始文本。其正确的格式化对于节点功能的成功执行至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- converted_dictionary
    - 输出 `converted_dictionary` 非常重要，因为它代表了转换过程中生成的结构化字典对象。它已准备好在应用程序中的后续操作中使用。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Dictionary_Convert:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'dictionary_text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False})}}
    RETURN_TYPES = ('DICT',)
    FUNCTION = 'dictionary_convert'
    CATEGORY = 'WAS Suite/Text'

    def dictionary_convert(self, dictionary_text):
        return (ast.literal_eval(dictionary_text),)
```