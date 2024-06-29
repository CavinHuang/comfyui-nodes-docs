---
tags:
- IPAdapter
---

# FromIPAdapterPipe (Inspire)
## Documentation
- Class name: `FromIPAdapterPipe __Inspire`
- Category: `InspirePack/Util`
- Output node: `False`

The `FromIPAdapterPipe` node is designed to decompose a previously constructed IP adapter pipeline into its constituent components. This node facilitates the retrieval of individual elements such as the IP adapter, model, and additional features like CLIP vision and InsightFace from a bundled pipeline, enabling further manipulation or analysis of these components.
## Input types
### Required
- **`ipadapter_pipe`**
    - The `ipadapter_pipe` parameter represents the bundled pipeline from which individual components are to be extracted. It is crucial for enabling the decomposition process.
    - Comfy dtype: `IPADAPTER_PIPE`
    - Python dtype: `tuple`
## Output types
- **`ipadapter`**
    - Comfy dtype: `IPADAPTER`
    - Extracts the IP adapter component from the bundled pipeline.
    - Python dtype: `object`
- **`model`**
    - Comfy dtype: `MODEL`
    - Retrieves the model component from the bundled pipeline.
    - Python dtype: `object`
- **`clip_vision`**
    - Comfy dtype: `CLIP_VISION`
    - Extracts the CLIP vision component, if present, from the bundled pipeline.
    - Python dtype: `object`
- **`insight_face`**
    - Comfy dtype: `INSIGHTFACE`
    - Retrieves the InsightFace component, if applicable, from the bundled pipeline.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromIPAdapterPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ipadapter_pipe": ("IPADAPTER_PIPE", ),
            }
        }

    RETURN_TYPES = ("IPADAPTER", "MODEL", "CLIP_VISION", "INSIGHTFACE")
    RETURN_NAMES = ("ipadapter", "model", "clip_vision", "insight_face")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, ipadapter_pipe):
        ipadapter, model, clip_vision, insightface, _ = ipadapter_pipe
        return ipadapter, model, clip_vision, insightface

```
