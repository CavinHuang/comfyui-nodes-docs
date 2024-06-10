---
tags:
- DataVisualization
- XYPlotData
---

# XY Inputs: Checkpoint //EasyUse
## Documentation
- Class name: `easy XYInputs: Checkpoint`
- Category: `EasyUse/XY Inputs`
- Output node: `False`

This node is designed to facilitate the manipulation and visualization of checkpoint data for models, specifically focusing on generating XY input values based on checkpoint names, clip skips, and VAE names. It abstracts the complexity of handling multiple checkpoints and their associated parameters, enabling users to easily configure and visualize the impact of different checkpoints on model behavior.
## Input types
### Required
- **`input_mode`**
    - Specifies the mode of input, determining how checkpoints, clip skips, and VAE names are processed and utilized within the node. It affects the node's execution path and the resulting XY values.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ckpt_count`**
    - Defines the number of checkpoints to process, influencing the size and composition of the output XY values. It determines how many sets of checkpoint-related parameters are considered in the operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ckpt_name_i`**
    - Represents the name of a checkpoint. Each 'i' in 'ckpt_name_i' ranges from 1 to the total number of checkpoints specified, allowing for individual specification of multiple checkpoints.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_skip_i`**
    - Indicates the clip skip value for each checkpoint. Each 'i' in 'clip_skip_i' ranges from 1 to the total number of checkpoints, specifying the clip skip value associated with each checkpoint.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`vae_name_i`**
    - Specifies the VAE name associated with each checkpoint. Each 'i' in 'vae_name_i' ranges from 1 to the total number of checkpoints, allowing for the association of specific VAEs with individual checkpoints.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`optional_lora_stack`**
    - An optional parameter that, if provided, adds a LORA stack to the processing of checkpoints, clip skips, and VAE names, potentially altering the resulting XY values.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `str`
## Output types
- **`X or Y`**
    - Comfy dtype: `X_Y`
    - The output is a set of XY values derived from the processed checkpoints, clip skips, and VAE names, intended for visualization or further analysis.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Checkpoint:

    modes = ["Ckpt Names", "Ckpt Names+ClipSkip", "Ckpt Names+ClipSkip+VAE"]

    @classmethod
    def INPUT_TYPES(cls):

        checkpoints = ["None"] + folder_paths.get_filename_list("checkpoints")
        vaes = ["Baked VAE"] + folder_paths.get_filename_list("vae")

        inputs = {
            "required": {
                "input_mode": (cls.modes,),
                "ckpt_count": ("INT", {"default": 3, "min": 0, "max": 10, "step": 1}),
            }
        }

        for i in range(1, 10 + 1):
            inputs["required"][f"ckpt_name_{i}"] = (checkpoints,)
            inputs["required"][f"clip_skip_{i}"] = ("INT", {"default": -1, "min": -24, "max": -1, "step": 1})
            inputs["required"][f"vae_name_{i}"] = (vaes,)

        inputs["optional"] = {
            "optional_lora_stack": ("LORA_STACK",)
        }
        return inputs

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"

    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, input_mode, ckpt_count, **kwargs):

        axis = "advanced: Checkpoint"

        checkpoints = [kwargs.get(f"ckpt_name_{i}") for i in range(1, ckpt_count + 1)]
        clip_skips = [kwargs.get(f"clip_skip_{i}") for i in range(1, ckpt_count + 1)]
        vaes = [kwargs.get(f"vae_name_{i}") for i in range(1, ckpt_count + 1)]

        # Set None for Clip Skip and/or VAE if not correct modes
        for i in range(ckpt_count):
            if "ClipSkip" not in input_mode:
                clip_skips[i] = 'None'
            if "VAE" not in input_mode:
                vaes[i] = 'None'

        # Extend each sub-array with lora_stack if it's not None
        values = [checkpoint.replace(',', '*')+','+str(clip_skip)+','+vae.replace(',', '*') for checkpoint, clip_skip, vae in zip(checkpoints, clip_skips, vaes) if
                        checkpoint != "None"]

        optional_lora_stack = kwargs.get("optional_lora_stack") if "optional_lora_stack" in kwargs else []

        xy_values = {"axis": axis, "values": values, "lora_stack": optional_lora_stack}
        return (xy_values,)

```
