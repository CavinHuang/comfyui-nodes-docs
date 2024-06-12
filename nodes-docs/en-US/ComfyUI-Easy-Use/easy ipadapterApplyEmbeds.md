---
tags:
- IPAdapter
---

# Easy Apply IPAdapter (Embeds)
## Documentation
- Class name: `easy ipadapterApplyEmbeds`
- Category: `EasyUse/Adapter`
- Output node: `False`

This node is designed for applying embedding adjustments to models using IPAdapter, facilitating the integration of specific embeddings into the model's processing pipeline. It abstracts the complexity of embedding manipulation, offering a streamlined approach to enhance model performance with tailored embeddings.
## Input types
### Required
- **`model`**
    - The model to which embeddings will be applied. It serves as the base for embedding adjustments, playing a crucial role in the node's operation.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`ipadapter`**
    - The IPAdapter instance used for embedding adjustments. It is essential for the node's functionality, enabling the precise application of embeddings.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `IPAdapterClass`
- **`pos_embed`**
    - The positive embeddings to be applied. These embeddings are crucial for adjusting the model's output in a desired direction, enhancing its performance.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `torch.Tensor`
- **`weight`**
    - Specifies the weight of the embeddings in the adjustment process, influencing the degree to which the embeddings affect the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Defines the type of weighting applied to the embeddings, affecting how they are integrated into the model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_at`**
    - The starting point in the model's layers or processing stages where the embeddings begin to be applied, determining the scope of their impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - The ending point in the model's layers or processing stages where the embeddings cease to be applied, marking the limit of their influence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`embeds_scaling`**
    - Describes how the embeddings are scaled or adjusted before being applied, impacting the final embedding integration.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`neg_embed`**
    - The negative embeddings that can be optionally applied to counterbalance or adjust the model's output in the opposite direction.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `torch.Tensor`
- **`attn_mask`**
    - An optional attention mask that can be applied during the embedding adjustment process, focusing the embedding's impact on specific parts of the input.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model after applying the embeddings. It reflects the adjustments made using the specified embeddings, showcasing the node's capability to enhance model performance.
    - Python dtype: `torch.nn.Module`
- **`ipadapter`**
    - Comfy dtype: `IPADAPTER`
    - The IPAdapter instance after embedding adjustments. It indicates the successful application of embeddings, essential for the node's functionality.
    - Python dtype: `IPAdapterClass`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ipadapterApplyEmbeds(ipadapter):
    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        ipa_cls = cls()
        weight_types = ipa_cls.weight_types
        return {
            "required": {
                "model": ("MODEL",),
                "ipadapter": ("IPADAPTER",),
                "pos_embed": ("EMBEDS",),
                "weight": ("FLOAT", {"default": 1.0, "min": -1, "max": 3, "step": 0.05}),
                "weight_type": (weight_types,),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],),
            },

            "optional": {
                "neg_embed": ("EMBEDS",),
                "attn_mask": ("MASK",),
            }
        }

    RETURN_TYPES = ("MODEL", "IPADAPTER",)
    RETURN_NAMES = ("model", "ipadapter", )
    CATEGORY = "EasyUse/Adapter"
    FUNCTION = "apply"

    def apply(self, model, ipadapter, pos_embed, weight, weight_type, start_at, end_at, embeds_scaling, attn_mask=None, neg_embed=None,):
        if "IPAdapterEmbeds" not in ALL_NODE_CLASS_MAPPINGS:
            self.error()

        cls = ALL_NODE_CLASS_MAPPINGS["IPAdapterEmbeds"]
        model, image = cls().apply_ipadapter(model, ipadapter, pos_embed, weight, weight_type, start_at, end_at, neg_embed=neg_embed, attn_mask=attn_mask, clip_vision=None, embeds_scaling=embeds_scaling)

        return (model, ipadapter)

```
