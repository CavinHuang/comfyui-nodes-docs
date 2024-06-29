---
tags:
- Batch
- Image
---

# Pick From Batch (mtb)
## Documentation
- Class name: `Pick From Batch (mtb)`
- Category: `mtb/image utils`
- Output node: `False`

The MTB_PickFromBatch node allows for the selection of a specific number of images from a batch, based on a specified direction (either from the start or the end of the batch). This functionality is useful for operations that require a subset of images from a larger collection, enabling targeted manipulation or analysis.
## Input types
### Required
- **`image`**
    - The batch of images from which a subset will be selected. This parameter is crucial as it determines the pool of available images for selection.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`from_direction`**
    - Specifies the direction from which images are selected within the batch, either from the 'end' or the 'start'. This affects the subset of images chosen for output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`count`**
    - The number of images to select from the batch. This determines the size of the output subset.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The selected subset of images from the batch, based on the specified count and direction.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_PickFromBatch:
    """Pick a specific number of images from a batch.

    either from the start or end.
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "from_direction": (["end", "start"], {"default": "start"}),
                "count": ("INT", {"default": 1}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "pick_from_batch"
    CATEGORY = "mtb/image utils"

    def pick_from_batch(self, image, from_direction, count):
        batch_size = image.size(0)

        # Limit count to the available number of images in the batch
        count = min(count, batch_size)
        if count < batch_size:
            log.warning(
                f"Requested {count} images, "
                f"but only {batch_size} are available."
            )

        if from_direction == "end":
            selected_tensors = image[-count:]
        else:
            selected_tensors = image[:count]

        return (selected_tensors,)

```
