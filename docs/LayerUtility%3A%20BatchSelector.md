# Documentation
- Class name: BatchSelector
- Category: 😺dzNodes/LayerUtility/SystemIO
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

从批量图片或遮罩中获取指定的图片或遮罩。

# Input types
## Required
- select
    - 选择输出的图片或遮罩在批量的索引值，0为第一张。可以输入多个值，中间用任意非数字字符分隔，包括不仅限于逗号，句号，分号，空格或者字母，甚至中文。 注意:如果数值超出批量，将输出最后一张。如果没有对应的输入，将输出一个空的64x64图片或64x64黑色遮罩。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- images
    - 输入的图片批量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- masks
    - 输入的遮罩批量。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 输出的遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class BatchSelector:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "select": ("STRING", {"default": "0,"},),
            },
            "optional": {
                "images": ("IMAGE",),  #
                "masks": ("MASK",),  #
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK",)
    RETURN_NAMES = ("image", "mask",)
    FUNCTION = 'batch_selector'
    CATEGORY = '😺dzNodes/LayerUtility/SystemIO'

    def batch_selector(self, select, images=None, masks=None
                  ):
        ret_images = []
        ret_masks = []
        empty_image = pil2tensor(Image.new("RGBA", (64, 64), (0, 0, 0, 0)))
        empty_mask = image2mask(Image.new("L", (64, 64), color="black"))

        indexs = extract_numbers(select)
        for i in indexs:
            if images is not None:
                if i < len(images):
                    ret_images.append(images[i].unsqueeze(0))
                else:
                    ret_images.append(images[-1].unsqueeze(0))
            if masks is not None:
                if i < len(masks):
                    ret_masks.append(masks[i].unsqueeze(0))
                else:
                    ret_masks.append(masks[-1].unsqueeze(0))

        if len(ret_images) == 0:
            ret_images.append(empty_image)
        if len(ret_masks) == 0:
            ret_masks.append(empty_mask)

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0),)

```