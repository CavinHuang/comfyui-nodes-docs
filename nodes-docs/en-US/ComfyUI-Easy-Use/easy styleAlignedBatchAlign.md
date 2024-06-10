---
tags:
- Latent
- Normalization
---

# Easy Apply StyleAlign
## Documentation
- Class name: `easy styleAlignedBatchAlign`
- Category: `EasyUse/Adapter`
- Output node: `False`

The `easy styleAlignedBatchAlign` node is designed to apply style alignment to a batch of models, adjusting their normalization and attention mechanisms based on shared parameters. This process enhances the consistency and harmony of styles across different models, facilitating more cohesive and aesthetically pleasing outputs.
## Input types
### Required
- **`model`**
    - The model parameter represents the neural network model to which style alignment will be applied. It is crucial for defining the base structure that will undergo normalization and attention adjustments.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`share_norm`**
    - This parameter specifies how normalization layers within the model should be shared or aligned, impacting the overall style consistency and coherence of the model's output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`share_attn`**
    - Determines the sharing strategy for attention mechanisms within the model, influencing how style elements are integrated and harmonized across different parts of the model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scale`**
    - Affects the intensity of style application, allowing for fine-tuning of the style's impact on the model's output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The output is a modified version of the input model, now with adjusted normalization and attention mechanisms for enhanced style alignment.
    - Python dtype: `ModelPatcher`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class styleAlignedBatchAlign:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("MODEL",),
                "share_norm": (SHARE_NORM_OPTIONS,),
                "share_attn": (SHARE_ATTN_OPTIONS,),
                "scale": ("FLOAT", {"default": 1, "min": 0, "max": 1.0, "step": 0.1}),
            }
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "align"
    CATEGORY = "EasyUse/Adapter"

    def align(self, model, share_norm, share_attn, scale):
        return (styleAlignBatch(model, share_norm, share_attn, scale),)

```
