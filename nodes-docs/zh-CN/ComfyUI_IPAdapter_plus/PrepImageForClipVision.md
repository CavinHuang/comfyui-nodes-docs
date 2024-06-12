# Documentation
- Class name: PrepImageForClipVision
- Category: ipadapter/utils
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

该节点旨在为ClipVision模型预处理图像，确保它们被正确格式化以供分析。它专注于调整图像大小、裁剪和锐化图像，以增强其特征并符合模型的输入要求。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是节点处理的主要输入。它影响节点的整体操作，决定了输出的质量和特征。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
## Optional
- interpolation
    - 插值模式定义了应该如何调整图像大小，这会显著影响结果图像的清晰度和细节。这是一个可选参数，允许在调整大小后控制图像的外观。
    - Comfy dtype: COMBO[('LANCZOS', 'BICUBIC', 'HAMMING', 'BILINEAR', 'BOX', 'NEAREST')]
    - Python dtype: str
- crop_position
    - 裁剪位置决定了调整大小后图像的裁剪方式。这影响了图像的构图和焦点，确保最相关的特征被居中或适当定位。
    - Comfy dtype: COMBO[('top', 'bottom', 'left', 'right', 'center', 'pad')]
    - Python dtype: str
- sharpening
    - 锐化调整图像的对比度，增强其边缘和细节。该参数允许微调图像的视觉清晰度，并且可以显著提高模型识别特征的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output
    - 输出是处理后的图像，现在已格式化并准备好供ClipVision模型分析。它代表了节点处理的结晶，包含了对原始图像进行的所有调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class PrepImageForClipVision:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'interpolation': (['LANCZOS', 'BICUBIC', 'HAMMING', 'BILINEAR', 'BOX', 'NEAREST'],), 'crop_position': (['top', 'bottom', 'left', 'right', 'center', 'pad'],), 'sharpening': ('FLOAT', {'default': 0.0, 'min': 0, 'max': 1, 'step': 0.05})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'prep_image'
    CATEGORY = 'ipadapter/utils'

    def prep_image(self, image, interpolation='LANCZOS', crop_position='center', sharpening=0.0):
        size = (224, 224)
        (_, oh, ow, _) = image.shape
        output = image.permute([0, 3, 1, 2])
        if crop_position == 'pad':
            if oh != ow:
                if oh > ow:
                    pad = (oh - ow) // 2
                    pad = (pad, 0, pad, 0)
                elif ow > oh:
                    pad = (ow - oh) // 2
                    pad = (0, pad, 0, pad)
                output = T.functional.pad(output, pad, fill=0)
        else:
            crop_size = min(oh, ow)
            x = (ow - crop_size) // 2
            y = (oh - crop_size) // 2
            if 'top' in crop_position:
                y = 0
            elif 'bottom' in crop_position:
                y = oh - crop_size
            elif 'left' in crop_position:
                x = 0
            elif 'right' in crop_position:
                x = ow - crop_size
            x2 = x + crop_size
            y2 = y + crop_size
            output = output[:, :, y:y2, x:x2]
        imgs = []
        for img in output:
            img = T.ToPILImage()(img)
            img = img.resize(size, resample=Image.Resampling[interpolation])
            imgs.append(T.ToTensor()(img))
        output = torch.stack(imgs, dim=0)
        del imgs, img
        if sharpening > 0:
            output = contrast_adaptive_sharpening(output, sharpening)
        output = output.permute([0, 2, 3, 1])
        return (output,)
```