# Documentation
- Class name: samplerSimpleDownscaleUnet
- Category: EasyUse/Sampler
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

samplerSimpleDownscaleUnet节点旨在流程中便于对图像进行缩小和放大。它通过选择适当的缩小方法并将其应用于输入图像，然后通过放大过程来增强图像质量。此节点特别适用于优化图像处理工作流程，确保图像在不损失细节或清晰度的情况下有效缩放。

# Input types
## Required
- pipe
    - pipe参数是必需的，因为它代表包含要处理的图像数据的管道。正是通过此参数，节点访问图像并执行后续的缩放操作。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- downscale_mode
    - downscale_mode参数决定了用于缩小图像的方法。它可以设置为'Auto'以自动选择或'Custom'以手动配置，这对于控制缩放过程至关重要。
    - Comfy dtype: COMBO[None, Auto, Custom]
    - Python dtype: str
- block_number
    - block_number参数指定了在缩小过程中要使用的块的数量。它是影响缩放操作效率和结果的重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- downscale_factor
    - downscale_factor参数定义了用于减小图像大小的缩放因子。它在缩小过程中扮演重要角色，直接影响图像的最终尺寸。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - start_percent参数建立了缩放过程的起始百分比。它是一个重要的参数，有助于确定图像缩放的初始状态。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - end_percent参数设置了缩放过程的结束百分比。它是控制缩放后图像最终外观的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- downscale_after_skip
    - downscale_after_skip参数指示是否应在网络的跳跃连接之后进行缩小。这可能会影响缩小后图像的质量。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- downscale_method
    - downscale_method参数选择用于缩小图像的算法。这是一个关键选择，可以显著影响结果图像的质量。
    - Comfy dtype: COMBO[bicubic, nearest-exact, bilinear, area, bislerp]
    - Python dtype: str
- upscale_method
    - upscale_method参数确定在图像缩小后用于放大图像的算法。它在放大阶段提高图像质量方面很重要。
    - Comfy dtype: COMBO[bicubic, nearest-exact, bilinear, area, bislerp]
    - Python dtype: str
- image_output
    - image_output参数指示如何处理生成的图像。它可以设置为隐藏图像、预览图像、保存图像或这些选项的组合，这对于管理节点的输出至关重要。
    - Comfy dtype: COMBO[Hide, Preview, Save, Hide/Save, Sender, Sender/Save]
    - Python dtype: str
- link_id
    - link_id参数用于将节点的输出与特定链接或流程关联。它在更大的工作流程中跟踪和管理节点的输出很重要。
    - Comfy dtype: INT
    - Python dtype: int
- save_prefix
    - save_prefix参数指定用于保存图像文件的前缀。它是一个有用的参数，用于组织和识别保存的图像文件。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- pipe
    - pipe输出提供处理后的图像管道，其中包括缩放后的图像和其他相关数据。它很重要，因为它允许在后续节点中进一步处理或分析图像。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image
    - image输出代表节点处理后得到的缩放图像。它是视觉检查和进一步操作图像的关键输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class samplerSimpleDownscaleUnet:

    def __init__(self):
        pass
    upscale_methods = ['bicubic', 'nearest-exact', 'bilinear', 'area', 'bislerp']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',), 'downscale_mode': (['None', 'Auto', 'Custom'], {'default': 'Auto'}), 'block_number': ('INT', {'default': 3, 'min': 1, 'max': 32, 'step': 1}), 'downscale_factor': ('FLOAT', {'default': 2.0, 'min': 0.1, 'max': 9.0, 'step': 0.001}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_percent': ('FLOAT', {'default': 0.35, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'downscale_after_skip': ('BOOLEAN', {'default': True}), 'downscale_method': (s.upscale_methods,), 'upscale_method': (s.upscale_methods,), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save'], {'default': 'Preview'}), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_prefix': ('STRING', {'default': 'ComfyUI'})}, 'optional': {'model': ('MODEL',)}, 'hidden': {'tile_size': 'INT', 'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID', 'embeddingsList': (folder_paths.get_filename_list('embeddings'),)}}
    RETURN_TYPES = ('PIPE_LINE', 'IMAGE')
    RETURN_NAMES = ('pipe', 'image')
    OUTPUT_NODE = True
    FUNCTION = 'run'
    CATEGORY = 'EasyUse/Sampler'

    def run(self, pipe, downscale_mode, block_number, downscale_factor, start_percent, end_percent, downscale_after_skip, downscale_method, upscale_method, image_output, link_id, save_prefix, model=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):
        downscale_options = None
        if downscale_mode == 'Auto':
            downscale_options = {'block_number': block_number, 'downscale_factor': None, 'start_percent': 0, 'end_percent': 0.35, 'downscale_after_skip': True, 'downscale_method': 'bicubic', 'upscale_method': 'bicubic'}
        elif downscale_mode == 'Custom':
            downscale_options = {'block_number': block_number, 'downscale_factor': downscale_factor, 'start_percent': start_percent, 'end_percent': end_percent, 'downscale_after_skip': downscale_after_skip, 'downscale_method': downscale_method, 'upscale_method': upscale_method}
        return samplerFull().run(pipe, None, None, None, None, None, image_output, link_id, save_prefix, None, model, None, None, None, None, None, None, tile_size, prompt, extra_pnginfo, my_unique_id, force_full_denoise, disable_noise, downscale_options)
```