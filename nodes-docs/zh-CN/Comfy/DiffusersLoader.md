# Documentation
- Class name: DiffusersLoader
- Category: advanced/loaders/deprecated
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DiffusersLoader 类旨在简化加载和初始化扩散模型的各个组件的过程。它特别适用于从指定路径集成模型本身、CLIP 和 VAE 等不同部分。load_checkpoint 方法是此功能的主要接口，抽象了文件路径解析和模型加载的复杂性。

# Input types
## Required
- model_path
    - model_path 参数对于 DiffusersLoader 节点至关重要，因为它指定了预期模型文件所在的路径。它用于搜索和加载扩散模型的必需组件。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- output_vae
    - output_vae 参数决定是否应与模型一起加载 VAE 组件。它根据应用程序的特定需求提供了模型加载过程中的灵活性。
    - Comfy dtype: bool
    - Python dtype: bool
- output_clip
    - output_clip 参数控制 CLIP 组件的加载。它允许用户指定 CLIP 模型是否应成为加载的模型组件的一部分。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- MODEL
    - MODEL 输出代表了 DiffusersLoader 加载的扩散模型。它是应用程序中进一步处理和分析的中心组件。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- CLIP
    - CLIP 输出是模型的文本特征提取器部分，它根据 output_clip 参数有条件地加载。它在文本到图像的生成任务中扮演着重要角色。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- VAE
    - VAE 输出是扩散模型的变分自编码器组件，它根据 output_vae 参数加载。它对于涉及潜在空间操作的任务至关重要。
    - Comfy dtype: comfy.sd.VAE
    - Python dtype: comfy.sd.VAE

# Usage tips
- Infra type: CPU

# Source code
```
class DiffusersLoader:

    @classmethod
    def INPUT_TYPES(cls):
        paths = []
        for search_path in folder_paths.get_folder_paths('diffusers'):
            if os.path.exists(search_path):
                for (root, subdir, files) in os.walk(search_path, followlinks=True):
                    if 'model_index.json' in files:
                        paths.append(os.path.relpath(root, start=search_path))
        return {'required': {'model_path': (paths,)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'advanced/loaders/deprecated'

    def load_checkpoint(self, model_path, output_vae=True, output_clip=True):
        for search_path in folder_paths.get_folder_paths('diffusers'):
            if os.path.exists(search_path):
                path = os.path.join(search_path, model_path)
                if os.path.exists(path):
                    model_path = path
                    break
        return comfy.diffusers_load.load_diffusers(model_path, output_vae=output_vae, output_clip=output_clip, embedding_directory=folder_paths.get_folder_paths('embeddings'))
```