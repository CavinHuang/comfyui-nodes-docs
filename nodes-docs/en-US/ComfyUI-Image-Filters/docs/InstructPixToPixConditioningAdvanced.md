---
tags:
- Conditioning
---

# InstructPixToPixConditioningAdvanced
## Documentation
- Class name: `InstructPixToPixConditioningAdvanced`
- Category: `conditioning/instructpix2pix`
- Output node: `False`

This node is designed for advanced conditioning in the context of Pix2Pix image translation tasks. It takes in positive and negative conditioning inputs, along with new and original latent representations, to produce modified conditioning and latent outputs. The node aims to facilitate complex image manipulation tasks by allowing for the integration of additional latent information into the conditioning process.
## Input types
### Required
- **`positive`**
    - Represents the positive conditioning input, which is used to guide the image translation process in a desired direction.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Tuple[CONDITIONING]`
- **`negative`**
    - Represents the negative conditioning input, which is used to guide the image translation away from undesired characteristics.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Tuple[CONDITIONING]`
- **`new`**
    - Represents the new latent representation to be integrated into the conditioning process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict with key 'samples' and value as a tensor`
- **`original`**
    - Represents the original latent representation that is compared with the new one for shape consistency and integrated into the conditioning.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict with key 'samples' and value as a tensor`
## Output types
- **`cond1`**
    - Comfy dtype: `CONDITIONING`
    - Modified positive conditioning output.
    - Python dtype: `CONDITIONING`
- **`cond2`**
    - Comfy dtype: `CONDITIONING`
    - Modified negative conditioning output.
    - Python dtype: `CONDITIONING`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Unmodified negative conditioning input, passed through for consistency.
    - Python dtype: `CONDITIONING`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The new latent representation with samples integrated into the conditioning outputs.
    - Python dtype: `Dict with key 'samples' and value as a tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstructPixToPixConditioningAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"positive": ("CONDITIONING", ),
                             "negative": ("CONDITIONING", ),
                             "new": ("LATENT", ),
                             "original": ("LATENT", ),
                             }}

    RETURN_TYPES = ("CONDITIONING","CONDITIONING","CONDITIONING","LATENT")
    RETURN_NAMES = ("cond1", "cond2", "negative", "latent")
    FUNCTION = "encode"

    CATEGORY = "conditioning/instructpix2pix"

    def encode(self, positive, negative, new, original):
        new_shape, orig_shape = new["samples"].shape, original["samples"].shape
        if new_shape != orig_shape:
            raise Exception(f"Latent shape mismatch: {new_shape} and {orig_shape}")
        
        out_latent = {}
        out_latent["samples"] = new["samples"]
        out = []
        for conditioning in [positive, negative]:
            c = []
            for t in conditioning:
                d = t[1].copy()
                d["concat_latent_image"] = original["samples"]
                n = [t[0], d]
                c.append(n)
            out.append(c)
        return (out[0], out[1], negative, out_latent)

```
