# Documentation
- Class name: ImageResize
- Category: image
- Output node: False
- Repo Ref: https://github.com/palant/image-resize-comfyui

ImageResize节点旨在根据指定的标准调整图像尺寸，确保输出图像满足所需的大小和宽高比要求。它提供多种调整大小的操作，如裁剪、填充和缩放，并通过调整图像的分辨率适应不同的用例。

# Input types
## Required
- pixels
    - 输入的图像数据，将由节点进行调整大小或处理。它是节点操作的关键，因为它作为所有转换操作的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- action
    - 确定要在输入图像上执行的调整大小操作类型。此参数至关重要，因为它规定了图像被修改的方法，以满足所需的输出规格。
    - Comfy dtype: COMBO[ACTION_TYPE_RESIZE, ACTION_TYPE_CROP, ACTION_TYPE_PAD]
    - Python dtype: str
## Optional
- smaller_side
    - 指定调整大小后图像的较短边长度。它在控制输出图像的尺寸方面起着重要作用，特别是在缩小或放大输入图像时。
    - Comfy dtype: INT
    - Python dtype: int
- larger_side
    - 定义调整大小后图像的较长边长度。当使用此参数时，它与'smaller_side'一起工作，以确定调整大小后图像的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- scale_factor
    - 对输入图像应用一个统一的缩放因子，这对于在不改变其宽高比的情况下均匀增加或减少图像大小非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resize_mode
    - 控制调整大小操作的方向，是缩小、放大还是根据'scale_factor'进行非均匀调整大小。此参数在管理节点的缩放行为方面至关重要。
    - Comfy dtype: COMBO[RESIZE_MODE_DOWNSCALE, RESIZE_MODE_UPSCALE, RESIZE_MODE_ANY]
    - Python dtype: str
- side_ratio
    - 设置输出图像的期望宽高比。此参数非常重要，因为它确保图像保持特定的形状，这对于与各种显示或处理要求的兼容性至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- crop_pad_position
    - 影响图像中裁剪或填充的位置，这对于微调视觉输出以满足特定的美学或功能需求至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pad_feathering
    - 调整应用于填充的羽化效果，这对于在图像的原始区域和填充区域之间创建平滑过渡，提高整体视觉质量非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- mask_optional
    - 一个可选的掩码，可以应用于图像以控制哪些部分的图像被处理。这对于需要选择性图像操作的场景非常重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- pixels
    - 经过调整大小操作处理后的图像。这是节点的主要输出，代表了图像处理过程的最终结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 与处理后的图像对应的可选输出掩码，可以根据掩蔽区域应用进一步的操作或效果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageResize:

    def __init__(self):
        pass
    ACTION_TYPE_RESIZE = 'resize only'
    ACTION_TYPE_CROP = 'crop to ratio'
    ACTION_TYPE_PAD = 'pad to ratio'
    RESIZE_MODE_DOWNSCALE = 'reduce size only'
    RESIZE_MODE_UPSCALE = 'increase size only'
    RESIZE_MODE_ANY = 'any'
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'resize'
    CATEGORY = 'image'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pixels': ('IMAGE',), 'action': ([s.ACTION_TYPE_RESIZE, s.ACTION_TYPE_CROP, s.ACTION_TYPE_PAD],), 'smaller_side': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 8}), 'larger_side': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 8}), 'scale_factor': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 10.0, 'step': 0.1}), 'resize_mode': ([s.RESIZE_MODE_DOWNSCALE, s.RESIZE_MODE_UPSCALE, s.RESIZE_MODE_ANY],), 'side_ratio': ('STRING', {'default': '4:3'}), 'crop_pad_position': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'pad_feathering': ('INT', {'default': 20, 'min': 0, 'max': 8192, 'step': 1})}, 'optional': {'mask_optional': ('MASK',)}}

    @classmethod
    def VALIDATE_INPUTS(s, action, smaller_side, larger_side, scale_factor, resize_mode, side_ratio, **_):
        if side_ratio is not None:
            if action != s.ACTION_TYPE_RESIZE and s.parse_side_ratio(side_ratio) is None:
                return f'Invalid side ratio: {side_ratio}'
        if smaller_side is not None and larger_side is not None and (scale_factor is not None):
            if int(smaller_side > 0) + int(larger_side > 0) + int(scale_factor > 0) > 1:
                return f'At most one scaling rule (smaller_side, larger_side, scale_factor) should be enabled by setting a non-zero value'
        if scale_factor is not None:
            if resize_mode == s.RESIZE_MODE_DOWNSCALE and scale_factor > 1.0:
                return f'For resize_mode {s.RESIZE_MODE_DOWNSCALE}, scale_factor should be less than one but got {scale_factor}'
            if resize_mode == s.RESIZE_MODE_UPSCALE and scale_factor > 0.0 and (scale_factor < 1.0):
                return f'For resize_mode {s.RESIZE_MODE_UPSCALE}, scale_factor should be larger than one but got {scale_factor}'
        return True

    @classmethod
    def parse_side_ratio(s, side_ratio):
        try:
            (x, y) = map(int, side_ratio.split(':', 1))
            if x < 1 or y < 1:
                raise Exception('Ratio factors have to be positive numbers')
            return float(x) / float(y)
        except:
            return None

    def resize(self, pixels, action, smaller_side, larger_side, scale_factor, resize_mode, side_ratio, crop_pad_position, pad_feathering, mask_optional=None):
        validity = self.VALIDATE_INPUTS(action, smaller_side, larger_side, scale_factor, resize_mode, side_ratio)
        if validity is not True:
            raise Exception(validity)
        (height, width) = pixels.shape[1:3]
        if mask_optional is None:
            mask = torch.zeros(1, height, width, dtype=torch.float32)
        else:
            mask = mask_optional
            if mask.shape[1] != height or mask.shape[2] != width:
                mask = torch.nn.functional.interpolate(mask.unsqueeze(0), size=(height, width), mode='bicubic').squeeze(0).clamp(0.0, 1.0)
        (crop_x, crop_y, pad_x, pad_y) = (0.0, 0.0, 0.0, 0.0)
        if action == self.ACTION_TYPE_CROP:
            target_ratio = self.parse_side_ratio(side_ratio)
            if height * target_ratio < width:
                crop_x = width - height * target_ratio
            else:
                crop_y = height - width / target_ratio
        elif action == self.ACTION_TYPE_PAD:
            target_ratio = self.parse_side_ratio(side_ratio)
            if height * target_ratio > width:
                pad_x = height * target_ratio - width
            else:
                pad_y = width / target_ratio - height
        if smaller_side > 0:
            if width + pad_x - crop_x > height + pad_y - crop_y:
                scale_factor = float(smaller_side) / (height + pad_y - crop_y)
            else:
                scale_factor = float(smaller_side) / (width + pad_x - crop_x)
        if larger_side > 0:
            if width + pad_x - crop_x > height + pad_y - crop_y:
                scale_factor = float(larger_side) / (width + pad_x - crop_x)
            else:
                scale_factor = float(larger_side) / (height + pad_y - crop_y)
        if resize_mode == self.RESIZE_MODE_DOWNSCALE and scale_factor >= 1.0 or (resize_mode == self.RESIZE_MODE_UPSCALE and scale_factor <= 1.0):
            scale_factor = 0.0
        if scale_factor > 0.0:
            pixels = torch.nn.functional.interpolate(pixels.movedim(-1, 1), scale_factor=scale_factor, mode='bicubic', antialias=True).movedim(1, -1).clamp(0.0, 1.0)
            mask = torch.nn.functional.interpolate(mask.unsqueeze(0), scale_factor=scale_factor, mode='bicubic', antialias=True).squeeze(0).clamp(0.0, 1.0)
            (height, width) = pixels.shape[1:3]
            crop_x *= scale_factor
            crop_y *= scale_factor
            pad_x *= scale_factor
            pad_y *= scale_factor
        if crop_x > 0.0 or crop_y > 0.0:
            remove_x = (round(crop_x * crop_pad_position), round(crop_x * (1 - crop_pad_position))) if crop_x > 0.0 else (0, 0)
            remove_y = (round(crop_y * crop_pad_position), round(crop_y * (1 - crop_pad_position))) if crop_y > 0.0 else (0, 0)
            pixels = pixels[:, remove_y[0]:height - remove_y[1], remove_x[0]:width - remove_x[1], :]
            mask = mask[:, remove_y[0]:height - remove_y[1], remove_x[0]:width - remove_x[1]]
        elif pad_x > 0.0 or pad_y > 0.0:
            add_x = (round(pad_x * crop_pad_position), round(pad_x * (1 - crop_pad_position))) if pad_x > 0.0 else (0, 0)
            add_y = (round(pad_y * crop_pad_position), round(pad_y * (1 - crop_pad_position))) if pad_y > 0.0 else (0, 0)
            new_pixels = torch.zeros(pixels.shape[0], height + add_y[0] + add_y[1], width + add_x[0] + add_x[1], pixels.shape[3], dtype=torch.float32)
            new_pixels[:, add_y[0]:height + add_y[0], add_x[0]:width + add_x[0], :] = pixels
            pixels = new_pixels
            new_mask = torch.ones(mask.shape[0], height + add_y[0] + add_y[1], width + add_x[0] + add_x[1], dtype=torch.float32)
            new_mask[:, add_y[0]:height + add_y[0], add_x[0]:width + add_x[0]] = mask
            mask = new_mask
            if pad_feathering > 0:
                for i in range(mask.shape[0]):
                    for j in range(pad_feathering):
                        feather_strength = (1 - j / pad_feathering) * (1 - j / pad_feathering)
                        if add_x[0] > 0 and j < width:
                            for k in range(height):
                                mask[i, k, add_x[0] + j] = max(mask[i, k, add_x[0] + j], feather_strength)
                        if add_x[1] > 0 and j < width:
                            for k in range(height):
                                mask[i, k, width + add_x[0] - j - 1] = max(mask[i, k, width + add_x[0] - j - 1], feather_strength)
                        if add_y[0] > 0 and j < height:
                            for k in range(width):
                                mask[i, add_y[0] + j, k] = max(mask[i, add_y[0] + j, k], feather_strength)
                        if add_y[1] > 0 and j < height:
                            for k in range(width):
                                mask[i, height + add_y[0] - j - 1, k] = max(mask[i, height + add_y[0] - j - 1, k], feather_strength)
        return (pixels, mask)
```