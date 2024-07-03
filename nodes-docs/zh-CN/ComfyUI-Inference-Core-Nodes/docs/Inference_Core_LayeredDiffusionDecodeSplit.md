
# Documentation
- Class name: Inference_Core_LayeredDiffusionDecodeSplit
- Category: layer_diffuse
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

这个节点专门用于通过分层扩散过程对图像进行解码，特别适用于处理分割图像数据。它利用修改后的扩散解码方法来分段处理图像，优化了将图像分为帧或层以提高推理性能的场景。

# Input types
## Required
- samples
    - 节点将处理的样本数据集合。这些数据对解码操作至关重要，因为它直接影响解码图像的分割、处理和最终质量。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- images
    - 待解码的图像张量。这个输入是节点功能的核心，因为它会根据提供的样本和帧直接操作这些图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- frames
    - 指定图像被划分的帧数或段数。这个参数对确定图像如何被处理和解码至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- sd_version
    - 用于解码的Stable Diffusion模型版本。这会影响解码行为和输出图像的质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sub_batch_size
    - 处理的子批次大小，允许在解码过程中优化资源利用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 通过分层扩散方法处理的解码图像。这个输出对于理解解码过程的有效性和质量至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionDecodeSplit(LayeredDiffusionDecodeRGBA):
    """Decode RGBA every N images."""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "samples": ("LATENT",),
                "images": ("IMAGE",),
                # Do RGBA decode every N output images.
                "frames": (
                    "INT",
                    {"default": 2, "min": 2, "max": s.MAX_FRAMES, "step": 1},
                ),
                "sd_version": (
                    [
                        StableDiffusionVersion.SD1x.value,
                        StableDiffusionVersion.SDXL.value,
                    ],
                    {
                        "default": StableDiffusionVersion.SDXL.value,
                    },
                ),
                "sub_batch_size": (
                    "INT",
                    {"default": 16, "min": 1, "max": 4096, "step": 1},
                ),
            },
        }

    MAX_FRAMES = 3
    RETURN_TYPES = ("IMAGE",) * MAX_FRAMES

    def decode(
        self,
        samples,
        images: torch.Tensor,
        frames: int,
        sd_version: str,
        sub_batch_size: int,
    ):
        sliced_samples = copy.copy(samples)
        sliced_samples["samples"] = sliced_samples["samples"][::frames]
        return tuple(
            (
                (
                    super(LayeredDiffusionDecodeSplit, self).decode(
                        sliced_samples, imgs, sd_version, sub_batch_size
                    )[0]
                    if i == 0
                    else imgs
                )
                for i in range(frames)
                for imgs in (images[i::frames],)
            )
        ) + (None,) * (self.MAX_FRAMES - frames)

```
