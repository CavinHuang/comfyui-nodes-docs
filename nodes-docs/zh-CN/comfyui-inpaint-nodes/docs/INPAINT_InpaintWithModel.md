# Documentation
- Class name: InpaintWithModel
- Category: inpaint
- Output node: False
- Repo Ref: https://github.com/Acly/comfyui-inpaint-nodes

该节点使用深度学习模型执行图像修复，有效地填充图像中缺失或被遮罩的区域，并生成与周围内容相适应的内容。它适应不同的模型架构，并确保输出与原始图像无缝集成。

# Input types
## Required
- inpaint_model
    - 修复模型对于节点的功能至关重要，它定义了用于生成修复内容的具体深度学习架构。模型的架构直接影响修复结果的质量和准确性。
    - Comfy dtype: INPAINT_MODEL
    - Python dtype: PyTorchModel
- image
    - 输入图像是节点操作的主要数据，修复过程旨在在填充缺失部分的同时保持其整体结构和美感。图像的质量和尺寸直接影响修复结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 遮罩定义了图像中需要修复的区域。它是一个关键参数，因为它指导模型专注于特定区域，确保修复是有针对性和相关的。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- output_image
    - 输出图像是修复过程的结果，最初被遮罩或缺失的区域现在填充了与周围内容相匹配的内容。它代表节点的主要输出，对于进一步的图像分析或显示至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class InpaintWithModel:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'inpaint_model': ('INPAINT_MODEL',), 'image': ('IMAGE',), 'mask': ('MASK',)}}
    RETURN_TYPES = ('IMAGE',)
    CATEGORY = 'inpaint'
    FUNCTION = 'inpaint'

    def inpaint(self, inpaint_model: PyTorchModel, image: Tensor, mask: Tensor):
        if inpaint_model.model_arch == 'MAT':
            required_size = 512
        elif inpaint_model.model_arch == 'LaMa':
            required_size = 256
        else:
            raise ValueError(f'Unknown model_arch {inpaint_model.model_arch}')
        (image, mask) = to_torch(image, mask)
        image_device = image.device
        (original_image, original_mask) = (image, mask)
        (image, mask, original_size) = resize_square(image, mask, required_size)
        mask = mask.floor()
        device = get_torch_device()
        inpaint_model.to(device)
        image = inpaint_model(image.to(device), mask.to(device))
        inpaint_model.cpu()
        image = undo_resize_square(image.to(image_device), original_size)
        image = original_image + (image - original_image) * original_mask.floor()
        return (to_comfy(image),)
```