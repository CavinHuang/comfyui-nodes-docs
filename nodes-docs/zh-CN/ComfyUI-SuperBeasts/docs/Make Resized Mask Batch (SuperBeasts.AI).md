
# Documentation
- Class name: Make Resized Mask Batch (SuperBeasts.AI)
- Category: SuperBeastsAI/Masks
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在处理和合并多个单独的遮罩或遮罩批次，生成一个单一的、大小一致的遮罩批次。它会调整每个遮罩的尺寸以匹配指定的宽度和高度，确保批次中所有遮罩的尺寸统一，并可选择性地根据指定顺序重新排列遮罩。这个节点有助于创建统一的遮罩批次，为后续的图像处理任务做准备。

# Input types
## Required
- width
    - 指定调整大小后的遮罩宽度。这个参数决定了批次中每个遮罩的最终宽度，确保它们被统一调整大小。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定调整大小后的遮罩高度。这个参数影响批次中每个遮罩的最终高度，确保它们被调整到指定的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- mask1
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask2
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask3
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask4
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask5
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask6
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask7
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask8
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask9
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask10
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask11
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask12
    - 可选的单个遮罩，将被包含在批次中。遮罩会被调整大小，并可能重新排序以创建统一的批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- mask
    - 输出是一个表示调整大小后的遮罩批次的单一张量，可用于进一步处理。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


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
