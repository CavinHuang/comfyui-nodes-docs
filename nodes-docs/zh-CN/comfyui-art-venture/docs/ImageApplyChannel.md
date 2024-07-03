
# Documentation
- Class name: ImageApplyChannel
- Category: Art Venture/Utils
- Output node: False

ImageApplyChannel节点旨在通过将给定的通道数据应用到图像集合的特定颜色通道（红色、绿色、蓝色、Alpha）来修改它们。这一功能允许精确控制图像的颜色组成和透明度，从而实现自定义的图像处理和操作。

# Input types
## Required
- images
    - 待修改的图像集合。这个参数至关重要，因为它决定了将要进行通道修改的基础图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- channel_data
    - 要应用到每个图像指定通道的数据。这个参数直接影响输出结果，通过改变所有图像中指定通道的值来实现。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- channel
    - 指定要在图像中修改的颜色通道（红色、绿色、蓝色、Alpha）。这个选择决定了将要改变的图像方面。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 应用了指定通道数据的修改后图像。这个输出反映了对原始图像指定通道所做的更改。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilImageApplyChannel:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "channel_data": ("MASK",),
                "channel": (["R", "G", "B", "A"],),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_apply_channel"

    def image_apply_channel(self, images: torch.Tensor, channel_data: torch.Tensor, channel):
        merged_images = []

        for image in images:
            image = image.cpu().clone()

            if channel == "A":
                if image.shape[2] < 4:
                    image = torch.cat([image, torch.ones((image.shape[0], image.shape[1], 1))], dim=2)

                image[:, :, 3] = channel_data
            elif channel == "R":
                image[:, :, 0] = channel_data
            elif channel == "G":
                image[:, :, 1] = channel_data
            else:
                image[:, :, 2] = channel_data

            merged_images.append(image)

        return (torch.stack(merged_images),)

```
