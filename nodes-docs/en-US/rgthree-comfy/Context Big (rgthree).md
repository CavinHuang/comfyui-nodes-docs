---
tags:
- Conditioning
- Context
---

# Context Big (rgthree)
## Documentation
- Class name: `Context Big (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Context Big node serves as a comprehensive interface for managing context within a system, offering extensive flexibility by allowing all context fields to be used as both inputs and outputs. It ensures backward compatibility with other context nodes, facilitating seamless integration and interaction across different parts of the system.
## Input types
### Required
### Optional
- **`base_ctx`**
    - Acts as the foundational context upon which additional context parameters can be layered, enabling the aggregation and modification of context data.
    - Comfy dtype: `RGTHREE_CONTEXT`
    - Python dtype: `dict or None`
- **`model`**
    - Specifies the model to be used, contributing to the customization of the context based on the model's characteristics.
    - Comfy dtype: `MODEL`
    - Python dtype: `str or None`
- **`clip`**
    - Defines the CLIP model to be incorporated into the context, allowing for the integration of CLIP's capabilities.
    - Comfy dtype: `CLIP`
    - Python dtype: `str or None`
- **`vae`**
    - Indicates the VAE model to be included, facilitating the use of VAE features within the context.
    - Comfy dtype: `VAE`
    - Python dtype: `str or None`
- **`positive`**
    - Sets positive conditioning for the context, enhancing the context's specificity towards desired outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str or None`
- **`negative`**
    - Establishes negative conditioning for the context, aiding in the exclusion of undesired elements from the outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str or None`
- **`latent`**
    - Provides latent vectors to be used, enriching the context with pre-defined latent space representations.
    - Comfy dtype: `LATENT`
    - Python dtype: `str or None`
- **`images`**
    - Includes images in the context, allowing for the incorporation of visual data.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str or None`
- **`seed`**
    - Determines the seed for random number generation, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int or None`
- **`steps`**
    - Specifies the number of steps for the operation, defining the granularity of the process.
    - Comfy dtype: `INT`
    - Python dtype: `int or None`
- **`step_refiner`**
    - Sets the step refiner value, fine-tuning the operational steps for enhanced control.
    - Comfy dtype: `INT`
    - Python dtype: `int or None`
- **`cfg`**
    - Configures the CFG scale, adjusting the influence of conditioning on the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float or None`
- **`ckpt_name`**
    - Selects the checkpoint name from available options, customizing the context based on specific model checkpoints.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str or None`
- **`sampler`**
    - Chooses the sampler to be used, tailoring the sampling process to specific requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str or None`
- **`scheduler`**
    - Picks the scheduler for the operation, optimizing the process flow according to the selected scheduling strategy.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str or None`
- **`clip_width`**
    - Sets the width for CLIP processing, adjusting the dimensions for CLIP model inputs.
    - Comfy dtype: `INT`
    - Python dtype: `int or None`
- **`clip_height`**
    - Defines the height for CLIP processing, customizing the size for CLIP model inputs.
    - Comfy dtype: `INT`
    - Python dtype: `int or None`
- **`text_pos_g`**
    - Provides global positive text conditioning, enhancing the context with global positive textual cues.
    - Comfy dtype: `STRING`
    - Python dtype: `str or None`
- **`text_pos_l`**
    - Supplies local positive text conditioning, refining the context with local positive textual cues.
    - Comfy dtype: `STRING`
    - Python dtype: `str or None`
- **`text_neg_g`**
    - Gives global negative text conditioning, improving the context by excluding global negative textual elements.
    - Comfy dtype: `STRING`
    - Python dtype: `str or None`
- **`text_neg_l`**
    - Offers local negative text conditioning, polishing the context by avoiding local negative textual aspects.
    - Comfy dtype: `STRING`
    - Python dtype: `str or None`
- **`mask`**
    - Includes a mask for selective processing, enabling targeted modifications within the context.
    - Comfy dtype: `MASK`
    - Python dtype: `str or None`
- **`control_net`**
    - Incorporates a control network, extending the context's capabilities with additional control mechanisms.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `str or None`
## Output types
- **`CONTEXT`**
    - Comfy dtype: `RGTHREE_CONTEXT`
    - Returns the comprehensive context, encapsulating all specified context fields.
    - Python dtype: `dict`
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - Provides the model context, reflecting the specified model settings.
    - Python dtype: `str`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - Delivers the CLIP model context, indicating the integration of CLIP features.
    - Python dtype: `str`
- **`VAE`**
    - Comfy dtype: `VAE`
    - Outputs the VAE model context, showcasing the inclusion of VAE characteristics.
    - Python dtype: `str`
- **`POSITIVE`**
    - Comfy dtype: `CONDITIONING`
    - Yields the positive conditioning context, highlighting the desired elements emphasized.
    - Python dtype: `str`
- **`NEGATIVE`**
    - Comfy dtype: `CONDITIONING`
    - Presents the negative conditioning context, detailing the elements to be excluded.
    - Python dtype: `str`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - Supplies the latent vector context, illustrating the latent space representations used.
    - Python dtype: `str`
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - Offers the image context, showing the visual data incorporated.
    - Python dtype: `str`
- **`SEED`**
    - Comfy dtype: `INT`
    - Returns the seed value used, ensuring the reproducibility of the context.
    - Python dtype: `int`
- **`STEPS`**
    - Comfy dtype: `INT`
    - Provides the number of steps context, defining the process granularity.
    - Python dtype: `int`
- **`STEP_REFINER`**
    - Comfy dtype: `INT`
    - Delivers the step refiner context, fine-tuning the operational steps.
    - Python dtype: `int`
- **`CFG`**
    - Comfy dtype: `FLOAT`
    - Outputs the CFG scale context, adjusting the conditioning influence.
    - Python dtype: `float`
- **`CKPT_NAME`**
    - Comfy dtype: `COMBO[STRING]`
    - Presents the checkpoint name context, customizing based on specific model checkpoints.
    - Python dtype: `str`
- **`SAMPLER`**
    - Comfy dtype: `COMBO[STRING]`
    - Supplies the sampler context, tailoring the sampling process.
    - Python dtype: `str`
- **`SCHEDULER`**
    - Comfy dtype: `COMBO[STRING]`
    - Offers the scheduler context, optimizing the process flow.
    - Python dtype: `str`
- **`CLIP_WIDTH`**
    - Comfy dtype: `INT`
    - Returns the CLIP width context, adjusting the dimensions for inputs.
    - Python dtype: `int`
- **`CLIP_HEIGHT`**
    - Comfy dtype: `INT`
    - Provides the CLIP height context, customizing the size for inputs.
    - Python dtype: `int`
- **`TEXT_POS_G`**
    - Comfy dtype: `STRING`
    - Delivers the global positive text context, enhancing with global positive cues.
    - Python dtype: `str`
- **`TEXT_POS_L`**
    - Comfy dtype: `STRING`
    - Outputs the local positive text context, refining with local positive cues.
    - Python dtype: `str`
- **`TEXT_NEG_G`**
    - Comfy dtype: `STRING`
    - Presents the global negative text context, improving by excluding global negative elements.
    - Python dtype: `str`
- **`TEXT_NEG_L`**
    - Comfy dtype: `STRING`
    - Supplies the local negative text context, polishing by avoiding local negative aspects.
    - Python dtype: `str`
- **`MASK`**
    - Comfy dtype: `MASK`
    - Offers the mask context, enabling targeted modifications.
    - Python dtype: `str`
- **`CONTROL_NET`**
    - Comfy dtype: `CONTROL_NET`
    - Returns the control network context, extending capabilities with additional control.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeBigContext:
  """The Context Big node.

  This context node will expose all context fields as inputs and outputs. It is backwards compatible
  with other context nodes and can be intertwined with them.
  """

  NAME = get_name("Context Big")
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name,missing-function-docstring
    return {
      "required": {},
      "optional": ALL_CTX_OPTIONAL_INPUTS,
      "hidden": {},
    }

  RETURN_TYPES = ALL_CTX_RETURN_TYPES
  RETURN_NAMES = ALL_CTX_RETURN_NAMES
  FUNCTION = "convert"

  def convert(self, base_ctx=None, **kwargs):  # pylint: disable = missing-function-docstring
    ctx = new_context(base_ctx, **kwargs)
    return get_context_return_tuple(ctx)

```
