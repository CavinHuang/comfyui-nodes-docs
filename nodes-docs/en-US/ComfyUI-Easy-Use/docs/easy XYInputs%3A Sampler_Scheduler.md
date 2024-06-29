---
tags:
- SamplerScheduler
- Sampling
---

# XY Inputs: Sampler/Scheduler //EasyUse
## Documentation
- Class name: `easy XYInputs: Sampler_Scheduler`
- Category: `EasyUse/XY Inputs`
- Output node: `False`

This node is designed to facilitate the visualization and comparison of different sampler and scheduler combinations within a given computational framework. It abstracts the complexity of selecting and configuring samplers and schedulers, presenting the user with a simplified interface for generating and visualizing the effects of these choices on the model's performance or output.
## Input types
### Required
- **`target_parameter`**
    - Determines whether the focus is on samplers or schedulers for visualization and comparison. This choice directs the node's processing and output generation, highlighting the impact of either samplers or schedulers on model performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`input_count`**
    - Specifies the number of samplers or schedulers to be considered in the visualization. This allows for a comprehensive comparison across a range of configurations, facilitating a deeper understanding of their effects.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sampler_i`**
    - Defines a specific sampler to be included in the comparison. The index 'i' varies, allowing for multiple samplers to be specified and compared simultaneously.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler_i`**
    - Specifies a particular scheduler to be included in the comparison. Similar to 'sampler_i', the index 'i' allows for the inclusion of multiple schedulers, enabling a detailed comparative analysis.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`X or Y`**
    - Comfy dtype: `X_Y`
    - Outputs the result of the comparison between the selected samplers or schedulers, depending on the 'target_parameter'. This facilitates an understanding of how each choice affects the model's performance.
    - Python dtype: `str`
- **`ui`**
    - Provides a user interface component that visualizes the effects of different sampler and scheduler combinations, aiding in the intuitive comparison and selection of the most suitable configuration.
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
