# Documentation
- Class name: APISR_ModelLoader_Zho
- Category: APISR
- Output node: False
- Repo Ref: https://github.com/ZHO-ZHO-ZHO/ComfyUI-APISR.git

APISR_ModelLoader_Zho 是一个用于加载和管理各种图像超分辨率模型的节点。它抽象了模型初始化的复杂性，使用户能够无缝地将不同的超分辨率算法集成到他们的应用中。该节点强调灵活性和易用性，提供了一个统一的接口来处理不同的模型架构。

# Input types
## Required
- apisr_model
    - apisr_model 参数对于指定要加载的模型文件至关重要。它指导节点到正确的模型架构和权重文件，使节点能够实例化适当的超分辨率生成器。此参数对于节点的执行及其产生的结果质量至关重要。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- pipe
    - 输出参数 'pipe' 表示已加载的超分辨率模型生成器。它很重要，因为它是节点的主要输出，为用户提供了一个用于图像放大任务的即用型模型。生成器的性能直接影响超分辨率过程的有效性。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class APISR_ModelLoader_Zho:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'apisr_model': (folder_paths.get_filename_list('apisr'),)}}
    RETURN_TYPES = ('APISRMODEL',)
    RETURN_NAMES = ('pipe',)
    FUNCTION = 'load_model'
    CATEGORY = '🔎APISR'

    def load_model(self, apisr_model):
        if not apisr_model:
            raise ValueError('Please provide the apisr_model parameter with the name of the model file.')
        apisr_path = folder_paths.get_full_path('apisr', apisr_model)
        if apisr_model == '4x_APISR_GRL_GAN_generator.pth':
            generator = load_grl(apisr_path, scale=4)
        elif apisr_model == '2x_APISR_RRDB_GAN_generator.pth':
            generator = load_rrdb(apisr_path, scale=2)
        else:
            raise gr.Error(error)
        return [generator]
```