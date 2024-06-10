# Documentation
- Class name: CR_StringToNumber
- Category: Comfyroll/Utils/Conversion
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_StringToNumber节点旨在将给定的字符串转换为数字格式，可以是整数或浮点数。它通过提供舍入选项来处理数字字符串，从而确保输出满足特定要求，提供了灵活性。

# Input types
## Required
- text
    - ‘text’参数是需要转换为数字的字符串。它是节点操作的基本输入，因为它直接影响转换过程和最终的数字结果。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- round_integer
    - ‘round_integer’参数决定了如果需要，字符串如何四舍五入为整数。它可以设置为‘round’进行标准四舍五入，‘round down’始终向下取整，或‘round up’始终向上取整，影响整数输出的精度和准确性。
    - Comfy dtype: COMBO['round', 'round down', 'round up']
    - Python dtype: str

# Output types
- INT
    - ‘INT’输出代表根据指定的舍入方法转换为整数的字符串。对于需要整数数值的应用程序来说，它是重要的。
    - Comfy dtype: INT
    - Python dtype: int
- FLOAT
    - ‘FLOAT’输出是转换为浮点数的字符串。它保留了原始字符串的小数精度，对于需要精确数值的应用程序非常有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - ‘show_help’输出提供了一个URL链接到文档以获得进一步的帮助。对于寻求如何使用节点或解决问题的用户的来说，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_StringToNumber:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': False, 'default': 'text', 'forceInput': True}), 'round_integer': (['round', 'round down', 'round up'],)}}
    RETURN_TYPES = ('INT', 'FLOAT', 'STRING')
    RETURN_NAMES = ('INT', 'FLOAT', 'show_help')
    FUNCTION = 'convert'
    CATEGORY = icons.get('Comfyroll/Utils/Conversion')

    def convert(self, text, round_integer):
        if text.startswith('-') and text[1:].replace('.', '', 1).isdigit():
            float_out = -float(text[1:])
        elif text.replace('.', '', 1).isdigit():
            float_out = float(text)
        else:
            print(f'[Error] CR String To Number. Not a number.')
            return {}
        if round_integer == 'round up':
            if text.startswith('-'):
                int_out = int(float_out)
            else:
                int_out = int(float_out) + 1
        elif round_integer == 'round down':
            if text.startswith('-'):
                int_out = int(float_out) - 1
            else:
                int_out = int(float_out)
        else:
            int_out = round(float_out)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-string-to-number'
        return (int_out, float_out, show_help)
```