# Documentation
- Class name: WAS_Images_To_Linear
- Category: WAS Suite/Image
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Images_To_Linear节点旨在将图像数据转换为线性格式。它在图像处理工作流中扮演着关键角色，确保图像数据被适当地转换以便于后续的计算任务。该节点的功能在准备图像进行分析或在线性代数框架内进行操作时至关重要。

# Input types
## Required
- images
    - “images”参数对于节点的操作至关重要，因为它作为图像到线性转换过程的输入。它直接影响节点的执行，通过确定将被转换的图像的来源。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]

# Output types
- linear_images
    - “linear_images”输出参数代表图像到线性转换的结果。它很重要，因为它提供了准备好的图像数据，用于进一步的线性分析或操作。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, List[torch.Tensor]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Images_To_Linear:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_to_linear'
    CATEGORY = 'WAS Suite/Image'

    def image_to_linear(self, images):
        if len(images) > 1:
            tensors = []
            for image in images:
                tensors.append(pil2tensor(tensor2pil(image).convert('L')))
            tensors = torch.cat(tensors, dim=0)
            return (tensors,)
        else:
            return (pil2tensor(tensor2pil(images).convert('L')),)
```