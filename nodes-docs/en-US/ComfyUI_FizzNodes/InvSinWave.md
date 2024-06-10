---
tags:
- AnimationScheduling
- WavePatterns
---

# InvSinWave 📅🅕🅝
## Documentation
- Class name: `InvSinWave`
- Category: `FizzNodes 📅🅕🅝/WaveNodes`
- Output node: `False`

The InvSinWave node generates an inverse sine wave pattern, modifying the wave's amplitude based on the absolute value of the cosine function. It's designed for creating dynamic, wave-like animations or effects by adjusting parameters such as phase, amplitude, x translation, and y translation over a series of frames.
## Input types
### Required
- **`phase`**
    - Defines the period of the wave, affecting how many units it takes for the wave to complete one full cycle. A crucial parameter for controlling the wave's speed and spacing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`amplitude`**
    - Determines the height of the wave's peaks. This parameter influences the wave's intensity and the range of its vertical movement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x_translation`**
    - Shifts the wave along the x-axis, allowing for horizontal positioning adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y_translation`**
    - Adjusts the wave's vertical positioning, allowing for vertical positioning adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`current_frame`**
    - Specifies the current frame in the animation sequence, enabling the wave pattern to evolve over time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - Outputs the calculated wave value, useful for precise wave calculations.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - Outputs the integer representation of the wave value, useful for scenarios requiring discrete values.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InvSinWave:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"phase": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "amplitude": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.1}),
                             "x_translation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "y_translation": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.05}),
                             "current_frame": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             }}
    RETURN_TYPES = ("FLOAT", "INT")
    FUNCTION = "Wave"
    
    CATEGORY = "FizzNodes 📅🅕🅝/WaveNodes"

    def Wave(self, phase, amplitude, x_translation, y_translation, current_frame):
        output = (y_translation+(amplitude*-(np.sin(-1*(2*np.pi*current_frame/phase-x_translation)))))
        print(output)
        return (output, int(output),)

```
