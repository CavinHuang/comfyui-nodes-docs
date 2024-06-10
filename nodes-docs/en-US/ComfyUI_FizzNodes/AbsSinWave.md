---
tags:
- AnimationScheduling
- WavePatterns
---

# AbsSinWave 📅🅕🅝
## Documentation
- Class name: `AbsSinWave`
- Category: `FizzNodes 📅🅕🅝/WaveNodes`
- Output node: `False`

The AbsSinWave node generates a sine wave where the sine function's output is modified by the absolute value, creating a unique wave pattern. This transformation is applied to model wave-like behaviors with a distinctive mathematical alteration.
## Input types
### Required
- **`phase`**
    - The 'phase' parameter controls the period of the sine wave, affecting how quickly the wave cycles through its pattern.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`amplitude`**
    - The 'amplitude' parameter determines the height of the wave peaks, influencing the wave's overall intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x_translation`**
    - The 'x_translation' parameter shifts the wave along the x-axis, allowing for adjustments in the wave's starting position.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_value`**
    - The 'max_value' parameter sets the maximum value the wave can reach, influencing the wave's peak.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`current_frame`**
    - The 'current_frame' parameter specifies the current point in time or frame for which the wave's value is being calculated, playing a crucial role in the wave's progression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The first output is the calculated wave value as a float, reflecting the wave's current state.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The second output is the integer representation of the calculated wave value, providing a discrete measure of the wave's state.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AbsSinWave:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"phase": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "amplitude": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.1}),
                             "x_translation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "max_value": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.05}),
                             "current_frame": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             }}
    RETURN_TYPES = ("FLOAT", "INT")
    FUNCTION = "Wave"
    
    CATEGORY = "FizzNodes 📅🅕🅝/WaveNodes"

    def Wave(self, phase, amplitude, x_translation, max_value, current_frame):
        output = (max_value-(np.abs(np.sin(current_frame/phase))*amplitude))
        print(output)
        return (output, int(output),)

```
