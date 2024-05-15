# Documentation
- Class name: Morphology
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

形态学节点旨在对图像执行各种形态学操作，例如腐蚀、膨胀、开运算和闭运算，这些操作在图像处理中用于改变图像中特征的形状或大小，是图像处理中的基础操作。它使用可定制的核来应用这些操作，为图像后处理任务提供了一个多功能的工具。

# Input types
## Required
- image
    - 输入图像是将要应用形态学操作的主要数据。这是一个关键参数，因为节点的全部功能都围绕着对这张图像的操纵。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- operation
    - 操作参数指定要执行的形态学变换类型。它非常重要，因为它决定了将对输入图像进行的更改的性质。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- kernel_size
    - 核大小决定了用于形态学操作的结构元素的尺寸。它是一个重要参数，因为它影响了应用于图像的变换的范围。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output_image
    - 输出图像是将所选形态学操作应用于输入图像的结果。它代表了处理后图像的最终状态。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class Morphology:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'operation': (['erode', 'dilate', 'open', 'close', 'gradient', 'bottom_hat', 'top_hat'],), 'kernel_size': ('INT', {'default': 3, 'min': 3, 'max': 999, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'process'
    CATEGORY = 'image/postprocessing'

    def process(self, image, operation, kernel_size):
        device = comfy.model_management.get_torch_device()
        kernel = torch.ones(kernel_size, kernel_size, device=device)
        image_k = image.to(device).movedim(-1, 1)
        if operation == 'erode':
            output = erosion(image_k, kernel)
        elif operation == 'dilate':
            output = dilation(image_k, kernel)
        elif operation == 'open':
            output = opening(image_k, kernel)
        elif operation == 'close':
            output = closing(image_k, kernel)
        elif operation == 'gradient':
            output = gradient(image_k, kernel)
        elif operation == 'top_hat':
            output = top_hat(image_k, kernel)
        elif operation == 'bottom_hat':
            output = bottom_hat(image_k, kernel)
        else:
            raise ValueError(f"Invalid operation {operation} for morphology. Must be one of 'erode', 'dilate', 'open', 'close', 'gradient', 'tophat', 'bottomhat'")
        img_out = output.to(comfy.model_management.intermediate_device()).movedim(1, -1)
        return (img_out,)
```