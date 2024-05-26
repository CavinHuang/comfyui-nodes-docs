# Documentation
- Class name: WLSH_Upscale_By_Factor_With_Model
- Category: WLSH Nodes/upscaling
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Upscale_By_Factor_With_Model节点的`upscale`方法旨在通过指定的缩放因子增强输入图像的分辨率。它利用预训练模型执行上采样，并提供'nearest-exact'、'bilinear'或'area'等方法选择来进行上采样过程。该节点的功能集中在提高图像的视觉质量和细节，使其成为图像增强任务中的重要工具。

# Input types
## Required
- upscale_model
    - 参数`upscale_model`对于节点的操作至关重要，因为它指定了用于上采样图像的预训练模型。模型的选择可以显著影响上采样的质量和节点的执行效率。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: torch.nn.Module
- image
    - 参数`image`代表节点将处理的输入图像。这是一个基本输入，因为节点的全部操作都围绕着增强此图像的分辨率。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- upscale_method
    - 参数`upscale_method`确定用于上采样图像的算法。不同的方法可能导致上采样图像的细节和质量水平不同，影响最终输出的外观。
    - Comfy dtype: COMBO['nearest-exact', 'bilinear', 'area']
    - Python dtype: str
- factor
    - 参数`factor`定义了输入图像将被上采样的缩放因子。它对于控制图像的最终尺寸至关重要，直接影响节点的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- upscaled_image
    - 输出`upscaled_image`代表处理后的图像，具有增强的分辨率。它是节点操作的主要结果，展示了所选上采样模型和方法的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class WLSH_Upscale_By_Factor_With_Model:
    upscale_methods = ['nearest-exact', 'bilinear', 'area']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'upscale_model': ('UPSCALE_MODEL',), 'image': ('IMAGE',), 'upscale_method': (s.upscale_methods,), 'factor': ('FLOAT', {'default': 2.0, 'min': 0.1, 'max': 8.0, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'upscale'
    CATEGORY = 'WLSH Nodes/upscaling'

    def upscale(self, image, upscale_model, upscale_method, factor):
        device = model_management.get_torch_device()
        upscale_model.to(device)
        in_img = image.movedim(-1, -3).to(device)
        s = comfy.utils.tiled_scale(in_img, lambda a: upscale_model(a), tile_x=128 + 64, tile_y=128 + 64, overlap=8, upscale_amount=upscale_model.scale)
        upscale_model.cpu()
        upscaled = torch.clamp(s.movedim(-3, -1), min=0, max=1.0)
        old_width = image.shape[2]
        old_height = image.shape[1]
        new_width = int(old_width * factor)
        new_height = int(old_height * factor)
        print('Processing image with shape: ', old_width, 'x', old_height, 'to ', new_width, 'x', new_height)
        samples = upscaled.movedim(-1, 1)
        s = comfy.utils.common_upscale(samples, new_width, new_height, upscale_method, crop='disabled')
        s = s.movedim(1, -1)
        return (s,)
```