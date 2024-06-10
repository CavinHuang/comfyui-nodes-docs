# Documentation
- Class name: imageInsetCrop
- Category: EasyUse/Image
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点通过允许用户以像素值或图像尺寸百分比的方式定义裁剪区域，促进了图像的精确裁剪。它通过无需复杂计算即可实现目标图像操作，增强了图像处理工作流程，确保裁剪后的图像满足特定要求。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是将要执行裁剪操作的源。它直接影响节点的输出，决定了结果图像的视觉内容和尺寸。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- measurement
    - 测量参数决定了裁剪值是作为绝对像素还是相对百分比输入。这显著影响了裁剪区域的计算方式，从而影响了裁剪图像的最终尺寸。
    - Comfy dtype: COMBO['Pixels', 'Percentage']
    - Python dtype: str
- left
    - 左边距参数指定了从图像左边缘到裁剪区域开始的距离。它在确定图像中裁剪区域的水平位置方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - 右边距参数定义了从图像右边缘到裁剪区域结束的距离。它与左边距参数共同作用，以确定裁剪部分的总宽度。
    - Comfy dtype: INT
    - Python dtype: int
- top
    - 上边距参数设置了从图像顶部到裁剪区域开始的距离。它在确定图像中裁剪区域的垂直位置方面至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - 下边距参数指定了从图像底部到裁剪区域结束的距离。与上边距参数一起，它定义了裁剪部分的高度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出图像是裁剪操作的结果。它代表了在应用指定的内边距后原始图像剩余的部分，捕获了所需的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class imageInsetCrop:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'measurement': (['Pixels', 'Percentage'],), 'left': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'right': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'top': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'bottom': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'crop'
    CATEGORY = 'EasyUse/Image'

    def crop(self, measurement, left, right, top, bottom, image=None):
        """Does the crop."""
        (_, height, width, _) = image.shape
        if measurement == 'Percentage':
            left = int(width - width * (100 - left) / 100)
            right = int(width - width * (100 - right) / 100)
            top = int(height - height * (100 - top) / 100)
            bottom = int(height - height * (100 - bottom) / 100)
        left = left // 8 * 8
        right = right // 8 * 8
        top = top // 8 * 8
        bottom = bottom // 8 * 8
        if left == 0 and right == 0 and (bottom == 0) and (top == 0):
            return (image,)
        (inset_left, inset_right, inset_top, inset_bottom) = get_new_bounds(width, height, left, right, top, bottom)
        if inset_top > inset_bottom:
            raise ValueError(f'Invalid cropping dimensions top ({inset_top}) exceeds bottom ({inset_bottom})')
        if inset_left > inset_right:
            raise ValueError(f'Invalid cropping dimensions left ({inset_left}) exceeds right ({inset_right})')
        log_node_info('Image Inset Crop', f'Cropping image {width}x{height} width inset by {inset_left},{inset_right}, ' + f'and height inset by {inset_top}, {inset_bottom}')
        image = image[:, inset_top:inset_bottom, inset_left:inset_right, :]
        return (image,)
```