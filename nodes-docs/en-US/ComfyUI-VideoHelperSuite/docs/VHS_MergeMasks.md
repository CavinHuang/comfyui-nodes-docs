---
tags:
- Mask
---

# Merge Mask Batches 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_MergeMasks`
- Category: `Video Helper Suite 🎥🅥🅗🅢/mask`
- Output node: `False`

This node is designed to merge two mask batches into a single batch, applying a specified merge strategy to handle size discrepancies and scaling between the masks. It facilitates the combination of mask data, ensuring compatibility and uniformity across different mask dimensions for further processing or analysis.
## Input types
### Required
- **`mask_A`**
    - The first mask batch to be merged. It plays a crucial role in determining the base template for merging when certain strategies are applied.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask_B`**
    - The second mask batch to be merged. Depending on the merge strategy, it can either serve as the template for resizing or be resized to match the first mask batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`merge_strategy`**
    - Defines the strategy for handling size discrepancies between the two mask batches. It dictates whether to match the size of the first mask, the second mask, or the larger/smaller of the two.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `MergeStrategies`
- **`scale_method`**
    - Specifies the method to be used for scaling the masks during the merge process, ensuring that the masks are appropriately resized according to the merge strategy.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `ScaleMethods`
- **`crop`**
    - Determines whether and how to crop the masks after scaling, to ensure they fit the desired dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `CropMethods`
## Output types
- **`MASK`**
    - Comfy dtype: `MASK`
    - The merged mask batch, resulting from the combination of the two input masks according to the specified merge strategy and scaling method.
    - Python dtype: `torch.Tensor`
- **`count`**
    - Comfy dtype: `INT`
    - The total number of masks in the merged batch, providing a count of the output masks for further processing or analysis.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MergeMasks:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask_A": ("MASK",),
                "mask_B": ("MASK",),
                "merge_strategy": (MergeStrategies.list_all,),
                "scale_method": (ScaleMethods.list_all,),
                "crop": (CropMethods.list_all,),
            }
        }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/mask"

    RETURN_TYPES = ("MASK", "INT",)
    RETURN_NAMES = ("MASK", "count",)
    FUNCTION = "merge"

    def merge(self, mask_A: Tensor, mask_B: Tensor, merge_strategy: str, scale_method: str, crop: str):
        masks = []
        # if not same dimensions, do scaling
        if mask_A.shape[2] != mask_B.shape[2] or mask_A.shape[1] != mask_B.shape[1]:
            A_size = mask_A.shape[2] * mask_A.shape[1]
            B_size = mask_B.shape[2] * mask_B.shape[1]
            # determine which to use
            use_A_as_template = True
            if merge_strategy == MergeStrategies.MATCH_A:
                pass
            elif merge_strategy == MergeStrategies.MATCH_B:
                use_A_as_template = False
            elif merge_strategy in (MergeStrategies.MATCH_SMALLER, MergeStrategies.MATCH_LARGER):
                if A_size <= B_size:
                    use_A_as_template = True if merge_strategy == MergeStrategies.MATCH_SMALLER else False
            # add dimension where image channels would be expected to work with common_upscale
            mask_A = torch.unsqueeze(mask_A, 1)
            mask_B = torch.unsqueeze(mask_B, 1)
            # apply scaling
            if use_A_as_template:
                mask_B = comfy.utils.common_upscale(mask_B, mask_A.shape[3], mask_A.shape[2], scale_method, crop)
            else:
                mask_A = comfy.utils.common_upscale(mask_A, mask_B.shape[3], mask_B.shape[2], scale_method, crop)
            # undo dimension increase
            mask_A = torch.squeeze(mask_A, 1)
            mask_B = torch.squeeze(mask_B, 1)

        masks.append(mask_A)
        masks.append(mask_B)
        all_masks = torch.cat(masks, dim=0)
        return (all_masks, all_masks.size(0),)

```
