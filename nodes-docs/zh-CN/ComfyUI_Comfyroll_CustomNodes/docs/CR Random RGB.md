# Documentation
- Class name: CR_RandomRGB
- Category: Comfyroll/Utils/Random
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_RandomRGB节点旨在生成随机的RGB颜色代码。它作为需要随机颜色生成的应用程序的实用工具，例如在图形设计或视觉效果中。该节点确保每次执行都产生一组独特的颜色，增强了颜色选择的多样性和随机性。

# Input types
## Required
- seed
    - 种子参数对于初始化随机数生成器以确保生成的随机RGB颜色的可重复性至关重要。它允许用户控制随机性并在需要时获得相同的颜色集，这对于不同执行中一致的颜色方案至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- rgb_1
    - 第一个输出参数'rgb_1'提供了一个随机生成的RGB颜色代码的字符串表示。它被格式化为三个整数的逗号分隔列表，每个整数的范围从0到255，分别代表颜色的红色、绿色和蓝色组件。
    - Comfy dtype: STRING
    - Python dtype: str
- rgb_2
    - 第二个输出参数'rgb_2'提供了另一个不同随机生成的RGB颜色代码的字符串表示，类似于'rgb_1'，但具有不同的值，以确保颜色选择的多样性。
    - Comfy dtype: STRING
    - Python dtype: str
- rgb_3
    - 第三个输出参数'rgb_3'提供了另一个独特的随机生成的RGB颜色代码的字符串表示，进一步增强了不同应用程序可用颜色的多样性。
    - Comfy dtype: STRING
    - Python dtype: str
- rgb_4
    - 第四个输出参数'rgb_4'提供了另一个不同RGB颜色代码的字符串表示，增加了可以在各种场景中使用的随机颜色集合。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 'show_help'输出参数提供了一个URL链接到文档页面，以获取有关节点功能和使用的进一步帮助和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_RandomRGB:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('rgb_1', 'rgb_2', 'rgb_3', 'rgb_4', 'show_help')
    FUNCTION = 'get_colors'
    CATEGORY = icons.get('Comfyroll/Utils/Random')

    def get_colors(self, seed):
        random.seed(seed)
        rgb_1 = random_rgb()
        rgb_2 = random_rgb()
        rgb_3 = random_rgb()
        rgb_4 = random_rgb()
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-random-rgb'
        return (rgb_1, rgb_2, rgb_3, rgb_4, show_help)
```