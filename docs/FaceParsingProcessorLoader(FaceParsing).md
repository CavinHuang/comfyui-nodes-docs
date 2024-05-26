# Documentation
- Class name: FaceParsingProcessorLoader
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

FaceParsingProcessorLoader 是一个用于加载和初始化面部解析处理器的节点。它抽象了设置面部解析模型的复杂性，允许用户将面部解析功能无缝集成到他们的应用程序中，而无需深入了解底层模型架构或预处理步骤。

# Input types
## Required
- face_parsing_path
    - face_parsing_path 参数对于 FaceParsingProcessorLoader 节点至关重要，因为它指定了加载面部解析处理器的位置。这个路径对于节点访问面部解析操作所需的模型文件和配置至关重要。
    - Comfy dtype: "str"
    - Python dtype: str

# Output types
- processor
    - FaceParsingProcessorLoader 节点的输出是一个已初始化并准备好用于面部解析任务的处理器对象。这个处理器封装了面部解析模型所需的预处理图像的功能，使开发人员更容易使用这些模型。
    - Comfy dtype: SegformerImageProcessor
    - Python dtype: transformers.SegformerImageProcessor

# Usage tips
- Infra type: CPU

# Source code
```
class FaceParsingProcessorLoader:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}}
    RETURN_TYPES = ('FACE_PARSING_PROCESSOR',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self):
        from transformers import SegformerImageProcessor
        processor = SegformerImageProcessor.from_pretrained(face_parsing_path)
        return (processor,)
```