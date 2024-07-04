
# Documentation
- Class name: Resolution Multiply (JPS)
- Category: JPS Nodes/Math
- Output node: False

Resolution Multiply节点旨在通过指定的因子来缩放图像的尺寸，有效地将图像的宽度和高度乘以这个因子来生成新的尺寸。这个节点在需要调整图像分辨率的场景中非常有用，比如为不同尺寸的处理或显示准备图像。

# Input types
## Required
- width
    - 指定图像的原始宽度。宽度会被因子缩放以计算新的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定图像的原始高度。高度会被因子缩放以计算新的高度。
    - Comfy dtype: INT
    - Python dtype: int
- factor
    - 用于缩放图像宽度和高度的乘数。大于1的因子会增加图像尺寸，而小于1的因子会减小图像尺寸（尽管节点的约束不允许缩小）。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- width_resized
    - 图像按指定因子缩放后的新宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height_resized
    - 图像按指定因子缩放后的新高度。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Math_Resolution_Multiply:
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "width": ("INT", {"default": 1024, "min": 256, "max": 8192, "step": 16}),
                "height": ("INT", {"default": 1024, "min": 256, "max": 8192, "step": 16}),
                "factor": ("INT", {"default": 2, "min": 1, "max": 8, "step": 1}),
        }}
    RETURN_TYPES = ("INT","INT")
    RETURN_NAMES = ("width_resized", "height_resized")
    FUNCTION = "get_newres"

    CATEGORY="JPS Nodes/Math"

    def get_newres(self,width,height,factor):
        factor = int(factor)
        width = int(width)
        width_resized = int(width) * int(factor)
        height = int(height)
        height_resized = int (height) * int(factor)
            
        return(int(width_resized),int(height_resized))

```
