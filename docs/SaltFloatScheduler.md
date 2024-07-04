
# Documentation
- Class name: SaltFloatScheduler
- Category: SALT/Scheduling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltFloatScheduler 节点用于创建和管理浮点数时间表，这些时间表是可用于随时间控制各种参数的浮点值序列。该节点允许精确调度浮点值，实现音视频项目中参数的动态调整和时间控制。

# Input types
## Required
- repeat_sequence_times
    - 指定序列应重复的次数，以延长时间表的长度。
    - Comfy dtype: INT
    - Python dtype: int
- curves_mode
    - 决定时间表的曲线应用模式，影响值的形状和进展。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- use_perlin_tremors
    - 指示是否对时间表应用柏林噪声，以生成浮点值的自然、平滑变化。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- tremor_scale
    - 设置柏林震颤的比例，控制应用噪声的频率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tremor_octaves
    - 指定柏林噪声的八度数，影响震颤的细节级别。
    - Comfy dtype: INT
    - Python dtype: int
- tremor_persistence
    - 决定柏林噪声的持续性，影响每个八度的振幅。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tremor_lacunarity
    - 控制柏林噪声的空隙度，影响每个八度的频率增长。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sequence
    - 要调度并可能被节点操作修改的初始浮点值序列。
    - Comfy dtype: STRING
    - Python dtype: List[float]
## Optional
- max_sequence_length
    - 序列允许的最大长度，确保时间表保持在预定义的界限内。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- schedule_list
    - 调度操作后的结果浮点值列表，表示修改或生成的时间表。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- schedule_length
    - 生成或修改的时间表列表的长度，表示调度值的总数。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltFloatScheduler:
    @classmethod
    def INPUT_TYPES(cls):
        easing_fns = list(easing_functions.keys())
        easing_fns.insert(0, "None")
        return {
            "required": {
                "repeat_sequence_times": ("INT", {"default": 0, "min": 0}),
                "curves_mode": (easing_fns, ),
                "use_perlin_tremors": ("BOOLEAN", {"default": True}),
                "tremor_scale": ("FLOAT", {"default": 64, "min": 0.01, "max": 1024.0, "step": 0.01}),
                "tremor_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "tremor_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0, "step": 0.01}),
                "tremor_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 3.0, "step": 0.01}),
                "sequence": ("STRING", {"multiline": True, "placeholder": "[1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]"}),
            },
            "optional": {
                "max_sequence_length": ("INT", {"default": 0, "min": 0, "max": 4096}),
            }
        }

    RETURN_TYPES = ("LIST", "INT")
    RETURN_NAMES = ("schedule_list", "schedule_length")
    FUNCTION = "generate_sequence"
    CATEGORY = "SALT/Scheduling"

    def apply_curve(self, sequence, mode):
        if mode in easing_functions.keys():
            sequence = [easing_functions[mode](t) for t in sequence]
        else:
            print(f"The easing mode `{mode}` does not exist in the valid easing functions: {', '.join(easing_functions.keys())}")
        return sequence

    def apply_perlin_noise(self, sequence, scale, octaves, persistence, lacunarity):
        perlin = PerlinNoise()
        noise_values = [perlin.sample(i, scale=scale, octaves=octaves, persistence=persistence, lacunarity=lacunarity) for i, _ in enumerate(sequence)]
        sequence = [val + noise for val, noise in zip(sequence, noise_values)]
        return sequence

    def generate_sequence(self, sequence, repeat_sequence_times, curves_mode, use_perlin_tremors, tremor_scale, tremor_octaves, tremor_persistence, tremor_lacunarity, max_sequence_length=0):
        sequence_list = [float(val.strip()) for val in sequence.replace("[", "").replace("]", "").split(',')]
        if use_perlin_tremors:
            sequence_list = self.apply_perlin_noise(sequence_list, tremor_scale, tremor_octaves, tremor_persistence, tremor_lacunarity)
        if curves_mode != "None":
            sequence_list = self.apply_curve(sequence_list, curves_mode)
        sequence_list = sequence_list * (repeat_sequence_times + 1)
        sequence_list = sequence_list[:max_sequence_length] if max_sequence_length != 0 else sequence_list
        return (sequence_list, len(sequence_list))

```
