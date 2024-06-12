# Documentation
- Class name: WAS_Image_Select_Channel
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Select_Channel 节点旨在从图像中分离出特定的颜色通道以进行进一步的处理或分析。它允许用户选择 'red'（红色）、'green'（绿色）或 'blue'（蓝色）通道，并将图像转换为单通道表示，通过将所选通道复制到所有三个颜色通道中。

# Input types
## Required
- image
    - 输入图像是节点将处理的主要数据。它对节点的操作至关重要，因为它决定了将要被选择和处理的通道的内容。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- channel
    - 通道参数指定从图像中提取哪种颜色通道。它很重要，因为它决定了节点操作的最终结果，决定了在输出图像中保留的颜色信息。
    - Comfy dtype: COMBO['red', 'green', 'blue']
    - Python dtype: str

# Output types
- selected_image
    - 输出是处理后的图像，其中包含一个选定的单色通道。这个图像可以用于各种只需要一个颜色通道的应用中，或者用于进一步的图像处理任务。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Select_Channel:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'channel': (['red', 'green', 'blue'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'select_channel'
    CATEGORY = 'WAS Suite/Image/Process'

    def select_channel(self, image, channel='red'):
        image = self.convert_to_single_channel(tensor2pil(image), channel)
        return (pil2tensor(image),)

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
```