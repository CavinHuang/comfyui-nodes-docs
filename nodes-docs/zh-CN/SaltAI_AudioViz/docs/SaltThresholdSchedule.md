
# Documentation
- Class name: SaltThresholdSchedule
- Category: SALT/Scheduling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltThresholdSchedule节点旨在基于特定参数（如淡入淡出类型和强度）对调度列表应用淡入淡出效果。这个节点能够动态调整调度值，通过淡入、淡出或两者兼顾来创建平滑过渡或突出调度的某些部分。

# Input types
## Required
- float_schedule
    - 需要应用淡入淡出效果的调度值列表。这个参数对于确定将应用淡入淡出效果的基础值至关重要。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- max_frames
    - 指定调度的最大帧数。这个参数限制了输出调度列表的长度。
    - Comfy dtype: INT
    - Python dtype: int
- output_mode
    - 定义输出调度列表的格式，如'prompt_schedule'、'float_list'、'int_list'或'raw'。这个参数决定了如何呈现修改后的调度值。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- schedule_values
    - 详细说明特定调度值及其相应描述或设置的字符串。这个参数允许根据文本描述自定义调度值。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- value_schedule_list
    - 应用指定淡入淡出效果后的修改调度列表，展示了值之间的动态过渡。
    - Comfy dtype: *
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltThresholdSchedule:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "float_schedule": ("LIST", ),
                "max_frames": ("INT", {"min": 1, "max": 4096, "default": 16}),
                "output_mode": (["prompt_schedule", "float_list", "int_list", "raw"],),
                "schedule_values": ("STRING", {"multiline": True, "default": '''"0.0": "A beautiful forest, (green:1.2) color scheme",
"0.5": "A beautiful forest, (autumn:1.2) color scheme",
"1.0": "A beautiful forest, (winter:1.2) color scheme"'''}),
            }
        }

    RETURN_TYPES = (WILDCARD,)
    RETURN_NAMES = ("value_schedule_list",)

    FUNCTION = "generate_sequence"
    CATEGORY = "SALT/Scheduling"

    def generate_sequence(self, float_schedule, schedule_values, max_frames, output_mode):
        try:
            text_dict = json.loads("{" + schedule_values + "}")
        except json.JSONDecodeError as e:
            raise ValueError("Unable to decode prompt schedule:", e)

        prompt_sequence = []
        prompt_dict = dict(sorted({float(key): value for key, value in text_dict.items()}.items(), key=lambda x: x[0]))
        default_prompt = next(iter(prompt_dict.values())) if prompt_dict else None

        adjusted_float_schedule = [float_schedule[i] if i < len(float_schedule) else 0 for i in range(max_frames)]

        for float_val in adjusted_float_schedule:
            closest_prompt = default_prompt
            min_diff = float('inf')
            
            for prompt_key, prompt_val in prompt_dict.items():
                diff = abs(float_val - prompt_key)
                
                if diff < min_diff:
                    closest_prompt = prompt_val
                    min_diff = diff

            prompt_sequence.append(closest_prompt)

        if output_mode == "prompt_schedule":
            output = ", ".join(f'"{i}": "{prompt}"' for i, prompt in enumerate(prompt_sequence))
        elif output_mode == "float_list":
            output = [float(value) for value in prompt_sequence]
        else:
            output = [int(value) for value in prompt_sequence]

        return (output, )  

```
