# Documentation
- Class name: PCScheduleSettings
- Category: promptcontrol
- Output node: False
- Repo Ref: https://github.com/asagi4/comfyui-prompt-control.git

该节点旨在管理和调整提示时间表的参数，这对控制AI模型的生成过程至关重要。它确保模型的输出根据指定的设置进行微调，从而优化结果的质量和相关性。

# Input types
## Optional
- steps
    - 步骤参数对于定义AI模型输出在一定次数迭代中的进展至关重要。它影响模型细化其响应并达到期望的细节和连贯性水平的能力。
    - Comfy dtype: INT
    - Python dtype: int
- mask_width
    - 掩码宽度参数在塑造模型输出的空间维度方面起着重要作用。它有助于控制生成内容的广度，确保其与预期的范围和结构相一致。
    - Comfy dtype: INT
    - Python dtype: int
- mask_height
    - 掩码高度参数对于定义模型输出的垂直结构至关重要。它与掩码宽度一起工作，建立整体的空间配置，这对于保持内容的完整性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- sdxl_width
    - SDXL宽度参数对于设置模型输出的水平比例很重要。它影响模型如何在宽度上分布信息，确保内容适当详细且平衡。
    - Comfy dtype: INT
    - Python dtype: int
- sdxl_height
    - SDXL高度参数对于建立模型输出的垂直比例至关重要。它与SDXL宽度一起工作，创造和谐的平衡，确保内容的结构是连贯和比例协调的。
    - Comfy dtype: INT
    - Python dtype: int
- sdxl_target_w
    - SDXL目标宽度参数对于设置输出的期望宽度至关重要。它引导模型实现目标尺寸，这对于保持生成内容的视觉和结构完整性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- sdxl_target_h
    - SDXL目标高度参数对于定义输出的期望高度至关重要。它与SDXL目标宽度一起工作，确保模型的输出适当缩放并适应期望的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- sdxl_crop_w
    - SDXL裁剪宽度参数对于指定从模型输出中裁剪的区域宽度很重要。它有助于精炼最终输出，专注于最相关的部分，提高内容的精确性和相关性。
    - Comfy dtype: INT
    - Python dtype: int
- sdxl_crop_h
    - SDXL裁剪高度参数对于定义从模型输出中裁剪的区域高度至关重要。它与SDXL裁剪宽度一起工作，确保裁剪的内容专注且与预期输出一致。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- settings
    - 设置输出提供了应用时间表参数的综合摘要，这对于监控和调整AI模型的行为至关重要。它确保模型在期望的参数内运行，从而获得优化和有针对性的结果。
    - Comfy dtype: SCHEDULE_SETTINGS
    - Python dtype: Tuple[int, int, int, int, int, int, int, int, int]

# Usage tips
- Infra type: CPU

# Source code
```
class PCScheduleSettings:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'steps': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'mask_width': ('INT', {'default': 512, 'min': 64, 'max': 4096 * 4}), 'mask_height': ('INT', {'default': 512, 'min': 64, 'max': 4096 * 4}), 'sdxl_width': ('INT', {'default': 1024, 'min': 0, 'max': 4096 * 4}), 'sdxl_height': ('INT', {'default': 1024, 'min': 0, 'max': 4096 * 4}), 'sdxl_target_w': ('INT', {'default': 1024, 'min': 0, 'max': 4096 * 4}), 'sdxl_target_h': ('INT', {'default': 1024, 'min': 0, 'max': 4096 * 4}), 'sdxl_crop_w': ('INT', {'default': 0, 'min': 0, 'max': 4096 * 4}), 'sdxl_crop_h': ('INT', {'default': 0, 'min': 0, 'max': 4096 * 4})}}
    RETURN_TYPES = ('SCHEDULE_SETTINGS',)
    CATEGORY = 'promptcontrol'
    FUNCTION = 'apply'

    def apply(self, steps=0, mask_width=512, mask_height=512, sdxl_width=1024, sdxl_height=1024, sdxl_target_w=1024, sdxl_target_h=1024, sdxl_crop_w=0, sdxl_crop_h=0):
        settings = {'steps': steps, 'mask_width': mask_width, 'mask_height': mask_height, 'sdxl_width': sdxl_width, 'sdxl_height': sdxl_height, 'sdxl_twidth': sdxl_target_w, 'sdxl_theight': sdxl_target_h, 'sdxl_cwidth': sdxl_crop_w, 'sdxl_cheight': sdxl_crop_h}
        return (settings,)
```