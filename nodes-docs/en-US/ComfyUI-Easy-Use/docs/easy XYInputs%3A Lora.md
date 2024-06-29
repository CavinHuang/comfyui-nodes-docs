---
tags:
- LoRA
- LoRAVisualization
---

# XY Inputs: Lora //EasyUse
## Documentation
- Class name: `easy XYInputs: Lora`
- Category: `EasyUse/XY Inputs`
- Output node: `False`

This node facilitates the dynamic selection and manipulation of LORA (Low-Rank Adaptation) models for generating or modifying XY input values. It allows users to specify various parameters such as model and clip strengths, and optionally stack multiple LORA configurations for advanced customization.
## Input types
### Required
- **`input_mode`**
    - Defines the mode of input, such as whether weights are included with Lora names, affecting how LORA models are selected and utilized.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_count`**
    - Specifies the number of LORA models to consider, enabling dynamic adjustment based on user requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`model_strength`**
    - Determines the strength of the model's influence, allowing for fine-tuning of the LORA model's impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_strength`**
    - Sets the strength of the clipping operation, offering control over the extent of clipping applied to the LORA model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_name_i`**
    - Specifies the name of a LORA model to be considered in the stack, enabling targeted selection of LORA configurations. The index 'i' ranges from 1 to the number specified by 'lora_count', allowing for multiple LORA models to be specified.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model_str_i`**
    - Determines the model strength for a specified LORA model, allowing for precise control over its influence. The index 'i' corresponds to the LORA model specified by 'lora_name_i'.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_str_i`**
    - Sets the clip strength for a specified LORA model, providing customization of the clipping effect. The index 'i' corresponds to the LORA model specified by 'lora_name_i'.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`optional_lora_stack`**
    - Allows for the inclusion of an existing stack of LORA configurations, providing flexibility in extending or modifying LORA setups.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `list`
## Output types
- **`X or Y`**
    - Comfy dtype: `X_Y`
    - Outputs the generated or modified XY input values, ready for application or further processing.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Lora:

    modes = ["Lora Names", "Lora Names+Weights"]

    @classmethod
    def INPUT_TYPES(cls):
        loras = ["None"] + folder_paths.get_filename_list("loras")

        inputs = {
            "required": {
                "input_mode": (cls.modes,),
                "lora_count": ("INT", {"default": 3, "min": 0, "max": 10, "step": 1}),
                "model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                "clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
            }
        }

        for i in range(1, 10 + 1):
            inputs["required"][f"lora_name_{i}"] = (loras,)
            inputs["required"][f"model_str_{i}"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})
            inputs["required"][f"clip_str_{i}"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})

        inputs["optional"] = {
            "optional_lora_stack": ("LORA_STACK",)
        }
        return inputs

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"

    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, input_mode, lora_count, model_strength, clip_strength, **kwargs):

        axis = "advanced: Lora"
        # Extract values from kwargs
        loras = [kwargs.get(f"lora_name_{i}") for i in range(1, lora_count + 1)]
        model_strs = [kwargs.get(f"model_str_{i}", model_strength) for i in range(1, lora_count + 1)]
        clip_strs = [kwargs.get(f"clip_str_{i}", clip_strength) for i in range(1, lora_count + 1)]

        # Use model_strength and clip_strength for the loras where values are not provided
        if "Weights" not in input_mode:
            for i in range(lora_count):
                model_strs[i] = model_strength
                clip_strs[i] = clip_strength

        # Extend each sub-array with lora_stack if it's not None
        values = [lora.replace(',', '*')+','+str(model_str)+','+str(clip_str) for lora, model_str, clip_str
                    in zip(loras, model_strs, clip_strs) if lora != "None"]

        optional_lora_stack = kwargs.get("optional_lora_stack") if "optional_lora_stack" in kwargs else []

        print(values)
        xy_values = {"axis": axis, "values": values, "lora_stack": optional_lora_stack}
        return (xy_values,)

```
