---
tags:
- Conditioning
- Context
---

# Context Merge Big (rgthree)
## Documentation
- Class name: `Context Merge Big (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Context Merge Big node is designed to merge multiple context objects into a single, comprehensive context. It intelligently combines the inputs, with later contexts overriding earlier ones where overlaps occur, ensuring a seamless integration of context data.
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
    - unknown
    - Python dtype: `unknown`
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - unknown
    - Python dtype: `unknown`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - unknown
    - Python dtype: `unknown`
- **`VAE`**
    - Comfy dtype: `VAE`
    - unknown
    - Python dtype: `unknown`
- **`POSITIVE`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`NEGATIVE`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
- **`SEED`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`STEPS`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`STEP_REFINER`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`CFG`**
    - Comfy dtype: `FLOAT`
    - unknown
    - Python dtype: `unknown`
- **`CKPT_NAME`**
    - Comfy dtype: `COMBO[STRING]`
    - unknown
    - Python dtype: `unknown`
- **`SAMPLER`**
    - Comfy dtype: `COMBO[STRING]`
    - unknown
    - Python dtype: `unknown`
- **`SCHEDULER`**
    - Comfy dtype: `COMBO[STRING]`
    - unknown
    - Python dtype: `unknown`
- **`CLIP_WIDTH`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`CLIP_HEIGHT`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`TEXT_POS_G`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`TEXT_POS_L`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`TEXT_NEG_G`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`TEXT_NEG_L`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`MASK`**
    - Comfy dtype: `MASK`
    - unknown
    - Python dtype: `unknown`
- **`CONTROL_NET`**
    - Comfy dtype: `CONTROL_NET`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeContextMergeBig:
  """The Context Merge Big node."""

  NAME = get_name("Context Merge Big")
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

  RETURN_TYPES = ALL_CTX_RETURN_TYPES
  RETURN_NAMES = ALL_CTX_RETURN_NAMES
  FUNCTION = "merge"

  def merge(self, ctx_01=None, ctx_02=None, ctx_03=None, ctx_04=None, ctx_05=None):
    """Merges any non-null passed contexts; later ones overriding earlier.
    """
    ctx = merge_new_context(ctx_01, ctx_02, ctx_03, ctx_04, ctx_05)

    return get_context_return_tuple(ctx)

```
