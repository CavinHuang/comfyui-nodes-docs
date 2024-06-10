---
tags:
- BooleanLogic
- ConditionalSelection
---

# ImpactConditionalBranchSelMode
## Documentation
- Class name: `ImpactConditionalBranchSelMode`
- Category: `ImpactPack/Logic`
- Output node: `False`

This node provides a conditional branching mechanism with a selection mode, allowing for dynamic control flow based on boolean conditions and selection preferences. It enables conditional execution paths in a workflow, enhancing decision-making capabilities.
## Input types
### Required
- **`cond`**
    - A boolean condition that determines the branch of execution. It is pivotal in deciding which value (true or false branch) to return based on its truthiness.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`sel_mode`**
    - A boolean parameter that influences the selection mode, determining whether the selection is made on prompt or on execution. This adds an additional layer of control over the conditional branching behavior.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`tt_value`**
    - The value to return if the condition is true. This parameter is optional and allows for flexibility in defining the true branch outcome.
    - Comfy dtype: `*`
    - Python dtype: `object`
- **`ff_value`**
    - The value to return if the condition is false. This parameter is optional, providing flexibility in defining the false branch outcome.
    - Comfy dtype: `*`
    - Python dtype: `object`
## Output types
- **`*`**
    - Comfy dtype: `*`
    - The output is either the tt_value or ff_value based on the evaluation of the condition and the selection mode.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactConditionalBranchSelMode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "cond": ("BOOLEAN",),
                "sel_mode": ("BOOLEAN", {"default": True, "label_on": "select_on_prompt", "label_off": "select_on_execution"}),
            },
            "optional": {
                "tt_value": (any_typ,),
                "ff_value": (any_typ,),
            },
        }

    FUNCTION = "doit"
    CATEGORY = "ImpactPack/Logic"

    RETURN_TYPES = (any_typ, )

    def doit(self, cond, sel_mode, tt_value=None, ff_value=None):
        print(f'tt={tt_value is None}\nff={ff_value is None}')
        if cond:
            return (tt_value,)
        else:
            return (ff_value,)

```
