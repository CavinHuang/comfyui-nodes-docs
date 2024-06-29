# Documentation
- Class name: CR_UpscaleImage
- Category: Comfyroll/Upscale
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_UpscaleImage 是一个旨在使用选定的放大模型提高输入图像分辨率的节点。它提供了一系列参数来控制缩放过程，确保输出的高质量图像满足用户对图像分辨率和细节的要求。

# Input types
## Required
- image
    - 输入图像是 CR_UpscaleImage 节点所需的主要数据。它是将被处理并放大到更高分辨率的源材料。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- upscale_model
    - 放大模型参数决定了将使用哪个预训练模型来放大图像。这个选择显著影响放大输出的质量和风格。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('upscale_models')]
    - Python dtype: str
- mode
    - 模式参数决定图像将被重新缩放还是调整大小。这个决定影响缩放技术以及图像的最终尺寸。
    - Comfy dtype: COMBO[['rescale', 'resize']]
    - Python dtype: str
## Optional
- rescale_factor
    - 重新缩放因子是应用于图像原始尺寸的乘数，以确定新的大小。这是控制放大程度的关键参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resize_width
    - 调整大小宽度参数指定了调整大小后图像的新宽度。当模式设置为'resize'时，这一点尤其重要。
    - Comfy dtype: INT
    - Python dtype: int
- resampling_method
    - 重新采样方法在图像处理期间使用，以确定图像插值的算法。它影响放大图像的平滑度和清晰度。
    - Comfy dtype: COMBO[['lanczos', 'nearest', 'bilinear', 'bicubic']]
    - Python dtype: str
- supersample
    - 超采样参数指示在调整大小之前是否应该首先对图像进行过采样。这可以提高最终图像的质量。
    - Comfy dtype: COMBO[['true', 'false']]
    - Python dtype: str
- rounding_modulus
    - 在放大过程中，舍入模数用于调整图像的尺寸，以确保它们可以被特定数字整除，通常可以增强最终结果与某些显示标准的兼容性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 放大后的图像是 CR_UpscaleImage 节点的主要输出。它代表了根据指定参数处理和放大后的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个 URL 链接到文档，以获取有关节点操作的进一步帮助或信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class CR_UpscaleImage:

    @classmethod
    def INPUT_TYPES(s):
        resampling_methods = ['lanczos', 'nearest', 'bilinear', 'bicubic']
        return {'required': {'image': ('IMAGE',), 'upscale_model': (folder_paths.get_filename_list('upscale_models'),), 'mode': (['rescale', 'resize'],), 'rescale_factor': ('FLOAT', {'default': 2, 'min': 0.01, 'max': 16.0, 'step': 0.01}), 'resize_width': ('INT', {'default': 1024, 'min': 1, 'max': 48000, 'step': 1}), 'resampling_method': (resampling_methods,), 'supersample': (['true', 'false'],), 'rounding_modulus': ('INT', {'default': 8, 'min': 8, 'max': 1024, 'step': 8})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'upscale'
    CATEGORY = icons.get('Comfyroll/Upscale')

    def upscale(self, image, upscale_model, rounding_modulus=8, loops=1, mode='rescale', supersample='true', resampling_method='lanczos', rescale_factor=2, resize_width=1024):
        up_model = load_model(upscale_model)
        up_image = upscale_with_model(up_model, image)
        for img in image:
            pil_img = tensor2pil(img)
            (original_width, original_height) = pil_img.size
        for img in up_image:
            pil_img = tensor2pil(img)
            (upscaled_width, upscaled_height) = pil_img.size
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Upscale-Nodes#cr-upscale-image'
        if upscaled_width == original_width and rescale_factor == 1:
            return (up_image, show_help)
        scaled_images = []
        for img in up_image:
            scaled_images.append(pil2tensor(apply_resize_image(tensor2pil(img), original_width, original_height, rounding_modulus, mode, supersample, rescale_factor, resize_width, resampling_method)))
        images_out = torch.cat(scaled_images, dim=0)
        return (images_out, show_help)
```