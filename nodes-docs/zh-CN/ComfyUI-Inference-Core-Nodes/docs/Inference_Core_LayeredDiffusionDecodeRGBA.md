
# Documentation
- Class name: Inference_Core_LayeredDiffusionDecodeRGBA
- Category: layer_diffuse
- Output node: False

该节点旨在从图像的像素值中解码alpha通道，有效地将RGB图像转换为RGBA格式。它利用分层扩散过程通过添加透明度信息来提高图像质量，从而促进更细致的图像操作和生成任务。

# Input types
## Required
- samples
    - 代表要解码的输入样本，在确定最终图像输出方面起着至关重要的作用，为alpha通道解码过程提供必要的数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]
- images
    - 以张量格式表示的输入图像，将被处理以解码alpha通道并从RGB转换为RGBA格式。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- sd_version
    - 指定用于解码的稳定扩散模型的版本，影响解码过程和输出图像的质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sub_batch_size
    - 确定处理的子批次大小，影响解码操作的效率和速度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出的RGBA图像，其中alpha通道已被解码并添加到原始RGB图像中，通过透明度信息增强了它们的表示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionDecodeRGBA(LayeredDiffusionDecode):
    """
    Decode alpha channel value from pixel value.
    [B, C=3, H, W] => [B, C=4, H, W]
    Outputs RGBA image.
    """

    RETURN_TYPES = ("IMAGE",)

    def decode(self, samples, images, sd_version: str, sub_batch_size: int):
        image, mask = super().decode(samples, images, sd_version, sub_batch_size)
        alpha = 1.0 - mask
        return JoinImageWithAlpha().join_image_with_alpha(image, alpha)

```
