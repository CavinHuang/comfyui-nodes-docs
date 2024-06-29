# Documentation
- Class name: ImageUpscaleWithModel
- Category: image/upscaling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageUpscaleWithModel节点旨在使用指定的放大模型增强输入图像的分辨率。它智能地管理系统内存，以防止内存不足错误，确保平滑的放大过程。节点的功能集中在提高图像质量，同时不牺牲性能。

# Input types
## Required
- upscale_model
    - upscale_model参数对于节点至关重要，因为它定义了用于放大图像的模型。它直接影响上采样过程和生成的图像质量。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- image
    - image参数是必需的，因为它代表了节点将处理的输入图像数据。其结构和内容是上采样操作成功的关键。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Output types
- IMAGE
    - 输出参数IMAGE代表了节点生成的放大图像。它标志着上采样过程的成功完成，是节点功能的主要成果。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ImageUpscaleWithModel:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'upscale_model': ('UPSCALE_MODEL',), 'image': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'upscale'
    CATEGORY = 'image/upscaling'

    def upscale(self, upscale_model, image):
        device = model_management.get_torch_device()
        upscale_model.to(device)
        in_img = image.movedim(-1, -3).to(device)
        free_memory = model_management.get_free_memory(device)
        tile = 512
        overlap = 32
        oom = True
        while oom:
            try:
                steps = in_img.shape[0] * comfy.utils.get_tiled_scale_steps(in_img.shape[3], in_img.shape[2], tile_x=tile, tile_y=tile, overlap=overlap)
                pbar = comfy.utils.ProgressBar(steps)
                s = comfy.utils.tiled_scale(in_img, lambda a: upscale_model(a), tile_x=tile, tile_y=tile, overlap=overlap, upscale_amount=upscale_model.scale, pbar=pbar)
                oom = False
            except model_management.OOM_EXCEPTION as e:
                tile //= 2
                if tile < 128:
                    raise e
        upscale_model.cpu()
        s = torch.clamp(s.movedim(-3, -1), min=0, max=1.0)
        return (s,)
```