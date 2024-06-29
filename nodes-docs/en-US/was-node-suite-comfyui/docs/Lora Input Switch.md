---
tags:
- ConditionalSelection
---

# Lora Input Switch
## Documentation
- Class name: `Lora Input Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

The WAS_Lora_Input_Switch node is designed to selectively switch between two sets of model and CLIP inputs based on a boolean condition. It facilitates dynamic input selection for further processing or model application.
## Input types
### Required
- **`model_a`**
    - The first model input option. This model is selected if the boolean condition is true.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
- **`clip_a`**
    - The first CLIP input option. This CLIP is selected if the boolean condition is true.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`model_b`**
    - The second model input option. This model is selected if the boolean condition is false.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
- **`clip_b`**
    - The second CLIP input option. This CLIP is selected if the boolean condition is false.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`boolean`**
    - A boolean condition that determines which set of inputs (model_a and clip_a or model_b and clip_b) is selected.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The selected model based on the boolean condition.
    - Python dtype: `object`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The selected CLIP based on the boolean condition.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Lora_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model_a": ("MODEL",),
                "clip_a": ("CLIP",),
                "model_b": ("MODEL",),
                "clip_b": ("CLIP",),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }
    RETURN_TYPES = ("MODEL", "CLIP")
    FUNCTION = "lora_input_switch"

    CATEGORY = "WAS Suite/Logic"

    def lora_input_switch(self, model_a, clip_a, model_b, clip_b, boolean=True):
        if boolean:
            return (model_a, clip_a)
        else:
            return (model_b, clip_b)

```
