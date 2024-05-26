# Documentation
- Class name: APISR_Lterative_Zho
- Category: 🔎APISR
- Output node: False
- Repo Ref: https://github.com/ZHO-ZHO-ZHO/ComfyUI-APISR.git

该节点旨在使用指定模型增强图像分辨率，专注于提高输入图像的清晰度和细节。

# Input types
## Required
- pipe
    - ‘pipe’参数至关重要，它代表了用于图像超分辨率的模型。它是节点功能的核心，直接影响输出质量。
    - Comfy dtype: APISRMODEL
    - Python dtype: torch.nn.Module
- image
    - ‘image’参数是必不可少的，它是超分辨率过程的输入。其质量和特性影响分辨率提升的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- dtype
    - ‘dtype’参数决定了用于处理的数据类型，这会影响超分辨率算法的性能和精度。
    - Comfy dtype: COMBO[float32, float16]
    - Python dtype: str
## Optional
- crop_for_4x
    - ‘crop_for_4x’参数是一个可选设置，用于调整输入图像以适应4倍缩放要求，确保兼容性和最佳处理。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- processed_images
    - ‘processed_images’输出包含超分辨率图像，代表节点操作的主要结果，细节和清晰度得到增强。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class APISR_Lterative_Zho:

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
        processed_images = []
        for img_tensor in image:
            img_tensor = img_tensor.to(device=device, dtype=weight_dtype).unsqueeze(0).permute(0, 3, 1, 2)
            if crop_for_4x:
                (_, _, h, w) = img_tensor.shape
                if h % 4 != 0:
                    img_tensor = img_tensor[:, :, :4 * (h // 4), :]
                if w % 4 != 0:
                    img_tensor = img_tensor[:, :, :, :4 * (w // 4)]
            with torch.no_grad():
                super_resolved_img = pipe(img_tensor)
            super_resolved_img_nhwc = super_resolved_img.permute(0, 2, 3, 1).squeeze(0).cpu()
            processed_images.append(super_resolved_img_nhwc)
        return (processed_images,)
```