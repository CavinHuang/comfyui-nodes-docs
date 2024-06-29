---
tags:
- SEGSPrep
- Segmentation
---

# Manga2Anime LineArt Preprocessor Provider (SEGS)
## Documentation
- Class name: `Manga2Anime_LineArt_Preprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides a preprocessor specifically tailored for converting manga line art into a style suitable for SEGS (Semantic Edge Guided Synthesis) applications, focusing on adapting manga-style illustrations for use in anime-style image generation or modification.
## Input types
### Required
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - The output is a preprocessor configured for transforming manga line art into an anime-style format, ready for further processing or generation tasks within SEGS applications.
    - Python dtype: `AnimeLineArt_Preprocessor_wrapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Manga2Anime_LineArt_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self):
        obj = Manga2Anime_LineArt_Preprocessor_wrapper()
        return (obj, )

```
