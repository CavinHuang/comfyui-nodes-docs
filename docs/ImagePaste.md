# Documentation
- Class name: ImagePaste
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

ImagePaste节点旨在将前景图像无缝集成到背景图像上的指定位置。它通过将图像的张量表示转换为PIL图像，操作alpha通道以实现透明度，并在确切坐标处将前景粘贴到背景上，从而实现此目的。该节点对于需要精确控制图像放置的图像合成任务至关重要。

# Input types
## Required
- background_image
    - 背景图像是前景将被粘贴的地方。它作为合成的画布，对输出图像的最终外观至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- foreground_image
    - 将放置在背景图像上的图像。它很重要，因为它定义了最终图像中在视觉上突出的主题或元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- x_position
    - 在背景上，前景图像左上角将被放置的水平位置。它很重要，因为它决定了图像在组合中的具体放置位置。
    - Comfy dtype: INT
    - Python dtype: int
- y_position
    - 在背景上，前景图像左上角将被放置的垂直位置。它与x_position一起工作，以设定粘贴图像的精确位置。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 在指定位置将前景粘贴到背景上后得到的图像结果。它代表了最终的组合，是节点的主要输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImagePaste:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'background_image': ('IMAGE',), 'foreground_image': ('IMAGE',), 'x_position': ('INT', {'default': 0, 'min': -10000, 'max': 10000}), 'y_position': ('INT', {'default': 0, 'min': -10000, 'max': 10000})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'paste'
    CATEGORY = 'Mikey/Image'

    def tensor2pil(self, image):
        image_np = np.clip(255.0 * image.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
        if image_np.shape[0] == 4:
            return Image.fromarray(image_np.transpose(1, 2, 0), 'RGBA')
        else:
            return Image.fromarray(image_np.transpose(1, 2, 0), 'RGB')

    def paste(self, background_image, foreground_image, x_position, y_position):
        background_image = tensor2pil(background_image)
        foreground_image = tensor2pil(foreground_image)
        if foreground_image.mode != 'RGBA':
            foreground_image = foreground_image.convert('RGBA')
        (r, g, b, alpha) = foreground_image.split()
        background_image.paste(foreground_image, (x_position, y_position), mask=alpha)
        return (pil2tensor(background_image),)
```