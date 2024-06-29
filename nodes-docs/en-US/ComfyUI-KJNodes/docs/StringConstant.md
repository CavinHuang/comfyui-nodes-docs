---
tags:
- Constant
---

# StringConstant
## Documentation
- Class name: `StringConstant`
- Category: `KJNodes/constants`
- Output node: `False`

The StringConstant node provides a mechanism to define a constant string value within a node-based programming environment. It allows for the specification of a default string, which can be utilized as a constant input across various parts of a workflow, facilitating consistency and reusability of string values.
## Input types
### Required
- **`string`**
    - Defines the constant string value to be used throughout the node's operation. This parameter allows for the specification of a default string, ensuring consistency across different executions of the node.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Outputs the constant string value defined by the input parameter. This facilitates the use of consistent string values across different parts of a workflow.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringConstant:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": '', "multiline": False}),
            }
        }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "passtring"
    CATEGORY = "KJNodes/constants"

    def passtring(self, string):
        return (string, )

```
