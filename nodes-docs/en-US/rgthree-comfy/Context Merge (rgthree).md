---
tags:
- Conditioning
- Context
---

# Context Merge (rgthree)
## Documentation
- Class name: `Context Merge (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Context Merge node is designed to integrate multiple context inputs into a single, unified context output. It systematically merges the provided contexts, with later contexts having the ability to override the values of earlier ones, facilitating dynamic context management and updates.
## Input types
### Required
### Optional
- **`ctx_i`**
    - unknown
    - Comfy dtype: `RGTHREE_CONTEXT`
    - Python dtype: `unknown`
## Output types
- **`CONTEXT`**
    - Comfy dtype: `RGTHREE_CONTEXT`
    - The unified context output, merging inputs with later contexts potentially overriding earlier ones.
    - Python dtype: `dict`
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - Model information included in the merged context.
    - Python dtype: `dict`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - CLIP model settings included in the merged context.
    - Python dtype: `dict`
- **`VAE`**
    - Comfy dtype: `VAE`
    - VAE model settings included in the merged context.
    - Python dtype: `dict`
- **`POSITIVE`**
    - Comfy dtype: `CONDITIONING`
    - Positive conditioning information included in the merged context.
    - Python dtype: `dict`
- **`NEGATIVE`**
    - Comfy dtype: `CONDITIONING`
    - Negative conditioning information included in the merged context.
    - Python dtype: `dict`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - Latent space information included in the merged context.
    - Python dtype: `dict`
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - Image data included in the merged context.
    - Python dtype: `dict`
- **`SEED`**
    - Comfy dtype: `INT`
    - Seed for random number generation included in the merged context.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeContextMerge:
  """The Context Merge Big node."""

  NAME = get_name("Context Merge")
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {},
      "optional": {
        "ctx_01": ("RGTHREE_CONTEXT",),
        "ctx_02": ("RGTHREE_CONTEXT",),
        "ctx_03": ("RGTHREE_CONTEXT",),
        "ctx_04": ("RGTHREE_CONTEXT",),
        "ctx_05": ("RGTHREE_CONTEXT",),
      },
    }

  RETURN_TYPES = ORIG_CTX_RETURN_TYPES
  RETURN_NAMES = ORIG_CTX_RETURN_NAMES
  FUNCTION = "merge"

  def merge(self, ctx_01=None, ctx_02=None, ctx_03=None, ctx_04=None, ctx_05=None):
    """Merges any non-null passed contexts; later ones overriding earlier.
    """
    ctx = merge_new_context(ctx_01, ctx_02, ctx_03, ctx_04, ctx_05)

    return get_orig_context_return_tuple(ctx)

```
