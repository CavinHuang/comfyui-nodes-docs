---
tags:
- SAM
---

# SAMModelLoader (segment anything)
## Documentation
- Class name: `SAMModelLoader (segment anything)`
- Category: `segment_anything`
- Output node: `False`

The SAMModelLoader node is designed to load and prepare SAM (Segment Anything Model) models for use in image segmentation tasks. It handles the retrieval and initialization of various SAM models, ensuring they are ready for segmentation operations.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the SAM model to be loaded. This parameter is crucial for determining which specific model is retrieved and initialized for segmentation tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sam_model`**
    - Comfy dtype: `SAM_MODEL`
    - The loaded and initialized SAM model, ready for segmentation tasks.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [GroundingDinoSAMSegment (segment anything)](../../comfyui_segment_anything/Nodes/GroundingDinoSAMSegment (segment anything).md)



## Source code
```python
class SAMModelLoader:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model_name": (list_sam_model(), ),
            }
        }
    CATEGORY = "segment_anything"
    FUNCTION = "main"
    RETURN_TYPES = ("SAM_MODEL", )

    def main(self, model_name):
        sam_model = load_sam_model(model_name)
        return (sam_model, )

```
