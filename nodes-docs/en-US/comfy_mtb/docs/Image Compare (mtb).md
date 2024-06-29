---
tags:
- Comparison
---

# Image Compare (mtb)
## Documentation
- Class name: `Image Compare (mtb)`
- Category: `mtb/image`
- Output node: `False`

This node compares two images using different modes such as checkerboard, diff, or blend, and returns a difference image that highlights the variations between them.
## Input types
### Required
- **`imageA`**
    - The first image to compare. It plays a crucial role in the comparison process as one of the two images being analyzed for differences.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`imageB`**
    - The second image to compare. It is essential for the comparison process, serving as the counterpart to the first image in identifying differences.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mode`**
    - Specifies the method of comparison (checkerboard, diff, blend) to apply, influencing how the differences between the images are visualized.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after comparison, highlighting differences based on the selected mode.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_ImageCompare:
    """Compare two images and return a difference image"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "imageA": ("IMAGE",),
                "imageB": ("IMAGE",),
                "mode": (
                    ["checkerboard", "diff", "blend"],
                    {"default": "checkerboard"},
                ),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "compare"
    CATEGORY = "mtb/image"

    def compare(self, imageA: torch.Tensor, imageB: torch.Tensor, mode):
        imageA = imageA.numpy()
        imageB = imageB.numpy()

        imageA = imageA.squeeze()
        imageB = imageB.squeeze()

        image = compare_images(imageA, imageB, method=mode)

        image = np.expand_dims(image, axis=0)
        return (torch.from_numpy(image),)

```
