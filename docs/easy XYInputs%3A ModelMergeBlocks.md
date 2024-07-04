
# Documentation
- Class name: easy XYInputs: ModelMergeBlocks
- Category: EasyUse/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

easy XYInputs: ModelMergeBlocks节点为模型合并提供了一个易于使用的接口，用于指定要合并的模型和控制合并过程的参数。它抽象了模型合并中涉及的复杂性，使用户能够方便地组合不同的模型以实现增强或特定功能。

# Input types
## Required
- ckpt_name_i
    - 指定要合并的后续模型的检查点名称。此参数允许用户选择额外的模型版本或状态进行组合，从而创建一个新的合并模型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- vae_use
    - 确定在合并模型中使用哪个模型的VAE（变分自编码器），或允许从可用选项中选择特定的VAE。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- preset
    - 允许用户选择模型合并过程的预设配置，通过提供预定义的参数值来简化设置。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- values
    - 定义合并参数的具体值，如输入、中间和输出块权重，允许对合并过程进行详细自定义。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- X or Y
    - 输出是一个合并模型，可能是模型X或Y，具体取决于用户指定的合并参数和条件。
    - Comfy dtype: X_Y
    - Python dtype: object


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
