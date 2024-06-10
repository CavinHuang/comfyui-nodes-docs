# Custom Prompt Mode v2
## Documentation
- Class name: `SeargeCustomPromptMode`
- Category: `Searge/UI/Inputs`
- Output node: `False`

This node is designed to customize the prompting mode within a user interface, allowing for dynamic adjustments to how prompts are presented and interacted with by the user. It facilitates the integration of custom prompting strategies into the UI, enhancing user experience by tailoring prompt interactions.
## Input types
### Required
### Optional
- **`data`**
    - An optional data stream that can be provided to customize the prompting mode further. It allows for the integration of additional data into the prompting process, enhancing its flexibility and adaptability.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - Returns a data stream that includes the customized prompting settings, enabling dynamic adjustments to the UI's prompt interactions based on the provided input.
    - Python dtype: `Tuple[Dict[str, Any]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeCustomPromptMode:
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

        data[UI.S_CUSTOM_PROMPTING] = self.create_dict(
            "example",
        )

        return (data,)

```
