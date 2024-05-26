# Documentation
- Class name: samplerSimple
- Category: EasyUse/Sampler
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点通过抽象复杂的配置，简化了采样过程，使用户能够以最少的输入生成图像。它专注于易用性和操作的简化，为图像生成任务提供了一个直接的接口。

# Input types
## Required
- pipe
    - pipe参数作为节点操作的主要数据源和设置源。它至关重要，因为它包含了采样过程所需的上下文，包括模型信息和之前的处理步骤。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- image_output
    - 该参数决定了生成的图像在处理后应如何处理。它在确定输出格式以及随后的动作（如显示、保存或发送图像）方面具有重要意义。
    - Comfy dtype: COMBO
    - Python dtype: Union[str, None]
- link_id
    - link_id参数对于在系统内部的不同组件之间建立连接至关重要，确保正确的数据流向适当的目的地。
    - Comfy dtype: INT
    - Python dtype: int
- save_prefix
    - 该参数定义了保存文件的前缀，这对于在可能包含大量输出的目录中组织和识别输出非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- model
    - model参数提供了用于采样过程的神经网络架构。它是可选的，但可以显著影响生成图像的质量和特性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- tile_size
    - 当生成平铺图像时，tile_size参数是相关的，它影响输出是如何被分割和构建的。它在最终图像的效率和外观方面发挥作用。
    - Comfy dtype: INT
    - Python dtype: int
- prompt
    - prompt参数是一个文本描述，指导图像的生成。它对于将创作过程引向期望的结果非常重要。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - 该参数包含与PNG图像相关的额外信息，可用于完善图像生成过程。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict
- my_unique_id
    - my_unique_id参数用于跟踪和管理节点操作的各个实例，确保每个操作可以被唯一识别和引用。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- pipe
    - pipe输出是一个结构化的数据集合，包括采样过程后的更新模型、样本和其他相关信息。它对于将系统状态传递给后续节点或进行审查至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- image
    - 图像输出包含生成的视觉内容，代表了节点操作的主要结果。它重要因为它展示了采样过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class samplerSimple:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save'], {'default': 'Preview'}), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_prefix': ('STRING', {'default': 'ComfyUI'})}, 'optional': {'model': ('MODEL',)}, 'hidden': {'tile_size': 'INT', 'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID', 'embeddingsList': (folder_paths.get_filename_list('embeddings'),)}}
    RETURN_TYPES = ('PIPE_LINE', 'IMAGE')
    RETURN_NAMES = ('pipe', 'image')
    OUTPUT_NODE = True
    FUNCTION = 'run'
    CATEGORY = 'EasyUse/Sampler'

    def run(self, pipe, image_output, link_id, save_prefix, model=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):
        return samplerFull().run(pipe, None, None, None, None, None, image_output, link_id, save_prefix, None, model, None, None, None, None, None, None, None, prompt, extra_pnginfo, my_unique_id, force_full_denoise, disable_noise)
```