# Documentation
- Class name: preDetailerFix
- Category: EasyUse/Fix
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

preDetailerFix节点旨在增强图像数据管道的预处理阶段，确保输入图像适当地为进一步的分析和操作做好准备。该节点专注于在图像处理的初始阶段修复常见问题，从而提高后续操作的质量和可靠性。

# Input types
## Required
- pipe
    - pipe参数是必要的，因为它携带了节点运行所需的核心数据和设置。它包括模型、clip和vae组件，以及图像和其他相关信息，这些信息决定了节点的处理流程。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- guide_size
    - guide_size参数对于定义节点处理图像的分辨率至关重要，直接影响细节层次和计算效率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- guide_size_for
    - guide_size_for参数决定了应用引导尺寸的方法，无论是通过边界框还是裁剪区域，这都会显著影响图像处理的结果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- max_size
    - max_size参数设置了图像尺寸的上限，确保处理保持在可管理的限度内，防止资源过度消耗。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - seed参数对于确保节点操作的可重复性很重要，允许在不同运行中获得一致的结果。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps参数定义了节点将执行的迭代次数，这直接关系到图像处理的彻底性和改进结果的潜力。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整节点的配置设置，影响其行为和图像处理的质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数在为节点选择适当的采样方法方面至关重要，这将极大地影响图像处理的效率和效果。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - scheduler参数对于管理节点的执行速度至关重要，确保最佳性能和资源利用。
    - Comfy dtype: COMBO
    - Python dtype: str
- denoise
    - denoise参数有助于控制降噪过程，提高处理图像的清晰度和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- feather
    - feather参数对于软化处理图像的边缘很重要，可以带来更平滑的过渡和更视觉上吸引人的结果。
    - Comfy dtype: INT
    - Python dtype: int
- noise_mask
    - noise_mask参数启用或禁用噪声掩码功能，这对于管理图像处理中不需要的伪影至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- force_inpaint
    - force_inpaint参数很重要，它指导节点填补图像中缺失或损坏的部分，确保最终输出的完整性和一致性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- drop_size
    - drop_size参数决定了从图像中删除的区域大小，这对于移除不需要的元素和提高整体图像质量至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- wildcard
    - wildcard参数允许对节点的操作进行动态调整和定制，提供了处理各种图像处理场景的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- cycle
    - cycle参数决定了节点重复处理的次数，这可以增强图像处理结果的稳定性和可靠性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- pipe
    - 输出pipe是一个综合结构，封装了处理后的图像和相关数据，为管道中的后续操作提供基础。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict

# Usage tips
- Infra type: CPU

# Source code
```
class preDetailerFix:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',), 'guide_size': ('FLOAT', {'default': 256, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'guide_size_for': ('BOOLEAN', {'default': True, 'label_on': 'bbox', 'label_off': 'crop_region'}), 'max_size': ('FLOAT', {'default': 768, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 0.5, 'min': 0.0001, 'max': 1.0, 'step': 0.01}), 'feather': ('INT', {'default': 5, 'min': 0, 'max': 100, 'step': 1}), 'noise_mask': ('BOOLEAN', {'default': True, 'label_on': 'enabled', 'label_off': 'disabled'}), 'force_inpaint': ('BOOLEAN', {'default': True, 'label_on': 'enabled', 'label_off': 'disabled'}), 'drop_size': ('INT', {'min': 1, 'max': MAX_RESOLUTION, 'step': 1, 'default': 10}), 'wildcard': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'cycle': ('INT', {'default': 1, 'min': 1, 'max': 10, 'step': 1})}, 'optional': {'bbox_segm_pipe': ('PIPE_LINE',), 'sam_pipe': ('PIPE_LINE',), 'optional_image': ('IMAGE',)}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    OUTPUT_IS_LIST = (False,)
    FUNCTION = 'doit'
    CATEGORY = 'EasyUse/Fix'

    def doit(self, pipe, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, feather, noise_mask, force_inpaint, drop_size, wildcard, cycle, bbox_segm_pipe=None, sam_pipe=None, optional_image=None):
        model = pipe['model'] if 'model' in pipe else None
        if model is None:
            raise Exception(f"[ERROR] pipe['model'] is missing")
        clip = pipe['clip'] if 'clip' in pipe else None
        if clip is None:
            raise Exception(f"[ERROR] pipe['clip'] is missing")
        vae = pipe['vae'] if 'vae' in pipe else None
        if vae is None:
            raise Exception(f"[ERROR] pipe['vae'] is missing")
        if optional_image is not None:
            images = optional_image
        else:
            images = pipe['images'] if 'images' in pipe else None
            if images is None:
                raise Exception(f"[ERROR] pipe['image'] is missing")
        positive = pipe['positive'] if 'positive' in pipe else None
        if positive is None:
            raise Exception(f"[ERROR] pipe['positive'] is missing")
        negative = pipe['negative'] if 'negative' in pipe else None
        if negative is None:
            raise Exception(f"[ERROR] pipe['negative'] is missing")
        bbox_segm_pipe = bbox_segm_pipe or (pipe['bbox_segm_pipe'] if pipe and 'bbox_segm_pipe' in pipe else None)
        if bbox_segm_pipe is None:
            raise Exception(f"[ERROR] bbox_segm_pipe or pipe['bbox_segm_pipe'] is missing")
        sam_pipe = sam_pipe or (pipe['sam_pipe'] if pipe and 'sam_pipe' in pipe else None)
        if sam_pipe is None:
            raise Exception(f"[ERROR] sam_pipe or pipe['sam_pipe'] is missing")
        loader_settings = pipe['loader_settings'] if 'loader_settings' in pipe else {}
        new_pipe = {'images': images, 'model': model, 'clip': clip, 'vae': vae, 'positive': positive, 'negative': negative, 'seed': seed, 'bbox_segm_pipe': bbox_segm_pipe, 'sam_pipe': sam_pipe, 'loader_settings': loader_settings, 'detail_fix_settings': {'guide_size': guide_size, 'guide_size_for': guide_size_for, 'max_size': max_size, 'seed': seed, 'steps': steps, 'cfg': cfg, 'sampler_name': sampler_name, 'scheduler': scheduler, 'denoise': denoise, 'feather': feather, 'noise_mask': noise_mask, 'force_inpaint': force_inpaint, 'drop_size': drop_size, 'wildcard': wildcard, 'cycle': cycle}}
        del bbox_segm_pipe
        del sam_pipe
        return (new_pipe,)
```