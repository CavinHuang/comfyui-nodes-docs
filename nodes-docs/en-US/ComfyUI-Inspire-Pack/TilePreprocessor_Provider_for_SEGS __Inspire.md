---
tags:
- SEGSPrep
- Segmentation
---

# Tile Preprocessor Provider (SEGS)
## Documentation
- Class name: `TilePreprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides a preprocessing service for SEGS (Semantic Edge Guided Synthesis) by applying a tile preprocessing technique. It is designed to enhance the input data for better performance in SEGS applications by adjusting the resolution through pyramid upscaling.
## Input types
### Required
- **`pyrUp_iters`**
    - Specifies the number of iterations for pyramid upscaling, affecting the final resolution of the processed image. A higher number of iterations results in a finer resolution, which can improve the quality of SEGS outputs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Returns a preprocessed object ready for SEGS processing, encapsulating the adjustments made during the tile preprocessing phase.
    - Python dtype: `TilePreprocessor_wrapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TilePreprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {'pyrUp_iters': ("INT", {"default": 3, "min": 1, "max": 10, "step": 1})}}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, pyrUp_iters):
        obj = TilePreprocessor_wrapper(pyrUp_iters)
        return (obj, )

```
