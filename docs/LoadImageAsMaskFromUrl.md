
# Documentation
- Class name: LoadImageAsMaskFromUrl
- Category: Art Venture/Image
- Output node: False

该节点旨在从URL加载图像并根据指定的颜色通道将其转换为蒙版。它支持从alpha、红、绿或蓝通道中选择以创建蒙版，从而便于各种需要蒙版的图像处理和操作任务。

# Input types
## Required
- url
    - 从中加载图像的URL。支持通过换行符分隔的多个URL来加载多张图像。这个参数对于获取需要处理成蒙版的图像数据至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- channel
    - 指定用于创建蒙版的颜色通道('alpha'、'red'、'green'、'blue')。这个选择决定了图像数据的哪一部分将被转换为蒙版，对最终结果有显著影响。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- masks
    - 基于所选颜色通道从图像生成的输出蒙版。这些蒙版适用于各种需要隔离或突出特定区域的图像处理应用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilLoadImageAsMaskFromUrl(UtilLoadImageFromUrl):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "url": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": False}),
                "channel": (["alpha", "red", "green", "blue"],),
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("masks",)

    def load_image(self, url: str, channel: str):
        urls = url.strip().split("\n")
        images, alphas = load_images_from_url([urls], False)

        masks = []

        for image, alpha in zip(images, alphas):
            if channel == "alpha":
                mask = alpha
            elif channel == "red":
                mask = image.getchannel("R")
            elif channel == "green":
                mask = image.getchannel("G")
            elif channel == "blue":
                mask = image.getchannel("B")

            mask = np.array(mask).astype(np.float32) / 255.0
            mask = 1.0 - torch.from_numpy(mask)

            masks.append(mask)

        return (torch.stack(masks, dim=0),)

```
