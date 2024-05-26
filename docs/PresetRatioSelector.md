# Documentation
- Class name: PresetRatioSelector
- Category: Mikey/Utils
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

PresetRatioSelector节点旨在根据预设的预设计算和选择图像尺寸。它允许自定义潜在尺寸、内容到边缘比率、目标尺寸和裁剪参数。该节点的主要功能是根据用户定义的预设自动选择图像比例，确保图像操作任务中的一致性和易用性。

# Input types
## Required
- select_preset
    - select_preset参数对于确定应用哪个预设比例至关重要。它决定了节点计算过程的起点，对于实现所需的图像尺寸至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- swap_axis
    - swap_axis参数使用户能够交换所选预设的宽度和高度尺寸。在需要调整图像方向的场景中，这可能很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- use_preset_seed
    - use_preset_seed参数决定是否使用种子值来选择预设。这可以在选择过程中引入变化性，允许选择更多样化的图像比例集。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - seed参数与use_preset_seed标志一起使用，影响预设比例的选择。它在选择过程中增加了对随机性的控制层。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- unique_id
    - unique_id参数用于在系统中唯一标识操作。在更大的工作流程中跟踪和管理节点的执行可能很重要。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
- extra_pnginfo
    - extra_pnginfo参数提供与PNG图像格式相关的额外信息。这对于处理与节点操作相关的特定图像属性可能很有用。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str
- prompt
    - prompt参数可用于提供描述性文本，指导节点的操作。它可能会根据文本提供的上下文影响预设的选择。
    - Comfy dtype: PROMPT
    - Python dtype: str

# Output types
- latent_w
    - latent_w输出表示计算出的潜在空间的宽度。它是确定潜在表示中图像水平维度的关键参数。
    - Comfy dtype: INT
    - Python dtype: int
- latent_h
    - latent_h输出表示计算出的潜在空间的高度。它是确定潜在表示中图像垂直维度的关键参数。
    - Comfy dtype: INT
    - Python dtype: int
- cte_w
    - cte_w输出表示计算出的内容到边缘比率的宽度。它对于保持图像的纵横比和比例很重要。
    - Comfy dtype: INT
    - Python dtype: int
- cte_h
    - cte_h输出表示计算出的内容到边缘比率的高度。它在保持图像的纵横比和比例方面与cte_w扮演着类似的角色。
    - Comfy dtype: INT
    - Python dtype: int
- target_w
    - target_w输出表示计算出的图像的目标宽度。它用于指导调整大小或缩放过程，以实现所需的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- target_h
    - target_h输出表示计算出的图像的目标高度。它与target_w一起工作，以确保图像的尺寸满足指定的要求。
    - Comfy dtype: INT
    - Python dtype: int
- crop_w
    - crop_w输出表示计算出的图像裁剪过程的宽度。它对于定义裁剪后图像将可见的区域至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- crop_h
    - crop_h输出表示计算出的图像裁剪过程的高度。它与crop_w一起工作，以确定裁剪后图像的最终可见区域。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class PresetRatioSelector:

    @classmethod
    def INPUT_TYPES(s):
        (s.ratio_presets, s.ratio_config) = read_ratio_presets()
        return {'required': {'select_preset': (s.ratio_presets, {'default': 'none'}), 'swap_axis': (['true', 'false'], {'default': 'false'}), 'use_preset_seed': (['true', 'false'], {'default': 'false'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('latent_w', 'latent_h', 'cte_w', 'cte_h', 'target_w', 'target_h', 'crop_w', 'crop_h')
    CATEGORY = 'Mikey/Utils'
    FUNCTION = 'calculate'

    def calculate(self, select_preset, swap_axis, use_preset_seed, seed, unique_id=None, extra_pnginfo=None, prompt=None):
        if use_preset_seed == 'true' and len(self.ratio_presets) > 0:
            len_presets = len(self.ratio_presets)
            offset = seed % (len_presets - 1)
            presets = [p for p in self.ratio_presets if p != 'none']
            select_preset = presets[offset]
        latent_width = self.ratio_config[select_preset]['custom_latent_w']
        latent_height = self.ratio_config[select_preset]['custom_latent_h']
        cte_w = self.ratio_config[select_preset]['cte_w']
        cte_h = self.ratio_config[select_preset]['cte_h']
        target_w = self.ratio_config[select_preset]['target_w']
        target_h = self.ratio_config[select_preset]['target_h']
        crop_w = self.ratio_config[select_preset]['crop_w']
        crop_h = self.ratio_config[select_preset]['crop_h']
        if swap_axis == 'true':
            (latent_width, latent_height) = (latent_height, latent_width)
            (cte_w, cte_h) = (cte_h, cte_w)
            (target_w, target_h) = (target_h, target_w)
            (crop_w, crop_h) = (crop_h, crop_w)
        return (latent_width, latent_height, cte_w, cte_h, target_w, target_h, crop_w, crop_h)
```