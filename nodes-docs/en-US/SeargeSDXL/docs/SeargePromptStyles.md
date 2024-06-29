# Prompt Styles v2
## Documentation
- Class name: `SeargePromptStyles`
- Category: `Searge/UI/Inputs`
- Output node: `False`

The SeargePromptStyles node is designed to enhance and customize the styling of prompts within the ComfyUI environment. It allows for the dynamic integration of styling options into the data stream, enabling a more tailored and visually coherent user interface experience.
## Input types
### Required
### Optional
- **`data`**
    - An optional data stream that can be enhanced with prompt styling information. If provided, it is augmented with styling details; otherwise, a new styling data structure is initiated.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `Dict[str, Any] or None`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - The enhanced or newly created data stream, now containing prompt styling information, ready for further processing or display within the UI.
    - Python dtype: `Tuple[Dict[str, Any]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargePromptStyles:
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

        data[UI.S_PROMPT_STYLING] = self.create_dict(
            "example",
        )

        return (data,)

```
