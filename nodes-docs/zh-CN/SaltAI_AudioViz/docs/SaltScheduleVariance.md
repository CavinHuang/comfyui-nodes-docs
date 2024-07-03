
# Documentation
- Class name: SaltScheduleVariance
- Category: SALT/Scheduling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltScheduleVariance节点通过将基于噪声的抖动和缓动函数结合应用于调度列表，从而创建一个变化多样的输出。这个过程通过引入受控的随机性和平滑过渡，增强了调度事件或动画的动态范围和视觉吸引力。

# Input types
## Required
- schedule_list
    - 需要进行变化处理的主要调度值列表。它作为应用噪声调整和缓动函数的基础，直接影响输出的变化和动态。
    - Comfy dtype: LIST
    - Python dtype: List[float]
## Optional
- curves_mode
    - 指定要应用的缓动函数类型，通过平滑过渡增强调度列表。该参数允许根据特定的美学或功能需求来定制变化效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- use_perlin_tremors
    - 一个布尔标志，决定是否将基于噪声的抖动应用于调度列表，为变化过程引入一层受控的随机性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- tremor_scale
    - 调整应用于调度列表的基于噪声的抖动强度，允许对变化效果的影响进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- octaves
    - 定义用于创建抖动的噪声层数，影响变化的复杂性和纹理。
    - Comfy dtype: INT
    - Python dtype: int
- persistence
    - 控制噪声倍频中振幅的减少，影响抖动的平滑度和细微程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lacunarity
    - 决定噪声倍频中频率的增加，影响抖动的细节和尺度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- schedule_list
    - 对输入调度列表应用基于噪声的抖动和缓动函数后得到的结果列表，展示了增强的变化和动态。
    - Comfy dtype: LIST
    - Python dtype: List[float]


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
