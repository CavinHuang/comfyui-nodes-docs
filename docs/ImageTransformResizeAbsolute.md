
# Documentation
- Class name: ImageTransformResizeAbsolute
- Category: image/transform
- Output node: False

ImageTransformResizeAbsolute节点提供了将一批图像调整到指定绝对尺寸的功能，可以使用各种插值方法。它允许精确控制图像的输出大小，适用于需要统一图像尺寸的任务。

# Input types
## Required
- images
    - 需要调整大小的图像批次。这个参数至关重要，因为它直接提供了用于调整大小的原始数据，从而影响节点的操作。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- width
    - 调整后图像的目标宽度。它决定了输出图像的水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 调整后图像的目标高度。它决定了输出图像的垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 用于调整大小的插值方法。这会影响调整大小后图像的质量和特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 作为批次输出的调整大小后的图像。这个输出是调整大小操作的直接结果，提供了统一尺寸的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformResizeAbsolute:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "width": ("INT", {
                    "default": 256,
                    "min": 1,
                    "step": 1
                }),
                "height": ("INT", {
                    "default": 256,
                    "min": 1,
                    "step": 1
                }),
                "method": (["lanczos", "bicubic", "hamming", "bilinear", "box", "nearest"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, width, height, method):
        def resize_tensor(tensor):
            return tensor.tensor_to_image().resize((width, height), get_sampler_by_name(method)).image_to_tensor()

        return (torch.stack([
            resize_tensor(images[i]) for i in range(len(images))
        ]),)

```
