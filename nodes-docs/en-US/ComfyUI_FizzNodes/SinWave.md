---
tags:
- AnimationScheduling
- WavePatterns
---

# SinWave 📅🅕🅝
## Documentation
- Class name: `SinWave`
- Category: `FizzNodes 📅🅕🅝/WaveNodes`
- Output node: `False`

The SinWave node generates a sinusoidal wave based on various parameters such as phase, amplitude, and translations along the x and y axes. It is designed to produce a sine wave output that can be adjusted dynamically for different effects in visual or audio applications.
## Input types
### Required
- **`phase`**
    - The 'phase' parameter controls the phase shift of the sine wave, affecting where the wave starts along the x-axis. It is crucial for adjusting the wave's position relative to its cycle.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`amplitude`**
    - The 'amplitude' parameter determines the height of the sine wave peaks, allowing for the adjustment of the wave's intensity or loudness in applications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x_translation`**
    - The 'x_translation' parameter shifts the sine wave along the x-axis, enabling the wave to be moved horizontally.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y_translation`**
    - The 'y_translation' parameter shifts the sine wave vertically along the y-axis, allowing for the adjustment of the wave's baseline position.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`current_frame`**
    - The 'current_frame' parameter specifies the current frame or point in time for which the wave's value is being calculated, essential for animating the wave over time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The first output is the calculated sine wave value, representing the wave's current amplitude at the specified frame.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The second output is the integer representation of the sine wave value, useful for applications requiring discrete values.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SinWave:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"phase": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "amplitude": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.1}),
                             "x_translation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "y_translation": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 9999.0, "step": 0.05}),
                             "current_frame": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             }}
    RETURN_TYPES = ("FLOAT","INT",)
    FUNCTION = "Wave"
    
    CATEGORY = "FizzNodes 📅🅕🅝/WaveNodes"

    def Wave(self, phase, amplitude, x_translation, y_translation, current_frame):
        output = (y_translation+(amplitude*(np.sin((2*np.pi*current_frame/phase-x_translation)))))
        print(output)
        return (output, int(output),)

```
