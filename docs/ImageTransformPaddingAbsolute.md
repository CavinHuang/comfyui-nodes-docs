
# Documentation
- Class name: ImageTransformPaddingAbsolute
- Category: image/transform
- Output node: False

ImageTransformPaddingAbsolute节点用于对一批图像应用绝对填充，允许向每个图像的高度和宽度添加指定数量的像素。可以从预定义的选项中选择填充方法，以控制如何填充新增的空间。

# Input types
## Required
- images
    - 需要应用填充的图像批次。这是转换过程的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- add_width
    - 要添加到每个图像宽度的像素数。
    - Comfy dtype: INT
    - Python dtype: int
- add_height
    - 要添加到每个图像高度的像素数。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 用于填充新增区域的方法，选项包括'reflect'（反射）、'edge'（边缘）和'constant'（常量）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 应用填充后的图像批次，根据指定的add_width和add_height增加了尺寸。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformPaddingAbsolute:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "add_width": ("INT", {
                    "default": 64,
                    "min": 0,
                }),
                "add_height": ("INT", {
                    "default": 64,
                    "min": 0,
                }),
                "method": (["reflect", "edge", "constant"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, add_width, add_height, method):
        def transpose_tensor(image):
            tensor = image.clone().detach()
            tensor_pad = TF.pad(tensor.permute(2, 0, 1), [add_height, add_width], padding_mode=method).permute(1, 2, 0)

            return tensor_pad

        return (torch.stack([
            transpose_tensor(images[i]) for i in range(len(images))
        ]),)

```
