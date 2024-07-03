
# Documentation
- Class name: ImageConstant
- Category: image/filters
- Output node: False

ImageConstant节点旨在生成具有固定颜色的图像。它允许用户以RGB格式指定颜色，同时设定图像尺寸和批量大小，从而能够在一次操作中创建多个具有相同颜色规格的图像。

# Input types
## Required
- width
    - 指定生成图像的宽度。它决定了输出图像的水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 确定生成图像的高度，影响其垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 表示一次批处理中要生成的图像数量，允许同时创建多张图像。
    - Comfy dtype: INT
    - Python dtype: int
- red
    - 设置生成图像的固定颜色中的红色分量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- green
    - 定义生成图像的固定颜色中的绿色分量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blue
    - 指定生成图像的固定颜色中的蓝色分量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出为具有指定RGB格式固定颜色的单张图像或一批图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageConstant:
    def __init__(self, device="cpu"):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "width": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                              "height": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096}),
                              "red": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                              "green": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                              "blue": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                              }}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "generate"

    CATEGORY = "image/filters"

    def generate(self, width, height, batch_size, red, green, blue):
        r = torch.full([batch_size, height, width, 1], red)
        g = torch.full([batch_size, height, width, 1], green)
        b = torch.full([batch_size, height, width, 1], blue)
        return (torch.cat((r, g, b), dim=-1), )

```
