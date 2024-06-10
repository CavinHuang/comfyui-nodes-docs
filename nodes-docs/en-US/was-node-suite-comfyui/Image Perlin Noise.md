---
tags:
- Noise
- NoisePatterns
---

# Image Perlin Noise
## Documentation
- Class name: `Image Perlin Noise`
- Category: `WAS Suite/Image/Generate/Noise`
- Output node: `False`

The Image Perlin Noise node generates a Perlin noise pattern, a type of gradient noise often used for procedural texture generation. This node allows for the creation of complex, natural-looking textures by simulating the appearance of random variations in surfaces or materials.
## Input types
### Required
- **`width`**
    - Specifies the width of the generated noise image. It determines the horizontal dimension of the output texture.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Defines the height of the generated noise image, affecting its vertical dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`scale`**
    - Controls the scale of the noise pattern, influencing the granularity and overall appearance of the texture.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`octaves`**
    - Determines the number of layers of noise to be combined, affecting the complexity and detail of the final texture.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`persistence`**
    - Adjusts the amplitude of each octave, influencing the contrast between high and low values in the noise pattern.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - Sets the initial value for the noise generation algorithm, ensuring reproducibility of the noise pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated Perlin noise image, which can be used as a texture or a basis for further graphical manipulations.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Image Blending Mode](../../was-node-suite-comfyui/Nodes/Image Blending Mode.md)



## Source code
```python
class WAS_Image_Perlin_Noise:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {"default": 512, "max": 2048, "min": 64, "step": 1}),
                "height": ("INT", {"default": 512, "max": 2048, "min": 64, "step": 1}),
                "scale": ("INT", {"default": 100, "max": 2048, "min": 2, "step": 1}),
                "octaves": ("INT", {"default": 4, "max": 8, "min": 0, "step": 1}),
                "persistence": ("FLOAT", {"default": 0.5, "max": 100.0, "min": 0.01, "step": 0.01}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "perlin_noise"

    CATEGORY = "WAS Suite/Image/Generate/Noise"

    def perlin_noise(self, width, height, scale, octaves, persistence, seed):

        WTools = WAS_Tools_Class()

        image = WTools.perlin_noise(width, height, octaves, persistence, scale, seed)

        return (pil2tensor(image), )

```
