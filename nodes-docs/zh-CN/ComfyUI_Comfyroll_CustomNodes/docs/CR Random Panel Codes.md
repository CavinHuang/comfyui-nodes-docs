# Documentation
- Class name: CR_RandomPanelCodes
- Category: Comfyroll/Utils/Random
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_RandomPanelCodes 是一个用于生成基于用户定义参数的随机面板代码列表的节点。它通过创建指定数量的行，每行包含给定长度的字符字符串来运行。该节点通过使用随机数生成器的种子确保输出的随机性，并允许定制用于形成代码的字符集。

# Input types
## Required
- seed
    - seed 参数初始化随机数生成器，确保生成的随机代码是可重现的。它在节点的执行中起着关键作用，通过为随机化过程提供一个一致的起点，这对于在不同运行中生成相同的代码集至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- rows
    - rows 参数确定生成的面板代码中的行数。它直接影响节点生成的代码数量。调整此参数允许用户控制输出的大小，满足他们对代码生成的具体需求。
    - Comfy dtype: INT
    - Python dtype: int
- string_length
    - string_length 参数指定生成的面板代码中每个字符串的长度。它很重要，因为它决定了每个代码的复杂性和唯一性。通过改变这个参数，用户可以影响所产生代码的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- values
    - values 参数定义了构建面板代码的字符集。它至关重要，因为它决定了用于生成代码的字符池。此参数允许定制代码的组成，适应不同应用的各种需求。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- multiline_text
    - multiline_text 输出包含在多行中排列的生成的面板代码，为用户提供了一种可读且有序的格式。这个输出很重要，因为它代表了节点操作的主要结果，以结构化的方式封装了随机代码。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - show_help 输出提供了指向节点文档的 URL 链接。这对于寻求有关如何有效使用节点的额外信息或指导的用户来说很有用。它作为节点文档的直接参考，方便了使用和理解。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_RandomPanelCodes:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'rows': ('INT', {'default': 5, 'min': 1, 'max': 2048}), 'string_length': ('INT', {'default': 5, 'min': 1, 'max': 1024}), 'values': ('STRING', {'multiline': False, 'default': '123'})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('multiline_text', 'show_help')
    FUNCTION = 'generate'
    CATEGORY = icons.get('Comfyroll/Utils/Random')

    def generate(self, rows, string_length, values, seed):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-random-panel-codes'
        random.seed(seed)
        start_letter = random.choice('HV')
        value_range = random.choice(values)
        codes = []
        for _ in range(rows):
            number = ''.join((random.choice(values) for _ in range(string_length)))
            codes.append(f'{start_letter}{number}')
        multiline_text = '\n'.join(codes)
        return (multiline_text, show_help)
```