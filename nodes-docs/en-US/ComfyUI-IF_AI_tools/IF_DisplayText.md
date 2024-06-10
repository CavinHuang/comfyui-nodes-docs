---
tags:
- Text
---

# IF Display Text📟
## Documentation
- Class name: `IF_DisplayText`
- Category: `ImpactFrames💥🎞️`
- Output node: `True`

The IF_DisplayText node is designed for displaying text outputs within the ImpactFrames environment, providing a simple interface for visualizing text data.
## Input types
### Required
- **`text`**
    - The 'text' parameter is the primary input for the IF_DisplayText node, serving as the text content to be displayed. Its presence is crucial for the node's operation, dictating the textual output that will be visualized.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - The 'ui' output parameter encapsulates the displayed text in a user interface format, allowing for direct visualization within the ImpactFrames environment.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IFDisplayText:
    def __init__(self):
        self.type = "output"

    @classmethod
    def INPUT_TYPES(cls):

        return {
            "required": {        
                "text": ("STRING", {"forceInput": True}),     
                },
            "hidden": {},
            }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "display_text"
    OUTPUT_NODE = True
    CATEGORY = "ImpactFrames💥🎞️"
    
    def display_text(self, text):
        print("==================")
        print("IF_AI_tool_output:")
        print("==================")
        print(text)
        return {"ui": {"string": [text,]}, "result": (text,)}

```
