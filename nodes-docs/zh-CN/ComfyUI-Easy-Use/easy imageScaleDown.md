# Documentation
- Class name: imageScaleDown
- Category: EasyUse/Image
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点旨在将图像调整为指定的宽度和高度，可能会采用中心裁剪来保持长宽比的完整性。这对于预处理图像数据以适应各种机器学习模型和应用程序所需的输入尺寸非常关键。

# Input types
## Required
- images
    - 要缩小的图像。该参数至关重要，因为节点直接作用于图像数据，影响输出的尺寸和质量。
    - Comfy dtype: COMBO[Tensor]
    - Python dtype: torch.Tensor
- width
    - 缩放后图像的期望宽度。该参数至关重要，因为它设置了出的水平维度，影响着调整大小的过程。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 缩放后图像的期望高度。该参数至关重要，因为它设置了输出的垂直维度，影响着调整大小的过程。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- crop
    - 调整大小时应用的裁剪方法。该参数重要，因为它决定了图像在缩放前是否居中，这可以增强输出的视觉呈现。
    - Comfy dtype: ENUM
    - Python dtype: str

# Output types
- IMAGE
    - 调整大小后的图像。这是节点的主要输出，代表准备好进行进一步处理或分析的转换后的数据。
    - Comfy dtype: COMBO[Tensor]
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class imageScaleDown:
    crop_methods = ['disabled', 'center']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'width': ('INT', {'default': 512, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1}), 'height': ('INT', {'default': 512, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1}), 'crop': (s.crop_methods,)}}
    RETURN_TYPES = ('IMAGE',)
    CATEGORY = 'EasyUse/Image'
    FUNCTION = 'image_scale_down'

    def image_scale_down(self, images, width, height, crop):
        if crop == 'center':
            old_width = images.shape[2]
            old_height = images.shape[1]
            old_aspect = old_width / old_height
            new_aspect = width / height
            x = 0
            y = 0
            if old_aspect > new_aspect:
                x = round((old_width - old_width * (new_aspect / old_aspect)) / 2)
            elif old_aspect < new_aspect:
                y = round((old_height - old_height * (old_aspect / new_aspect)) / 2)
            s = images[:, y:old_height - y, x:old_width - x, :]
        else:
            s = images
        results = []
        for image in s:
            img = tensor2pil(image).convert('RGB')
            img = img.resize((width, height), Image.LANCZOS)
            results.append(pil2tensor(img))
        return (torch.cat(results, dim=0),)
```