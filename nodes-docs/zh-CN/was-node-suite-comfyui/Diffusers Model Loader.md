# Documentation
- Class name: WAS_Diffusers_Loader
- Category: WAS Suite/Loaders/Advanced
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `load_checkpoint` 旨在从指定目录加载和管理预训练模型。它能够智能地遍历文件系统以定位和加载所需的模型，并确保如果需要，VAE 和 CLIP 等必要组件也可用。此方法在应用程序中初始化模型基础设施至关重要，为下游任务提供了模型组件的无缝集成。

# Input types
## Required
- model_path
    - 参数 `model_path` 对于在文件系统中识别要加载的特定模型至关重要。它指导节点到正确的位置，使模型的数据和结构能够被检索和使用。此参数对于节点的执行至关重要，因为它决定了将在后续操作中使用的模型的来源。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- output_vae
    - 参数 `output_vae` 决定是否应将模型的变分自编码器（VAE）组件与主模型一起加载。这个决定可以影响节点的功能，特别是如果下游任务需要 VAE 的生成能力。因此，根据应用的具体需求，包含或排除 VAE 可以是一个战略性的选择。
    - Comfy dtype: bool
    - Python dtype: bool
- output_clip
    - 参数 `output_clip` 控制加载 CLIP 组件，该组件通常用于图像-文本匹配任务。根据应用的需求，启用或禁用此参数可以影响节点执行此类任务的能力。它是确保节点与项目更广泛目标一致的重要考虑因素。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- MODEL
    - 输出 `MODEL` 代表了加载的模型的核心结构，是执行机器学习任务的主要组件。它封装了模型的架构和学习到的参数，因此是系统中任何后续基于模型的操作的基本输出。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- CLIP
    - 当存在 `CLIP` 输出时，它提供了图像-文本匹配功能的接口。它是一个可选组件，可以根据应用的需求加载，为涉及将图像与文本描述关联的任务提供额外的能力。
    - Comfy dtype: Optional[torch.nn.Module]
    - Python dtype: Optional[torch.nn.Module]
- VAE
    - 输出 `VAE` 是模型的变分自编码器部分，负责模型的生成方面。它是一个可选输出，可以根据应用的任务是否需要生成能力来包含。
    - Comfy dtype: Optional[torch.nn.Module]
    - Python dtype: Optional[torch.nn.Module]
- NAME_STRING
    - 输出 `NAME_STRING` 提供了加载模型的基本名称，这对于应用中的日志记录、识别或引用非常有用。它作为一个人类可读的标签，可以帮助跟踪和管理模型的使用。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Diffusers_Loader:

    @classmethod
    def INPUT_TYPES(cls):
        paths = []
        for search_path in comfy_paths.get_folder_paths('diffusers'):
            if os.path.exists(search_path):
                paths += next(os.walk(search_path))[1]
        return {'required': {'model_path': (paths,)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', TEXT_TYPE)
    RETURN_NAMES = ('MODEL', 'CLIP', 'VAE', 'NAME_STRING')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'WAS Suite/Loaders/Advanced'

    def load_checkpoint(self, model_path, output_vae=True, output_clip=True):
        for search_path in comfy_paths.get_folder_paths('diffusers'):
            if os.path.exists(search_path):
                paths = next(os.walk(search_path))[1]
                if model_path in paths:
                    model_path = os.path.join(search_path, model_path)
                    break
        out = comfy.diffusers_convert.load_diffusers(model_path, fp16=comfy.model_management.should_use_fp16(), output_vae=output_vae, output_clip=output_clip, embedding_directory=comfy_paths.get_folder_paths('embeddings'))
        return (out[0], out[1], out[2], os.path.basename(model_path))
```