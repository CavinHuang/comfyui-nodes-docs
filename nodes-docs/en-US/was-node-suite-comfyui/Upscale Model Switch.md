---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Upscale Model Switch
## Documentation
- Class name: `Upscale Model Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

This node facilitates the dynamic selection between two upscale models based on a boolean condition, enabling the choice of an appropriate model for image upscaling within a workflow. It exemplifies conditional logic in model selection, optimizing the upscaling process for varying requirements.
## Input types
### Required
- **`upscale_model_a`**
    - Specifies the first upscale model option for enhancing image resolution, playing a pivotal role in the conditional selection process.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `torch.nn.Module`
- **`upscale_model_b`**
    - Defines the second upscale model option, offering an alternative for conditional selection based on the boolean input, thus affecting the upscaling outcome.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `torch.nn.Module`
- **`boolean`**
    - A boolean condition that determines which upscale model (A or B) is selected for the upscaling process, directly influencing the node's execution path and the quality of the output image.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`upscale_model`**
    - Comfy dtype: `UPSCALE_MODEL`
    - The selected upscale model based on the boolean condition, ready for use in the image upscaling process.
    - Python dtype: `torch.nn.Module`
- **`ui`**
    - A user interface component that may reflect the result of the upscale model switch, showcasing the enhanced images or relevant information.
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Upscale_Model_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "upscale_model_a": ("UPSCALE_MODEL",),
                "upscale_model_b": ("UPSCALE_MODEL",),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("UPSCALE_MODEL",)
    FUNCTION = "upscale_model_switch"

    CATEGORY = "WAS Suite/Logic"

    def upscale_model_switch(self, upscale_model_a, upscale_model_b, boolean=True):

        if boolean:
            return (upscale_model_a, )
        else:
            return (upscale_model_b, )

```
