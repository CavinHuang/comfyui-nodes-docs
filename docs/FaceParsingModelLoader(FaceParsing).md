# Documentation
- Class name: FaceParsingModelLoader
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

FaceParsingModelLoader节点旨在高效加载并使用特定于面部解析任务的预训练语义分割模型。它抽象了模型初始化的复杂性，允许用户将面部解析功能无缝集成到他们的应用程序中。该节点确保模型被正确实例化并准备好进行推理，专注于促进高级面部特征提取，而不深入模型加载过程的细节。

# Input types
## Required
- face_parsing_path
    - 参数'face_parsing_path'指定了预训练面部解析模型的文件路径。此路径至关重要，因为它指导节点加载正确的模型，从而启用后续的面部解析任务。该参数确保所使用的模型适用于预期的应用程序，从而影响面部解析操作的准确性和性能。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- FACE_PARSING_MODEL
    - 'FACE_PARSING_MODEL'输出提供了已加载的预训练面部解析模型，适用于语义分割任务。此输出非常重要，因为它代表了面部特征提取的主要资产，允许对面部数据进行下游处理和分析。模型的输出确保用户可以访问一个强大的工具，用于解析和理解图像中的面部结构。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class FaceParsingModelLoader:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}}
    RETURN_TYPES = ('FACE_PARSING_MODEL',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self):
        from transformers import AutoModelForSemanticSegmentation
        model = AutoModelForSemanticSegmentation.from_pretrained(face_parsing_path)
        return (model,)
```