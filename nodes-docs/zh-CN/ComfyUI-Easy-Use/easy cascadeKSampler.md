# Documentation
- Class name: samplerCascadeSimple
- Category: EasyUse/Sampler
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

samplerCascadeSimple节点旨在通过提供简化的接口来简化图像采样过程，使用户更容易使用。它抽象了底层采样过程的复杂性，允许用户以最小的配置生成图像。该节点专注于易用性和效率，确保用户可以快速获得所需的输出，而无需深入了解采样算法的细节。

# Input types
## Required
- pipe
    - ‘pipe’参数对于节点的操作至关重要，因为它代表了包含图像采样所需设置和数据的管道。正是通过此参数，节点接收输入以生成所需的输出图像。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image_output
    - ‘image_output’参数决定了节点生成图像后如何处理这些图像。它决定了图像是预览、保存还是发送，因此在节点的执行流程中扮演着关键角色。
    - Comfy dtype: COMBO['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save']
    - Python dtype: str
- link_id
    - ‘link_id’参数用于建立与生成图像的唯一链接或引用。这对于跟踪或将输出与特定用户请求或流程关联可能非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- save_prefix
    - ‘save_prefix’参数指定保存生成的图像时使用的前缀。这可以影响保存文件的命名约定，使用户更容易识别和组织他们的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- model_c
    - 可选的‘model_c’参数允许用户提供在采样过程中使用的特定模型。当用户对特定模型有偏好或需要应用特定模型设置时，这可能特别有用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Output types
- pipe
    - ‘pipe’输出提供了采样过程后的更新管道，其中包括生成的图像和任何其他相关数据。这个输出很重要，因为它可能用于进一步的处理或分析。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image
    - ‘image’输出代表采样过程中生成的图像。这是大多数用户最感兴趣的主要输出，因为它是节点操作的视觉结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class samplerCascadeSimple:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save'], {'default': 'Preview'}), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_prefix': ('STRING', {'default': 'ComfyUI'})}, 'optional': {'model_c': ('MODEL',)}, 'hidden': {'tile_size': 'INT', 'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID', 'embeddingsList': (folder_paths.get_filename_list('embeddings'),)}}
    RETURN_TYPES = ('PIPE_LINE', 'IMAGE')
    RETURN_NAMES = ('pipe', 'image')
    OUTPUT_NODE = True
    FUNCTION = 'run'
    CATEGORY = 'EasyUse/Sampler'

    def run(self, pipe, image_output, link_id, save_prefix, model_c=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):
        return samplerCascadeFull().run(pipe, None, None, None, None, None, None, None, image_output, link_id, save_prefix, None, None, None, model_c, tile_size, prompt, extra_pnginfo, my_unique_id, force_full_denoise, disable_noise)
```