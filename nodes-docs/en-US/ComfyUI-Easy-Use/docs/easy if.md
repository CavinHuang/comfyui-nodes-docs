---
tags:
- BooleanLogic
- ConditionalSelection
---

# If
## Documentation
- Class name: `easy if`
- Category: `EasyUse/Logic/Math`
- Output node: `False`

The 'easy if' node likely serves as a conditional logic gate within a pipeline, enabling the execution of different paths or operations based on specified conditions. This functionality is essential for creating dynamic and adaptable workflows that can respond to varying inputs or states.
## Input types
### Required
- **`any`**
    - Serves as a generic input that can be of any type, acting as the data or condition to be evaluated.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`if`**
    - Defines the condition under which a certain path or operation should be executed.
    - Comfy dtype: `*`
    - Python dtype: `bool`
- **`else`**
    - Specifies an alternative path or operation to execute if the 'if' condition is not met.
    - Comfy dtype: `*`
    - Python dtype: `bool`
## Output types
- **`?`**
    - Comfy dtype: `*`
    - The output can vary based on the evaluation of the 'if' condition, leading to different possible outcomes.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class If:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "any": (AlwaysEqualProxy("*"),),
                "if": (AlwaysEqualProxy("*"),),
                "else": (AlwaysEqualProxy("*"),),
            },
        }

    RETURN_TYPES = (AlwaysEqualProxy("*"),)
    RETURN_NAMES = ("?",)
    FUNCTION = "execute"
    CATEGORY = "EasyUse/Logic/Math"

    def execute(self, *args, **kwargs):
        return (kwargs['if'] if kwargs['any'] else kwargs['else'],)

```
