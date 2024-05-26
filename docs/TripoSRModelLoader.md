# Documentation
- Class name: TripoSRModelLoader
- Category: Flowty TripoSR
- Output node: False
- Repo Ref: https://github.com/flowtyone/ComfyUI-Flowty-TripoSR

TripoSRModelLoader旨在高效管理和初始化TripoSR模型，确保其按指定配置和资源正确加载。它抽象了模型加载和设置的复杂性，为用户提供了一个直接的接口来访问模型的功能。

# Input types
## Required
- model
    - ‘model’参数对于指定模型检查点的路径至关重要。它直接影响TripoSR模型的初始化，并且对节点的操作至关重要，因为它决定了将使用哪些权重和配置。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
## Optional
- chunk_size
    - ‘chunk_size’参数通过控制批处理大小来优化模型的内存使用。它在平衡性能和资源消耗方面发挥着重要作用，允许高效处理大规模数据。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- TRIPOSR_MODEL
    - 输出提供了初始化并准备使用的TripoSR模型。它封装了模型的整个功能，允许用户利用其功能进行各种超分辨率任务。
    - Comfy dtype: COMBO[torch.nn.Module]
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class TripoSRModelLoader:

    def __init__(self):
        self.initialized_model = None

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': (get_filename_list('checkpoints'),), 'chunk_size': ('INT', {'default': 8192, 'min': 1, 'max': 10000})}}
    RETURN_TYPES = ('TRIPOSR_MODEL',)
    FUNCTION = 'load'
    CATEGORY = 'Flowty TripoSR'

    def load(self, model, chunk_size):
        device = get_torch_device()
        if not torch.cuda.is_available():
            device = 'cpu'
        if not self.initialized_model:
            print('Loading TripoSR model')
            self.initialized_model = TSR.from_pretrained_custom(weight_path=get_full_path('checkpoints', model), config_path=path.join(path.dirname(__file__), 'config.yaml'))
            self.initialized_model.renderer.set_chunk_size(chunk_size)
            self.initialized_model.to(device)
        return (self.initialized_model,)
```