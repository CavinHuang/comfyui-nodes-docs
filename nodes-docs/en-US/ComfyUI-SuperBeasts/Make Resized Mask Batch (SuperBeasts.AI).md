---
tags:
- Mask
- MaskBatch
---

# Make Resized Mask Batch (SuperBeasts.AI)
## Documentation
- Class name: `Make Resized Mask Batch (SuperBeasts.AI)`
- Category: `SuperBeastsAI/Masks`
- Output node: `False`

This node is designed to process and combine multiple individual masks or mask batches into a single, resized mask batch. It adjusts the size of each mask to match specified dimensions, ensuring uniformity across the batch, and optionally reorders the masks based on a specified sequence. The node facilitates the creation of consistent mask batches for further image processing tasks.
## Input types
### Required
- **`width`**
    - Specifies the target width for the resized masks. This parameter determines the final width of each mask in the batch, ensuring they are resized uniformly.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the target height for the resized masks. This parameter affects the final height of each mask in the batch, ensuring they are resized to match the specified dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`mask1`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask2`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask3`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask4`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask5`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask6`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask7`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask8`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask9`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask10`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask11`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask12`**
    - An optional individual mask to be included in the batch. Masks are resized and optionally reordered to create a uniform batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a single tensor representing a batch of resized masks, ready for further processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MakeResizedMaskBatch:
    """
    Creates a batch of masks from multiple individual masks or batches.
    """
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {"default": 512, "min": 1, "step": 1}),
                "height": ("INT", {"default": 768, "min": 1, "step": 1}),
            },
            "optional": {
                "mask1": ("MASK",),
                "mask2": ("MASK",),
                "mask3": ("MASK",),
                "mask4": ("MASK",),
                "mask5": ("MASK",),
                "mask6": ("MASK",),
                "mask7": ("MASK",),
                "mask8": ("MASK",),
                "mask9": ("MASK",),
                "mask10": ("MASK",),
                "mask11": ("MASK",),
                "mask12": ("MASK",),
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "append"
    CATEGORY = "SuperBeastsAI/Masks"

    def append(self, width, height, mask1=None, mask2=None, mask3=None, mask4=None, mask5=None, mask6=None,
               mask7=None, mask8=None, mask9=None, mask10=None, mask11=None, mask12=None):
        masks = [mask1, mask2, mask3, mask4, mask5, mask6, mask7, mask8, mask9, mask10, mask11, mask12]
        valid_masks = [mask for mask in masks if mask is not None]

        if not valid_masks:
            raise ValueError("At least one input mask must be provided.")

        cropped_masks = []
        for mask in valid_masks:
            if mask.ndim == 2:
                mask = mask.unsqueeze(0).unsqueeze(0)  # Add batch and channel dimensions
            elif mask.ndim == 3:
                mask = mask.unsqueeze(0)  # Add batch dimension
            elif mask.ndim != 4 or (mask.ndim == 4 and mask.shape[1] != 1):
                raise ValueError(f"Invalid mask shape: {mask.shape}. Expected (N, 1, H, W) or (1, H, W) or (H, W).")

            # Scale the mask to match the desired width while maintaining the aspect ratio
            scale_factor = width / mask.shape[-1]
            scaled_height = int(mask.shape[-2] * scale_factor)
            scaled_mask = F.interpolate(mask, size=(scaled_height, width), mode='bilinear', align_corners=False)

            # Perform center cropping
            if scaled_height < height:
                # Pad the top and bottom of the mask
                pad_top = (height - scaled_height) // 2
                pad_bottom = height - scaled_height - pad_top
                cropped_mask = F.pad(scaled_mask, (0, 0, pad_top, pad_bottom), mode='constant', value=0)
            else:
                # Crop the center of the mask
                crop_top = (scaled_height - height) // 2
                crop_bottom = crop_top + height
                cropped_mask = scaled_mask[:, :, crop_top:crop_bottom, :]

            cropped_masks.append(cropped_mask)

        # Concatenate the cropped masks along the batch dimension
        result = torch.cat(cropped_masks, dim=0)

        return (result,)

```
