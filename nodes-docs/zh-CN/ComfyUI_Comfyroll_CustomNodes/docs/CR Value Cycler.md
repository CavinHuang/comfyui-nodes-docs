# Documentation
- Class name: CR_ValueCycler
- Category: Comfyroll/List
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ValueCycler 是一个节点，旨在迭代一个字符串值列表，将每个字符串转换为浮点数和整数表示。它循环遍历提供的文本值，重复指定次数的过程，并在设置的迭代次数内循环遍历列表。这个节点特别适用于处理文本格式的数值数据，使其在后续操作中更容易处理和分析。

# Input types
## Required
- values
    - ‘values’参数是一个多行字符串，包含要处理的数值数据。它至关重要，因为它作为节点迭代和转换为数值格式的输入数据集。
    - Comfy dtype: STRING
    - Python dtype: str
- repeats
    - ‘repeats’参数指示节点将为列表中的每个项目重复循环处理的次数。它很重要，因为它控制数据处理的范围，并且可能会影响输出大小。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- loops
    - ‘loops’参数指定循环处理将发生的总次数。它是一个可选设置，可用于进一步控制节点的操作和输出生成。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- FLOAT
    - ‘FLOAT’输出提供将输入文本值转换为浮点数的列表，便于进行数值分析和处理。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- INT
    - ‘INT’输出由输入文本值转换为整数组成，为数据处理提供了另一种数值格式。
    - Comfy dtype: INT
    - Python dtype: List[int]
- show_text
    - ‘show_text’输出是一个字符串，提供了指向节点文档的链接，帮助用户理解节点的功能和用法。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ValueCycler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'values': ('STRING', {'multiline': True, 'default': ''}), 'repeats': ('INT', {'default': 1, 'min': 1, 'max': 99999}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 99999})}}
    RETURN_TYPES = ('FLOAT', 'INT', 'STRING')
    RETURN_NAMES = ('FLOAT', 'INT', 'show_text')
    OUTPUT_IS_LIST = (True, True, False)
    FUNCTION = 'cycle'
    CATEGORY = icons.get('Comfyroll/List')

    def cycle(self, values, repeats, loops=1):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-value-cycler'
        lines = values.split('\n')
        float_list_out = []
        int_list_out = []
        for i in range(loops):
            for _ in range(repeats):
                for text_item in lines:
                    if all((char.isdigit() or char == '.' for char in text_item.strip())):
                        float_list_out.append(float(text_item))
                        int_list_out.append(int(float(text_item)))
        return (float_list_out, int_list_out, show_help)
```