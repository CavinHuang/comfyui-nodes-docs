---
tags:
- Flip
- Image
- ImageTransformation
---

# Flip Latent
## Documentation
- Class name: `LatentFlip`
- Category: `latent/transform`
- Output node: `False`

The LatentFlip node is designed to manipulate latent representations by flipping them either vertically or horizontally. This operation allows for the transformation of the latent space, potentially uncovering new variations or perspectives within the data.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the latent representations to be flipped. The flipping operation alters these representations, either vertically or horizontally, depending on the 'flip_method' parameter, thus transforming the data in the latent space.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`flip_method`**
    - The 'flip_method' parameter specifies the axis along which the latent samples will be flipped. It can be either 'x-axis: vertically' or 'y-axis: horizontally', determining the direction of the flip and thus the nature of the transformation applied to the latent representations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a modified version of the input latent representations, having been flipped according to the specified method. This transformation can introduce new variations within the latent space.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentFlip:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT",),
                              "flip_method": (["x-axis: vertically", "y-axis: horizontally"],),
                              }}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "flip"

    CATEGORY = "latent/transform"

    def flip(self, samples, flip_method):
        s = samples.copy()
        if flip_method.startswith("x"):
            s["samples"] = torch.flip(samples["samples"], dims=[2])
        elif flip_method.startswith("y"):
            s["samples"] = torch.flip(samples["samples"], dims=[3])

        return (s,)

```
