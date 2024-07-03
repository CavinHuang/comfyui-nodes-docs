
# Documentation
- Class name: AV_CheckpointModelsToParametersPipe
- Category: Art Venture/Parameters
- Output node: False

该节点旨在将模型检查点名称和各种模型组件名称转换为结构化的管道配置。它通过将VAE、升级器和LoRA层等组件的名称映射到管道字典中，便于组织和管理这些组件，从而简化了在AI艺术生成工作流程中配置和使用这些组件的过程。

# Input types
## Required
- ckpt_name
    - 主要模型检查点的名称。对于确定管道中要使用的主要模型至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- pipe
    - 一个可能已经包含一些管道配置的字典，该节点将根据提供的模型组件名称更新或扩展这个字典。
    - Comfy dtype: PIPE
    - Python dtype: Dict
- secondary_ckpt_name
    - 次要模型检查点的名称，允许将额外的模型整合到管道中。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- vae_name
    - 指定要包含在管道中的VAE（变分自编码器）模型的名称，用于增强模型的能力。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- upscaler_name
    - 用于在管道中增强图像分辨率的升级模型的名称。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- secondary_upscaler_name
    - 附加升级模型的名称，为选择分辨率增强方法提供了灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_i_name
    - LoRA（低秩适应）层的名称，用于微调模型的行为。索引'i'可以从1到3，允许指定最多三个不同的LoRA层。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- pipe
    - Comfy dtype: PIPE
    - 一个将模型组件名称映射到其各自标识符的字典，组织管道配置以便于访问和修改。
    - Python dtype: Dict


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVCheckpointModelsToParametersPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"),),
            },
            "optional": {
                "pipe": ("PIPE",),
                "secondary_ckpt_name": (["None"] + folder_paths.get_filename_list("checkpoints"),),
                "vae_name": (["None"] + folder_paths.get_filename_list("vae"),),
                "upscaler_name": (["None"] + folder_paths.get_filename_list("upscale_models"),),
                "secondary_upscaler_name": (["None"] + folder_paths.get_filename_list("upscale_models"),),
                "lora_1_name": (["None"] + folder_paths.get_filename_list("loras"),),
                "lora_2_name": (["None"] + folder_paths.get_filename_list("loras"),),
                "lora_3_name": (["None"] + folder_paths.get_filename_list("loras"),),
            },
        }

    RETURN_TYPES = ("PIPE",)
    CATEGORY = "Art Venture/Parameters"
    FUNCTION = "checkpoint_models_to_parameter_pipe"

    def checkpoint_models_to_parameter_pipe(
        self,
        ckpt_name,
        pipe: Dict = {},
        secondary_ckpt_name="None",
        vae_name="None",
        upscaler_name="None",
        secondary_upscaler_name="None",
        lora_1_name="None",
        lora_2_name="None",
        lora_3_name="None",
    ):
        pipe["ckpt_name"] = ckpt_name if ckpt_name != "None" else None
        pipe["secondary_ckpt_name"] = secondary_ckpt_name if secondary_ckpt_name != "None" else None
        pipe["vae_name"] = vae_name if vae_name != "None" else None
        pipe["upscaler_name"] = upscaler_name if upscaler_name != "None" else None
        pipe["secondary_upscaler_name"] = secondary_upscaler_name if secondary_upscaler_name != "None" else None
        pipe["lora_1_name"] = lora_1_name if lora_1_name != "None" else None
        pipe["lora_2_name"] = lora_2_name if lora_2_name != "None" else None
        pipe["lora_3_name"] = lora_3_name if lora_3_name != "None" else None
        return (pipe,)

```
