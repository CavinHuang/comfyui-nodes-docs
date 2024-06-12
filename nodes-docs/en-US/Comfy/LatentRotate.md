---
tags:
- Image
- ImageTransformation
---

# Rotate Latent
## Documentation
- Class name: `LatentRotate`
- Category: `latent/transform`
- Output node: `False`

The LatentRotate node is designed to rotate latent representations of images by specified angles. It abstracts the complexity of manipulating latent space to achieve rotation effects, enabling users to easily transform images in a generative model's latent space.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the latent representations of images to be rotated. It is crucial for determining the starting point of the rotation operation.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`rotation`**
    - The 'rotation' parameter specifies the angle by which the latent images should be rotated. It directly influences the orientation of the resulting images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a modified version of the input latent representations, rotated by the specified angle.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentRotate:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT",),
                              "rotation": (["none", "90 degrees", "180 degrees", "270 degrees"],),
                              }}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "rotate"

    CATEGORY = "latent/transform"

    def rotate(self, samples, rotation):
        s = samples.copy()
        rotate_by = 0
        if rotation.startswith("90"):
            rotate_by = 1
        elif rotation.startswith("180"):
            rotate_by = 2
        elif rotation.startswith("270"):
            rotate_by = 3

        s["samples"] = torch.rot90(samples["samples"], k=rotate_by, dims=[3, 2])
        return (s,)

```
