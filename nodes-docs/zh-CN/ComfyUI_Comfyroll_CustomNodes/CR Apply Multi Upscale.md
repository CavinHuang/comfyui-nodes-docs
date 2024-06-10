# Documentation
- Class name: CR_ApplyMultiUpscale
- Category: Comfyroll/Upscale
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ApplyMultiUpscale 是一个旨在通过多阶段放大过程提高图像分辨率的节点。它利用一系列升频模型顺序地细化图像质量。该节点能够调整重采样方法和舍入模数，为用户提供对放大过程的精细控制。其主要目标是提供具有改进清晰度和细节的高分辨率图像。

# Input types
## Required
- image
    - 输入图像是节点处理的主要数据。它是所有放大操作的起点，其质量直接影响最终输出。图像参数是必需的，因为它决定了增强的主题。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- resampling_method
    - 重采样方法决定了在放大过程中图像是如何插值的。它是一个关键参数，影响着放大图像的平滑度和清晰度，允许用户选择不同的算法以获得最佳结果。
    - Comfy dtype: COMBO[lanczos, nearest, bilinear, bicubic]
    - Python dtype: str
- supersample
    - Supersample 参数允许在放大过程中控制过采样。它非常重要，因为它可以增强图像的细节和清晰度，特别适用于高分辨率输出。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: bool
- rounding_modulus
    - 舍入模数用于确定放大过程中的舍入行为。它是一个重要的参数，确保放大图像的尺寸一致且优化，以便于显示或进一步处理。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_stack
    - 放大堆栈是定义放大操作序列的模型和因素的集合。它至关重要，因为它决定了模型应用于图像的复杂性和顺序，显著影响最终结果。
    - Comfy dtype: UPSCALE_STACK
    - Python dtype: List[Tuple[str, float]]

# Output types
- IMAGE
    - 放大后的图像是节点的主要输出，代表多阶段放大过程的最终结果。它很重要，因为它是节点操作的直接结果，用于进一步处理或显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个文档的 URL，用于进一步帮助。它对于需要更多关于节点操作信息或需要故障排除指导的用户来说很有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class CR_ApplyMultiUpscale:

    @classmethod
    def INPUT_TYPES(s):
        resampling_methods = ['lanczos', 'nearest', 'bilinear', 'bicubic']
        return {'required': {'image': ('IMAGE',), 'resampling_method': (resampling_methods,), 'supersample': (['true', 'false'],), 'rounding_modulus': ('INT', {'default': 8, 'min': 8, 'max': 1024, 'step': 8}), 'upscale_stack': ('UPSCALE_STACK',)}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'apply'
    CATEGORY = icons.get('Comfyroll/Upscale')

    def apply(self, image, resampling_method, supersample, rounding_modulus, upscale_stack):
        pil_img = tensor2pil(image)
        (original_width, original_height) = pil_img.size
        params = list()
        params.extend(upscale_stack)
        for tup in params:
            (upscale_model, rescale_factor) = tup
            print(f'[Info] CR Apply Multi Upscale: Applying {upscale_model} and rescaling by factor {rescale_factor}')
            up_model = load_model(upscale_model)
            up_image = upscale_with_model(up_model, image)
            pil_img = tensor2pil(up_image)
            (upscaled_width, upscaled_height) = pil_img.size
            if upscaled_width == original_width and rescale_factor == 1:
                image = up_image
            else:
                scaled_images = []
                mode = 'rescale'
                resize_width = 1024
                for img in up_image:
                    scaled_images.append(pil2tensor(apply_resize_image(tensor2pil(img), original_width, original_height, rounding_modulus, mode, supersample, rescale_factor, resize_width, resampling_method)))
                image = torch.cat(scaled_images, dim=0)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Upscale-Nodes#cr-apply-multi-upscale'
        return (image, show_help)
```