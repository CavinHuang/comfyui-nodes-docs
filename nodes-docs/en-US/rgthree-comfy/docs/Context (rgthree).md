---
tags:
- Conditioning
- Context
---

# Context (rgthree)
## Documentation
- Class name: `Context (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Context (rgthree) node serves as the foundational context node, designed to be highly compatible with 1.5 applications and other context nodes. It focuses on converting input context parameters into a structured output that is optimized for most use cases, maintaining both forward and backward compatibility.
## Input types
### Required
### Optional
- **`base_ctx`**
    - The base context to be converted or enhanced. It serves as the starting point for the conversion process, allowing for the integration or modification of additional context parameters.
    - Comfy dtype: `RGTHREE_CONTEXT`
    - Python dtype: `Optional[Dict[str, Any]]`
- **`model`**
    - Specifies the model to be used in the context, allowing for customization and flexibility in processing.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`clip`**
    - Defines the CLIP model to be incorporated into the context, enhancing the processing capabilities.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`vae`**
    - Indicates the VAE model to be included in the context, contributing to the generation process.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`positive`**
    - A positive conditioning factor to guide the generation towards desired outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - A negative conditioning factor to steer the generation away from undesired outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent`**
    - Specifies the latent space representation to be used in the context, enabling advanced manipulation.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`images`**
    - Defines the images to be included in the context, allowing for visual data integration.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`seed`**
    - Sets the seed for random number generation, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`CONTEXT`**
    - Comfy dtype: `RGTHREE_CONTEXT`
    - The structured output context optimized for use in various applications.
    - Python dtype: `Dict[str, Any]`
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The model used within the context, reflecting the specified input.
    - Python dtype: `str`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The CLIP model incorporated into the context, as specified in the input.
    - Python dtype: `str`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The VAE model included in the context, as per the input parameters.
    - Python dtype: `str`
- **`POSITIVE`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning factor applied in the context, guiding the generation process.
    - Python dtype: `str`
- **`NEGATIVE`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning factor used in the context to avoid undesired outcomes.
    - Python dtype: `str`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The latent space representation utilized in the context for advanced manipulation.
    - Python dtype: `str`
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The images included in the context, integrating visual data.
    - Python dtype: `str`
- **`SEED`**
    - Comfy dtype: `INT`
    - The seed used for random number generation within the context, ensuring consistency.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeContext:
  """The initial Context node.

  For now, this nodes' outputs will remain as-is, as they are perfect for most 1.5 application, but
  is also backwards compatible with other Context nodes.
  """

  NAME = get_name("Context")
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {},
      "optional": ORIG_CTX_OPTIONAL_INPUTS,
      "hidden": {
        "version": "FLOAT"
      },
    }

  RETURN_TYPES = ORIG_CTX_RETURN_TYPES
  RETURN_NAMES = ORIG_CTX_RETURN_NAMES
  FUNCTION = "convert"

  def convert(self, base_ctx=None, **kwargs):  # pylint: disable = missing-function-docstring
    ctx = new_context(base_ctx, **kwargs)
    return get_orig_context_return_tuple(ctx)

```
