
# Documentation
- Class name: `MaskFromList+`
- Category: `essentials`
- Output node: `False`

MaskFromList节点专门用于从值列表创建蒙版，允许通过宽度和高度参数指定蒙版尺寸。这一功能对于生成定制蒙版至关重要，可以根据特定尺寸进行调整，从而促进各种图像处理任务，如分割和条件设置。

# Input types
## Required
- values
    - values参数是一个浮点数列表，代表蒙版的强度值。这些值对定义蒙版的外观至关重要，每个值对应蒙版中像素的强度。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- width
    - width参数指定要生成的蒙版的宽度。它决定了蒙版的水平尺寸，在塑造蒙版的大小和纵横比方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height参数定义了要生成的蒙版的高度。它决定了蒙版的垂直尺寸，影响蒙版的大小和纵横比。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 输出的mask参数是基于提供的值和尺寸生成的蒙版。它代表了按照指定宽度和高度创建的自定义蒙版，适用于各种图像处理应用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskFromList:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "values": ("FLOAT", { "min": 0.0, "max": 1.0, "step": 0.01, }),
                "width": ("INT", { "default": 32, "min": 1, "max": MAX_RESOLUTION, "step": 8, }),
                "height": ("INT", { "default": 32, "min": 1, "max": MAX_RESOLUTION, "step": 8, }),
            }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, values, width, height):
        if not isinstance(values, list):
            values = [values]

        values = torch.tensor(values).float()
        values = torch.clamp(values, 0.0, 1.0)
        #values = (values - values.min()) / values.max()

        return (values.unsqueeze(1).unsqueeze(2).repeat(1, width, height), )

```
