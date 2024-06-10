---
tags:
- Latent
---

# DummyLatentOut
## Documentation
- Class name: `DummyLatentOut`
- Category: `KJNodes/misc`
- Output node: `True`

Provides a simple pass-through for latent data, facilitating the visualization of workflow outputs in the UI without necessitating data persistence.
## Input types
### Required
- **`latent`**
    - Acts as a direct pass-through for the latent data, enabling the visualization of outputs without saving them.
    - Comfy dtype: `LATENT`
    - Python dtype: `tuple`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - Echoes the input latent data, allowing for seamless integration into workflows that require visualization without data storage.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DummyLatentOut:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            "latent": ("LATENT",),
            }
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "dummy"
    CATEGORY = "KJNodes/misc"
    OUTPUT_NODE = True
    DESCRIPTION = """
Does nothing, used to trigger generic workflow output.    
A way to get previews in the UI without saving anything to disk.
"""

    def dummy(self, latent):
        return (latent,)

```
