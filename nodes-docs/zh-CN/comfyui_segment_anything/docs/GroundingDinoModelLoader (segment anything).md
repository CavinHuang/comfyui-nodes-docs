# Documentation
- Class name: GroundingDinoModelLoader
- Category: segment_anything
- Output node: False
- Repo Ref: https://github.com/storyicon/comfyui_segment_anything

该节点旨在加载和准备一个GroundingDino模型，用于图像的分割和理解。它封装了选择模型、加载其配置和初始化模型结构的过程。节点通过将模型放置在适当的设备上并将其设置为评估模式，确保模型准备好进行进一步的处理。

# Input types
## Required
- model_name
    - 模型名称参数至关重要，因为它决定了将要加载哪个GroundingDino模型进行处理。它通过指定模型架构及其相关权重来影响整个操作，这对于模型在图像分割任务中的性能至关重要。
    - Comfy dtype: list
    - Python dtype: str

# Output types
- GROUNDING_DINO_MODEL
    - 输出提供了一个完全初始化并准备使用的GroundingDino模型。它封装了模型的架构、学习到的权重，并且为在图像分割任务中的部署做好了准备，标志着其在流程中的重要性。
    - Comfy dtype: model
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class GroundingDinoModelLoader:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model_name': (list_groundingdino_model(),)}}
    CATEGORY = 'segment_anything'
    FUNCTION = 'main'
    RETURN_TYPES = ('GROUNDING_DINO_MODEL',)

    def main(self, model_name):
        dino_model = load_groundingdino_model(model_name)
        return (dino_model,)
```