# Documentation
- Class name: SAMModelLoader
- Category: segment_anything
- Output node: False
- Repo Ref: https://github.com/storyicon/comfyui_segment_anything

SAMModelLoader节点负责加载和准备用于图像分割任务的Segment Anything Model（SAM）。它确保根据指定的模型名称加载正确的模型，使其成为初始化分割过程的关键组件。

# Input types
## Required
- model_name
    - model_name参数对于识别要加载的特定Segment Anything Model至关重要。它指导节点到正确的模型配置，并确保为任务分配适当的资源。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- SAM_MODEL
    - SAM_MODEL输出代表已加载的Segment Anything Model，准备用于图像分割任务。它是节点操作的成果，为后续处理步骤提供了基础模型。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class SAMModelLoader:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model_name': (list_sam_model(),)}}
    CATEGORY = 'segment_anything'
    FUNCTION = 'main'
    RETURN_TYPES = ('SAM_MODEL',)

    def main(self, model_name):
        sam_model = load_sam_model(model_name)
        return (sam_model,)
```