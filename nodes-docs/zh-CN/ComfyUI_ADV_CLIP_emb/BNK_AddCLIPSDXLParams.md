# Documentation
- Class name: AddCLIPSDXLParams
- Category: conditioning/advanced
- Output node: False
- Repo Ref: https://github.com/BlenderNeko/ComfyUI_ADV_CLIP_emb

AddCLIPSDXLParams节点旨在为高级编码任务处理和增强条件数据。它接受与图像尺寸和裁剪相关的各种参数，并将这些参数应用于条件输入，以准备后续编码步骤。该节点在确保编码过程适应目标应用的特定要求（如图像分辨率和裁剪规范）中发挥着关键作用。

# Input types
## Required
- conditioning
    - 条件参数对节点至关重要，因为它提供了将被操作和准备进行编码的基础数据。这是一个关键的输入，它直接影响节点的输出和随后的编码过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Any]
- width
    - 宽度参数指定要处理的图像的宽度。这是一个重要的输入，因为它决定了图像的水平分辨率，这可以显著影响编码质量和性能。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数定义了图像的垂直分辨率。它是一个关键的输入，与宽度一起决定了图像的整体大小，对编码过程至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- target_width
    - target_width参数设置最终编码图像的期望宽度。这是一个重要的参数，它影响编码后图像的缩放和纵横比。
    - Comfy dtype: INT
    - Python dtype: int
- target_height
    - target_height参数设定最终编码图像的期望高度。它与target_width一起使用，以保持编码后图像的预期纵横比和尺寸。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- crop_w
    - crop_w参数指示图像中裁剪区域的宽度。它是一个可选输入，可用于调整编码过程中图像中的兴趣区域。
    - Comfy dtype: INT
    - Python dtype: int
- crop_h
    - crop_h参数指定裁剪区域的高度。它与crop_w一起工作，以定义裁剪区域的尺寸，这对于将编码聚焦在图像的特定部分可能很重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- encoded_conditioning
    - encoded_conditioning输出代表处理和增强的条件数据，可供编码流水线的后续阶段使用。它包含基于输入参数对原始条件进行的修改。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Any]

# Usage tips
- Infra type: CPU

# Source code
```
class AddCLIPSDXLParams:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'encode'
    CATEGORY = 'conditioning/advanced'

    def encode(self, conditioning, width, height, crop_w, crop_h, target_width, target_height):
        c = []
        for t in conditioning:
            n = [t[0], t[1].copy()]
            n[1]['width'] = width
            n[1]['height'] = height
            n[1]['crop_w'] = crop_w
            n[1]['crop_h'] = crop_h
            n[1]['target_width'] = target_width
            n[1]['target_height'] = target_height
            c.append(n)
        return (c,)
```