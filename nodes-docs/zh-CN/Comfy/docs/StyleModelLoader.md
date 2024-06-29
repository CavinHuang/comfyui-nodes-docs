# Documentation
- Class name: StyleModelLoader
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

StyleModelLoader节点旨在高效管理和加载风格模型。它是模型部署流水线中的关键组件，确保检索到适当的风格模型并准备使用。该节点抽象了文件路径管理和模型加载的复杂性，为下游任务提供了无缝的接口。

# Input types
## Required
- style_model_name
    - 参数'style_model_name'对于识别要加载的特定风格模型至关重要。它在节点的运行中起着关键作用，通过指导节点到风格模型目录中正确的文件路径。参数的值直接影响最终加载和在后续流程中使用模型。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- STYLE_MODEL
    - 输出'STYLE_MODEL'代表已加载的风格模型，是进一步处理和分析的关键元素。它封装了风格模型学习到的特征和参数，使其能够应用于各种任务，如风格迁移或特征提取。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class StyleModelLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'style_model_name': (folder_paths.get_filename_list('style_models'),)}}
    RETURN_TYPES = ('STYLE_MODEL',)
    FUNCTION = 'load_style_model'
    CATEGORY = 'loaders'

    def load_style_model(self, style_model_name):
        style_model_path = folder_paths.get_full_path('style_models', style_model_name)
        style_model = comfy.sd.load_style_model(style_model_path)
        return (style_model,)
```