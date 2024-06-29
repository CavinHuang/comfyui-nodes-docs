---
tags:
- AnimationScheduling
- WavePatterns
---

# CosWave 📅🅕🅝
## Documentation
- Class name: `CosWave`
- Category: `FizzNodes 📅🅕🅝/WaveNodes`
- Output node: `False`

The CosWave node generates a cosine wave based on various parameters such as phase, amplitude, and translations. It abstracts the mathematical complexity involved in creating a cosine wave, providing a simple interface for generating these waves for various applications.
## Input types
### Required
- **`phase`**
    - The 'phase' parameter adjusts the phase shift of the cosine wave, affecting its starting position on the x-axis. This allows for fine-tuning the wave's alignment with other elements or waves.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`amplitude`**
    - The 'amplitude' parameter controls the height of the cosine wave, determining how far it extends above and below its central axis. This is crucial for adjusting the wave's intensity or impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x_translation`**
    - The 'x_translation' parameter shifts the entire wave along the x-axis, allowing for precise positioning of the wave in relation to other graphical or wave elements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y_translation`**
    - The 'y_translation' parameter shifts the wave vertically, enabling the adjustment of the wave's baseline position on the y-axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`current_frame`**
    - The 'current_frame' parameter specifies the current frame or point in time for which the wave's value is being calculated, enabling the generation of dynamic, moving waves.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The first element of the output tuple, representing the calculated wave value as a float.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The second element of the output tuple, providing the integer representation of the wave's calculated value.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CosWave:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"phase": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "amplitude": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.1}),
                             "x_translation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "y_translation": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.05}),
                             "current_frame": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             }}
    RETURN_TYPES = ("FLOAT", "INT", )
    FUNCTION = "Wave"
    
    CATEGORY = "FizzNodes 📅🅕🅝/WaveNodes"

    def Wave(self, phase, amplitude, x_translation, y_translation, current_frame):
        output = (y_translation+(amplitude*(np.cos((2*np.pi*current_frame/phase-x_translation)))))
        print(output)
        return (output, int(output),)

```
