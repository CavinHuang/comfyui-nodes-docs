---
tags:
- AnimationScheduling
- WavePatterns
---

# InvCosWave 📅🅕🅝
## Documentation
- Class name: `InvCosWave`
- Category: `FizzNodes 📅🅕🅝/WaveNodes`
- Output node: `False`

The InvCosWave node generates an inverse cosine wave based on specified parameters, such as phase, amplitude, and translations. It's designed to create complex wave patterns by applying the inverse cosine function to the input values, offering a unique approach to wave generation.
## Input types
### Required
- **`phase`**
    - The 'phase' parameter controls the period of the wave, affecting how stretched or compressed the wave appears over its cycle. A larger phase value results in a more stretched wave, impacting the frequency of the wave pattern generated.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`amplitude`**
    - The 'amplitude' parameter determines the height of the wave's peaks, influencing the wave's overall intensity. Higher amplitude values produce waves with greater peak-to-trough distances, affecting the visual and numerical amplitude of the wave.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`x_translation`**
    - The 'x_translation' parameter shifts the wave along the x-axis, allowing for adjustments in the wave's starting position. This shift can alter the phase of the wave, affecting where the wave begins within its cycle.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y_translation`**
    - The 'y_translation' parameter shifts the wave along the y-axis, adjusting the baseline level of the wave. This influences the vertical positioning of the wave, affecting its alignment relative to the y-axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`current_frame`**
    - The 'current_frame' parameter specifies the current point in the wave's cycle, used to calculate the wave's value at that specific moment. This parameter is crucial for animating the wave over time, determining the wave's position at each frame.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The first element of the output is the calculated wave value as a float, representing the precise wave value.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The second element of the output is the integer representation of the wave value, providing a rounded wave value.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InvCosWave:
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
        output = (y_translation+(amplitude*-(np.cos(-1*(2*np.pi*current_frame/phase-x_translation)))))
        print(output)
        return (output, int(output),)

```
