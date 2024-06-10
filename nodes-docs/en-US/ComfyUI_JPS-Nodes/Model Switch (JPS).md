---
tags:
- ConditionalSelection
---

# Model Switch (JPS)
## Documentation
- Class name: `Model Switch (JPS)`
- Category: `JPS Nodes/Switches`
- Output node: `False`

The Model Switch node is designed to dynamically select between multiple model inputs based on a specified selection criterion. It facilitates the flexible integration and switching of different models within a workflow, allowing for varied model outputs to be generated based on the selection.
## Input types
### Required
- **`select`**
    - Determines which model to select for output. The selection is based on an integer value, directing the switch to output the corresponding model.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`model_i`**
    - Represents a generic model input option. Depending on the 'select' parameter's value, one of the available model inputs (model_1 to model_5) is selected for output. This abstraction simplifies the input specification by treating all model inputs uniformly.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
## Output types
- **`model_out`**
    - Comfy dtype: `MODEL`
    - The selected model output based on the 'select' parameter. This output facilitates the dynamic integration of different models within a workflow.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Model_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("MODEL",)
    RETURN_NAMES = ("model_out",)
    FUNCTION = "get_model"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "model_1": ("MODEL",),
                "model_2": ("MODEL",),
                "model_3": ("MODEL",),
                "model_4": ("MODEL",),
                "model_5": ("MODEL",),
            }
        }

    def get_model(self,select,model_1,model_2=None,model_3=None,model_4=None,model_5=None,):
        
        model_out = model_1

        if (select == 2):
            model_out = model_2
        elif (select == 3):
            model_out  = model_3
        elif (select == 4):
            model_out = model_4
        elif (select == 5):
            model_out = model_5

        return (model_out,)

```
