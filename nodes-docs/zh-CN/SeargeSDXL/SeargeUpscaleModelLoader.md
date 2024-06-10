# Documentation
- Class name: SeargeUpscaleModelLoader
- Category: Searge/_deprecated_/Files
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeUpscaleModelLoader节点旨在简化图像增强任务中放大器模型的加载过程。它抽象了模型加载的复杂性，使得在更大的工作流程中无缝集成上采样功能成为可能。对于需要高质量图像缩放而不深入模型处理细节的应用来说，这个节点至关重要。

# Input types
## Required
- upscaler_name
    - 参数'upscaler_name'对于识别要加载的特定放大器模型至关重要。它在节点的操作中起着核心作用，因为它决定了将使用哪个模型进行图像上采样，直接影响输出的质量和特性。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- UPSCALE_MODEL
    - 'UPSCALE_MODEL'输出代表已加载的放大器模型，是后续图像处理任务的基本组成部分。它封装了模型的架构和学习到的参数，准备根据工作流程的要求应用于图像上采样。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeUpscaleModelLoader:

    def __init__(self):
        self.upscale_model_loader = comfy_extras.nodes_upscale_model.UpscaleModelLoader()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'upscaler_name': ('UPSCALER_NAME',)}}
    RETURN_TYPES = ('UPSCALE_MODEL',)
    FUNCTION = 'load_upscaler'
    CATEGORY = 'Searge/_deprecated_/Files'

    def load_upscaler(self, upscaler_name):
        return self.upscale_model_loader.load_model(upscaler_name)
```