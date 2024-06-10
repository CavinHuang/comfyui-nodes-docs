---
tags:
- ImageTransformation
- VisualEffects
---

# 🔧 Pixelize
## Documentation
- Class name: `PixelOEPixelize+`
- Category: `essentials`
- Output node: `False`

The PixelOEPixelize+ node is designed to transform images into pixelized versions of themselves, applying a series of image processing techniques to achieve a stylized, pixel-art effect. This node leverages parameters such as downscale mode, target size, and patch size to control the pixelization process, while also offering options for thickness, color matching, and upscale to fine-tune the visual output.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image to be pixelized. It is crucial for defining the base content that will undergo the pixelization process, directly influencing the node's output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`downscale_mode`**
    - Specifies the method used for downscaling the image as part of the pixelization process, affecting the visual style of the pixelized output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`target_size`**
    - Determines the overall dimensions to which the image will be resized during the pixelization process, impacting the scale of the pixel effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`patch_size`**
    - Controls the size of the individual 'pixels' or patches in the pixelized image, allowing for customization of the pixel art effect's granularity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`thickness`**
    - Adjusts the thickness of the lines or borders between pixels in the pixelized image, contributing to the stylized appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`color_matching`**
    - Influences how colors are matched and blended in the pixelized output, affecting the image's color accuracy and aesthetic.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`upscale`**
    - Determines whether the pixelized image should be upscaled back to its original size, affecting the final resolution and appearance.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed, pixelized version of the input image, showcasing the applied pixel art effect.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PixelOEPixelize:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "downscale_mode": (["contrast", "bicubic", "nearest", "center", "k-centroid"],),
                "target_size": ("INT", { "default": 128, "min": 1, "max": MAX_RESOLUTION, "step": 16 }),
                "patch_size": ("INT", { "default": 16, "min": 4, "max": 32, "step": 2 }),
                "thickness": ("INT", { "default": 2, "min": 1, "max": 16, "step": 1 }),
                #"contrast": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 100.0, "step": 0.1 }),
                #"saturation": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 100.0, "step": 0.1 }),
                "color_matching": ("BOOLEAN", { "default": True }),
                "upscale": ("BOOLEAN", { "default": True }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, downscale_mode, target_size, patch_size, thickness, color_matching, upscale):
        from pixeloe.pixelize import pixelize

        image = image.clone().mul(255).clamp(0, 255).byte().cpu().numpy()
        output = []
        for img in image:
            img = pixelize(img,
                           mode=downscale_mode,
                           target_size=target_size,
                           patch_size=patch_size,
                           thickness=thickness,
                           contrast=1.0,
                           saturation=1.0,
                           color_matching=color_matching,
                           no_upscale=not upscale)
            output.append(T.ToTensor()(img))

        output = torch.stack(output, dim=0)
        output = pb(output)

        return(output,)

```
