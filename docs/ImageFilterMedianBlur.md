
# Documentation
- Class name: `ImageFilterMedianBlur`
- Category: `image/filter`
- Output node: `False`

ImageFilterMedianBlur节点对图像应用中值模糊滤镜，有效地降低噪点并平滑图像，同时保留边缘。这种滤镜特别适用于去除图像中的椒盐噪声。

# Input types
## Required
- **`images`**
    - 指定要处理的图像。这个参数至关重要，因为它决定了将在哪些输入上应用中值模糊效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- **`size`**
    - 定义用于中值模糊的核的大小。较大的尺寸将产生更明显的模糊效果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- **`image`**
    - 返回应用中值模糊滤镜后的图像，呈现出噪点减少、外观更平滑的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterMedianBlur:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size": ("INT", {
                    "default": 10,
                    "min": 1,
                    "step": 2
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size):
        size -= 1

        img = images.clone().detach()
        img = (img * 255).to(torch.uint8)

        return ((cv2_layer(img, lambda x: cv2.medianBlur(x, size)) / 255),)

```
