# Documentation
- Class name: ChromaticAberration
- Category: postprocessing/Effects
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

该节点模拟图像的色差效果，通过水平或垂直移动颜色通道来改变感知颜色，从而创建逼真的失真效果。

# Input types
## Required
- image
    - 图像参数是必需的，因为它作为施加色差效果的基础。它是决定输出视觉效果的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- red_shift
    - red_shift参数调整红色通道的水平或垂直位置，有助于整体色差效果的产生。
    - Comfy dtype: INT
    - Python dtype: int
- green_shift
    - green_shift参数影响绿色通道的位置，增强或修改色差效果以达到预期的视觉影响。
    - Comfy dtype: INT
    - Python dtype: int
- blue_shift
    - blue_shift参数控制蓝色通道的位移，这对于创建令人信服的色差效果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- red_direction
    - red_direction参数指定红色通道移动的方向，水平或垂直，以达到预期的色差效果。
    - Comfy dtype: COMBO
    - Python dtype: str
- green_direction
    - green_direction参数决定了绿色通道移动的方向，这对于准确模拟色差至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
- blue_direction
    - blue_direction参数规定了蓝色通道移动的方向，有助于整体色差效果的产生。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- output
    - 输出参数代表应用了色差效果的最终图像，展示了节点操作的视觉影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ChromaticAberration:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'red_shift': ('INT', {'default': 0, 'min': -20, 'max': 20, 'step': 1}), 'red_direction': (['horizontal', 'vertical'],), 'green_shift': ('INT', {'default': 0, 'min': -20, 'max': 20, 'step': 1}), 'green_direction': (['horizontal', 'vertical'],), 'blue_shift': ('INT', {'default': 0, 'min': -20, 'max': 20, 'step': 1}), 'blue_direction': (['horizontal', 'vertical'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'chromatic_aberration'
    CATEGORY = 'postprocessing/Effects'

    def chromatic_aberration(self, image: torch.Tensor, red_shift: int, green_shift: int, blue_shift: int, red_direction: str, green_direction: str, blue_direction: str):

        def get_shift(direction, shift):
            shift = -shift if direction == 'vertical' else shift
            return (shift, 0) if direction == 'vertical' else (0, shift)
        x = image.permute(0, 3, 1, 2)
        shifts = [get_shift(direction, shift) for (direction, shift) in zip([red_direction, green_direction, blue_direction], [red_shift, green_shift, blue_shift])]
        channels = [torch.roll(x[:, i, :, :], shifts=shifts[i], dims=(1, 2)) for i in range(3)]
        output = torch.stack(channels, dim=1)
        output = output.permute(0, 2, 3, 1)
        return (output,)
```