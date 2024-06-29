---
tags:
- AnimateDiff
- Animation
---

# AnimateDiff Unload 🎭🅐🅓
## Documentation
- Class name: `ADE_AnimateDiffUnload`
- Category: `Animate Diff 🎭🅐🅓/extras`
- Output node: `False`

This node is designed to unload or release resources associated with the AnimateDiff model from memory, ensuring efficient resource management and freeing up memory for subsequent tasks.
## Input types
### Required
- **`model`**
    - Specifies the AnimateDiff model to be unloaded, allowing for the release of its resources from memory.
    - Comfy dtype: `MODEL`
    - Python dtype: `AnimateDiffModel`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Confirms the successful unloading of the specified AnimateDiff model, ensuring its resources are freed.
    - Python dtype: `NoneType`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnimateDiffUnload:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model": ("MODEL",)}}

    RETURN_TYPES = ("MODEL",)
    CATEGORY = "Animate Diff 🎭🅐🅓/extras"
    FUNCTION = "unload_motion_modules"

    def unload_motion_modules(self, model: ModelPatcher):
        # return model clone with ejected params
        #model = eject_params_from_model(model)
        model = get_vanilla_model_patcher(model)
        return (model.clone(),)

```
