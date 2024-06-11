# Scale Ref Image and VAE Encode 🎭🅐🅓②
## Documentation
- Class name: ADE_UpscaleAndVAEEncode
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ADE_UpscaleAndVAEEncode节点旨在通过首先将图像放大到更高分辨率，然后使用变分自编码器（VAE）将其编码为潜在表示来处理图像。此节点是AnimateDiff套件的一部分，专门用于在应用进一步的生成或转换过程之前增强图像质量。

## Input types
### Required
- image
    - 表示要放大和编码的输入图像的参数。它在确定最终潜在表示的质量和分辨率方面起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - 指定用于将放大的图像编码为其潜在表示的变分自编码器模型。它影响编码效率和生成的潜在空间的质量。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- latent_size
    - 表示要生成的潜在表示的大小。它决定输出潜在空间的维度。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- scale_method
    - 定义用于放大图像的方法。它影响放大图像的质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- crop
    - 指定放大后应用的裁剪方法，影响最终图像的构图。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Output types
- latent
    - Comfy dtype: LATENT
    - 输出是输入图像的潜在表示，由VAE在放大后编码。它以压缩形式捕捉图像的基本特征，适合进一步的生成任务。
    - Python dtype: Dict[str, torch.Tensor]

## Usage tips
- Infra type: GPU
- Common nodes: unknown

## Source code
```python
class UpscaleAndVaeEncode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "vae": ("VAE",),
                "latent_size": ("LATENT",),
                "scale_method": (ScaleMethods._LIST_IMAGE,),
                "crop": (CropMethods._LIST, {"default": CropMethods.CENTER},),
            }
        }
    
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "preprocess_images"

    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V"

    def preprocess_images(self, image: torch.Tensor, vae: VAE, latent_size: torch.Tensor, scale_method: str, crop: str):
        b, c, h, w = latent_size["samples"].size()
        image = image.movedim(-1,1)
        image = comfy.utils.common_upscale(samples=image, width=w*8, height=h*8, upscale_method=scale_method, crop=crop)
        image = image.movedim(1,-1)
        # now that images are the expected size, VAEEncode them
        try:  # account for old ComfyUI versions (TODO: remove this when other changes require ComfyUI update)
            if not hasattr(vae, "vae_encode_crop_pixels"):
                image = VAEEncode.vae_encode_crop_pixels(image)
        except Exception:
            pass
        return ({"samples": vae.encode(image[:,:,:,:3])},)