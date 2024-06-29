---
tags:
- DataClamp
---

# StyleModelClamp
## Documentation
- Class name: `StyleModelClamp`
- Category: `clamp`
- Output node: `False`

The StyleModelClamp node is designed to pass through style model data without modification, serving as a placeholder or checkpoint within a data processing pipeline. It ensures the integrity and continuity of style model information as it flows through different stages of processing.
## Input types
### Required
- **`style_model`**
    - The 'style_model' input represents the style model data to be clamped. This parameter is crucial for maintaining the flow of style model information through the node without alteration.
    - Comfy dtype: `STYLE_MODEL`
    - Python dtype: `comfy.sd.StyleModel`
## Output types
- **`style_model`**
    - Comfy dtype: `STYLE_MODEL`
    - The output is the unmodified style model data, ensuring that the integrity of the style model information is preserved as it passes through the node.
    - Python dtype: `comfy.sd.StyleModel`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StyleModelClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "style_model": ("STYLE_MODEL",),
            },
        }

    RETURN_TYPES = ("STYLE_MODEL",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, style_model):
        return (style_model,)

```
