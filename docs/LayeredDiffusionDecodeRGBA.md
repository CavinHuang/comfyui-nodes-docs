# Documentation
- Class name: LayeredDiffusionDecodeRGBA
- Category: Image Processing
- Output node: False
- Repo Ref: https://github.com/huchenlei/ComfyUI-layerdiffuse.git

LayeredDiffusionDecodeRGBA节点旨在从给定的像素值集解码RGBA图像，包含表示透明度的alpha通道。

# Input types
## Required
- samples
    - “samples”参数对于解码过程至关重要，因为它包含了节点正确运行所需的像素数据和版本信息。
    - Comfy dtype: dict
    - Python dtype: Dict[str, torch.Tensor]
- images
    - “images”参数保存需要处理的图像数据，对于节点执行其解码操作至关重要。
    - Comfy dtype: tensor
    - Python dtype: torch.Tensor
- sd_version
    - “sd_version”参数指定要使用的Stable Diffusion模型的版本，这会影响解码过程和生成图像的质量。
    - Comfy dtype: str
    - Python dtype: str
- sub_batch_size
    - “sub_batch_size”参数决定了每次迭代中处理的图像数量，这会影响解码过程中的性能和内存使用。
    - Comfy dtype: int
    - Python dtype: int

# Output types
- image
    - “image”输出代表解码后的RGBA图像数据，其中alpha通道表示图像的透明度。
    - Comfy dtype: tensor
    - Python dtype: torch.Tensor
- alpha
    - “alpha”输出是RGBA图像的alpha通道，对于在最终图像中渲染透明度效果至关重要。
    - Comfy dtype: tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class LayeredDiffusionDecodeRGBA(LayeredDiffusionDecode):
    """
    Decode alpha channel value from pixel value.
    [B, C=3, H, W] => [B, C=4, H, W]
    Outputs RGBA image.
    """
    RETURN_TYPES = ('IMAGE',)

    def decode(self, samples, images, sd_version: str, sub_batch_size: int):
        (image, mask) = super().decode(samples, images, sd_version, sub_batch_size)
        alpha = 1.0 - mask
        return JoinImageWithAlpha().join_image_with_alpha(image, alpha)
```