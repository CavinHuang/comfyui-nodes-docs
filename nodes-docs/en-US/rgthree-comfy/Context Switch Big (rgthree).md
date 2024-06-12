---
tags:
- Conditioning
- Context
---

# Context Switch Big (rgthree)
## Documentation
- Class name: `Context Switch Big (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Context Switch Big node is designed to manage multiple context inputs, selecting the first non-empty context to output. This functionality allows for dynamic context switching within workflows, ensuring that a valid context is always passed forward.
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
- **`ui`**
    - The output of the node, which is a selected non-empty context from the given inputs. This output is crucial for passing a valid context to subsequent nodes in a workflow.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeContextSwitchBig:
  """The Context Switch Big node."""

  NAME = get_name("Context Switch Big")
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
  FUNCTION = "switch"

  def switch(self, ctx_01=None, ctx_02=None, ctx_03=None, ctx_04=None, ctx_05=None):
    """Chooses the first non-empty Context to output.
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
    return get_context_return_tuple(ctx)

```
