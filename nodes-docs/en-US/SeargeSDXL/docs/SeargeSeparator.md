---
tags:
- Searge
---

# Separator
## Documentation
- Class name: `SeargeSeparator`
- Category: `Searge/UI`
- Output node: `False`

SeargeSeparator is designed to serve as a UI element within the ComfyUI framework, specifically tailored for SDXL custom nodes. Its primary function is to act as a visual and functional separator in the user interface, helping to organize and delineate different sections or functionalities without performing any processing or data manipulation.
## Input types
### Required
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeSeparator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            },
        }

    RETURN_TYPES = ()
    RETURN_NAMES = ()
    FUNCTION = "do_nothing"

    CATEGORY = UI.CATEGORY_UI

    def do_nothing(self):
        return ()

```
