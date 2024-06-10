---
tags:
- BooleanLogic
- ConditionalSelection
---

# If
## Documentation
- Class name: `If ANY execute A else B`
- Category: `Logic`
- Output node: `False`

This node conditionally executes one of two possible outputs based on a boolean input. It serves as a logical branch, allowing for dynamic flow control within a node-based execution environment.
## Input types
### Required
- **`ANY`**
    - A boolean input that determines which of the two possible outputs to execute. Its value dictates the flow of execution, enabling conditional logic within the node's operation.
    - Comfy dtype: `*`
    - Python dtype: `bool`
- **`IF_TRUE`**
    - The output to be executed if the ANY input is True. This parameter represents the action taken when the condition is met.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`IF_FALSE`**
    - The output to be executed if the ANY input is False. This parameter represents the alternative action taken when the condition is not met.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`?`**
    - Comfy dtype: `*`
    - The result of executing either IF_TRUE or IF_FALSE, depending on the evaluation of ANY. The exact nature of this output is dynamic, reflecting the conditional execution logic of the node.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IfExecute:
    """
    This node executes IF_TRUE if ANY is True, otherwise it executes IF_FALSE.

    ANY can be any input, IF_TRUE and IF_FALSE can be any output.
    """

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ANY": (AlwaysEqualProxy("*"),),
                "IF_TRUE": (AlwaysEqualProxy("*"),),
                "IF_FALSE": (AlwaysEqualProxy("*"),),
            },
        }

    RETURN_TYPES = (AlwaysEqualProxy("*"),)

    RETURN_NAMES = "?"

    FUNCTION = "return_based_on_bool"

    CATEGORY = "Logic"

    def return_based_on_bool(self, ANY, IF_TRUE, IF_FALSE):
        return (IF_TRUE if ANY else IF_FALSE,)

```
