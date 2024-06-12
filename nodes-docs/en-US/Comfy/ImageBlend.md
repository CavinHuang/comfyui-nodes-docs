---
tags:
- Image
- ImageBlend
- ImageComposite
---

# ImageBlend
## Documentation
- Class name: `ImageBlend`
- Category: `image/postprocessing`
- Output node: `False`

The ImageBlend node is designed to blend two images together based on a specified blending mode and blend factor. It supports various blending modes such as normal, multiply, screen, overlay, soft light, and difference, allowing for versatile image manipulation and compositing techniques. This node is essential for creating composite images by adjusting the visual interaction between two image layers.
## Input types
### Required
- **`image1`**
    - The first image to be blended. It serves as the base layer for the blending operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image2`**
    - The second image to be blended. Depending on the blend mode, it modifies the appearance of the first image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`blend_factor`**
    - Determines the weight of the second image in the blend. A higher blend factor gives more prominence to the second image in the resulting blend.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`blend_mode`**
    - Specifies the method of blending the two images. Supports modes like normal, multiply, screen, overlay, soft light, and difference, each producing a unique visual effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after blending the two input images according to the specified blend mode and factor.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - ImageCombine
    - [Image Aspect Ratio](../../was-node-suite-comfyui/Nodes/Image Aspect Ratio.md)
    - [ImageSender](../../ComfyUI-Impact-Pack/Nodes/ImageSender.md)
    - Mute / Bypass Repeater (rgthree)



## Source code
```python
class Blend:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image1": ("IMAGE",),
                "image2": ("IMAGE",),
                "blend_factor": ("FLOAT", {
                    "default": 0.5,
                    "min": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "blend_mode": (["normal", "multiply", "screen", "overlay", "soft_light", "difference"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "blend_images"

    CATEGORY = "image/postprocessing"

    def blend_images(self, image1: torch.Tensor, image2: torch.Tensor, blend_factor: float, blend_mode: str):
        image2 = image2.to(image1.device)
        if image1.shape != image2.shape:
            image2 = image2.permute(0, 3, 1, 2)
            image2 = comfy.utils.common_upscale(image2, image1.shape[2], image1.shape[1], upscale_method='bicubic', crop='center')
            image2 = image2.permute(0, 2, 3, 1)

        blended_image = self.blend_mode(image1, image2, blend_mode)
        blended_image = image1 * (1 - blend_factor) + blended_image * blend_factor
        blended_image = torch.clamp(blended_image, 0, 1)
        return (blended_image,)

    def blend_mode(self, img1, img2, mode):
        if mode == "normal":
            return img2
        elif mode == "multiply":
            return img1 * img2
        elif mode == "screen":
            return 1 - (1 - img1) * (1 - img2)
        elif mode == "overlay":
            return torch.where(img1 <= 0.5, 2 * img1 * img2, 1 - 2 * (1 - img1) * (1 - img2))
        elif mode == "soft_light":
            return torch.where(img2 <= 0.5, img1 - (1 - 2 * img2) * img1 * (1 - img1), img1 + (2 * img2 - 1) * (self.g(img1) - img1))
        elif mode == "difference":
            return img1 - img2
        else:
            raise ValueError(f"Unsupported blend mode: {mode}")

    def g(self, x):
        return torch.where(x <= 0.25, ((16 * x - 12) * x + 4) * x, torch.sqrt(x))

```
