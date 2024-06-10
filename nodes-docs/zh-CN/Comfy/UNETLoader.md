# Documentation
- Class name: UNETLoader
- Category: advanced/loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

`load_unet` 方法旨在从指定目录检索并加载预训练的 U-Net 模型。它是模型部署流程中的关键组件，确保加载正确的模型并准备就绪以进行推理任务。

# Input types
## Required
- unet_name
    - 参数 `unet_name` 对于识别要加载的特定 U-Net 模型至关重要。它指导加载器到正确的文件路径，使检索所需的模型以进行后续操作成为可能。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- MODEL
    - `load_unet` 方法的输出是一个表示为 PyTorch 模块的 U-Net 模型。该模型可以用于各种图像分割任务，利用预训练的权重进行准确预测。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class UNETLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'unet_name': (folder_paths.get_filename_list('unet'),)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'load_unet'
    CATEGORY = 'advanced/loaders'

    def load_unet(self, unet_name):
        unet_path = folder_paths.get_full_path('unet', unet_name)
        model = comfy.sd.load_unet(unet_path)
        return (model,)
```