
# Documentation
- Class name: ImageAlphaComposite
- Category: Art Venture/Utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageAlphaComposite节点用于根据两张图片的alpha通道值将它们混合在一起，生成一张合成图像。这个过程涉及将两张输入图像的视觉元素组合成一张图像，同时考虑透明度和图层效果。

# Input types
## Required
- image_i
    - 参与合成的第二张图像。它作为alpha合成过程中的另一个基础层，与第一张图像叠加在一起。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 经过alpha合成后得到的结果图像，基于输入图像的alpha值将它们混合在一起。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilImageAlphaComposite:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image_1": ("IMAGE",),
                "image_2": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_alpha_composite"

    def image_alpha_composite(self, image_1: torch.Tensor, image_2: torch.Tensor):
        if image_1.shape[0] != image_2.shape[0]:
            raise Exception("Images must have the same amount")

        if image_1.shape[1] != image_2.shape[1] or image_1.shape[2] != image_2.shape[2]:
            raise Exception("Images must have the same size")

        composited_images = []
        for i, im1 in enumerate(image_1):
            composited = Image.alpha_composite(
                tensor2pil(im1).convert("RGBA"),
                tensor2pil(image_2[i]).convert("RGBA"),
            )
            composited_images.append(pil2tensor(composited))

        return (torch.cat(composited_images, dim=0),)

```
