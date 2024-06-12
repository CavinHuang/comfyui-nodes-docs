---
tags:
- Loader
- ModelIO
- ModelLoader
---

# GroundingDinoModelLoader (segment anything)
## Documentation
- Class name: `GroundingDinoModelLoader (segment anything)`
- Category: `segment_anything`
- Output node: `False`

This node is designed to load a specific GroundingDINO model based on the provided model name. It facilitates the utilization of GroundingDINO models for segmentation tasks by preparing the model for inference.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the GroundingDINO model to be loaded. This parameter is crucial as it determines which model will be prepared for the segmentation task.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`grounding_dino_model`**
    - Comfy dtype: `GROUNDING_DINO_MODEL`
    - The loaded GroundingDINO model, ready for performing segmentation tasks.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [GroundingDinoSAMSegment (segment anything)](../../comfyui_segment_anything/Nodes/GroundingDinoSAMSegment (segment anything).md)



## Source code
```python
class GroundingDinoModelLoader:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model_name": (list_groundingdino_model(), ),
            }
        }
    CATEGORY = "segment_anything"
    FUNCTION = "main"
    RETURN_TYPES = ("GROUNDING_DINO_MODEL", )

    def main(self, model_name):
        dino_model = load_groundingdino_model(model_name)
        return (dino_model, )

```
