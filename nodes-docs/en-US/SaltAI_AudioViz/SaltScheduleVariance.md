---
tags:
- Scheduling
---

# Apply Easing to Schedule
## Documentation
- Class name: `SaltScheduleVariance`
- Category: `SALT/Scheduling`
- Output node: `False`

The SaltScheduleVariance node applies a combination of noise-based tremors and easing functions to a schedule list to create a varied output. This process enhances the dynamic range and visual interest of scheduled events or animations by introducing controlled randomness and smooth transitions.
## Input types
### Required
- **`schedule_list`**
    - The primary list of scheduled values to be varied. It serves as the base for applying noise adjustments and easing functions, directly influencing the variance and dynamics of the output.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
### Optional
- **`curves_mode`**
    - Specifies the type of easing function to apply, enhancing the schedule list with smooth transitions. This parameter allows for the customization of the variance effect, tailoring the output to specific aesthetic or functional requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_perlin_tremors`**
    - A boolean flag that determines whether noise-based tremors are applied to the schedule list, introducing a layer of controlled randomness to the variance process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`tremor_scale`**
    - Adjusts the intensity of the noise-based tremors applied to the schedule list, allowing for fine-tuning of the variance effect's impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`octaves`**
    - Defines the number of layers of noise to combine for creating tremors, affecting the complexity and texture of the variance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`persistence`**
    - Controls the amplitude's decrease across noise octaves, influencing the smoothness and subtlety of the tremors.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lacunarity`**
    - Determines the frequency increase across noise octaves, affecting the detail and scale of the tremors.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`schedule_list`**
    - Comfy dtype: `LIST`
    - The resulting list after applying noise-based tremors and easing functions to the input schedule list, showcasing the enhanced variance and dynamics.
    - Python dtype: `List[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduleVariance:
    """
    Applies Perlin noise and optional easing curves to each value in a list to create an OPAC Schedule out of it,
    while aiming to preserve the original distribution of the input values.
    """
    def __init__(self):
        self.noise_base = random.randint(0, 1000)
        self.perlin_noise = PerlinNoise()

    @classmethod
    def INPUT_TYPES(cls):
        easing_fn = list(easing_functions.keys())
        easing_fn.insert(0, "None")
        return {
            "required": {
                "schedule_list": ("LIST", {}),
            },
            "optional": {
                "curves_mode": (easing_fn,),
                "use_perlin_tremors": ("BOOLEAN", {"default": True}),
                "tremor_scale": ("FLOAT", {"default": 0.05, "min": 0.01, "max": 1.0}),
                "octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
            }
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list",)
    FUNCTION = "opac_variance"
    CATEGORY = "SALT/Scheduling"

    def sample_perlin(self, frame_index, value, tremor_scale, octaves, persistence, lacunarity):
        noise = self.perlin_noise.sample(self.noise_base + frame_index * 0.1, scale=1.0, octaves=octaves, persistence=persistence, lacunarity=lacunarity)
        noise_adjustment = 1 + noise * tremor_scale
        return max(0, min(value * noise_adjustment, 1))

    def opac_variance(self, schedule_list, curves_mode="None", use_perlin_tremors=True, tremor_scale=0.05, octaves=1, persistence=0.5, lacunarity=2.0):
        self.frame_count = len(schedule_list)
        varied_list = schedule_list.copy()

        if use_perlin_tremors:
            for i, value in enumerate(schedule_list):
                noise_adjusted_value = self.sample_perlin(i, value, tremor_scale, octaves, persistence, lacunarity)
                varied_list[i] = round(noise_adjusted_value, 2)

        if curves_mode != "None" and curves_mode in easing_functions:
            for i, value in enumerate(varied_list):
                curve_adjustment = easing_functions[curves_mode](i / max(1, (self.frame_count - 1)))
                # Apply curve adjustment to the original value, not to the noise-adjusted value
                original_value_with_curve = curve_adjustment * schedule_list[i]
                # Blend the original value with curves and noise-adjusted value
                varied_list[i] = round((value + original_value_with_curve) / 2, 2)

        return (varied_list,)

```
