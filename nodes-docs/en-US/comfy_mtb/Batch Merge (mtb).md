---
tags:
- Batch
- Image
---

# Batch Merge (mtb)
## Documentation
- Class name: `Batch Merge (mtb)`
- Category: `mtb/batch`
- Output node: `False`

The MTB_BatchMerge node is designed to merge multiple image batches into a single batch, adjusting for different frame counts among the batches and applying a specified fusion method to combine images.
## Input types
### Required
- **`fusion_mode`**
    - Specifies the method for merging images from different batches. It affects how the final merged image is created, with options including adding, multiplying, or averaging the images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`fill`**
    - Determines how to fill the frame count discrepancy in batches, either by repeating the first (head) or last (tail) frame of the batch.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a single image batch that results from merging and adjusting the input image batches according to the specified fusion mode and fill method.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_BatchMerge:
    """Merges multiple image batches with different frame counts"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "fusion_mode": (
                    ["add", "multiply", "average"],
                    {"default": "average"},
                ),
                "fill": (["head", "tail"], {"default": "tail"}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "merge_batches"
    CATEGORY = "mtb/batch"

    def merge_batches(self, fusion_mode: str, fill: str, **kwargs):
        images = kwargs.values()
        max_frames = max(img.shape[0] for img in images)

        adjusted_images = []
        for img in images:
            frame_count = img.shape[0]
            if frame_count < max_frames:
                fill_frame = img[0] if fill == "head" else img[-1]
                fill_frames = fill_frame.repeat(
                    max_frames - frame_count, 1, 1, 1
                )
                adjusted_batch = (
                    torch.cat((fill_frames, img), dim=0)
                    if fill == "head"
                    else torch.cat((img, fill_frames), dim=0)
                )
            else:
                adjusted_batch = img
            adjusted_images.append(adjusted_batch)

        # Merge the adjusted batches
        merged_image = None
        for img in adjusted_images:
            if merged_image is None:
                merged_image = img
            else:
                if fusion_mode == "add":
                    merged_image += img
                elif fusion_mode == "multiply":
                    merged_image *= img
                elif fusion_mode == "average":
                    merged_image = (merged_image + img) / 2

        return (merged_image,)

```
