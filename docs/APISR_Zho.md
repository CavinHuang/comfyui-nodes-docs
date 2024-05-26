# Documentation
- Class name: APISR_Zho
- Category: 🔎APISR
- Output node: False
- Repo Ref: https://github.com/ZHO-ZHO-ZHO/ComfyUI-APISR.git

该节点旨在使用指定模型提高图像分辨率，专注于改善输入图像的清晰度和细节。它调整图像以满足模型的要求，并应用增强过程，从而产生一张超分辨率图像。

# Input types
## Required
- pipe
    - ‘pipe’参数代表用于图像超分辨率的模型。它至关重要，因为它定义了将应用于增强图像的基础架构和学习成果。
    - Comfy dtype: APISRMODEL
    - Python dtype: torch.nn.Module
- image
    - ‘image’参数是要由节点处理的输入图像。其质量和尺寸直接影响超分辨率的输出结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- dtype
    - ‘dtype’参数指定了模型权重和输入图像张量的数据类型。它影响计算的精度，并可能影响超分辨率图像的质量。
    - Comfy dtype: COMBO[float32, float16]
    - Python dtype: str
## Optional
- crop_for_4x
    - ‘crop_for_4x’参数决定输入图像是否应被裁剪至4的倍数尺寸，以优化特定模型的处理过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- super_resolved_img
    - ‘super_resolved_img’参数是节点的输出，代表增强后的图像，具有改善的分辨率。它是将模型的超分辨率能力应用于输入图像的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class APISR_Zho:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('APISRMODEL',), 'image': ('IMAGE',), 'crop_for_4x': ('BOOLEAN', {'default': True}), 'dtype': (['float32', 'float16'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'sr_image'
    CATEGORY = '🔎APISR'

    def sr_image(self, pipe, image, crop_for_4x, dtype):
        if dtype == 'float32':
            weight_dtype = torch.float32
        elif dtype == 'float16':
            weight_dtype = torch.float16
        pipe = pipe.to(device=device, dtype=weight_dtype)
        img_tensor = image.permute(0, 3, 1, 2).to(device=device, dtype=weight_dtype)
        if crop_for_4x:
            (_, _, h, w) = img_tensor.shape
            if h % 4 != 0:
                img_tensor = img_tensor[:, :, :4 * (h // 4), :]
            if w % 4 != 0:
                img_tensor = img_tensor[:, :, :, :4 * (w // 4)]
        super_resolved_img = pipe(img_tensor)
        super_resolved_img_nhwc = super_resolved_img.permute(0, 2, 3, 1).cpu()
        return (super_resolved_img_nhwc,)
```