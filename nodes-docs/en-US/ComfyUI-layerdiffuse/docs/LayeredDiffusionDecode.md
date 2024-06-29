---
tags:
- LayeredDiffusion
- LayeredDiffusionDecode
---

# Layer Diffuse Decode
## Documentation
- Class name: `LayeredDiffusionDecode`
- Category: `layer_diffuse`
- Output node: `False`

This node is designed to decode images through a layered diffusion process, leveraging advanced techniques to enhance image quality and detail. It focuses on reconstructing or generating images by applying a series of diffusion steps, aimed at improving visual fidelity and achieving high-resolution outputs.
## Input types
### Required
- **`samples`**
    - Represents the input samples to be decoded, playing a crucial role in determining the characteristics and quality of the decoded images.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict`
- **`images`**
    - A tensor of images to be processed, serving as the base for the diffusion decoding process. This parameter is essential for defining the initial state of the images before applying the diffusion steps.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`sd_version`**
    - Indicates the version of the diffusion model to be used, impacting the decoding process's effectiveness and the final image quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sub_batch_size`**
    - Determines the size of sub-batches for processing, optimizing the decoding operation's efficiency and resource utilization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The decoded image output, showcasing the result of the layered diffusion decoding process.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The alpha mask output, representing the transparency layer decoded alongside the image, enhancing the image's composition and detail.
    - Python dtype: `torch.Tensor`
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
