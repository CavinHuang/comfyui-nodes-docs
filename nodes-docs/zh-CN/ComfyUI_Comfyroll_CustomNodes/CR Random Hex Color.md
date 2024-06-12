# Documentation
- Class name: CR_RandomHexColor
- Category: Comfyroll/Utils/Random
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_RandomHexColor 节点旨在生成随机的十六进制颜色代码。它的目的是为用户提供一组独特且随机生成的颜色，这些颜色可以用于各种图形设计或视觉应用中。该节点强调在颜色选择中创造多样性，无需手动指定，从而简化了设计过程，并提供了一种方便的方式来尝试颜色变化。

# Input types
## Required
- seed
    - “seed”参数对节点的操作至关重要，因为它初始化了随机数生成器，确保生成的颜色是可复现的。这个特性对于在不同运行中保持一致性或用于调试目的特别重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- hex_color1
    - “hex_color1”输出提供了第一个随机生成的十六进制颜色代码。它之所以重要，是因为它代表了节点可以产生的多样化颜色选项之一，适用于直接在与颜色相关的应用中使用。
    - Comfy dtype: STRING
    - Python dtype: str
- hex_color2
    - “hex_color2”输出提供了第二个独特的十六进制颜色代码。与“hex_color1”一样，它旨在为用户提供不同的颜色选择，扩大了他们的项目可用的颜色范围。
    - Comfy dtype: STRING
    - Python dtype: str
- hex_color3
    - “hex_color3”输出生成了第三个不同的十六进制颜色代码。这个输出进一步增强了可以使用的颜色的多样性，为创意工作提供了更多的选择。
    - Comfy dtype: STRING
    - Python dtype: str
- hex_color4
    - “hex_color4”输出代表了第四个随机生成的十六进制颜色代码。它继续扩大颜色选择的范围，确保用户在设计需求中有多种选项可供选择。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - “show_help”输出提供了一个指向文档页面的URL链接，以供进一步帮助。对于可能需要额外指导或有关节点功能信息的用户来说，这是一个有用的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_RandomHexColor:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('hex_color1', 'hex_color2', 'hex_color3', 'hex_color4', 'show_help')
    FUNCTION = 'get_colors'
    CATEGORY = icons.get('Comfyroll/Utils/Random')

    def get_colors(self, seed):
        random.seed(seed)
        hex_color1 = random_hex_color()
        hex_color2 = random_hex_color()
        hex_color3 = random_hex_color()
        hex_color4 = random_hex_color()
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-random-hex-color'
        return (hex_color1, hex_color2, hex_color3, hex_color4, show_help)
```