---
tags:
- Conditioning
- Context
---

# Context Switch (rgthree)
## Documentation
- Class name: `Context Switch (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Context Switch (rgthree) node is designed to streamline context management by selecting the first non-empty context from a set of provided contexts. This functionality ensures efficient determination of an active context for subsequent operations, facilitating smoother transitions and management within various processing flows.
## Input types
### Required
### Optional
- **`ctx_i`**
    - Serves as a generic placeholder for any of the contexts provided to the node. The node evaluates each context in sequence until it finds the first non-empty one, which is then selected for output. This approach allows for flexible and dynamic context switching based on the availability of content within the contexts.
    - Comfy dtype: `RGTHREE_CONTEXT`
    - Python dtype: `dict`
## Output types
- **`CONTEXT`**
    - Comfy dtype: `RGTHREE_CONTEXT`
    - The comprehensive context output, encompassing various aspects like model configuration, image processing parameters, and conditioning information, among others, based on the first non-empty context found.
    - Python dtype: `dict`
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - Outputs model-related context information.
    - Python dtype: `str`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - Outputs CLIP model configuration context.
    - Python dtype: `str`
- **`VAE`**
    - Comfy dtype: `VAE`
    - Outputs VAE model configuration context.
    - Python dtype: `str`
- **`POSITIVE`**
    - Comfy dtype: `CONDITIONING`
    - Outputs positive conditioning context.
    - Python dtype: `str`
- **`NEGATIVE`**
    - Comfy dtype: `CONDITIONING`
    - Outputs negative conditioning context.
    - Python dtype: `str`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - Outputs latent space configuration context.
    - Python dtype: `str`
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - Outputs image processing context.
    - Python dtype: `str`
- **`SEED`**
    - Comfy dtype: `INT`
    - Outputs seed value for random number generation context.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeContextSwitch:
  """The initial Context Switch node.

  For now, this will remain as-is but is otherwise backwards compatible with other Context nodes
  outputs.
  """

  NAME = get_name("Context Switch")
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
  FUNCTION = "switch"

  def switch(self, ctx_01=None, ctx_02=None, ctx_03=None, ctx_04=None, ctx_05=None):
    """Chooses the first non-empty Context to output.

    As of right now, this returns the "original" context. We could expand it, or create another
    "Context Big Switch" and have all the outputs...
    """
    ctx = None
    if not is_context_empty(ctx_01):
      ctx = ctx_01
    elif not is_context_empty(ctx_02):
      ctx = ctx_02
    elif not is_context_empty(ctx_03):
      ctx = ctx_03
    elif not is_context_empty(ctx_04):
      ctx = ctx_04
    elif not is_context_empty(ctx_05):
      ctx = ctx_05
    return get_orig_context_return_tuple(ctx)

```
