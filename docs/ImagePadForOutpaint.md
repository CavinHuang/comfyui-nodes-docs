# Documentation
- Class name: ImagePadForOutpaint
- Category: image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImagePadForOutpaint 节点旨在扩展图像的边界，这在进行外延（outpainting）任务时特别有用。它允许通过指定的像素数来扩展图像的每一边，并可选择性地添加羽化效果，以平滑地将新边缘与原始图像融合。

# Input types
## Required
- image
    - 图像参数是将要被填充的输入图像。它对节点的操作至关重要，因为它决定了将要扩展的内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- left
    - left 参数指定了要在图像左侧添加的像素数。它在确定扩展图像的最终尺寸方面起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- top
    - top 参数指定了要在图像顶部添加的像素数。它是控制图像垂直扩展的一个重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - right 参数指定了要在图像右侧添加的像素数。它影响扩展图像的最终宽度。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - bottom 参数指定了要在图像底部添加的像素数。它对于控制图像的水平扩展至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- feathering
    - feathering 参数控制原始图像区域与新添加的图像区域之间的过渡平滑度。值越高，过渡越渐进。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- new_image
    - new_image 输出是扩展过程的结果，显示了按指定量在每侧填充的原始图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - mask 输出是一个二进制图像，它从新添加的区域中划分出原始图像区域，主要用于混合目的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ImagePadForOutpaint:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'left': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'top': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'right': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'bottom': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'feathering': ('INT', {'default': 40, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'expand_image'
    CATEGORY = 'image'

    def expand_image(self, image, left, top, right, bottom, feathering):
        (d1, d2, d3, d4) = image.size()
        new_image = torch.ones((d1, d2 + top + bottom, d3 + left + right, d4), dtype=torch.float32) * 0.5
        new_image[:, top:top + d2, left:left + d3, :] = image
        mask = torch.ones((d2 + top + bottom, d3 + left + right), dtype=torch.float32)
        t = torch.zeros((d2, d3), dtype=torch.float32)
        if feathering > 0 and feathering * 2 < d2 and (feathering * 2 < d3):
            for i in range(d2):
                for j in range(d3):
                    dt = i if top != 0 else d2
                    db = d2 - i if bottom != 0 else d2
                    dl = j if left != 0 else d3
                    dr = d3 - j if right != 0 else d3
                    d = min(dt, db, dl, dr)
                    if d >= feathering:
                        continue
                    v = (feathering - d) / feathering
                    t[i, j] = v * v
        mask[top:top + d2, left:left + d3] = t
        return (new_image, mask)
```