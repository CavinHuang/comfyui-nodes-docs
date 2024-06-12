# Documentation
- Class name: WAS_Lucy_Sharpen
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Lucy_Sharpen 节点旨在通过应用锐化滤波器来增强图像的清晰度和细节。它使用迭代过程来细化图像，使边缘和细节更加清晰，而不引入显著的伪影。这个节点特别适用于提高可能已经模糊或软化的图像的视觉质量，有助于产生更清晰、更定义明确的输出。

# Input types
## Required
- images
    - ‘images’参数对于节点的操作至关重要，因为它指定了需要锐化的输入图像。锐化效果的质量直接受这些图像的初始状态影响，使这个参数对于实现期望的结果至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]
## Optional
- iterations
    - ‘iterations’参数决定了对每个图像通道应用锐化处理的次数。迭代次数越多，锐化效果可能越明显，但同时也会增加计算负载。这是一个可选参数，允许用户控制锐化的强度。
    - Comfy dtype: INT
    - Python dtype: int
- kernel_size
    - ‘kernel_size’参数定义了锐化过程中使用的卷积核的大小。更大的核大小可以捕获更多上下文，但也可能引入更多的模糊。这是一个可选参数，影响输出图像中锐度和平滑度之间的平衡。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- sharpened_images
    - ‘sharpened_images’输出参数包含了应用锐化处理后的图像结果。与输入图像相比，这些图像预期具有更好的清晰度和细节，边缘和纹理得到增强。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Lucy_Sharpen:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'iterations': ('INT', {'default': 2, 'min': 1, 'max': 12, 'step': 1}), 'kernel_size': ('INT', {'default': 3, 'min': 1, 'max': 16, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'sharpen'
    CATEGORY = 'WAS Suite/Image/Filter'

    def sharpen(self, images, iterations, kernel_size):
        tensors = []
        if len(images) > 1:
            for img in images:
                tensors.append(pil2tensor(self.lucy_sharpen(tensor2pil(img), iterations, kernel_size)))
            tensors = torch.cat(tensors, dim=0)
        else:
            return (pil2tensor(self.lucy_sharpen(tensor2pil(images), iterations, kernel_size)),)
        return (tensors,)

    def lucy_sharpen(self, image, iterations=10, kernel_size=3):
        from scipy.signal import convolve2d
        image_array = np.array(image, dtype=np.float32) / 255.0
        kernel = np.ones((kernel_size, kernel_size), dtype=np.float32) / kernel_size ** 2
        sharpened_channels = []
        padded_image_array = np.pad(image_array, ((kernel_size, kernel_size), (kernel_size, kernel_size), (0, 0)), mode='edge')
        for channel in range(3):
            channel_array = padded_image_array[:, :, channel]
            for _ in range(iterations):
                blurred_channel = convolve2d(channel_array, kernel, mode='same')
                ratio = channel_array / (blurred_channel + 1e-06)
                channel_array *= convolve2d(ratio, kernel, mode='same')
            sharpened_channels.append(channel_array)
        cropped_sharpened_image_array = np.stack(sharpened_channels, axis=-1)[kernel_size:-kernel_size, kernel_size:-kernel_size, :]
        sharpened_image_array = np.clip(cropped_sharpened_image_array * 255.0, 0, 255).astype(np.uint8)
        sharpened_image = Image.fromarray(sharpened_image_array)
        return sharpened_image
```