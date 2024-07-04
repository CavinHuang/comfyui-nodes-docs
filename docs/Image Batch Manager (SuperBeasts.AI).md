
# Documentation
- Class name: Image Batch Manager (SuperBeasts.AI)
- Category: SuperBeastsAI/Image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Image Batch Manager 节点旨在根据指定的尺寸和可选的新顺序重新排列和处理一批图像。它能够动态调整图像大小并裁剪以适应所需尺寸，并可选择根据自定义序列重新排序，从而实现多功能的图像批处理操作，适用于各种应用场景。

# Input types
## Required
- width
    - 指定输出图像的所需宽度，影响调整大小和裁剪操作，以确保图像满足此宽度要求。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定输出图像的所需高度，影响调整大小和裁剪操作，以确保图像满足此高度要求。
    - Comfy dtype: INT
    - Python dtype: int
- ordering_enabled
    - 决定是否启用重新排序功能，如果指定了 'new_order' 参数，则允许根据该参数重新排列图像。此参数启用或禁用自定义图像批次顺序的功能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- new_order
    - 当 'ordering_enabled' 设置为 'enabled' 时，定义用于重新排序图像的自定义序列，影响图像批次的最终排列。此参数应为以逗号分隔的索引列表，表示图像的新顺序。
    - Comfy dtype: STRING
    - Python dtype: str
- image1
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image3
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image4
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image5
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image6
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image7
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image8
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image9
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image10
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image11
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image12
    - 表示最多十二张可能包含在批处理中的图像之一，用于动态调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 经过处理的图像批次，根据指定的参数进行了调整大小、裁剪和可选的重新排序。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchManagement:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {"default": 512}),
                "height": ("INT", {"default": 768}),
                "ordering_enabled": (["disabled", "enabled"], {"default": "disabled"})
            },
            "optional": {
                "new_order": ("STRING", {"default": ""}),
                **{f"image{i}": ("IMAGE",) for i in range(1, 13)}
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "reorder"
    CATEGORY = "SuperBeastsAI/Image"

    def reorder(self, width, height, ordering_enabled, new_order, **kwargs):
        image_keys = [f'image{i}' for i in range(1, 13)]
        images = [kwargs.get(key) for key in image_keys if kwargs.get(key) is not None]

        if ordering_enabled == "enabled" and new_order:
            order_indices = [int(idx) - 1 for idx in new_order.split(',') if idx.strip()]
            images = [images[idx] for idx in order_indices if idx < len(images)]

        processed_images = []
        for img in images:
            pil_img = tensor2pil(img)
            resized_cropped_img = resize_and_crop(pil_img, width, height)
            img_tensor = pil2tensor(resized_cropped_img)
            processed_images.append(img_tensor)

        result = torch.cat(processed_images, dim=0) if processed_images else torch.empty(0, 3, height, width)
        return (result,)

```
