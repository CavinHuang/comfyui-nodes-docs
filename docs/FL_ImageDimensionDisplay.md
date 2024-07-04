
# Documentation
- Class name: FL_ImageDimensionDisplay
- Category: 🏵️Fill Nodes
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

FL_ImageDimensionDisplay节点旨在计算和显示图像的尺寸,支持各种格式的单张图像和批量图像。它抽象了处理不同图像表示形式的复杂性,提供了一种直观的方式来获取图像尺寸。

# Input types
## Required
- image
    - 图像输入对于确定提供的图像尺寸至关重要。它支持张量和PIL图像格式,根据输入类型调整其处理方式,以准确返回图像尺寸。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, Image.Image]

# Output types
- string
    - 输出提供的图像尺寸作为字符串,格式化包括宽度和高度。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FL_ImageDimensionDisplay:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {}),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "display_dimensions"
    CATEGORY = "🏵️Fill Nodes"

    def display_dimensions(self, image):
        # Check the number of dimensions in the image tensor to correctly unpack the dimensions
        if isinstance(image, torch.Tensor):
            if image.dim() == 4:  # Batch dimension is present
                _, height, width, _, = image.shape
            elif image.dim() == 3:  # No batch dimension, single image
                _, height, width = image.shape
            else:
                return ("Unsupported tensor format",)
        elif isinstance(image, Image.Image):
            width, height = image.size
        else:
            return ("Unsupported image format",)

        # Correctly assign width and height
        dimensions = f"Width: {width}, Height: {height}"

        # Display dimensions in the UI. This might need to be adapted.
        print(dimensions)

        # Return the dimensions as a string.
        return (dimensions,)

```
