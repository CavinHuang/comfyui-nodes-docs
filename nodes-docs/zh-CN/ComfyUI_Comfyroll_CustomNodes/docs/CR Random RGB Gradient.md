# Documentation
- Class name: CR_RandomRGBGradient
- Category: Comfyroll/Utils/Random
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_RandomRGBGradient 是一个用于生成随机 RGB 渐变的节点。它通过创建一系列平滑过渡的 RGB 值来操作，从一个颜色过渡到下一个颜色，确保了视觉上吸引人的渐变效果。该节点特别适用于需要为项目提供动态和多样化配色方案的设计师和开发者。

# Input types
## Required
- seed
    - “seed”参数对于节点的随机数生成过程至关重要。它确保生成的 RGB 值是可复现的，允许在不同运行中获得一致的结果。这在需要多次生成相同渐变的场景中尤为重要。
    - Comfy dtype: INT
    - Python dtype: int
- rows
    - “rows”参数决定了生成渐变中的颜色停止数量。较高的值会导致更详细的渐变，其中包含更多的中间颜色，而较低的值则会导致更简单的渐变，颜色过渡较少。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- multiline_text
    - “multiline_text”输出包含以多行格式生成的 RGB 渐变数据。每一行代表渐变中的一个颜色停止，RGB 值由逗号分隔。这种格式方便在需要逐行输入渐变数据的各种应用程序中使用。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - “show_help”输出提供了指向节点文档页面的 URL 链接。这对于需要额外信息或有效使用节点的指导的用户非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_RandomRGBGradient:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'rows': ('INT', {'default': 5, 'min': 1, 'max': 2048})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('multiline_text', 'show_help')
    FUNCTION = 'generate'
    CATEGORY = icons.get('Comfyroll/Utils/Random')

    def generate(self, rows, seed):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-random-RGB-gradient'
        random.seed(seed)
        temp = 0
        multiline_text = ''
        for i in range(1, rows + 1):
            print(temp)
            if temp <= 99 - rows + i:
                upper_bound = min(99, temp + (99 - temp) // (rows - i + 1))
                current_value = random.randint(temp, upper_bound)
                multiline_text += f'{current_value}:{random.randint(0, 255)},{random.randint(0, 255)},{random.randint(0, 255)}\n'
                temp = current_value + 1
        return (multiline_text, show_help)
```