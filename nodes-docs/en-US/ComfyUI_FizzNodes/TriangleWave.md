---
tags:
- AnimationScheduling
- WavePatterns
---

# TriangleWave 📅🅕🅝
## Documentation
- Class name: `TriangleWave`
- Category: `FizzNodes 📅🅕🅝/WaveNodes`
- Output node: `False`

The TriangleWave node generates a triangular wave pattern based on the provided parameters. It manipulates the wave's phase, amplitude, and translations along the x and y axes, as well as the current frame to produce a unique wave output.
## Input types
### Required
- **`phase`**
    - The 'phase' parameter determines the period of the triangular wave, affecting how frequently the wave pattern repeats over a given interval.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`amplitude`**
    - The 'amplitude' parameter specifies the height of the triangular wave, influencing the peak values the wave can reach.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x_translation`**
    - The 'x_translation' parameter shifts the wave along the x-axis, allowing for horizontal adjustment of the wave's position.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y_translation`**
    - The 'y_translation' parameter shifts the wave along the y-axis, providing vertical adjustment to the base level of the wave.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`current_frame`**
    - The 'current_frame' parameter indicates the specific point in time for which the wave's value is being calculated, playing a crucial role in the wave's progression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The first element of the output tuple, representing the calculated wave value as a float.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The second element of the output tuple, which is the integer representation of the calculated wave value.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TriangleWave:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"phase": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "amplitude": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.1}),
                             "x_translation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "y_translation": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.05}),
                             "current_frame": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             }}
    RETURN_TYPES = ("FLOAT", "INT",)
    FUNCTION = "Wave"

    CATEGORY = "FizzNodes 📅🅕🅝/WaveNodes"

    def Wave(self, phase, amplitude, x_translation, y_translation, current_frame):
        output = (y_translation+amplitude/np.pi*(np.arcsin(np.sin(2*np.pi/phase*current_frame-x_translation))))
        print(output)
        return (output, int(output),)

```
