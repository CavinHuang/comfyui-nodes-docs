# Documentation
- Class name: LoadOOTDPipeline
- Category: OOTD
- Output node: False
- Repo Ref: https://github.com/AuroBit/ComfyUI-OOTDiffusion.git

该节点旨在实例化并提供对OOTDiffusion模型的访问，该模型能够根据文本描述生成与时尚相关的图像。它抽象了模型加载和设置的复杂性，确保模型准备好进行推理任务，而不需要详细了解底层架构或训练过程。

# Input types
## Required
- type
    - ‘type’参数对于确定要加载的OOTDiffusion模型的特定配置至关重要。它决定了模型是为生成半身（'Half body'）还是全身（'Full body'）服装的图像而优化。这个选择显著影响模型的性能和输出质量。
    - Comfy dtype: COMBO['Half body', 'Full body']
    - Python dtype: str
- path
    - ‘path’参数至关重要，因为它指向存储OOTDiffusion模型及其相关文件的目录。这包括模型权重、配置文件和任何其他必要的数据。正确的路径确保节点能够成功加载并初始化模型以进行图像生成任务。
    - Comfy dtype: string
    - Python dtype: str

# Output types
- pipe
    - ‘pipe’输出是已加载的OOTDiffusion模型，准备用于生成时尚图像。它封装了模型的功能，并允许与系统的其余部分无缝交互，以完成各种图像生成任务。
    - Comfy dtype: object
    - Python dtype: OOTDiffusion

# Usage tips
- Infra type: GPU

# Source code
```
class LoadOOTDPipeline:
    display_name = 'Load OOTDiffusion Local'

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'type': (['Half body', 'Full body'],), 'path': (['/data/app/aigc-worker-v3/models/OOTDiffusion'], {'default': '/data/app/aigc-worker-v3/models/OOTDiffusion'})}}
    RETURN_TYPES = ('MODEL',)
    RETURN_NAMES = ('pipe',)
    FUNCTION = 'load'
    CATEGORY = 'OOTD'

    @staticmethod
    def load_impl(type, path):
        if type == 'Half body':
            type = 'hd'
        elif type == 'Full body':
            type = 'dc'
        else:
            raise ValueError(f"unknown input type {type} must be 'Half body' or 'Full body'")
        if not os.path.isdir(path):
            raise ValueError(f'input path {path} is not a directory')
        return OOTDiffusion(path, model_type=type)

    def load(self, type, path):
        return (self.load_impl(type, path),)
```