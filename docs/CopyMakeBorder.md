
# Documentation
- Class name: CopyMakeBorder
- Category: Bmad/CV/Misc
- Output node: False

CopyMakeBorder节点用于在图像周围添加边框。它允许自定义边框的大小和类型，为调整图像外观提供了灵活性。

# Input types
## Required
- image
    - 要添加边框的输入图像。这个参数至关重要，因为它定义了将要被修改的基础图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- border_size
    - 指定要在图像周围添加的边框大小。它影响边框的厚度，从而影响输出图像的整体尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- border_type
    - 决定要应用的边框类型。这个参数允许使用各种边框样式，影响边框的视觉外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 添加了边框的输出图像。由于边框的添加，这个图像的尺寸会增加。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CopyMakeBorderSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "border_size": ("INT", {"default": 64}),
                "border_type": (border_types_excluding_transparent, border_types[0])
            }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "make_border"
    CATEGORY = "Bmad/CV/Misc"

    def make_border(self, image, border_size, border_type):
        image = tensor2opencv(image, 0)
        image = cv.copyMakeBorder(image, border_size, border_size, border_size, border_size,
                                  border_types_map[border_type])
        image = opencv2tensor(image)
        return (image,)

```
