---
tags:
- AnimationScheduling
- WavePatterns
---

# AbsCosWave 📅🅕🅝
## Documentation
- Class name: `AbsCosWave`
- Category: `FizzNodes 📅🅕🅝/WaveNodes`
- Output node: `False`

The AbsCosWave node generates a wave pattern based on the absolute value of a cosine function, modulated by parameters such as phase, amplitude, x_translation, and max_value. It's designed to create dynamic, visually interesting waveforms for various applications.
## Input types
### Required
- **`phase`**
    - The phase parameter controls the periodicity of the wave, affecting how frequently the wave pattern repeats over a given interval.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`amplitude`**
    - Amplitude determines the height of the wave peaks, influencing the overall intensity of the wave pattern.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x_translation`**
    - X_translation shifts the wave pattern along the horizontal axis, allowing for adjustments in the wave's starting position.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_value`**
    - Max_value sets the upper limit for the wave's value, capping the peak height and affecting the wave's amplitude.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`current_frame`**
    - Current_frame represents a specific point in time or sequence, used to calculate the wave's position and shape at that moment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The first element of the output tuple, representing the calculated wave value in its precise form.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The second element of the output tuple, providing an integer approximation of the wave's current state.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AbsCosWave:
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
        output = (max_value-(np.abs(np.cos(current_frame/phase))*amplitude))
        print(output)
        return (output, int(output),)

```
