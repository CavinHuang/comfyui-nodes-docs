# Documentation
- Class name: imageToMask
- Category: EasyUse/Image
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

imageToMask节点旨在从输入图像中提取单个颜色通道，并将其转换为灰度表示，可用于进一步的图像处理任务。

# Input types
## Required
- image
    - 输入图像对节点的操作至关重要，因为它是提取所需颜色通道的来源。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
## Optional
- channel
    - 通道参数决定了从图像中提取哪个颜色通道，影响灰度转换的最终结果。
    - Comfy dtype: COMBO['red', 'green', 'blue']
    - Python dtype: str

# Output types
- MASK
    - 输出是一个张量，代表从选定的颜色通道派生出的灰度图像，这对于后续的图像分析过程至关重要。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class imageToMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'channel': (['red', 'green', 'blue'],)}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'convert'
    CATEGORY = 'EasyUse/Image'

    def convert_to_single_channel(self, image, channel='red'):
        image = image.convert('RGB')
        if channel == 'red':
            channel_img = image.split()[0].convert('L')
        elif channel == 'green':
            channel_img = image.split()[1].convert('L')
        elif channel == 'blue':
            channel_img = image.split()[2].convert('L')
        else:
            raise ValueError("Invalid channel option. Please choose 'red', 'green', or 'blue'.")
        channel_img = Image.merge('RGB', (channel_img, channel_img, channel_img))
        return channel_img

    def convert(self, image, channel='red'):
        image = self.convert_to_single_channel(tensor2pil(image), channel)
        image = pil2tensor(image)
        return (image.squeeze().mean(2),)
```