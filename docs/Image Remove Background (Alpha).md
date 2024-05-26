# Documentation
- Class name: WAS_Remove_Background
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Remove_Background节点旨在通过移除背景来处理图像，实现前景提取。它通过将图像转换为灰度图，应用高斯模糊，并使用二值阈值来创建一个掩膜，以隔离所需的元素。该节点特别适用于需要无背景干扰的干净前景对象的任务。

# Input types
## Required
- images
    - ‘images’参数对于节点至关重要，因为它代表了节点将处理的输入图像。节点的功能围绕操作这些图像以移除背景，使此参数对节点的执行至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]
## Optional
- mode
    - ‘mode’参数决定节点将移除图像的背景还是前景。这是一个可选参数，可以根据期望的结果影响节点的行为，允许在处理不同类型的图像时具有灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- threshold
    - ‘threshold’参数在控制背景移除过程的灵敏度方面至关重要。它设置了灰度值被认为是背景或前景的水平，直接影响节点区分两者的能力。
    - Comfy dtype: INT
    - Python dtype: int
- threshold_tolerance
    - ‘threshold_tolerance’参数定义了在应用阈值之前用于平滑图像的高斯模糊的半径。它影响节点处理图像中的噪声和细节的能力，在最终输出的质量中起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- images
    - ‘images’输出参数包含移除背景后的处理图像。它是节点操作的最终结果，代表了图像处理任务的主要结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Remove_Background:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'mode': (['background', 'foreground'],), 'threshold': ('INT', {'default': 127, 'min': 0, 'max': 255, 'step': 1}), 'threshold_tolerance': ('INT', {'default': 2, 'min': 1, 'max': 24, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'image_remove_background'
    CATEGORY = 'WAS Suite/Image/Process'

    def image_remove_background(self, images, mode='background', threshold=127, threshold_tolerance=2):
        return (self.remove_background(images, mode, threshold, threshold_tolerance),)

    def remove_background(self, image, mode, threshold, threshold_tolerance):
        images = []
        image = [tensor2pil(img) for img in image]
        for img in image:
            grayscale_image = img.convert('L')
            if mode == 'background':
                grayscale_image = ImageOps.invert(grayscale_image)
                threshold = 255 - threshold
            blurred_image = grayscale_image.filter(ImageFilter.GaussianBlur(radius=threshold_tolerance))
            binary_image = blurred_image.point(lambda x: 0 if x < threshold else 255, '1')
            mask = binary_image.convert('L')
            inverted_mask = ImageOps.invert(mask)
            transparent_image = img.copy()
            transparent_image.putalpha(inverted_mask)
            images.append(pil2tensor(transparent_image))
        batch = torch.cat(images, dim=0)
        return batch
```