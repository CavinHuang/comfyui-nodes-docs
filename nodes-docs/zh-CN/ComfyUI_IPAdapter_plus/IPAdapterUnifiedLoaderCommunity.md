# Documentation
- Class name: IPAdapterUnifiedLoaderCommunity
- Category: ipadapter/loaders
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterUnifiedLoaderCommunity节点旨在简化IPAdapter框架中各种模型和预设的加载和管理。它提供了一个统一的接口来访问不同的模型配置，确保在不同应用中的兼容性和易用性。

# Input types
## Required
- model
    - ‘model’参数对于节点的操作至关重要，因为它指定了要加载的模型。它直接影响节点的执行，因为它决定了将使用的特定模型配置。
    - Comfy dtype: MODEL
    - Python dtype: str
## Optional
- preset
    - ‘preset’参数允许从预定义列表中选择特定的预设配置，这可以显著影响节点的功能和结果输出。
    - Comfy dtype: COMBO['Composition']
    - Python dtype: str
- ipadapter
    - 可选的‘ipadapter’参数用于指定节点要使用的特定IPAdapter。其包含可以增强节点对不同IPAdapter配置的适应性。
    - Comfy dtype: IPADAPTER
    - Python dtype: str

# Output types

# Usage tips
- Infra type: CPU

# Source code
```
class IPAdapterUnifiedLoaderCommunity(IPAdapterUnifiedLoader):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'preset': (['Composition'],)}, 'optional': {'ipadapter': ('IPADAPTER',)}}
    CATEGORY = 'ipadapter/loaders'
```