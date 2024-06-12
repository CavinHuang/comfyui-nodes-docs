---
tags:
- Image
- ImageTransformation
---

# Stack Images (mtb)
## Documentation
- Class name: `Stack Images (mtb)`
- Category: `mtb/image utils`
- Output node: `False`

The Stack Images node is designed to combine multiple input images into a single image by stacking them either horizontally or vertically, based on the specified orientation.
## Input types
### Required
- **`vertical`**
    - Determines the orientation of the stacking process. If true, images are stacked vertically; otherwise, they are stacked horizontally.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a single image that results from stacking the input images in the specified orientation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_StackImages:
    """Stack the input images horizontally or vertically."""

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"vertical": ("BOOLEAN", {"default": False})}}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "stack"
    CATEGORY = "mtb/image utils"

    def stack(self, vertical, **kwargs):
        if not kwargs:
            raise ValueError("At least one tensor must be provided.")

        tensors = list(kwargs.values())
        log.debug(
            f"Stacking {len(tensors)} tensors "
            f"{'vertically' if vertical else 'horizontally'}"
        )

        normalized_tensors = [
            self.normalize_to_rgba(tensor) for tensor in tensors
        ]

        if vertical:
            width = normalized_tensors[0].shape[2]
            if any(tensor.shape[2] != width for tensor in normalized_tensors):
                raise ValueError(
                    "All tensors must have the same width "
                    "for vertical stacking."
                )
            dim = 1
        else:
            height = normalized_tensors[0].shape[1]
            if any(tensor.shape[1] != height for tensor in normalized_tensors):
                raise ValueError(
                    "All tensors must have the same height "
                    "for horizontal stacking."
                )
            dim = 2

        stacked_tensor = torch.cat(normalized_tensors, dim=dim)

        return (stacked_tensor,)

    def normalize_to_rgba(self, tensor):
        """Normalize tensor to have 4 channels (RGBA)."""
        _, _, _, channels = tensor.shape
        # already RGBA
        if channels == 4:
            return tensor
        # RGB to RGBA
        elif channels == 3:
            alpha_channel = torch.ones(
                tensor.shape[:-1] + (1,), device=tensor.device
            )  # Add an alpha channel
            return torch.cat((tensor, alpha_channel), dim=-1)
        else:
            raise ValueError(
                "Tensor has an unsupported number of channels: "
                "expected 3 (RGB) or 4 (RGBA)."
            )

```
