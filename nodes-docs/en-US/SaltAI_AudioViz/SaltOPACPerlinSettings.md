---
tags:
- Scheduling
- VisualEffects
---

# Perlin Tremor Settings
## Documentation
- Class name: `SaltOPACPerlinSettings`
- Category: `SALT/Scheduling`
- Output node: `False`

The SaltOPACPerlinSettings node is designed to configure Perlin noise sampling parameters for the OPAC node, allowing for dynamic visual effects based on noise patterns. It processes input settings to adjust the appearance of visuals, such as opacity and texture, by applying Perlin noise algorithms.
## Input types
### Required
- **`zoom_octaves`**
    - Controls the number of layers of Perlin noise to apply, influencing the complexity of the visual effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`zoom_persistence`**
    - Affects the amplitude of each octave in the Perlin noise, adjusting the visual's contrast.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`zoom_lacunarity`**
    - Influences the frequency of each octave in the Perlin noise, modifying the texture of the visual effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`zoom_repeat`**
    - Determines how often the Perlin noise pattern repeats, affecting the visual's periodicity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`angle_octaves`**
    - Specifies the number of Perlin noise layers for angle adjustments, affecting the rotation complexity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`angle_persistence`**
    - Adjusts the amplitude of each octave for angle Perlin noise, influencing the rotation contrast.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`angle_lacunarity`**
    - Modifies the frequency of each octave for angle Perlin noise, changing the rotation texture.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`angle_repeat`**
    - Sets the repetition rate of the angle Perlin noise pattern, impacting the rotation periodicity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`trx_octaves`**
    - Defines the number of Perlin noise layers for X-axis translation, affecting movement complexity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`trx_persistence`**
    - Controls the amplitude of each octave for X-axis translation, adjusting movement contrast.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`trx_lacunarity`**
    - Influences the frequency of each octave for X-axis translation, modifying movement texture.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`trx_repeat`**
    - Determines the repetition rate of the X-axis translation Perlin noise pattern, affecting movement periodicity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`try_octaves`**
    - Specifies the number of Perlin noise layers for Y-axis translation, impacting movement complexity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`try_persistence`**
    - Adjusts the amplitude of each octave for Y-axis translation, influencing movement contrast.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`try_lacunarity`**
    - Modifies the frequency of each octave for Y-axis translation, changing movement texture.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`try_repeat`**
    - Sets the repetition rate of the Y-axis translation Perlin noise pattern, impacting movement periodicity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`trz_octaves`**
    - Defines the number of Perlin noise layers for Z-axis translation, affecting depth movement complexity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`trz_persistence`**
    - Controls the amplitude of each octave for Z-axis translation, adjusting depth movement contrast.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`trz_lacunarity`**
    - Influences the frequency of each octave for Z-axis translation, modifying depth movement texture.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`trz_repeat`**
    - Determines the repetition rate of the Z-axis translation Perlin noise pattern, affecting depth movement periodicity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rotx_octaves`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`rotx_persistence`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`rotx_lacunarity`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`rotx_repeat`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`roty_octaves`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`roty_persistence`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`roty_lacunarity`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`roty_repeat`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`rotz_octaves`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`rotz_persistence`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`rotz_lacunarity`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`rotz_repeat`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
## Output types
- **`opac_perlin_settings`**
    - Comfy dtype: `DICT`
    - The configured Perlin noise parameters, ready to be applied to the OPAC node for generating dynamic visual effects.
    - Python dtype: `Dict[str, float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltOPACPerlinSettings:
    """
        Configuration node for Perlin noise sampling in OPAC node
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "zoom_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "zoom_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "zoom_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "zoom_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "angle_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "angle_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "angle_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "angle_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "trx_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "trx_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "trx_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "trx_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "try_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "try_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "try_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "try_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "trz_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "trz_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "trz_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "trz_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "rotx_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "rotx_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "rotx_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "rotx_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "roty_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "roty_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "roty_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "roty_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "rotz_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "rotz_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "rotz_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "rotz_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
            }
        }
    
    RETURN_TYPES = ("DICT",)
    RETURN_NAMES = ("opac_perlin_settings",)
    FUNCTION = "process"
    CATEGORY = "SALT/Scheduling"

    def process(self, **kwargs):
        return (kwargs, )

```
