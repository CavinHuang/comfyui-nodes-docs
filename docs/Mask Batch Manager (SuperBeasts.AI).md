
# Documentation
- Class name: `Mask Batch Manager (SuperBeasts.AI)`
- Category: `SuperBeastsAI/Masks`
- Output node: `False`

Mask Batch Manager (SuperBeasts.AI)节点专为高效处理和管理图像处理任务中的蒙版批次而设计。它支持对单个蒙版或蒙版批次进行调整大小、裁剪、排序和连接等操作，确保它们符合指定的尺寸。这为各种图像处理工作流程提供了简化的批处理功能。

# Input types
## Required
- **`width`**
    - 指定输出蒙版的期望宽度，影响单个蒙版如何缩放和裁剪以匹配此宽度。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - 指定输出蒙版的期望高度，影响缩放和裁剪操作以确保输出蒙版匹配此高度。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ordering_enabled`**
    - 启用或禁用基于指定顺序对输入蒙版进行排序，允许在处理前对蒙版进行自定义排列。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Optional
- **`new_order`**
    - 当启用排序时，定义输入蒙版的新顺序，决定蒙版处理和连接的顺序。
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`mask1`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask2`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask3`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask4`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask5`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask6`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask7`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask8`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask9`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask10`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask11`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask12`**
    - 可选的蒙版输入。如果提供，将被处理、调整大小并包含在蒙版批次中。
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`

# Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - 经过处理的蒙版的连接批次，可用于进一步的图像处理任务。
    - Python dtype: `torch.Tensor`


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskBatchManagement:
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
                **{f"mask{i}": ("MASK",) for i in range(1, 13)}
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "append"
    CATEGORY = "SuperBeastsAI/Masks"

    def append(self, width, height, ordering_enabled, new_order, **kwargs):
        mask_keys = [f'mask{i}' for i in range(1, 13)]
        masks = [kwargs.get(key) for key in mask_keys if kwargs.get(key) is not None]

        if ordering_enabled == "enabled" and new_order:
            order_indices = [int(idx) - 1 for idx in new_order.split(',') if idx.strip()]
            masks = [masks[idx] for idx in order_indices if idx < len(masks)]

        if not masks:
            raise ValueError("No valid masks provided.")

        processed_masks = []
        for mask in masks:
            pil_mask = tensor2pil(mask)
            resized_cropped_mask = resize_and_crop(pil_mask, width, height)
            mask_tensor = pil2tensor(resized_cropped_mask)
            processed_masks.append(mask_tensor)

        result = torch.cat(processed_masks, dim=0) if processed_masks else torch.empty(0, 1, height, width)
        return (result,)

```
