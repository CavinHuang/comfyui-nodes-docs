---
tags:
- IPAdapter
- RegionalImageProcessing
---

# Regional IPAdapter By Color Mask (Inspire)
## Documentation
- Class name: `RegionalIPAdapterColorMask __Inspire`
- Category: `InspirePack/Regional`
- Output node: `False`

The RegionalIPAdapterColorMask node is designed to apply regional image processing adaptations based on color masks. It enables the integration of specific image embeddings and adjustments within designated areas of an image, identified by color, to achieve localized image modification or enhancement.
## Input types
### Required
- **`color_mask`**
    - Specifies the image to which the color mask will be applied, serving as the basis for regional adaptations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask_color`**
    - Defines the color used to identify the region of interest within the image for adaptations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`image`**
    - The target image for which the adaptations are intended, providing a context for the applied effects.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`weight`**
    - Determines the intensity or influence of the applied embeddings on the specified region.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise`**
    - Specifies the level of noise to be applied in conjunction with the embeddings for the adaptation effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Specifies the method of applying weight to the embeddings, offering options like original, linear, or channel penalty for flexibility in adaptation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`start_at`**
    - Marks the beginning of the effect application within the adaptation process, allowing for phased or gradual implementations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Defines the endpoint for the effect application, enabling precise control over the extent of adaptations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`unfold_batch`**
    - A boolean flag that, when set, allows for batch processing of images, enhancing efficiency in adaptations.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`faceid_v2`**
    - An optional boolean flag to enable or disable face identification version 2 for more refined adaptations.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`weight_v2`**
    - An optional weight parameter for version 2 adaptations, providing additional control over the adaptation intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`combine_embeds`**
    - Specifies the method for combining embeddings, with options like concat, add, subtract, average, and norm average, offering versatility in effect application.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`neg_image`**
    - An optional negative image that can be used to specify undesired effects or adjustments within the region, offering a counterbalance to the primary image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`regional_ipadapter`**
    - Comfy dtype: `REGIONAL_IPADAPTER`
    - The adapted image processing settings, encapsulating the regional adaptations based on the specified color mask and embeddings.
    - Python dtype: `IPAdapterConditioning`
- **`mask`**
    - Comfy dtype: `MASK`
    - The generated mask based on the specified color, identifying the region of interest for adaptations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RegionalIPAdapterColorMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "color_mask": ("IMAGE",),
                "mask_color": ("STRING", {"multiline": False, "default": "#FFFFFF"}),
                
                "image": ("IMAGE",),
                "weight": ("FLOAT", {"default": 0.7, "min": -1, "max": 3, "step": 0.05}),
                "noise": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "weight_type": (["original", "linear", "channel penalty"], ),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "unfold_batch": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "faceid_v2": ("BOOLEAN", {"default": False }),
                "weight_v2": ("FLOAT", {"default": 1.0, "min": -1, "max": 3, "step": 0.05}),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average"],),
                "neg_image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("REGIONAL_IPADAPTER", "MASK")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, color_mask, mask_color, image, weight, noise, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False, faceid_v2=False, weight_v2=False, combine_embeds="concat", neg_image=None):
        mask = color_to_mask(color_mask, mask_color)
        cond = IPAdapterConditioning(mask, weight, weight_type, noise=noise, image=image, neg_image=neg_image, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch, weight_v2=weight_v2, combine_embeds=combine_embeds)
        return (cond, mask)

```
