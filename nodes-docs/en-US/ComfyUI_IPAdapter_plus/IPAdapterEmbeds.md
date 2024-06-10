---
tags:
- IPAdapter
---

# IPAdapter Embeds
## Documentation
- Class name: `IPAdapterEmbeds`
- Category: `ipadapter/embeds`
- Output node: `False`

The IPAdapterEmbeds node is designed to handle embedding operations within the IPAdapter framework, focusing on the manipulation and processing of embeddings to enhance or modify the input data for further use in image processing or generation tasks.
## Input types
### Required
- **`model`**
    - The 'model' parameter specifies the model to be used in conjunction with the IPAdapter, playing a pivotal role in how embeddings are applied or generated.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`ipadapter`**
    - The 'ipadapter' parameter indicates the specific IPAdapter instance to be used, crucial for determining the embedding manipulation or application strategy.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `IPAdapterInstance`
- **`pos_embed`**
    - The 'pos_embed' parameter represents the positive embeddings to be processed, serving as a key input for operations aiming to enhance or modify image generation.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `torch.Tensor`
- **`weight`**
    - The 'weight' parameter allows for the adjustment of the influence of embeddings on the output, offering a means to fine-tune the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - The 'weight_type' parameter specifies the method of weighting to be applied to embeddings, affecting the overall impact on the generated output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `WeightType`
- **`start_at`**
    - The 'start_at' parameter defines the starting point for embedding application, enabling precise control over the integration of embeddings into the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - The 'end_at' parameter determines the endpoint for embedding application, allowing for targeted modifications to the generated output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`embeds_scaling`**
    - The 'embeds_scaling' parameter outlines the scaling strategy for embeddings, influencing how embeddings are adjusted and applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `EmbedsScalingType`
### Optional
- **`neg_embed`**
    - The 'neg_embed' parameter represents the negative embeddings, providing a means to incorporate contrasting elements into the generation process.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `torch.Tensor`
- **`attn_mask`**
    - The 'attn_mask' parameter allows for the specification of an attention mask, offering additional control over the focus of embedding application.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`clip_vision`**
    - The 'clip_vision' parameter indicates whether CLIP vision embeddings are to be used, potentially enhancing the relevance of generated outputs to textual descriptions.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `CLIPVisionInstance`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The output 'model' represents the modified or enhanced model after embedding operations, ready for further use in image generation tasks.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterEmbeds:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL", ),
                "ipadapter": ("IPADAPTER", ),
                "pos_embed": ("EMBEDS",),
                "weight": ("FLOAT", { "default": 1.0, "min": -1, "max": 3, "step": 0.05 }),
                "weight_type": (WEIGHT_TYPES, ),
                "start_at": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "end_at": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'], ),
            },
            "optional": {
                "neg_embed": ("EMBEDS",),
                "attn_mask": ("MASK",),
                "clip_vision": ("CLIP_VISION",),
            }
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "apply_ipadapter"
    CATEGORY = "ipadapter/embeds"

    def apply_ipadapter(self, model, ipadapter, pos_embed, weight, weight_type, start_at, end_at, neg_embed=None, attn_mask=None, clip_vision=None, embeds_scaling='V only'):
        ipa_args = {
            "pos_embed": pos_embed,
            "neg_embed": neg_embed,
            "weight": weight,
            "weight_type": weight_type,
            "start_at": start_at,
            "end_at": end_at,
            "attn_mask": attn_mask,
            "embeds_scaling": embeds_scaling,
        }

        if 'ipadapter' in ipadapter:
            ipadapter_model = ipadapter['ipadapter']['model']
            clip_vision = clip_vision if clip_vision is not None else ipadapter['clipvision']['model']
        else:
            ipadapter_model = ipadapter
            clip_vision = clip_vision

        if clip_vision is None and neg_embed is None:
            raise Exception("Missing CLIPVision model.")

        del ipadapter

        return ipadapter_execute(model.clone(), ipadapter_model, clip_vision, **ipa_args)

```
