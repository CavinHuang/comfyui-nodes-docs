# Documentation
- Class name: BlurNode
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

BlurNode 类旨在对图像应用高斯模糊效果，模拟摄影和图像处理中常用的柔焦效果。它利用高斯核的概念来平滑图像，减少细节的可见性，创造出更美观的视觉效果。

# Input types
## Required
- image
    - 图像参数是节点将处理的输入图像。它至关重要，因为它是节点操作以实现模糊效果的主要数据。图像的质量和内容显著影响节点的执行和最终结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- radius
    - 半径参数定义了模糊效果的范围。它至关重要，因为它直接影响用于模糊的高斯核的大小，从而影响应用于图像的模糊程度。
    - Comfy dtype: INT
    - Python dtype: int
- sigma_factor
    - sigma_factor 参数调整高斯核的标准差，允许控制模糊的平滑度。它在微调模糊效果以满足特定视觉要求方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- blurred_image
    - blurred_image 输出参数代表应用了高斯模糊效果的处理后的图像。它是节点操作的结果，并反映了模糊后输入图像修改后的视觉外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class BlurNode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'radius': ('INT', {'default': 10, 'min': 0, 'max': 48, 'step': 1}), 'sigma_factor': ('FLOAT', {'default': 1.0, 'min': 0.01, 'max': 3.0, 'step': 0.01})}}

    def gaussian_blur(self, image, kernel_size, sigma):
        kernel = torch.Tensor(kernel_size, kernel_size).to(device=image.device)
        center = kernel_size // 2
        variance = sigma ** 2
        for i in range(kernel_size):
            for j in range(kernel_size):
                x = i - center
                y = j - center
                kernel[i, j] = math.exp(-(x ** 2 + y ** 2) / (2 * variance))
        kernel /= kernel.sum()
        padding = (kernel_size - 1) // 2
        input_pad = torch.nn.functional.pad(image, (padding, padding, padding, padding), mode='reflect')
        (batch_size, num_channels, height, width) = image.shape
        input_reshaped = input_pad.reshape(batch_size * num_channels, 1, height + padding * 2, width + padding * 2)
        output_reshaped = torch.nn.functional.conv2d(input_reshaped, kernel.unsqueeze(0).unsqueeze(0))
        output_tensor = output_reshaped.reshape(batch_size, num_channels, height, width)
        return output_tensor
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'blur'
    CATEGORY = 'Masquerade Nodes'

    def blur(self, image, radius, sigma_factor):
        if len(image.size()) == 3:
            image = image.unsqueeze(3)
        image = image.permute(0, 3, 1, 2)
        kernel_size = radius * 2 + 1
        sigma = sigma_factor * (0.6 * radius - 0.3)
        result = self.gaussian_blur(image, kernel_size, sigma).permute(0, 2, 3, 1)
        if result.size()[3] == 1:
            result = result[:, :, :, 0]
        return (result,)
```