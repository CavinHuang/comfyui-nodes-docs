# Documentation
- Class name: WAS_Image_Batch
- Category: WAS Suite/Image
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Batch节点旨在处理并批量处理多个图像以进行进一步操作。它确保所有输入图像具有匹配的尺寸，然后将它们合并成单个张量，从而促进批量高效处理图像数据。

# Input types
## Optional
- images_a
    - 参数'images_a'用于提供要批量处理的一组图像。它在节点的操作中起着至关重要的作用，因为它直接影响将要处理的内容。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, List[torch.Tensor]]
- images_b
    - 参数'images_b'是批量中的可选图像源。它很重要，因为它允许将其他图像与'images_a'一起处理。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, List[torch.Tensor]]
- images_c
    - 参数'images_c'是另一个可选的图像输入，增强了节点的灵活性，以适应更多的图像数据进行批量处理。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, List[torch.Tensor]]
- images_d
    - 参数'images_d'提供了进一步的可选图像输入能力，允许节点在单个批量操作中处理更广泛的图像数组。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, List[torch.Tensor]]

# Output types
- image
    - 'image'输出代表已处理和连接的图像张量。对于需要统一图像数据批次的下游任务至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Batch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'images_a': ('IMAGE',), 'images_b': ('IMAGE',), 'images_c': ('IMAGE',), 'images_d': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'image_batch'
    CATEGORY = 'WAS Suite/Image'

    def _check_image_dimensions(self, tensors, names):
        reference_dimensions = tensors[0].shape[1:]
        mismatched_images = [names[i] for (i, tensor) in enumerate(tensors) if tensor.shape[1:] != reference_dimensions]
        if mismatched_images:
            raise ValueError(f'WAS Image Batch Warning: Input image dimensions do not match for images: {mismatched_images}')

    def image_batch(self, **kwargs):
        batched_tensors = [kwargs[key] for key in kwargs if kwargs[key] is not None]
        image_names = [key for key in kwargs if kwargs[key] is not None]
        if not batched_tensors:
            raise ValueError('At least one input image must be provided.')
        self._check_image_dimensions(batched_tensors, image_names)
        batched_tensors = torch.cat(batched_tensors, dim=0)
        return (batched_tensors,)
```