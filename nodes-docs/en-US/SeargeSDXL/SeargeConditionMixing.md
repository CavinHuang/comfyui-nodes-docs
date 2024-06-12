---
tags:
- Searge
---

# Condition Mixing v2
## Documentation
- Class name: `SeargeConditionMixing`
- Category: `Searge/UI/Inputs`
- Output node: `False`

This node is designed to integrate condition mixing functionality into the UI, allowing for the dynamic creation and manipulation of UI elements based on specified conditions. It primarily serves to enrich the user interface by enabling the customization of UI components through condition-based logic.
## Input types
### Required
### Optional
- **`data`**
    - An optional data stream that can be provided to the node. If supplied, it is used to further customize the UI elements based on the existing conditions within the data stream.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - Returns a data stream that includes the condition mixing settings, enhancing the UI's dynamic response to user interactions or predefined conditions.
    - Python dtype: `Tuple[Dict[str, Any]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeConditionMixing:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                # "example": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.05},),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM",)
    RETURN_NAMES = ("data",)
    FUNCTION = "get"

    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(example):
        return {
            UI.EXAMPLE: example,
        }

    def get(self, data=None):
        if data is None:
            data = {}

        data[UI.S_CONDITION_MIXING] = self.create_dict(
            "example",
        )

        return (data,)

```
