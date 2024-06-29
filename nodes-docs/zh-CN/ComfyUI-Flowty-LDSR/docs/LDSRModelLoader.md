# Documentation
- Class name: LDSRModelLoader
- Category: Flowty LDSR
- Output node: False
- Repo Ref: https://github.com/flowtyone/ComfyUI-Flowty-LDSR.git

该节点旨在加载并准备一个LDSR模型以供使用，抽象化了模型检索和初始化的复杂性。它通过将模型转移到适当的设备并设置为评估模式，确保模型准备好用于上采样任务。

# Input types
## Required
- model
    - 模型参数至关重要，因为它指定了要加载的LDSR模型。它通过确定用于上采样过程的哪个模型的状态字典和配置来影响整个操作。
    - Comfy dtype: COMBO[filename]
    - Python dtype: str

# Output types
- UPSCALE_MODEL
    - 输出提供了一个完全初始化并准备好的LDSR模型，这对于进一步的图像上采样任务非常重要。
    - Comfy dtype: COMBO[LDSR]
    - Python dtype: LDSR

# Usage tips
- Infra type: CPU

# Source code
```
class LDSRModelLoader:

    @classmethod
    def INPUT_TYPES(s):
        model_list = get_filename_list('upscale_models')
        candidates = [name for name in model_list if 'last.ckpt' in name]
        if len(candidates) > 0:
            default_path = candidates[0]
        else:
            default_path = 'last.ckpt'
        return {'required': {'model': (model_list, {'default': default_path})}}
    RETURN_TYPES = ('UPSCALE_MODEL',)
    FUNCTION = 'load'
    CATEGORY = 'Flowty LDSR'

    def load(self, model):
        model_path = get_full_path('upscale_models', model)
        model = LDSR.load_model_from_path(model_path)
        model['model'].cpu()
        return (model,)
```