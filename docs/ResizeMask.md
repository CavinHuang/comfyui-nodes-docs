
# Documentation
- Class name: ResizeMask
- Category: KJNodes/masking
- Output node: False

ResizeMask节点旨在将给定的单个蒙版或一批蒙版调整至指定的尺寸，并可选择是否保持原始比例。该节点是图像处理工作流中的关键组件，适用于需要标准化或调整蒙版尺寸以进行后续处理的场景。

# Input types
## Required
- mask
    - 需要调整大小的输入蒙版或一批蒙版。这个参数是节点操作的核心，直接影响输出蒙版的尺寸和比例。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- width
    - 调整操作的目标宽度。它定义了输出蒙版的水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 调整操作的目标高度。它定义了输出蒙版的垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- keep_proportions
    - 一个布尔标志，用于指示在调整大小时是否保持蒙版的原始比例。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- mask
    - 调整大小后的蒙版或一批蒙版。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- width
    - 调整大小后蒙版的实际宽度，如果保持比例，可能与输入的目标宽度不同。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 调整大小后蒙版的实际高度，如果保持比例，可能与输入的目标高度不同。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ResizeMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "width": ("INT", { "default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 8, "display": "number" }),
                "height": ("INT", { "default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 8, "display": "number" }),
                "keep_proportions": ("BOOLEAN", { "default": False }),
            }
        }

    RETURN_TYPES = ("MASK", "INT", "INT",)
    RETURN_NAMES = ("mask", "width", "height",)
    FUNCTION = "resize"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Resizes the mask or batch of masks to the specified width and height.
"""

    def resize(self, mask, width, height, keep_proportions):
        if keep_proportions:
            _, oh, ow, _ = mask.shape
            width = ow if width == 0 else width
            height = oh if height == 0 else height
            ratio = min(width / ow, height / oh)
            width = round(ow*ratio)
            height = round(oh*ratio)
    
        outputs = mask.unsqueeze(0)  # Add an extra dimension for batch size
        outputs = F.interpolate(outputs, size=(height, width), mode="nearest")
        outputs = outputs.squeeze(0)  # Remove the extra dimension after interpolation

        return(outputs, outputs.shape[2], outputs.shape[1],)

```
