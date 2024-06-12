---
tags:
- Mask
- MaskBatch
---

# Mask Batch Manager (SuperBeasts.AI)
## Documentation
- Class name: `Mask Batch Manager (SuperBeasts.AI)`
- Category: `SuperBeastsAI/Masks`
- Output node: `False`

The Mask Batch Manager (SuperBeasts.AI) node is designed for the efficient processing and management of mask batches in image manipulation tasks. It supports operations such as resizing, cropping, ordering, and concatenation of individual masks or mask batches, ensuring they conform to specified dimensions. This facilitates streamlined batch processing for various image processing workflows.
## Input types
### Required
- **`width`**
    - Specifies the desired width of the output masks, affecting how individual masks are scaled and cropped to match this width.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the desired height of the output masks, influencing the scaling and cropping operations to ensure the output masks match this height.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ordering_enabled`**
    - Enables or disables the ordering of input masks based on a specified order, allowing for custom arrangement of masks before processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`new_order`**
    - Defines the new order for the input masks when ordering is enabled, determining the sequence in which masks are processed and concatenated.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`mask1`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask2`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask3`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask4`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask5`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask6`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask7`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask8`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask9`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask10`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask11`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask12`**
    - An optional mask input. If provided, it is processed, resized, and included in the mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The concatenated batch of processed masks, ready for further image processing tasks.
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
