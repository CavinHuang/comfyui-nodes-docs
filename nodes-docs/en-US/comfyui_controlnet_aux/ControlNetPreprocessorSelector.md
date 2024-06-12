---
tags:
- ControlNet
---

# Preprocessor Selector
## Documentation
- Class name: `ControlNetPreprocessorSelector`
- Category: `ControlNet Preprocessors`
- Output node: `False`

The ControlNetPreprocessorSelector node is designed to select a specific preprocessor for use in ControlNet operations, allowing for dynamic adaptation of preprocessing strategies based on user input.
## Input types
### Required
- **`preprocessor`**
    - Specifies the preprocessor to be selected for the operation, enabling dynamic adaptation to various preprocessing needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`preprocessor`**
    - Comfy dtype: `COMBO[STRING]`
    - Returns the selected preprocessor, facilitating its application in subsequent ControlNet operations.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ControlNetPreprocessorSelector:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "preprocessor": (PREPROCESSOR_OPTIONS,),
            }
        }

    RETURN_TYPES = (PREPROCESSOR_OPTIONS,)
    RETURN_NAMES = ("preprocessor",)
    FUNCTION = "get_preprocessor"

    CATEGORY = "ControlNet Preprocessors"

    def get_preprocessor(self, preprocessor: str):
        return (preprocessor,)

```
