---
tags:
- SEGSPrep
- Segmentation
---

# Fake Scribble Preprocessor Provider (SEGS)
## Documentation
- Class name: `FakeScribblePreprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides a preprocessing step for SEGS (semantic segmentation models) by applying a fake scribble effect. It's designed to prepare images for further processing by enhancing or modifying their features to better suit the requirements of SEGS models.
## Input types
### Required
- **`safe`**
    - Determines whether the preprocessing should be performed in a 'safe' mode, affecting the execution and results by potentially altering the processing intensity or methods used.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Outputs a preprocessed object ready for use with SEGS models, specifically tailored with a fake scribble effect.
    - Python dtype: `HED_Preprocessor_wrapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FakeScribblePreprocessor_Provider_for_SEGS(HEDPreprocessor_Provider_for_SEGS):
    def doit(self, safe):
        obj = HED_Preprocessor_wrapper(safe, "FakeScribblePreprocessor")
        return (obj, )

```
