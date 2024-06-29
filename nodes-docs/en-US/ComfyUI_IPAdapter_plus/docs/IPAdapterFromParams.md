---
tags:
- IPAdapter
---

# IPAdapter from Params
## Documentation
- Class name: `IPAdapterFromParams`
- Category: `ipadapter/params`
- Output node: `False`

The IPAdapterFromParams node is designed to dynamically configure and apply image processing adapters based on a set of parameters. It allows for the customization of image processing techniques by combining various embedding strategies and scaling methods, facilitating advanced image manipulation and enhancement.
## Input types
### Required
- **`model`**
    - Specifies the model to which the image processing adapter will be applied, serving as the foundation for the adaptation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`ipadapter`**
    - Identifies the specific image processing adapter to be used, dictating the core processing technique.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
- **`ipadapter_params`**
    - Contains parameters that fine-tune the image processing adapter's behavior, offering detailed control over the adaptation process.
    - Comfy dtype: `IPADAPTER_PARAMS`
    - Python dtype: `dict`
- **`combine_embeds`**
    - Determines how multiple embeddings are combined, affecting the final image output through various strategies like concatenation or averaging.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`embeds_scaling`**
    - Controls the scaling of embeddings, influencing the adaptation's impact on the image based on selected methods.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`image_negative`**
    - Optionally provides a negative image input, used to inversely influence the adaptation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`clip_vision`**
    - Optionally integrates CLIP vision embeddings, enhancing the adaptation with semantic understanding from textual descriptions.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Outputs the adapted model, reflecting the applied image processing techniques and parameter adjustments.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterFromParams(IPAdapterAdvanced):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL", ),
                "ipadapter": ("IPADAPTER", ),
                "ipadapter_params": ("IPADAPTER_PARAMS", ),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average"],),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'], ),
            },
            "optional": {
                "image_negative": ("IMAGE",),
                "clip_vision": ("CLIP_VISION",),
            }
        }

    CATEGORY = "ipadapter/params"

```
