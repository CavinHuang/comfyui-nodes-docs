---
tags:
- Noise
- NoisePatterns
---

# Image Voronoi Noise Filter
## Documentation
- Class name: `Image Voronoi Noise Filter`
- Category: `WAS Suite/Image/Generate/Noise`
- Output node: `False`

This node generates a Voronoi noise pattern on an image, leveraging parameters such as density and modulator to influence the visual complexity and style of the noise. It's designed to create visually appealing or useful noise patterns for various applications in image processing and graphics.
## Input types
### Required
- **`width`**
    - Specifies the width of the output image. It determines the horizontal dimension of the generated noise pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the output image. It affects the vertical dimension of the generated noise pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`density`**
    - Controls the density of the Voronoi cells in the noise pattern, affecting the overall complexity and appearance of the noise.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`modulator`**
    - Adjusts the modulation of the noise pattern, allowing for finer control over the visual characteristics of the generated noise.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - Sets the seed for the noise generation algorithm, ensuring reproducibility of the noise patterns.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`flat`**
    - Determines whether the noise pattern should have a flat appearance, affecting the visual depth of the noise.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`RGB_output`**
    - Specifies whether the output image should be in RGB color mode, influencing the color information of the generated noise pattern.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated image with the Voronoi noise pattern applied. It showcases the visual effects of the input parameters on the noise generation.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Voronoi_Noise_Filter:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {"default": 512, "max": 4096, "min": 64, "step": 1}),
                "height": ("INT", {"default": 512, "max": 4096, "min": 64, "step": 1}),
                "density": ("INT", {"default": 50, "max": 256, "min": 10, "step": 2}),
                "modulator": ("INT", {"default": 0, "max": 8, "min": 0, "step": 1}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },
            "optional": {
                "flat": (["False", "True"],),
                "RGB_output": (["True", "False"],),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "voronoi_noise_filter"

    CATEGORY = "WAS Suite/Image/Generate/Noise"

    def voronoi_noise_filter(self, width, height, density, modulator, seed, flat="False", RGB_output="True"):

        WTools = WAS_Tools_Class()

        image = WTools.worley_noise(height=height, width=width, density=density, option=modulator, use_broadcast_ops=True, seed=seed, flat=(flat == "True")).image

        if RGB_output == "True":
            image = image.convert("RGB")
        else:
            image = image.convert("L")

        return (pil2tensor(image), )

```
