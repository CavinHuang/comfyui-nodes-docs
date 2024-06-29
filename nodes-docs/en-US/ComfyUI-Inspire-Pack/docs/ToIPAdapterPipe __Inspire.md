---
tags:
- IPAdapter
---

# ToIPAdapterPipe (Inspire)
## Documentation
- Class name: `ToIPAdapterPipe __Inspire`
- Category: `InspirePack/Util`
- Output node: `False`

The ToIPAdapterPipe node is designed to create a pipeline that integrates various components such as IP adapters, models, and optional vision and face recognition enhancements into a unified processing flow. This setup facilitates the adaptation and enhancement of input data or models for further processing or analysis.
## Input types
### Required
- **`ipadapter`**
    - The 'ipadapter' parameter is crucial for specifying the IP adapter component to be used in the pipeline, serving as the foundational element for data or model adaptation.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `tuple(IPADAPTER)`
- **`model`**
    - The 'model' parameter identifies the specific model to be integrated into the pipeline, enabling tailored processing or analysis.
    - Comfy dtype: `MODEL`
    - Python dtype: `tuple(MODEL)`
### Optional
- **`clip_vision`**
    - The 'clip_vision' parameter optionally adds vision processing capabilities to the pipeline, enhancing the model's understanding or interpretation of visual data.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `tuple(CLIP_VISION)`
- **`insightface`**
    - The 'insightface' parameter optionally incorporates face recognition technology into the pipeline, further enriching the model's analytical capabilities.
    - Comfy dtype: `INSIGHTFACE`
    - Python dtype: `tuple(INSIGHTFACE)`
## Output types
- **`ipadapter_pipe`**
    - Comfy dtype: `IPADAPTER_PIPE`
    - This output represents the assembled pipeline, encapsulating the specified IP adapter, model, and any optional enhancements for vision and face recognition.
    - Python dtype: `tuple(IPADAPTER, MODEL, CLIP_VISION, INSIGHTFACE, function)`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToIPAdapterPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ipadapter": ("IPADAPTER", ),
                "model": ("MODEL",),
            },
            "optional": {
                "clip_vision": ("CLIP_VISION",),
                "insightface": ("INSIGHTFACE",),
            }
        }

    RETURN_TYPES = ("IPADAPTER_PIPE",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, ipadapter, model, clip_vision, insightface=None):
        pipe = ipadapter, model, clip_vision, insightface, lambda x: x

        return (pipe,)

```
