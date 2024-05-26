# Documentation
- Class name: WAS_Images_To_RGB
- Category: WAS Suite/Image
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Images_To_RGB节点的`image_to_rgb`方法旨在将一系列图像转换为它们的RGB表示形式。它通过将每个图像转换为张量，然后将其转换为RGB格式，最后如果提供了多个图像，则将结果张量堆叠起来来操作。这个过程对于在WAS套件内准备图像进行进一步处理或分析至关重要。

# Input types
## Required
- images
    - 'image'参数对于节点的操作至关重要，因为它代表了需要转换为RGB格式的图像集合。节点逐个处理每个图像，并确保最终输出是适合下游任务的张量表示。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Output types
- tensors
    - 'tensors'输出是代表输入图像RGB格式的张量或张量堆叠。这个输出很重要，因为它允许与WAS套件中需要RGB图像数据进行进一步处理的其他节点无缝集成。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, List[torch.Tensor]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Images_To_RGB:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_to_rgb'
    CATEGORY = 'WAS Suite/Image'

    def image_to_rgb(self, images):
        if len(images) > 1:
            tensors = []
            for image in images:
                tensors.append(pil2tensor(tensor2pil(image).convert('RGB')))
            tensors = torch.cat(tensors, dim=0)
            return (tensors,)
        else:
            return (pil2tensor(tensor2pil(images).convert('RGB')),)
```