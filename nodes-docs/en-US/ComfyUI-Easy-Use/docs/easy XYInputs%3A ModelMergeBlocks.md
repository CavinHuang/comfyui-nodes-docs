---
tags:
- ModelMerge
---

# XY Inputs: ModelMergeBlocks //EasyUse
## Documentation
- Class name: `easy XYInputs: ModelMergeBlocks`
- Category: `EasyUse/XY Inputs`
- Output node: `False`

This node facilitates the merging of models by providing an easy-to-use interface for specifying the models to be merged and the parameters governing the merge process. It abstracts the complexities involved in model merging, making it accessible for users to combine different models to achieve enhanced or specific functionalities.
## Input types
### Required
- **`ckpt_name_i`**
    - Specifies the checkpoint name for the subsequent models to be merged. This parameter allows users to select additional model versions or states to combine, enabling the creation of a new, merged model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_use`**
    - Determines which model's VAE (Variational Autoencoder) is to be used in the merged model or allows for the selection of a specific VAE from available options.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`preset`**
    - Allows users to select a preset configuration for the model merging process, simplifying the setup by providing predefined parameter values.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`values`**
    - Defines the specific values for the merge parameters, such as input, middle, and output block weights, allowing for detailed customization of the merge process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`X or Y`**
    - Comfy dtype: `X_Y`
    - The output is a merged model, which could be either model X or Y depending on the merging parameters and conditions specified by the user.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_ModelMergeBlocks:

    @classmethod
    def INPUT_TYPES(s):
        checkpoints = folder_paths.get_filename_list("checkpoints")
        vae = ["Use Model 1", "Use Model 2"] + folder_paths.get_filename_list("vae")

        preset = ["Preset"]  # 20
        preset += load_preset("mmb-preset.txt")
        preset += load_preset("mmb-preset.custom.txt")

        default_vectors = "1,0,0; \n0,1,0; \n0,0,1; \n1,1,0; \n1,0,1; \n0,1,1; "
        return {
            "required": {
                "ckpt_name_1": (checkpoints,),
                "ckpt_name_2": (checkpoints,),
                "vae_use": (vae, {"default": "Use Model 1"}),
                "preset": (preset, {"default": "preset"}),
                "values": ("STRING", {"default": default_vectors, "multiline": True, "placeholder": 'Support 2 methods:\n\n1.input, middle, out in same line and insert values seperated by "; "\n\n2.model merge block number seperated by ", " in same line and insert values seperated by "; "'}),
            },
            "hidden": {"my_unique_id": "UNIQUE_ID"}
        }

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"

    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, ckpt_name_1, ckpt_name_2, vae_use, preset, values, my_unique_id=None):

        axis = "advanced: ModelMergeBlocks"
        if ckpt_name_1 is None:
            raise Exception("ckpt_name_1 is not found")
        if ckpt_name_2 is None:
            raise Exception("ckpt_name_2 is not found")

        models = (ckpt_name_1, ckpt_name_2)

        xy_values = {"axis":axis, "values":values, "models":models, "vae_use": vae_use}
        return (xy_values,)

```
