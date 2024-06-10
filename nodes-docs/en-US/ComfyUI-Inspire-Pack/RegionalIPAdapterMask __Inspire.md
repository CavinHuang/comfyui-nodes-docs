---
tags:
- IPAdapter
- RegionalImageProcessing
---

# Regional IPAdapter Mask (Inspire)
## Documentation
- Class name: `RegionalIPAdapterMask __Inspire`
- Category: `InspirePack/Regional`
- Output node: `False`

This node specializes in applying regional image processing adaptations using masks to influence the generation process. It enables fine-tuning of image generation by adjusting the influence of specific regions within an image, enhancing the control over the visual output.
## Input types
### Required
- **`mask`**
    - The mask parameter specifies the area within the image to be influenced by the IPAdapter, allowing for targeted adjustments.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`image`**
    - The image parameter represents the target image for adaptation, serving as the canvas for regional processing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`weight`**
    - Weight determines the strength of the embedding influence within the masked region, offering a way to balance between the original and adapted aspects of the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise`**
    - Noise adds a level of randomness or texture to the adaptation process within the specified region, enhancing realism or artistic effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Weight type defines the method of applying weight across the masked region, allowing for different strategies of influence (e.g., linear, original, channel penalty).
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`start_at`**
    - Start at specifies the beginning point of the adaptation effect within the generation process, enabling phased application.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - End at defines the endpoint of the adaptation effect, allowing for precise control over the duration of influence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`unfold_batch`**
    - Unfold batch is a boolean parameter that, when enabled, allows for batch processing of multiple images, enhancing efficiency.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`faceid_v2`**
    - FaceID v2 is an optional boolean parameter that, when enabled, applies a second version of face identification technology for more precise adaptations.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`weight_v2`**
    - Weight v2 allows for an alternative weighting mechanism, offering additional control over the adaptation strength.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`combine_embeds`**
    - Combine embeds specifies the method for combining multiple embedding vectors, affecting the overall style or feature representation within the masked region.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`neg_image`**
    - Neg image allows for specifying an image that negatively influences the generation within the masked region, offering a way to subtract certain features or styles.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`regional_ipadapter`**
    - Comfy dtype: `REGIONAL_IPADAPTER`
    - The output is a conditioned model or process that has been adapted based on the specified regional parameters, ready for further image generation tasks.
    - Python dtype: `CustomType`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalIPAdapterMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),

                "image": ("IMAGE",),
                "weight": ("FLOAT", {"default": 0.7, "min": -1, "max": 3, "step": 0.05}),
                "noise": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "weight_type": (["original", "linear", "channel penalty"],),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "unfold_batch": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "faceid_v2": ("BOOLEAN", {"default": False}),
                "weight_v2": ("FLOAT", {"default": 1.0, "min": -1, "max": 3, "step": 0.05}),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average"],),
                "neg_image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("REGIONAL_IPADAPTER", )
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, mask, image, weight, noise, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False, faceid_v2=False, weight_v2=False, combine_embeds="concat", neg_image=None):
        cond = IPAdapterConditioning(mask, weight, weight_type, noise=noise, image=image, neg_image=neg_image, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch, weight_v2=weight_v2, combine_embeds=combine_embeds)
        return (cond, )

```
