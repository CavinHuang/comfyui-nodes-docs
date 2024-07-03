
# Documentation
- Class name: ImageMuxer
- Category: Art Venture/Utils
- Output node: False

ImageMuxer节点的设计目的是根据给定的选择器索引从最多四个输入图像中选择并输出一个图像。这一功能对于需要动态图像选择的场景至关重要,例如在图像处理流程或条件性图像渲染任务中。

# Input types
## Required
- image_i
    - 代表最多四个图像输入中的一个,作为基于选择器索引的潜在输出。这种泛化涵盖了所有图像输入,允许从多个来源进行动态选择。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- input_selector
    - 一个整数索引,用于确定选择哪一个输入图像作为输出。这个选择器驱动了动态选择过程。
    - Comfy dtype: INT
    - Python dtype: int
## Optional

# Output types
- image
    - 基于输入选择器索引选择的图像。这个输出便于在各种应用中进行动态图像选择。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilImageMuxer:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image_1": ("IMAGE",),
                "image_2": ("IMAGE",),
                "input_selector": ("INT", {"default": 0}),
            },
            "optional": {"image_3": ("IMAGE",), "image_4": ("IMAGE",)},
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_muxer"

    def image_muxer(self, image_1, image_2, input_selector, image_3=None, image_4=None):
        images = [image_1, image_2, image_3, image_4]
        return (images[input_selector],)

```
