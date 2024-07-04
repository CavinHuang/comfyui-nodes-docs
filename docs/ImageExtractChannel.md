
# Documentation
- Class name: ImageExtractChannel
- Category: Art Venture/Utils
- Output node: False

ImageExtractChannel节点专门用于从给定的一组图像中提取特定的颜色通道（红色、绿色、蓝色或阿尔法）。它允许对单个颜色通道进行操作和分析，这对于各种图像处理任务至关重要，如创建蒙版或隔离颜色组件。

# Input types
## Required
- images
    - 将从中提取特定通道的图像。这个输入对于确定要处理的源图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- channel
    - 指定要从图像中提取的颜色通道（红色、绿色、蓝色或阿尔法）。这个选择通过隔离所需的通道直接影响输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- channel_data
    - 从输入图像中提取的通道数据，以蒙版形式提供。这个输出对于进一步的图像处理或分析任务非常有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilImageExtractChannel:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "channel": (["R", "G", "B", "A"],),
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("channel_data",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_extract_alpha"

    def image_extract_alpha(self, images: torch.Tensor, channel):
        # images in shape (N, H, W, C)

        if len(images.shape) < 4:
            images = images.unsqueeze(3).repeat(1, 1, 1, 3)

        if channel == "A" and images.shape[3] < 4:
            raise Exception("Image does not have an alpha channel")

        channel_index = ["R", "G", "B", "A"].index(channel)
        mask = images[:, :, :, channel_index].cpu().clone()

        return (mask,)

```
