---
tags:
- IPAdapter
---

# Apply Regional IPAdapters (Inspire)
## Documentation
- Class name: `ApplyRegionalIPAdapters __Inspire`
- Category: `InspirePack/Regional`
- Output node: `False`

This node is designed to apply regional IP adapters to a model, enabling the customization and enhancement of model outputs based on regional adaptations. It facilitates the integration of various IP adapter components into a cohesive model, allowing for dynamic adjustments and improvements in model performance with respect to specific regions or aspects.
## Input types
### Required
- **`ipadapter_pipe`**
    - The pipeline of components necessary for the regional adaptation process, provided as a tuple.
    - Comfy dtype: `IPADAPTER_PIPE`
    - Python dtype: `Tuple[IPADAPTER, MODEL, CLIP_VISION, INSIGHTFACE, Callable]`
- **`regional_ipadapter1`**
    - The regional IP adapter to be applied for targeted modifications and enhancements.
    - Comfy dtype: `REGIONAL_IPADAPTER`
    - Python dtype: `REGIONAL_IPADAPTER`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with applied regional IP adapters, reflecting the customized enhancements and adaptations.
    - Python dtype: `MODEL`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ApplyRegionalIPAdapters:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "ipadapter_pipe": ("IPADAPTER_PIPE",),
                    "regional_ipadapter1": ("REGIONAL_IPADAPTER", ),
                    },
                }

    RETURN_TYPES = ("MODEL", )
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, **kwargs):
        ipadapter_pipe = kwargs['ipadapter_pipe']
        ipadapter, model, clip_vision, insightface, lora_loader = ipadapter_pipe

        del kwargs['ipadapter_pipe']

        for k, v in kwargs.items():
            ipadapter_pipe = ipadapter, model, clip_vision, insightface, lora_loader
            model = v.doit(ipadapter_pipe)

        return (model, )

```
