# Documentation
- Class name: ImagePadForOutpaintMasked
- Category: image
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

ImagePadForOutpaintMasked节点旨在扩展图像的边界，这一过程称为外延。它通过添加额外的像素来实现这一点，这些像素被智能计算以与原始内容无缝融合。该节点的功能在图像边缘之外的上下文很重要的场景中特别有用，例如在图像编辑或数据增强任务中。

# Input types
## Required
- image
    - 图像参数是节点的主要输入，表示将被扩展的图像。它对节点的操作至关重要，因为整个过程都围绕着为此图像添加填充。最终输出的质量严重依赖于原始图像的内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- left
    - left参数指定在图像左侧填充的像素数。它在确定扩展图像的最终尺寸和外延区域的整体外观中起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- top
    - top参数决定在图像顶部填充的像素数。它是控制垂直填充的重要输入，直接影响结果图像的高度。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - right参数设置在图像右侧填充的像素数。它对于实现扩展图像的所需宽度至关重要，并影响外延区域的视觉连贯性。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - bottom参数确定在图像底部填充的像素数。它是建立扩展图像最终高度的关键因素，并影响填充区域的整体外观。
    - Comfy dtype: INT
    - Python dtype: int
- feathering
    - feathering参数控制原始图像与填充区域之间过渡的平滑度。它对于创建自然和无缝的混合特别重要，增强了外延图像的视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- mask
    - mask参数是可选输入，用于定义图像的遮罩。它用于指定在图像外延过程中应保留的图像区域，确保这些区域保持不变。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- new_image
    - new_image输出参数代表带有添加填充的扩展图像。它是节点操作的主要结果，包含原始图像与新填充区域的无缝集成。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- new_mask
    - new_mask输出参数是对应于扩展图像的更新后的遮罩。它在保持外延过程中特定区域的完整性方面很重要，并且在需要进一步图像操作时特别有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImagePadForOutpaintMasked:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'left': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'top': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'right': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'bottom': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'feathering': ('INT', {'default': 40, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1})}, 'optional': {'mask': ('MASK',)}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'expand_image'
    CATEGORY = 'image'

    def expand_image(self, image, left, top, right, bottom, feathering, mask=None):
        (B, H, W, C) = image.size()
        new_image = torch.ones((B, H + top + bottom, W + left + right, C), dtype=torch.float32) * 0.5
        new_image[:, top:top + H, left:left + W, :] = image
        if mask is None:
            new_mask = torch.ones((H + top + bottom, W + left + right), dtype=torch.float32)
            t = torch.zeros((H, W), dtype=torch.float32)
        else:
            mask = F.pad(mask, (left, right, top, bottom), mode='constant', value=0)
            mask = 1 - mask
            t = torch.zeros_like(mask)
        if feathering > 0 and feathering * 2 < H and (feathering * 2 < W):
            for i in range(H):
                for j in range(W):
                    dt = i if top != 0 else H
                    db = H - i if bottom != 0 else H
                    dl = j if left != 0 else W
                    dr = W - j if right != 0 else W
                    d = min(dt, db, dl, dr)
                    if d >= feathering:
                        continue
                    v = (feathering - d) / feathering
                    if mask is None:
                        t[i, j] = v * v
                    else:
                        t[:, top + i, left + j] = v * v
        if mask is None:
            mask = new_mask.squeeze(0)
            mask[top:top + H, left:left + W] = t
            mask = mask.unsqueeze(0)
        return (new_image, mask)
```