# Documentation
- Class name: FaceRestoreModelLoader
- Category: facerestore_cf
- Output node: False
- Repo Ref: https://github.com/mav-rik/facerestore_cf

该节点旨在根据提供的模型名称加载和初始化面部恢复模型，确保适当的模型准备好用于面部恢复任务中的进一步处理。

# Input types
## Required
- model_name
    - 模型名称参数至关重要，因为它指定了要加载的面部恢复模型的唯一标识符。它影响整个加载过程和模型的后续性能。
    - Comfy dtype: folder_paths.get_filename_list('facerestore_models')
    - Python dtype: List[str]

# Output types
- FACERESTORE_MODEL
    - 输出是加载的面部恢复模型，对于执行高质量的面部恢复任务至关重要。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class FaceRestoreModelLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model_name': (folder_paths.get_filename_list('facerestore_models'),)}}
    RETURN_TYPES = ('FACERESTORE_MODEL',)
    FUNCTION = 'load_model'
    CATEGORY = 'facerestore_cf'

    def load_model(self, model_name):
        if 'codeformer' in model_name.lower():
            print(f'\tLoading CodeFormer: {model_name}')
            model_path = folder_paths.get_full_path('facerestore_models', model_name)
            device = model_management.get_torch_device()
            codeformer_net = ARCH_REGISTRY.get('CodeFormer')(dim_embd=512, codebook_size=1024, n_head=8, n_layers=9, connect_list=['32', '64', '128', '256']).to(device)
            checkpoint = torch.load(model_path)['params_ema']
            codeformer_net.load_state_dict(checkpoint)
            out = codeformer_net.eval()
            return (out,)
        else:
            model_path = folder_paths.get_full_path('facerestore_models', model_name)
            sd = comfy.utils.load_torch_file(model_path, safe_load=True)
            out = model_loading.load_state_dict(sd).eval()
            return (out,)
```