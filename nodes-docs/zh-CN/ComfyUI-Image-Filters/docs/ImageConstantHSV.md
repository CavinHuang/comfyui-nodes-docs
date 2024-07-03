
# Documentation
- Class name: `ImageConstantHSV`
- Category: `image/filters`
- Output node: `False`

ImageConstantHSV节点用于生成基于指定HSV（色相、饱和度、明度）颜色值的纯色图像。它允许创建具有可调节颜色属性的均匀色彩图像，从而能够生成具有精确色调的图像。

# Input types
## Required
- **`width`**
    - 指定生成图像的宽度。它决定了输出图像的水平尺寸。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - 指定生成图像的高度。它决定了输出图像的垂直尺寸。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - 确定在单个批次中生成的图像数量。这允许同时生成多个具有相同颜色属性的图像。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`hue`**
    - 设置HSV颜色模型中的色相分量，定义了颜色的基本色调。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`saturation`**
    - 设置HSV颜色模型中的饱和度分量，控制颜色的强度。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`value`**
    - 设置HSV颜色模型中的明度分量，决定颜色的亮度。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`

# Output types
- **`image`**
    - 基于指定HSV值生成的纯色图像。
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageConstantHSV:
    def __init__(self, device="cpu"):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "width": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                              "height": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096}),
                              "hue": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                              "saturation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                              "value": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                              }}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "generate"

    CATEGORY = "image/filters"

    def generate(self, width, height, batch_size, hue, saturation, value):
        red, green, blue = hsv_to_rgb(hue, saturation, value)
        
        r = torch.full([batch_size, height, width, 1], red)
        g = torch.full([batch_size, height, width, 1], green)
        b = torch.full([batch_size, height, width, 1], blue)
        return (torch.cat((r, g, b), dim=-1), )

```
