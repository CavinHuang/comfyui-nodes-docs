---
tags:
- Image
- Tiled
---

# Image Seamless Texture
## Documentation
- Class name: `Image Seamless Texture`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

The node is designed to transform an input image into a seamless texture. It can optionally tile the texture across a specified number of tiles, blending the edges to ensure the texture can be repeated without visible seams. This functionality is particularly useful for creating backgrounds or textures that need to be repeated across larger surfaces without noticeable discontinuities.
## Input types
### Required
- **`images`**
    - The images to be transformed into seamless textures. This input is crucial as it directly influences the texture's final appearance and seamless quality.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`blending`**
    - Determines the degree of blending at the edges of the texture, affecting how seamlessly the texture tiles. A higher value results in more blending, making the seams less noticeable.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tiled`**
    - A boolean indicating whether the texture should be tiled. If true, the texture is repeated across the specified number of tiles, enhancing the seamless effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`tiles`**
    - Specifies the number of tiles the texture is divided into, both horizontally and vertically. This parameter is only relevant if tiling is enabled and directly affects the texture's repetitiveness and seamless nature.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The resulting seamless texture, which can be tiled across surfaces without visible seams. This output is essential for applications requiring repetitive background textures or materials.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Make_Seamless:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "blending": ("FLOAT", {"default": 0.4, "max": 1.0, "min": 0.0, "step": 0.01}),
                "tiled": (["true", "false"],),
                "tiles": ("INT", {"default": 2, "max": 6, "min": 2, "step": 2}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "make_seamless"

    CATEGORY = "WAS Suite/Image/Process"

    def make_seamless(self, images, blending, tiled, tiles):

        WTools = WAS_Tools_Class()

        seamless_images = []
        for image in images:
            seamless_images.append(pil2tensor(WTools.make_seamless(tensor2pil(image), blending, tiled, tiles)))

        seamless_images = torch.cat(seamless_images, dim=0)

        return (seamless_images, )

```
