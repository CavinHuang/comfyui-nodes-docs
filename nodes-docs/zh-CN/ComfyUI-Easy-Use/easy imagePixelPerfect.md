# Documentation
- Class name: imagePixelPerfect
- Category: EasyUse/Image
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点类旨在通过计算在指定尺寸内保持图像纵横比的理想像素数来优化图像分辨率。它强调在调整图像大小时保持图像的视觉完整性。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是节点操作的来源。它通过决定节点将处理的初始尺寸和质量来影响整个过程。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
## Optional
- resize_mode
    - 调整模式参数影响图像的调整方式，要么最大化要么最小化纵横比以适应给定的约束条件。这对于在调整大小后实现期望的视觉结果非常重要。
    - Comfy dtype: COMBO[ResizeMode.RESIZE.value, ResizeMode.INNER_FIT.value, ResizeMode.OUTER_FIT.value]
    - Python dtype: Union[str, ResizeMode]

# Output types
- resolution
    - 分辨率输出提供了计算出的理想像素数，这是节点处理的结果。它很重要，因为它决定了缩放后图像的最终大小。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class imagePixelPerfect:

    @classmethod
    def INPUT_TYPES(s):
        RESIZE_MODES = [ResizeMode.RESIZE.value, ResizeMode.INNER_FIT.value, ResizeMode.OUTER_FIT.value]
        return {'required': {'image': ('IMAGE',), 'resize_mode': (RESIZE_MODES, {'default': ResizeMode.RESIZE.value})}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('resolution',)
    OUTPUT_NODE = True
    FUNCTION = 'execute'
    CATEGORY = 'EasyUse/Image'

    def execute(self, image, resize_mode):
        (_, raw_H, raw_W, _) = image.shape
        width = raw_W
        height = raw_H
        k0 = float(height) / float(raw_H)
        k1 = float(width) / float(raw_W)
        if resize_mode == ResizeMode.OUTER_FIT.value:
            estimation = min(k0, k1) * float(min(raw_H, raw_W))
        else:
            estimation = max(k0, k1) * float(min(raw_H, raw_W))
        result = int(np.round(estimation))
        text = f'Width:{str(width)}\nHeight:{str(height)}\nPixelPerfect:{str(result)}'
        return {'ui': {'text': text}, 'result': (result,)}
```