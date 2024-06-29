---
tags:
- ComfyrollNodes
- Index
---

# 🔢 CR Trigger
## Documentation
- Class name: `CR Trigger`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔢 Index`
- Output node: `False`

The CR Trigger node is designed to compare an input index against a specified trigger value, returning the index, a boolean indicating if the index matches the trigger value, and a URL for help documentation. This functionality is useful for conditional logic and flow control within node-based processing pipelines.
## Input types
### Required
- **`index`**
    - The index to compare against the trigger value. It determines the flow of execution based on its comparison with the trigger value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`trigger_value`**
    - The value against which the index is compared. This comparison dictates whether certain actions are triggered based on the match.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`index`**
    - Comfy dtype: `INT`
    - The original index value passed into the node.
    - Python dtype: `int`
- **`trigger`**
    - Comfy dtype: `BOOLEAN`
    - A boolean indicating whether the index matches the trigger value.
    - Python dtype: `bool`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for the CR Trigger node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_Trigger: 

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"index": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "trigger_value": ("INT", {"default": 1, "min": 0, "max": 10000}),        
                },
        }

    RETURN_TYPES = ("INT", "BOOLEAN", "STRING", )
    RETURN_NAMES = ("index", "trigger", "show_help", )
    FUNCTION = "trigger"
    CATEGORY = icons.get("Comfyroll/Utils/Index")

    def trigger(self, index, trigger_value):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Index-Nodes#cr-trigger"
        return (index, index == trigger_value, show_help, )

```
