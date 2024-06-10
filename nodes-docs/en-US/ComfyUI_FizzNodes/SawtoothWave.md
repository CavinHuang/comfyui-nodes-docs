---
tags:
- AnimationScheduling
- WavePatterns
---

# SawtoothWave 📅🅕🅝
## Documentation
- Class name: `SawtoothWave`
- Category: `FizzNodes 📅🅕🅝/WaveNodes`
- Output node: `False`

The SawtoothWave node is designed for generating and manipulating sawtooth waveforms, which are characterized by a linear rise and sharp fall. This node facilitates the creation of these periodic functions, allowing for their use in various applications that require such wave patterns.
## Input types
### Required
- **`phase`**
    - Defines the period of the sawtooth wave, affecting its repetition rate.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`step_increment`**
    - Determines the incremental steps in the sawtooth wave's progression.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x_translation`**
    - Adjusts the horizontal positioning of the sawtooth wave.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_value`**
    - Sets the starting value of the sawtooth wave, establishing its initial position.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`current_frame`**
    - Indicates the current point in time for the wave's calculation, crucial for its dynamic progression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The calculated wave value as a floating-point number.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The integer representation of the calculated wave value.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SawtoothWave:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"phase": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "step_increment": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.1}),
                             "x_translation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "start_value": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.05}),
                             "current_frame": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             }}
    RETURN_TYPES = ("FLOAT", "INT", )
    FUNCTION = "Wave"
    
    CATEGORY = "FizzNodes 📅🅕🅝/WaveNodes"

    def Wave(self, phase, step_increment, x_translation, start_value, current_frame):
        output = (start_value+(step_increment*(current_frame%phase)-x_translation))
        print(output)
        return (output, int(output),)

```
