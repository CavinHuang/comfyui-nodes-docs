---
tags:
- Mask
- MaskGeneration
---

# Mask To Region
## Documentation
- Class name: `Mask To Region`
- Category: `Masquerade Nodes`
- Output node: `False`

The 'Mask To Region' node is designed to transform a given mask into a rectangular region that encompasses the mask, adhering to specified constraints such as padding, aspect ratio, and minimum dimensions. This node facilitates the extraction of meaningful regions from masks for further processing or analysis.
## Input types
### Required
- **`mask`**
    - The 'mask' parameter represents the input mask image that the node will process to identify and extract the rectangular region.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`padding`**
    - The 'padding' parameter allows specifying additional space around the identified region, enhancing flexibility in region extraction.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`constraints`**
    - The 'constraints' parameter defines the rules for adjusting the extracted region's dimensions, including keeping aspect ratios and size multiples.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`constraint_x`**
    - The 'constraint_x' parameter sets a constraint on the region's width, ensuring it adheres to specified requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`constraint_y`**
    - The 'constraint_y' parameter sets a constraint on the region's height, ensuring it adheres to specified requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`min_width`**
    - The 'min_width' parameter establishes a minimum width for the extracted region, ensuring it meets a certain size threshold.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`min_height`**
    - The 'min_height' parameter establishes a minimum height for the extracted region, ensuring it meets a certain size threshold.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_behavior`**
    - The 'batch_behavior' parameter dictates how the node should handle multiple masks in a batch, focusing on matching aspect ratios or sizes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image of the rectangular region extracted from the input mask, conforming to the specified constraints.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskToRegion:
    """
    Given a mask, returns a rectangular region that fits the mask with the given constraints
    """
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("IMAGE",),
                "padding": ("INT", {"default": 0, "min": 0, "max": VERY_BIG_SIZE, "step": 1}),
                "constraints": (["keep_ratio", "keep_ratio_divisible", "multiple_of", "ignore"],),
                "constraint_x": ("INT", {"default": 64, "min": 2, "max": VERY_BIG_SIZE, "step": 1}),
                "constraint_y": ("INT", {"default": 64, "min": 2, "max": VERY_BIG_SIZE, "step": 1}),
                "min_width": ("INT", {"default": 0, "min": 0, "max": VERY_BIG_SIZE, "step": 1}),
                "min_height": ("INT", {"default": 0, "min": 0, "max": VERY_BIG_SIZE, "step": 1}),
                "batch_behavior": (["match_ratio", "match_size"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "get_region"

    CATEGORY = "Masquerade Nodes"

    def get_region(self, mask, padding, constraints, constraint_x, constraint_y, min_width, min_height, batch_behavior):
        mask = tensor2mask(mask)
        mask_size = mask.size()
        mask_width = int(mask_size[2])
        mask_height = int(mask_size[1])

        # masks_to_boxes errors if the tensor is all zeros, so we'll add a single pixel and zero it out at the end
        is_empty = ~torch.gt(torch.max(torch.reshape(mask,[mask_size[0], mask_width * mask_height]), dim=1).values, 0.)
        mask[is_empty,0,0] = 1.
        boxes = masks_to_boxes(mask)
        mask[is_empty,0,0] = 0.

        # Account for padding
        min_x = torch.max(boxes[:,0] - padding, torch.tensor(0.))
        min_y = torch.max(boxes[:,1] - padding, torch.tensor(0.))
        max_x = torch.min(boxes[:,2] + padding, torch.tensor(mask_width))
        max_y = torch.min(boxes[:,3] + padding, torch.tensor(mask_height))

        width = max_x - min_x
        height = max_y - min_y

        # Make sure the width and height are big enough
        target_width = torch.max(width, torch.tensor(min_width))
        target_height = torch.max(height, torch.tensor(min_height))

        if constraints == "keep_ratio":
            target_width = torch.max(target_width, target_height * constraint_x // constraint_y)
            target_height = torch.max(target_height, target_width * constraint_y // constraint_x)
        elif constraints == "keep_ratio_divisible":
            # Probably a more efficient way to do this, but given the bounds it's not too bad
            max_factors = torch.min(constraint_x // target_width, constraint_y // target_height)
            max_factor = int(torch.max(max_factors).item())
            for i in range(1, max_factor+1):
                divisible = constraint_x % i == 0 and constraint_y % i == 0
                if divisible:
                    big_enough = ~torch.lt(target_width, constraint_x // i) * ~torch.lt(target_height, constraint_y // i)
                    target_width[big_enough] = constraint_x // i
                    target_height[big_enough] = constraint_y // i
        elif constraints == "multiple_of":
            target_width[torch.gt(target_width % constraint_x, 0)] = (target_width // constraint_x + 1) * constraint_x
            target_height[torch.gt(target_height % constraint_y, 0)] = (target_height // constraint_y + 1) * constraint_y

        if batch_behavior == "match_size":
            target_width[:] = torch.max(target_width)
            target_height[:] = torch.max(target_height)
        elif batch_behavior == "match_ratio":
            # We'll target the ratio that's closest to 1:1, but don't want to take into account empty masks
            ratios = torch.abs(target_width / target_height - 1)
            ratios[is_empty] = 10000
            match_ratio = torch.min(ratios,dim=0).indices.item()
            target_width = torch.max(target_width, target_height * target_width[match_ratio] // target_height[match_ratio])
            target_height = torch.max(target_height, target_width * target_height[match_ratio] // target_width[match_ratio])

        missing = target_width - width
        min_x = min_x - missing // 2
        max_x = max_x + (missing - missing // 2)

        missing = target_height - height
        min_y = min_y - missing // 2
        max_y = max_y + (missing - missing // 2)

        # Move the region into range if needed
        bad = torch.lt(min_x,0)
        max_x[bad] -= min_x[bad]
        min_x[bad] = 0

        bad = torch.lt(min_y,0)
        max_y[bad] -= min_y[bad]
        min_y[bad] = 0

        bad = torch.gt(max_x, mask_width)
        min_x[bad] -= (max_x[bad] - mask_width)
        max_x[bad] = mask_width

        bad = torch.gt(max_y, mask_height)
        min_y[bad] -= (max_y[bad] - mask_height)
        max_y[bad] = mask_height

        region = torch.zeros((mask_size[0], mask_height, mask_width))
        for i in range(0, mask_size[0]):
            if not is_empty[i]:
                ymin = int(min_y[i].item())
                ymax = int(max_y[i].item())
                xmin = int(min_x[i].item())
                xmax = int(max_x[i].item())
                region[i, ymin:ymax+1, xmin:xmax+1] = 1
        return (region,)

```
