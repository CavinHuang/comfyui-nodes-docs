
# Documentation
- Class name: easy XYInputs: Sampler_Scheduler
- Category: EasyUse/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

这个节点旨在简化不同采样器和调度器组合的可视化和比较过程。它将选择和配置采样器和调度器的复杂性抽象化，为用户提供了一个简化的界面，用于生成和可视化这些选择对模型性能或输出的影响。

# Input types
## Required
- target_parameter
    - 决定可视化和比较的焦点是采样器还是调度器。这个选择指导节点的处理和输出生成，突出显示采样器或调度器对模型性能的影响。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- input_count
    - 指定要在可视化中考虑的采样器或调度器的数量。这允许对一系列配置进行全面比较，有助于更深入地理解它们的效果。
    - Comfy dtype: INT
    - Python dtype: int
- sampler_i
    - 定义要包含在比较中的特定采样器。索引'i'可变，允许同时指定和比较多个采样器。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler_i
    - 指定要包含在比较中的特定调度器。与'sampler_i'类似，索引'i'允许包含多个调度器，从而实现详细的比较分析。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- X or Y
    - 输出所选采样器或调度器之间的比较结果，具体取决于'target_parameter'。这有助于理解每个选择如何影响模型的性能。
    - Comfy dtype: X_Y
    - Python dtype: str
- ui
    - 提供一个用户界面组件，用于可视化不同采样器和调度器组合的效果，帮助直观地比较和选择最合适的配置。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Sampler_Scheduler:
    parameters = ["sampler", "scheduler", "sampler & scheduler"]

    @classmethod
    def INPUT_TYPES(cls):
        samplers = ["None"] + comfy.samplers.KSampler.SAMPLERS
        schedulers = ["None"] + comfy.samplers.KSampler.SCHEDULERS
        inputs = {
            "required": {
                "target_parameter": (cls.parameters,),
                "input_count": ("INT", {"default": 1, "min": 1, "max": 30, "step": 1})
            }
        }
        for i in range(1, 30 + 1):
            inputs["required"][f"sampler_{i}"] = (samplers,)
            inputs["required"][f"scheduler_{i}"] = (schedulers,)

        return inputs

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, target_parameter, input_count, **kwargs):
        axis, values, = None, None,
        if target_parameter == "scheduler":
            axis = "advanced: Scheduler"
            schedulers = [kwargs.get(f"scheduler_{i}") for i in range(1, input_count + 1)]
            values = [scheduler for scheduler in schedulers if scheduler != "None"]
        elif target_parameter == "sampler":
            axis = "advanced: Sampler"
            samplers = [kwargs.get(f"sampler_{i}") for i in range(1, input_count + 1)]
            values = [sampler for sampler in samplers if sampler != "None"]
        else:
            axis = "advanced: Sampler&Scheduler"
            samplers = [kwargs.get(f"sampler_{i}") for i in range(1, input_count + 1)]
            schedulers = [kwargs.get(f"scheduler_{i}") for i in range(1, input_count + 1)]
            values = []
            for sampler, scheduler in zip(samplers, schedulers):
                sampler = sampler if sampler else 'None'
                scheduler = scheduler if scheduler else 'None'
                values.append(sampler +', '+ scheduler)
        values = "; ".join(values)
        return ({"axis": axis, "values": values},) if values else (None,)

```
