---
tags:
- Face
---

# Load Instance Fusers Model
## Documentation
- Class name: `LoadInstanceFusersNode`
- Category: `instance/loaders`
- Output node: `False`

This node is designed to load and prepare instance fusers models from a specified directory, adjusting their scale according to the provided parameter. It facilitates the dynamic integration of fusers models into the instance diffusion process, enabling enhanced control over the fusion of instance-specific features.
## Input types
### Required
- **`model_filename`**
    - Specifies the filename of the model to be loaded. This parameter is crucial for identifying and retrieving the correct fuser model from the designated directory.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`fusers_scale`**
    - Determines the scale factor to be applied to the fusers, affecting their influence on the instance fusion process. This allows for fine-tuning the impact of fusers on the generated instances.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`fusers`**
    - Comfy dtype: `FUSERS`
    - Provides a list of loaded and scaled fuser models, ready for integration into the instance diffusion process.
    - Python dtype: `Dict[str, List[torch.nn.Module]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadInstanceFusersNode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model_filename": (get_model_list(constants.INSTANCE_FUSERS_DIR),),
            "fusers_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
        }}

    RETURN_TYPES = ("FUSERS",)
    FUNCTION = "load_model"

    CATEGORY = "instance/loaders"

    def load_model(self, model_filename: str, fusers_scale: float):
        checkpoint = load_checkpoint(
            constants.INSTANCE_FUSERS_DIR, model_filename)
        fusers_list = prepare_fusers(checkpoint, fusers_scale)
        fusers = {
            'model_list': fusers_list
        }
        return (fusers,)

```
