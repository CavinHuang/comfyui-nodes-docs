# Documentation
- Class name: samplerSimpleLayerDiffusion
- Category: EasyUse/Sampler
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点简化了在分层扩散模型中执行采样过程，专注于基于提供的输入生成高质量的图像。它通过处理底层模型的复杂性来简化采样过程，使用户能够以最小的配置获得结果。

# Input types
## Required
- pipe
    - ‘pipe’参数作为节点的主要输入通道，提供了采样过程所需的必要数据和设置。正确配置它确保了执行过程中信息和资源的正确流动。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image_output
    - ‘image_output’参数决定生成后的图像如何处理，选项从隐藏到保存或预览不等。该参数影响用户与输出的交互，决定了生成内容的可见性和保留情况。
    - Comfy dtype: COMBO
    - Python dtype: str
- link_id
    - ‘link_id’参数对于将节点的输出与其他系统组件链接至关重要，确保数据被正确路由并可供进一步处理或分析。
    - Comfy dtype: INT
    - Python dtype: int
- save_prefix
    - ‘save_prefix’参数为保存输出文件设置了前缀，这对于在文件系统中组织和识别保存的结果至关重要。正确使用此参数有助于维护一个有结构且易于访问的输出库。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- model
    - ‘model’参数允许用户指定用于采样过程的特定模型。这对于确保在生成输出时利用所需模型的特性和能力至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- prompt
    - ‘prompt’参数通过提供影响输出生成的文本描述或条件，在指导采样过程中起着关键作用。它塑造了生成图像的创意方向和主题内容。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - ‘extra_pnginfo’参数包含与PNG图像相关的额外信息，可能用于完善采样过程。它在根据特定图像要求提高输出的细节和质量方面发挥作用。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str
- my_unique_id
    - ‘my_unique_id’参数用于在系统中唯一标识操作，确保结果可以准确跟踪并与正确的用户或过程关联。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- pipe
    - ‘pipe’输出提供了一个包含所有后续操作或分析所需的数据和设置的综合结构。它对于维护工作流的连续性和一致性至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- final_image
    - ‘final_image’输出代表了采样过程的主要结果，展示了符合指定条件和创意指导生成的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- original_image
    - ‘original_image’输出提供了作为采样过程基础的初始输入图像或数据的引用。这对于比较和分析目的非常有用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- alpha
    - ‘alpha’输出包含生成图像的alpha通道数据，对于需要控制透明度或层叠图像的应用场景非常重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class samplerSimpleLayerDiffusion:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save'], {'default': 'Preview'}), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_prefix': ('STRING', {'default': 'ComfyUI'})}, 'optional': {'model': ('MODEL',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID', 'embeddingsList': (folder_paths.get_filename_list('embeddings'),)}}
    RETURN_TYPES = ('PIPE_LINE', 'IMAGE', 'IMAGE', 'MASK')
    RETURN_NAMES = ('pipe', 'final_image', 'original_image', 'alpha')
    OUTPUT_NODE = True
    OUTPUT_IS_LIST = (False, False, False, True)
    FUNCTION = 'run'
    CATEGORY = 'EasyUse/Sampler'

    def run(self, pipe, image_output='preview', link_id=0, save_prefix='ComfyUI', model=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):
        result = samplerFull().run(pipe, None, None, None, None, None, image_output, link_id, save_prefix, None, model, None, None, None, None, None, None, None, prompt, extra_pnginfo, my_unique_id, force_full_denoise, disable_noise)
        pipe = result['result'][0] if 'result' in result else None
        return {'ui': result['ui'], 'result': (pipe, pipe['images'], pipe['samp_images'], pipe['alpha'])}
```