
# Documentation
- Class name: ImageFilterBilateralBlur
- Category: image/filter
- Output node: False

ImageFilterBilateralBlur节点对图像应用双边滤波，这是一种在减少噪声的同时保持边缘锐利的处理过程。它通过同时考虑空间邻近性和像素值差异来实现这一效果。

# Input types
## Required
- images
    - 需要处理的图像。这是定义双边滤波将应用于哪些视觉内容的关键输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size
    - 指定过滤过程中使用的每个像素邻域的直径。较大的尺寸意味着每个目标像素会考虑更多的像素，可能导致更强的平滑效果。
    - Comfy dtype: INT
    - Python dtype: int
- sigma_color
    - 控制图像的色彩空间对双边滤波的影响程度。较高的值允许具有较大强度差异的像素相互影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sigma_intensity
    - 决定图像中影响双边滤波的强度（亮度）差异范围。较高的值会导致更多像素基于其强度差异相互影响。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 应用双边模糊滤波器后处理得到的图像，旨在减少噪声同时保留边缘。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterBilateralBlur:
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
                "sigma_color": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "sigma_intensity": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size, sigma_color, sigma_intensity):
        size -= 1

        return (cv2_layer(images, lambda x: cv2.bilateralFilter(x, size, 100 - sigma_color * 100, sigma_intensity * 100)),)

```
