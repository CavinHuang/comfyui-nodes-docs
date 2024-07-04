
# Documentation
- Class name: Inference_Core_LayeredDiffusionDecode
- Category: layer_diffuse
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Inference_Core_LayeredDiffusionDecode节点专门用于解码分层扩散过程，通过一系列扩散步骤将采样数据转换为图像。它利用先进技术高效处理和解码多层扩散，优化高质量图像的生成。

# Input types
## Required
- samples
    - 要解码为图像的采样数据，作为扩散过程的初始输入。这个参数是整个解码过程的起点，直接影响最终生成图像的质量和特征。
    - Comfy dtype: LATENT
    - Python dtype: Dict
- images
    - 一个图像张量，将通过扩散步骤进行处理，作为解码操作的基础。这些图像为解码过程提供了视觉上下文，影响最终输出的细节和风格。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- sd_version
    - 指定要使用的扩散模型版本，影响解码行为和输出质量。不同版本的模型可能会产生不同的解码结果，因此选择适当的版本对于满足特定需求至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sub_batch_size
    - 处理的子批次大小，用于优化计算效率和资源使用。合理设置这个参数可以在保证输出质量的同时，提高处理速度和内存利用率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 从解码的扩散过程生成的图像，是主要输出。这些图像是整个解码过程的最终产物，反映了输入样本和处理参数的综合效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 与解码图像相关的alpha遮罩，提供透明度信息。这个遮罩可用于进一步的图像处理或合成操作，增强输出图像的应用灵活性。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionDecode:
    """
    Decode alpha channel value from pixel value.
    [B, C=3, H, W] => [B, C=4, H, W]
    Outputs RGB image + Alpha mask.
    """

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "samples": ("LATENT",),
                "images": ("IMAGE",),
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

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "decode"
    CATEGORY = "layer_diffuse"

    def __init__(self) -> None:
        self.vae_transparent_decoder = {}

    def decode(self, samples, images, sd_version: str, sub_batch_size: int):
        """
        sub_batch_size: How many images to decode in a single pass.
        See https://github.com/huchenlei/ComfyUI-layerdiffuse/pull/4 for more
        context.
        """
        sd_version = StableDiffusionVersion(sd_version)
        if sd_version == StableDiffusionVersion.SD1x:
            url = "https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_sd15_vae_transparent_decoder.safetensors"
            file_name = "layer_sd15_vae_transparent_decoder.safetensors"
        elif sd_version == StableDiffusionVersion.SDXL:
            url = "https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/vae_transparent_decoder.safetensors"
            file_name = "vae_transparent_decoder.safetensors"

        if not self.vae_transparent_decoder.get(sd_version):
            model_path = load_file_from_url(
                url=url, model_dir=layer_model_root, file_name=file_name
            )
            self.vae_transparent_decoder[sd_version] = TransparentVAEDecoder(
                load_torch_file(model_path),
                device=comfy.model_management.get_torch_device(),
                dtype=(
                    torch.float16
                    if comfy.model_management.should_use_fp16()
                    else torch.float32
                ),
            )
        pixel = images.movedim(-1, 1)  # [B, H, W, C] => [B, C, H, W]

        # Decoder requires dimension to be 64-aligned.
        B, C, H, W = pixel.shape
        assert H % 64 == 0, f"Height({H}) is not multiple of 64."
        assert W % 64 == 0, f"Height({W}) is not multiple of 64."

        decoded = []
        for start_idx in range(0, samples["samples"].shape[0], sub_batch_size):
            decoded.append(
                self.vae_transparent_decoder[sd_version].decode_pixel(
                    pixel[start_idx : start_idx + sub_batch_size],
                    samples["samples"][start_idx : start_idx + sub_batch_size],
                )
            )
        pixel_with_alpha = torch.cat(decoded, dim=0)

        # [B, C, H, W] => [B, H, W, C]
        pixel_with_alpha = pixel_with_alpha.movedim(1, -1)
        image = pixel_with_alpha[..., 1:]
        alpha = pixel_with_alpha[..., 0]
        return (image, alpha)

```
