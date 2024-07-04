# Documentation
- Class name: AlphaChanelAddByMask
- Category: image/alpha
- Output node: False

AlphaChanelAddByMask节点旨在根据指定的掩模和方法向一批图像添加alpha通道。它允许通过将掩模整合到图像数据中来操作图像透明度，从而实现对图像不透明性的动态调整。

## Input types
### Required
- **images**
    - 这是将添加alpha通道的一批图像的基础。该参数定义了将进行透明度操作的原始图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- **mask**
    - 用于决定应用于图像的透明度级别的掩模。它在确定图像中哪些区域应为透明或不透明方面起着关键作用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

- **method**
    - 指定如何将掩模应用到图像的方法，如默认或反转等，影响跨图像的透明度应用方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Output types
### `image`
- Comfy dtype: IMAGE
- 通过指定的掩模和方法添加alpha通道后的修改批图像。此输出允许可视化应用于原始图像的透明效果。
- Python dtype: torch.Tensor

## Usage tips
- Infra type: GPU
- Common nodes: unknown


## Source code
```python
class AlphaChanelAddByMask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "mask": ("MASK",),
                "method": (["default", "invert"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/alpha"

    def node(self, images, mask, method):
        img_count, img_height, img_width = images[:, :, :, 0].shape
        mask_count, mask_height, mask_width = mask.shape

        if mask_width == 64 and mask_height == 64:
            mask = torch.zeros((img_count, img_height, img_width))
        else:
            if img_height != mask_height or img_width != mask_width:
                raise ValueError(
                    "[AlphaChanelByMask]: 图像大小与掩模不匹配。" +
                    "图像：[" + str(img_width) + ", " + str(img_height) + "] - " +
                    "掩模：[" + str(mask_width) + ", " + str(mask_height) + "]."
                )

        if img_count != mask_count:
            mask = mask.expand((img_count, -1, -1))

        if method == "default":
            return (torch.stack([
                torch.stack((images[i, :, :, 0], images[i, :, :, 1], images[i, :, :, 2], 1. - mask[i]), dim=-1) for i in range(len(images))
            ],),)
        else:
            return (torch.stack([
                torch.stack((images[i, :, :, 0], images[i, :, :, 1], images[i, :, :, 2], mask[i]), dim=-1) for i in range(len(images))
            ],),)

```