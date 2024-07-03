
# Documentation
- Class name: AV_CheckpointSave
- Category: Art Venture/Model Merging
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_CheckpointSave 节点扩展了基础检查点保存机制的功能，增加了为保存模型状态指定数据类型的选项。这一功能特别适用于 Art Venture 项目中模型合并场景的精度需求。

# Input types
## Required
- model
    - 待保存的模型。这是检查点的核心组成部分，封装了模型的状态。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 与检查点相关的 CLIP 模型。这个参数对于确保保存的状态包含模型功能所需的必要组件至关重要。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- vae
    - 要包含在检查点中的 VAE 模型。这对于捕获模型全部功能范围至关重要，尤其是在生成任务中。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- filename_prefix
    - 保存文件名的前缀。这允许有组织地存储和轻松检索已保存的模型。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- dtype
    - 指定要保存的模型状态的数据类型，可以选择 'float16' 或 'float32'。此选项可以控制保存模型的精度和大小，影响存储效率和计算需求。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVCheckpointSave(CheckpointSave):
    CATEGORY = "Art Venture/Model Merging"

    @classmethod
    def INPUT_TYPES(s):
        inputs = CheckpointSave.INPUT_TYPES()
        inputs["optional"] = {
            "dtype": (["float16", "float32"], {"default": "float16"}),
        }

        return inputs

    def save(self, *args, dtype="float16", **kwargs):
        comfy_save_checkpoint = comfy.sd.save_checkpoint

        if dtype == "float16":

            def save_checkpoint(output_path, model, clip, vae, metadata=None):
                model.model.half()
                return comfy_save_checkpoint(output_path, model, clip, vae, metadata)

            comfy.sd.save_checkpoint = save_checkpoint

        try:
            return super().save(*args, **kwargs)
        finally:
            comfy.sd.save_checkpoint = comfy_save_checkpoint

```
