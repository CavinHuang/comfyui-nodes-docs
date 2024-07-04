
# Documentation
- Class name: XY Input: Sampler_Scheduler
- Category: Efficiency Nodes/XY Inputs
- Output node: False

该节点旨在处理和验证用于生成模型的采样器和调度器组合。它确保提供的采样器和调度器名称有效且兼容，可能会根据预定义的约束条件调整它们，以优化采样过程。

# Input types
## Required
- target_parameter
    - 指定采样或调度过程的目标参数，表明生成模型操作中需要优化或调整的特定方面。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- input_count
    - 表示要处理的输入数量，反映节点在优化采样或调度时将处理的数据或参数量。
    - Comfy dtype: INT
    - Python dtype: int
- sampler_i
    - 指定要使用的采样器的索引，在确定采样策略及其与调度器的兼容性方面起着关键作用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: int
- scheduler_i
    - 定义与采样器一起使用的调度器的索引，动态调整采样参数以实现高效生成。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: int

# Output types
- X or Y
    - 处理的结果，可能是优化后的参数值（X）或决策指标（Y），确保采样器和调度器有效配对。
    - Comfy dtype: XY
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Sampler_Scheduler:
    parameters = ["sampler", "scheduler", "sampler & scheduler"]

    @classmethod
    def INPUT_TYPES(cls):
        samplers = ["None"] + comfy.samplers.KSampler.SAMPLERS
        schedulers = ["None"] + comfy.samplers.KSampler.SCHEDULERS
        inputs = {
            "required": {
                "target_parameter": (cls.parameters,),
                "input_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM, "step": 1})
            }
        }
        for i in range(1, XYPLOT_LIM+1):
            inputs["required"][f"sampler_{i}"] = (samplers,)
            inputs["required"][f"scheduler_{i}"] = (schedulers,)

        return inputs

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, target_parameter, input_count, **kwargs):
        if target_parameter == "scheduler":
            xy_type = "Scheduler"
            schedulers = [kwargs.get(f"scheduler_{i}") for i in range(1, input_count + 1)]
            xy_value = [scheduler for scheduler in schedulers if scheduler != "None"]
        elif target_parameter == "sampler":
            xy_type = "Sampler"
            samplers = [kwargs.get(f"sampler_{i}") for i in range(1, input_count + 1)]
            xy_value = [(sampler, None) for sampler in samplers if sampler != "None"]
        else:
            xy_type = "Sampler"
            samplers = [kwargs.get(f"sampler_{i}") for i in range(1, input_count + 1)]
            schedulers = [kwargs.get(f"scheduler_{i}") for i in range(1, input_count + 1)]
            xy_value = [(sampler, scheduler if scheduler != "None" else None) for sampler,
            scheduler in zip(samplers, schedulers) if sampler != "None"]

        return ((xy_type, xy_value),) if xy_value else (None,)

```
