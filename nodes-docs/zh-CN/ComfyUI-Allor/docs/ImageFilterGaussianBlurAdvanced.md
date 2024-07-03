
# Documentation
- Class name: ImageFilterGaussianBlurAdvanced
- Category: image/filter
- Output node: False

该节点能够对图像应用高级的高斯模糊滤镜，允许分别设置水平和垂直方向的模糊大小和标准差。它通过提供对模糊效果更精细的控制，增强了图像处理能力。

# Input types
## Required
- images
    - 需要处理的图像。此参数对于定义将应用高斯模糊的输入至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size_x
    - 指定高斯核的水平大小。它影响x轴方向的模糊程度。
    - Comfy dtype: INT
    - Python dtype: int
- size_y
    - 指定高斯核的垂直大小。它影响y轴方向的模糊程度。
    - Comfy dtype: INT
    - Python dtype: int
- sigma_x
    - 决定高斯核在水平方向的标准差。它影响x轴方向模糊的扩散程度。
    - Comfy dtype: INT
    - Python dtype: int
- sigma_y
    - 决定高斯核在垂直方向的标准差。它影响y轴方向模糊的扩散程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是经过指定参数进行高斯模糊处理后的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterGaussianBlurAdvanced:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size_x": ("INT", {
                    "default": 10,
                    "min": 2,
                    "step": 2
                }),
                "size_y": ("INT", {
                    "default": 10,
                    "min": 2,
                    "step": 2
                }),
                "sigma_x": ("INT", {
                    "default": 0,
                }),
                "sigma_y": ("INT", {
                    "default": 0,
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size_x, size_y, sigma_x, sigma_y):
        size_x -= 1
        size_y -= 1

        return (cv2_layer(images, lambda x: cv2.GaussianBlur(x, (size_x, size_y), sigma_x, sigma_y)),)

```
