---
tags:
- AnimationScheduling
- WavePatterns
---

# SquareWave 📅🅕🅝
## Documentation
- Class name: `SquareWave`
- Category: `FizzNodes 📅🅕🅝/WaveNodes`
- Output node: `False`

The SquareWave node generates a square wave pattern based on specified parameters such as phase, amplitude, and translations. It's designed to create distinct, square-shaped oscillations for various applications in signal processing and waveform generation.
## Input types
### Required
- **`phase`**
    - Defines the period of the square wave. A higher value results in a longer period between wave peaks.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`amplitude`**
    - Determines the height of the square wave peaks. A larger amplitude results in taller peaks.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x_translation`**
    - Shifts the wave along the X-axis. This can be used to adjust the starting point of the wave.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y_translation`**
    - Shifts the wave along the Y-axis, adjusting the baseline level of the wave.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`current_frame`**
    - Specifies the current frame or point in time for which the wave value is being calculated. This allows for dynamic wave generation over time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The primary output of the wave calculation, representing the wave's value at the current frame.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - An integer representation of the wave's value at the current frame.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SquareWave:
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
        output = (y_translation+(amplitude*0**0**(0-np.sin((np.pi*current_frame/phase-x_translation)))))
        print(output)
        return (output, int(output),)

```
