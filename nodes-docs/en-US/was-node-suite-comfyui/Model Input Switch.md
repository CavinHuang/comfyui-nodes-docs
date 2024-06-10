---
tags:
- ConditionalSelection
---

# Model Input Switch
## Documentation
- Class name: `Model Input Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

The WAS_Model_Input_Switch node is designed to dynamically select between two model inputs based on a boolean condition. This functionality allows for flexible control flow within a pipeline, enabling the conditional execution of model-based operations.
## Input types
### Required
- **`model_a`**
    - Represents the first model input option. This parameter plays a crucial role in determining the output based on the boolean condition.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
- **`model_b`**
    - Represents the second model input option. It serves as an alternative to the first model input, with its selection dependent on the boolean condition.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
- **`boolean`**
    - A boolean flag that determines which model input (model_a or model_b) to pass through as the output. This parameter is essential for controlling the switch behavior.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The selected model input based on the boolean condition. This output facilitates conditional model selection within a workflow.
    - Python dtype: `MODEL`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Model_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model_a": ("MODEL",),
                "model_b": ("MODEL",),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "model_switch"

    CATEGORY = "WAS Suite/Logic"

    def model_switch(self, model_a, model_b, boolean=True):

        if boolean:
            return (model_a, )
        else:
            return (model_b, )

```
