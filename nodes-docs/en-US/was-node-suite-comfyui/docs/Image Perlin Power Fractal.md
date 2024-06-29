---
tags:
- Noise
- NoisePatterns
---

# Image Perlin Power Fractal
## Documentation
- Class name: `Image Perlin Power Fractal`
- Category: `WAS Suite/Image/Generate/Noise`
- Output node: `False`

This node generates a Perlin Power Fractal image, leveraging Perlin noise to create complex, visually appealing textures or landscapes. It allows for detailed customization of the fractal's appearance through various parameters, including scale, octaves, and persistence.
## Input types
### Required
- **`width`**
    - Specifies the width of the generated image. Affects the overall size and detail level of the fractal.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the generated image, influencing the fractal's size and detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`scale`**
    - Controls the scale of the noise used in the fractal, impacting the zoom level and detail of the texture.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`octaves`**
    - Adjusts the number of layers of noise to combine, affecting the complexity and detail of the fractal.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`persistence`**
    - Modifies the amplitude of each octave, influencing the roughness and detail of the fractal's surface.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lacunarity`**
    - Changes the frequency of each octave, affecting the fractal's texture and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`exponent`**
    - Alters the power to which the scale is raised, impacting the fractal's appearance and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - Sets the seed for the noise generation, ensuring reproducibility of the fractal patterns.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated Perlin Power Fractal image, represented as a tensor.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Perlin_Power_Fractal:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {"default": 512, "max": 8192, "min": 64, "step": 1}),
                "height": ("INT", {"default": 512, "max": 8192, "min": 64, "step": 1}),
                "scale": ("INT", {"default": 100, "max": 2048, "min": 2, "step": 1}),
                "octaves": ("INT", {"default": 4, "max": 8, "min": 0, "step": 1}),
                "persistence": ("FLOAT", {"default": 0.5, "max": 100.0, "min": 0.01, "step": 0.01}),
                "lacunarity": ("FLOAT", {"default": 2.0, "max": 100.0, "min": 0.01, "step": 0.01}),
                "exponent": ("FLOAT", {"default": 2.0, "max": 100.0, "min": 0.01, "step": 0.01}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "perlin_power_fractal"

    CATEGORY = "WAS Suite/Image/Generate/Noise"

    def perlin_power_fractal(self, width, height, scale, octaves, persistence, lacunarity, exponent, seed):

        WTools = WAS_Tools_Class()

        image = WTools.perlin_power_fractal(width, height, octaves, persistence, lacunarity, exponent, scale, seed)

        return (pil2tensor(image), )

```
