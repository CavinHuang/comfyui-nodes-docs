# Documentation
- Class name: WAS_Image_To_Mask
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

`image_to_mask` 方法旨在从一组图像中提取特定的颜色通道并将其转换为掩码。这一过程对于需要隔离图像特定组成部分的应用至关重要，例如在图像分割或对象识别任务中。该节点通过选择所需的通道并将其转换为二进制掩码来操作，然后可以对掩码进行进一步的分析或操作。

# Input types
## Required
- images
    - ‘images’ 参数至关重要，因为它代表了节点将处理的输入图像。它是节点运行所需的，并且直接影响输出掩码，它决定了掩码操作的源材料。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- channel
    - ‘channel’ 参数决定将提取哪个颜色通道以形成掩码。这是一个关键的选择，它影响最终掩码的外观以及在后续处理步骤中的实用性。
    - Comfy dtype: COMBO['alpha', 'red', 'green', 'blue']
    - Python dtype: str

# Output types
- MASKS
    - ‘MASKS’ 输出由从输入图像的选定颜色通道派生的生成掩码组成。这些掩码对于涉及隔离和分析图像特定部分的任务非常重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_To_Mask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'channel': (['alpha', 'red', 'green', 'blue'],)}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'image_to_mask'

    def image_to_mask(self, images, channel):
        mask_images = []
        for image in images:
            image = tensor2pil(image).convert('RGBA')
            (r, g, b, a) = image.split()
            if channel == 'red':
                channel_image = r
            elif channel == 'green':
                channel_image = g
            elif channel == 'blue':
                channel_image = b
            elif channel == 'alpha':
                channel_image = a
            mask = torch.from_numpy(np.array(channel_image.convert('L')).astype(np.float32) / 255.0)
            mask_images.append(mask)
        return (torch.cat(mask_images, dim=0),)
```