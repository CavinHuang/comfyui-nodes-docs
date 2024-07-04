
# Documentation
- Class name: CheckpointLoader (dirty)
- Category: Bmad/api/dirty loaders
- Output node: False

CheckpointLoader (dirty)节点旨在以灵活的方式加载模型检查点，通过使用实用函数来查找最佳匹配，以适应可能不匹配或不完整的文件名。它支持加载模型的各种组件，如配置和权重，以促进模型训练和推理过程的恢复或继续。

# Input types
## Required
- config_name
    - 'config_name'参数指定模型的配置文件名。它在确定模型的架构和加载参数方面起着至关重要的作用。该节点使用实用函数来处理文件名中的不匹配或缺失扩展名。
    - Comfy dtype: STRING
    - Python dtype: str
- ckpt_name
    - 'ckpt_name'参数表示包含模型权重的检查点文件名。该参数对于识别和加载正确的模型状态至关重要，实用函数有助于解决文件名的差异。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- model
    - 表示加载的模型，其架构和权重已恢复，可以进行进一步的训练或推理。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 表示加载模型的CLIP组件（如果适用且请求）。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- vae
    - 表示加载模型的VAE组件（如果适用且请求）。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DirtyCheckpointLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "config_name": ("STRING", {"default": ""}),
            "ckpt_name": ("STRING", {"default": ""})
        }}

    RETURN_TYPES = ("MODEL", "CLIP", "VAE")
    FUNCTION = "load_checkpoint"

    CATEGORY = "Bmad/api/dirty loaders"

    def load_checkpoint(self, config_name, ckpt_name, output_vae=True, output_clip=True):
        ckpt_name = DirtyLoaderUtils.find_matching_filename(
            ckpt_name, folder_paths.get_filename_list("checkpoints"))

        config_name = DirtyLoaderUtils.find_matching_filename(
            config_name, folder_paths.get_filename_list("checkpoints"))

        loader = nodes.CheckpointLoader()
        return loader.load_checkpoint(config_name, ckpt_name, output_vae, output_clip)

```
