---
tags:
- VisualEffects
---

# Filter Z (mtb)
## Documentation
- Class name: `Filter Z (mtb)`
- Category: `mtb/filters`
- Output node: `False`

The MTB_FilterZ node applies a depth-based filtering to an image, allowing for selective visibility based on depth values. It supports operations such as converting specified depth regions to black or adjusting their transparency, with options for thresholding and inversion.
## Input types
### Required
- **`image`**
    - The input image to be filtered based on depth values. It plays a crucial role in determining the final output by providing the visual content to be manipulated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`depth`**
    - The depth map associated with the input image, used to determine which parts of the image are affected by the filtering process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`to_black`**
    - A boolean flag that determines whether the filtered areas are turned to black or made transparent.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`threshold`**
    - A float value that sets the depth threshold for filtering, controlling which parts of the image are affected based on their depth values.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`invert`**
    - A boolean flag that inverts the filtering effect, changing which parts of the image are affected based on the threshold.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The filtered image, which has been modified based on the depth map and filtering parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_FilterZ:
    """Filters an image based on a depth map"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "depth": ("IMAGE",),
                "to_black": ("BOOLEAN", {"default": True}),
                "threshold": (
                    "FLOAT",
                    {"default": 0.5, "step": 0.01, "min": 0.0, "max": 1.0},
                ),
                "invert": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "filter"
    CATEGORY = "mtb/filters"

    def filter(
        self,
        image: torch.Tensor,
        depth: torch.Tensor,
        to_black,
        threshold: float,
        invert,
    ):
        # Normalize depth map to be in range [0, 1]
        depth_normalized = (depth - depth.min()) / (depth.max() - depth.min())

        # Calculate the difference from the threshold
        diff_from_threshold = torch.abs(depth_normalized - threshold)

        out_img = None

        if to_black:
            if invert:
                soft_mask = diff_from_threshold >= threshold
            else:
                soft_mask = diff_from_threshold <= threshold

            out_img = image.clone()
            out_img[soft_mask] = 0
            return (out_img,)
        else:
            alpha_channel = 1 - diff_from_threshold / threshold
            alpha_channel = torch.clamp(alpha_channel, 0, 1)

            if invert:
                # Invert the alpha channel
                alpha_channel = 1 - alpha_channel

            # Ensure alpha_channel has the correct shape
            # It should have the shape [batch_size, height, width, 1]
            alpha_channel = alpha_channel.unsqueeze(-1)

            # Combine RGB channels with alpha channel
            out_img = torch.cat((image, alpha_channel), dim=-1)

        return (out_img,)

```
