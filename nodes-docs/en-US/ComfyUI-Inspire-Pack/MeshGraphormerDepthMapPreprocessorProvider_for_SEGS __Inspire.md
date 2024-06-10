---
tags:
- Segmentation
---

# MeshGraphormer Depth Map Preprocessor Provider (SEGS)
## Documentation
- Class name: `MeshGraphormerDepthMapPreprocessorProvider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides a specialized preprocessor for depth map generation using the MeshGraphormer framework, tailored for SEGS applications. It encapsulates the complexity of depth map preprocessing, ensuring compatibility and optimal preprocessing for SEGS-based projects.
## Input types
### Required
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - The processed output suitable for SEGS applications, ensuring that the depth map is optimized for further processing or analysis within the SEGS framework.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MeshGraphormerDepthMapPreprocessorProvider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self):
        obj = MeshGraphormerDepthMapPreprocessorProvider_wrapper()
        return (obj, )

```
