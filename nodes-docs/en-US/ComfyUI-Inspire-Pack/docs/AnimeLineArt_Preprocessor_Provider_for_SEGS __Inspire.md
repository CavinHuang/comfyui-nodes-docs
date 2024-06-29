---
tags:
- SEGSPrep
- Segmentation
---

# AnimeLineArt Preprocessor Provider (SEGS)
## Documentation
- Class name: `AnimeLineArt_Preprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides a preprocessor specifically tailored for anime line art within the SEGS framework, facilitating the preparation of images for further processing or analysis.
## Input types
### Required
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Returns an instance of a preprocessor designed for anime line art, ready to be used in the SEGS framework.
    - Python dtype: `AnimeLineArt_Preprocessor_wrapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnimeLineArt_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self):
        obj = AnimeLineArt_Preprocessor_wrapper()
        return (obj, )

```
