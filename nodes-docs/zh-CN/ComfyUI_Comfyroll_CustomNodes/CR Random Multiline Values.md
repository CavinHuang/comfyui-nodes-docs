# Documentation
- Class name: CR_RandomMultilineValues
- Category: Comfyroll/Utils/Random
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_RandomMultilineValues 节点旨在根据指定的值类型和格式化选项生成随机多行文本。它可以产生各种格式的字符串，如二进制、十进制、自然数、十六进制、字母、字母数字或自定义。节点允许设置行数和每行字符串的长度，确保输出根据不同用例进行调整，具有高度的通用性。

# Input types
## Required
- seed
    - seed 参数用于初始化随机数生成器以产生可重复的结果。它对于确保生成的随机文本的一致性至关重要，尤其是在调试或需要相同序列的随机值时。
    - Comfy dtype: INT
    - Python dtype: int
- value_type
    - 值类型参数决定了生成文本的格式。它可以设置为二进制、十进制、自然数、十六进制、字母、字母数字或自定义，这决定了用于随机文本生成的字符集。
    - Comfy dtype: STRING
    - Python dtype: str
- rows
    - 行数参数指定了生成文本中的行数。它直接影响输出的长度，允许用户控制生成的数据量。
    - Comfy dtype: INT
    - Python dtype: int
- string_length
    - 字符串长度参数定义了生成文本中每行的字符数。它对于设置各个文本字符串的粒度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- custom_values
    - 当值类型设置为自定义时，custom_values 参数允许用户定义自己的字符集以生成随机文本。这为需要非标准字符集的特定用例提供了灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- prepend_text
    - prepend_text 参数在生成的文本的每一行开头添加一个固定字符串。这对于添加输出的前缀非常有用，这对于格式化或上下文目的可能很重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- multiline_text
    - multiline_text 输出包含生成的随机文本，根据指定的行数和字符串长度参数格式化为多行。它代表了节点操作的主要结果。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - show_help 输出提供了指向节点文档页面的 URL 链接，为用户提供了关于如何有效使用该节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_RandomMultilineValues:

    @classmethod
    def INPUT_TYPES(cls):
        types = ['binary', 'decimal', 'natural', 'hexadecimal', 'alphabetic', 'alphanumeric', 'custom']
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'value_type': (types,), 'rows': ('INT', {'default': 5, 'min': 1, 'max': 2048}), 'string_length': ('INT', {'default': 5, 'min': 1, 'max': 1024}), 'custom_values': ('STRING', {'multiline': False, 'default': '123ABC'}), 'prepend_text': ('STRING', {'multiline': False, 'default': ''})}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('multiline_text', 'show_help')
    FUNCTION = 'generate'
    CATEGORY = icons.get('Comfyroll/Utils/Random')

    def generate(self, value_type, rows, string_length, custom_values, seed, prepend_text):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-random-multiline-values'
        random.seed(seed)
        if value_type == 'binary':
            choice_str = '01'
        elif value_type == 'decimal':
            choice_str = '0123456789'
        elif value_type == 'natural':
            choice_str = '123456789'
        elif value_type == 'hexadecimal':
            choice_str = '0123456789ABCDEF'
        elif value_type == 'alphabetic':
            choice_str = string.ascii_letters
        elif value_type == 'alphanumeric':
            choice_str = string.ascii_letters + string.digits
        elif value_type == 'custom':
            choice_str = custom_values
        else:
            pass
        multiline_text = '\n'.join([prepend_text + ''.join((random.choice(choice_str) for _ in range(string_length))) for _ in range(rows)])
        return (multiline_text, show_help)
```