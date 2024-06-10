---
tags:
- String
- Text
---

# Show String (klinter)
## Documentation
- Class name: `PresentString`
- Category: `klinter`
- Output node: `True`

The PresentString node is designed to display a given string within a user interface context, effectively parsing and presenting the input text as is.
## Input types
### Required
- **`text`**
    - The 'text' parameter is the primary input for the PresentString node, requiring a string to be displayed. Its role is crucial as it directly influences the content that will be presented to the user.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - The 'ui' output parameter contains the user interface representation of the input text, allowing for direct visualization of the provided string.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PresentString:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "PresentString"
    OUTPUT_NODE = True

    CATEGORY = "klinter"

    def PresentString(self, text):
        # Parse the string
        return {"ui": {"text": text}, "result": (text,)}

```
