# Documentation
- Class name: UpscaleModelLoader
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

UpscaleModelLoader节点旨在高效管理和加载指定目录中的放大模型。它抽象了文件处理和模型加载的复杂性，确保模型能够无缝集成到系统中。

# Input types
## Required
- model_name
    - model_name参数对于识别要加载的特定放大模型至关重要。它将节点指向正确的文件路径，并确保在应用程序中使用适当的模型。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- UPSCALE_MODEL
    - UPSCALE_MODEL输出提供了已加载的放大模型，可供进一步处理或分析使用。它代表了节点操作的成果，为下游组件提供了一个结构化的模型。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class UpscaleModelLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model_name': (folder_paths.get_filename_list('upscale_models'),)}}
    RETURN_TYPES = ('UPSCALE_MODEL',)
    FUNCTION = 'load_model'
    CATEGORY = 'loaders'

    def load_model(self, model_name):
        model_path = folder_paths.get_full_path('upscale_models', model_name)
        sd = comfy.utils.load_torch_file(model_path, safe_load=True)
        if 'module.layers.0.residual_group.blocks.0.norm1.weight' in sd:
            sd = comfy.utils.state_dict_prefix_replace(sd, {'module.': ''})
        out = model_loading.load_state_dict(sd).eval()
        return (out,)
```