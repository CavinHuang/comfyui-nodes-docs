
# Documentation
- Class name: ImageGaussianBlur
- Category: Art Venture/Utils
- Output node: False

ImageGaussianBlur节点对一组图像应用高斯模糊滤镜，通过指定的半径有效地对图像进行平滑处理。这种操作在图像处理中常用于减少噪声和细节，或创造视觉效果。

# Input types
## Required
- images
    - 需要进行模糊处理的图像集合。这个输入对于定义将要进行高斯模糊变换的图像集至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- radius
    - 指定高斯模糊的半径。较大的半径会产生更明显的模糊效果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 模糊处理后的图像，通过在批次维度上连接单独模糊处理的图像，返回为单个张量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilImageGaussianBlur:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "radius": ("INT", {"default": 1, "min": 1, "max": 100}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_gaussian_blur"

    def image_gaussian_blur(self, images, radius):
        blured_images = []
        for image in images:
            img = tensor2pil(image)
            img = img.filter(ImageFilter.GaussianBlur(radius=radius))
            blured_images.append(pil2tensor(img))

        return (torch.cat(blured_images, dim=0),)

```
