# Documentation
- Class name: SDXLResolution
- Category: math/graphics
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

该节点旨在解析分辨率字符串并将其转换为相应的宽度和高度的整数值。它在确保图形输出遵循指定尺寸方面发挥关键作用，促进视觉元素在系统中的无缝集成。

# Input types
## Required
- resolution
    - 分辨率参数至关重要，因为它定义了图形输出的尺寸。预期它是一个格式为'宽度x高度'的字符串，节点随后将将其分解为单独的宽度和高度值。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- width
    - 宽度输出参数代表图形分辨率的水平维度。它很重要，因为它直接影响应用程序或显示中视觉内容的缩放和布局。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度输出参数表示图形分辨率的垂直维度。它对于确定视觉内容的垂直范围和确保适当的显示格式至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLResolution:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'resolution': ([f'{res[0]}x{res[1]}' for res in SDXL_SUPPORTED_RESOLUTIONS],)}}
    RETURN_TYPES = ('INT', 'INT')
    RETURN_NAMES = ('width', 'height')
    FUNCTION = 'op'
    CATEGORY = 'math/graphics'

    def op(self, resolution: str) -> tuple[int, int]:
        (width, height) = resolution.split('x')
        return (int(width), int(height))
```