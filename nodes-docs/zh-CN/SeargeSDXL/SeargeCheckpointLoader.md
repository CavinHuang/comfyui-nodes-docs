# Documentation
- Class name: SeargeCheckpointLoader
- Category: Searge/_deprecated_/Files
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在检索和加载先前保存的模型检查点，从而实现从特定时间点继续训练或评估模型。

# Input types
## Required
- ckpt_name
    - 检查点名称对于识别要加载的特定模型状态至关重要。它通过确定访问哪个检查点直接影响节点的操作。
    - Comfy dtype: CHECKPOINT_NAME
    - Python dtype: str

# Output types
- MODEL
    - 输出模型代表保存检查点时模型的状态，允许进一步训练或评估。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CLIP
    - 如果存在CLIP组件，则为加载的模型提供额外的上下文和功能，增强其功能。
    - Comfy dtype: CLIP
    - Python dtype: Any
- VAE
    - 如果存在VAE组件，则代表与检查点相关的变分自编码器，使其具有生成能力。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeCheckpointLoader:

    def __init__(self):
        self.chkp_loader = nodes.CheckpointLoaderSimple()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': ('CHECKPOINT_NAME',)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'Searge/_deprecated_/Files'

    def load_checkpoint(self, ckpt_name):
        return self.chkp_loader.load_checkpoint(ckpt_name)
```