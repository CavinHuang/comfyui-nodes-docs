# Documentation
- Class name: From_SEG_ELT_crop_region
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

节点'From_SEG_ELT_crop_region'的'doit'方法旨在处理分割图中的特定兴趣区域。它专注于提取定义该区域边界的坐标，这对于在ImpactPack工具集中进行进一步分析或操作至关重要。

# Input types
## Required
- crop_region
    - 参数'crop_region'至关重要，因为它指定了需要裁剪的分割图中的区域。它直接影响节点的操作，通过确定将被处理和返回的地图的确切部分。
    - Comfy dtype: SEG_ELT_crop_region
    - Python dtype: ImpactPack SEG_ELT_crop_region object

# Output types
- left
    - 参数'left'表示裁剪区域的左边界坐标。它很重要，因为它提供了定义分割图中裁剪段位置和范围所需的四个基本坐标之一。
    - Comfy dtype: INT
    - Python dtype: int
- top
    - 参数'top'表示裁剪区域的顶部边界坐标。与其他三个参数一起，它对于确定从分割图中提取的段的确切位置和尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - 参数'right'表示裁剪区域的右边界坐标。它是确定分割图中段的空间边界的关键组成部分，确保为后续操作隔离正确的部分。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - 参数'bottom'表示裁剪区域的底部边界坐标。它与'left'、'top'和'right'参数一起，构成了在分割图中划定裁剪段所需的坐标集。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class From_SEG_ELT_crop_region:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'crop_region': ('SEG_ELT_crop_region',)}}
    RETURN_TYPES = ('INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('left', 'top', 'right', 'bottom')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, crop_region):
        return crop_region
```