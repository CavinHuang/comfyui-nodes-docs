---
tags:
- Mask
- MaskBatch
---

# Mask Batch
## Documentation
- Class name: `Mask Batch`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

The Mask Batch node is designed to aggregate individual mask tensors into a single batched tensor. This node is essential for operations that require batch processing of masks, such as applying transformations or models to multiple masks simultaneously. It ensures that all input masks are combined into a unified batch format, adding a channel dimension for compatibility with subsequent processing steps.
## Input types
### Optional
- **`masks_a`**
    - Represents one of the individual mask tensors to be batched together. It is a crucial component for the node's operation, contributing to the aggregated batched tensor for further processing.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`masks_b`**
    - Represents another individual mask tensor to be included in the batch. It is essential for compiling multiple masks into a single batch for processing.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`masks_c`**
    - An optional mask tensor that can be included in the batch. It adds flexibility to the batching process by allowing for additional masks.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[torch.Tensor]`
- **`masks_d`**
    - Another optional mask tensor that can be included in the batch, further enhancing the node's capability to process multiple masks simultaneously.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`masks`**
    - Comfy dtype: `MASK`
    - The output represents the aggregated batch of mask tensors, now in a format that is compatible with further processing steps.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Batch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "optional": {
                "masks_a": ("MASK",),
                "masks_b": ("MASK",),
                "masks_c": ("MASK",),
                "masks_d": ("MASK",),
                # "masks_e": ("MASK",),
                # "masks_f": ("MASK",),
                # Theoretically, an infinite number of mask input parameters can be added.
            },
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("masks",)
    FUNCTION = "mask_batch"
    CATEGORY = "WAS Suite/Image/Masking"

    def _check_mask_dimensions(self, tensors, names):
        dimensions = [tensor.shape[1:] for tensor in tensors]  # Exclude the batch dimension (if present)
        if len(set(dimensions)) > 1:
            mismatched_indices = [i for i, dim in enumerate(dimensions) if dim != dimensions[0]]
            mismatched_masks = [names[i] for i in mismatched_indices]
            raise ValueError(f"WAS Mask Batch Warning: Input mask dimensions do not match for masks: {mismatched_masks}")

    def mask_batch(self, **kwargs):
        batched_tensors = [kwargs[key] for key in kwargs if kwargs[key] is not None]
        mask_names = [key for key in kwargs if kwargs[key] is not None]

        if not batched_tensors:
            raise ValueError("At least one input mask must be provided.")

        self._check_mask_dimensions(batched_tensors, mask_names)
        batched_tensors = torch.stack(batched_tensors, dim=0)
        batched_tensors = batched_tensors.unsqueeze(1)  # Add a channel dimension
        return (batched_tensors,)

```
