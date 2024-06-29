# Documentation
- Class name: IPAdapterUnifiedLoaderFaceID
- Category: ipadapter/faceid
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterUnifiedLoaderFaceID类作为一个专门的接口，用于加载和管理面部识别模型，确保系统内的兼容性和无缝集成。

# Input types
## Required
- model
    - 模型参数对于指定系统内要使用的面部识别模型至关重要，指导整体功能和预期结果。
    - Comfy dtype: MODEL
    - Python dtype: str
- preset
    - 预设参数决定了要应用的面部识别模型的变体，影响面部识别过程的性能和准确性。
    - Comfy dtype: COMBO[preset]
    - Python dtype: str
- lora_strength
    - lora_strength参数微调模型的适应性，允许在面部识别过程中进行细微调整以获得最佳结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- provider
    - provider参数对于确定面部识别模型的执行环境至关重要，影响其操作效率和资源利用。
    - Comfy dtype: COMBO[provider]
    - Python dtype: str

# Output types
- MODEL
    - 输出的MODEL代表加载的面部识别模型，准备在系统内的多种任务和应用中部署。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter输出促进了面部识别模型与系统其他组件的集成，确保了顺畅的操作和数据流。
    - Comfy dtype: IPADAPTER
    - Python dtype: IPADAPTER

# Usage tips
- Infra type: CPU

# Source code
```
class IPAdapterUnifiedLoaderFaceID(IPAdapterUnifiedLoader):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'preset': (['FACEID', 'FACEID PLUS - SD1.5 only', 'FACEID PLUS V2', 'FACEID PORTRAIT (style transfer)'],), 'lora_strength': ('FLOAT', {'default': 0.6, 'min': 0, 'max': 1, 'step': 0.01}), 'provider': (['CPU', 'CUDA', 'ROCM', 'DirectML', 'OpenVINO', 'CoreML'],)}, 'optional': {'ipadapter': ('IPADAPTER',)}}
    RETURN_NAMES = ('MODEL', 'ipadapter')
    CATEGORY = 'ipadapter/faceid'
```