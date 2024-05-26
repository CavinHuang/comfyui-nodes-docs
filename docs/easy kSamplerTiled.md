# Documentation
- Class name: samplerSimpleTiled
- Category: EasyUse/Sampler
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点通过管理图像的平铺和根据用户偏好处理输出来简化采样过程。它抽象了采样的复杂性，使用户能够专注于创意输入，而无需担心采样过程的技术细节。

# Input types
## Required
- pipe
    - 管道参数是必需的，因为它携带了整个流水线的状态，包括模型和数据信息，指导节点执行。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- tile_size
    - 平铺大小参数决定了平铺输出的尺寸，这对于控制最终图像的分辨率和布局至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- image_output
    - 此参数控制图像输出的处理方式，无论是预览、保存还是其他目的，影响节点的可用性和工作流程。
    - Comfy dtype: COMBO
    - Python dtype: Union[str, None]
- link_id
    - 链接ID参数对于建立系统不同部分之间的连接非常重要，确保正确的数据流和通信。
    - Comfy dtype: INT
    - Python dtype: int
- save_prefix
    - 此参数指定保存文件的前缀，对于在文件系统中组织和识别输出至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- model
    - 当提供模型参数时，允许节点在采样过程中使用特定模型，影响生成图像的质量和特性。
    - Comfy dtype: MODEL
    - Python dtype: Any
- prompt
    - 提示参数用于指导生成过程，其内容显著影响采样的创意方向和结果。
    - Comfy dtype: PROMPT
    - Python dtype: Any
- extra_pnginfo
    - 此参数包含与PNG图像相关的额外信息，可以增强节点内此类图像的处理和处理。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Any
- my_unique_id
    - 唯一ID参数用于跟踪和管理节点操作的各个实例，确保个性化和有针对性的执行。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: Any

# Output types
- pipe
    - 管道输出是一个综合性结构，包括更新后的流水线状态，反映了采样过程中所做的更改。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- image
    - 图像输出代表采样的视觉结果，是节点生成的主要创意内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class samplerSimpleTiled:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'tile_size': ('INT', {'default': 512, 'min': 320, 'max': 4096, 'step': 64}), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save'], {'default': 'Preview'}), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_prefix': ('STRING', {'default': 'ComfyUI'})}, 'optional': {'model': ('MODEL',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID', 'embeddingsList': (folder_paths.get_filename_list('embeddings'),)}}
    RETURN_TYPES = ('PIPE_LINE', 'IMAGE')
    RETURN_NAMES = ('pipe', 'image')
    OUTPUT_NODE = True
    FUNCTION = 'run'
    CATEGORY = 'EasyUse/Sampler'

    def run(self, pipe, tile_size=512, image_output='preview', link_id=0, save_prefix='ComfyUI', model=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):
        return samplerFull().run(pipe, None, None, None, None, None, image_output, link_id, save_prefix, None, model, None, None, None, None, None, None, tile_size, prompt, extra_pnginfo, my_unique_id, force_full_denoise, disable_noise)
```