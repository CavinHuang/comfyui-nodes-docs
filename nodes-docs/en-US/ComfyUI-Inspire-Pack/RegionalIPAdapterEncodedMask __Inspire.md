---
tags:
- IPAdapter
- RegionalImageProcessing
---

# Regional IPAdapter Encoded Mask (Inspire)
## Documentation
- Class name: `RegionalIPAdapterEncodedMask __Inspire`
- Category: `InspirePack/Regional`
- Output node: `False`

This node specializes in applying encoded mask-based image processing adjustments within the InspirePack framework, leveraging regional IP adapter techniques to conditionally modify image embeddings based on specified masks and weights.
## Input types
### Required
- **`mask`**
    - The mask input specifies areas of the image to be targeted for conditional embedding adjustments, playing a crucial role in the node's operation by defining regions for focused processing.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`embeds`**
    - Embeddings that represent the desired adjustments or features to be applied to the specified regions of the image, influencing the final output based on the mask.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `torch.Tensor`
- **`weight`**
    - A float value that determines the intensity of the embedding adjustments applied to the image, allowing for fine-tuning of the effect strength.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Specifies the method of applying weights to the embeddings, offering options like original, linear, or channel penalty for diverse adjustment effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_at`**
    - Defines the starting point of the effect application in terms of image processing, enabling phased adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Sets the endpoint for the effect application, allowing for precise control over the extent of the adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`unfold_batch`**
    - A boolean flag that, when true, processes each item in a batch individually, enhancing flexibility in handling batched inputs.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`neg_embeds`**
    - Optional negative embeddings that can be used to specify features or adjustments to be avoided in the specified regions, adding an inverse effect capability.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `torch.Tensor`
## Output types
- **`regional_ipadapter`**
    - Comfy dtype: `REGIONAL_IPADAPTER`
    - Produces a conditioned version of the input based on the encoded mask and specified parameters, reflecting the targeted adjustments.
    - Python dtype: `IPAdapterConditioning`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalIPAdapterEncodedMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),

                "embeds": ("EMBEDS",),
                "weight": ("FLOAT", {"default": 0.7, "min": -1, "max": 3, "step": 0.05}),
                "weight_type": (["original", "linear", "channel penalty"],),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "unfold_batch": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "neg_embeds": ("EMBEDS",),
            }
        }

    RETURN_TYPES = ("REGIONAL_IPADAPTER", )
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, mask, embeds, weight, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False, neg_embeds=None):
        cond = IPAdapterConditioning(mask, weight, weight_type, embeds=embeds, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch, neg_embeds=neg_embeds)
        return (cond, )

```
