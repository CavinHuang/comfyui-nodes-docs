---
tags:
- Image
- Pipeline
---

# 🪛 Pipe to/edit any
## Documentation
- Class name: `Pipe to_edit any [Crystools]`
- Category: `crystools 🪛/Pipe`
- Output node: `False`

The 'Pipe to/edit any' node is designed to facilitate the modification or updating of a sequence of any data types. It allows for the flexible editing of inputs by replacing or retaining original values, making it a versatile tool for data manipulation and flow control within pipelines.
## Input types
### Required
### Optional
- **`CPipeAny`**
    - Represents the original sequence of data to be potentially modified. It serves as the baseline for any edits or updates applied through the node.
    - Comfy dtype: `CPipeAny`
    - Python dtype: `Tuple[Any, ...]`
- **`any_i`**
    - An optional parameter that, if provided, replaces the corresponding element of the original data sequence. The index 'i' can range from 1 to 6, allowing for targeted modifications to the sequence.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`cpipeany`**
    - Comfy dtype: `CPipeAny`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CPipeToAny:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                CLASSES.CPIPE_ANY_TYPE.value: (CLASSES.CPIPE_ANY_TYPE.value,),
                "any_1": (any,),
                "any_2": (any,),
                "any_3": (any,),
                "any_4": (any,),
                "any_5": (any,),
                "any_6": (any,),
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PIPE.value
    RETURN_TYPES = (CLASSES.CPIPE_ANY_TYPE.value,)

    FUNCTION = "execute"

    def execute(self, CPipeAny=None, any_1=None, any_2=None, any_3=None, any_4=None, any_5=None, any_6=None):
        any_1_original = None
        any_2_original = None
        any_3_original = None
        any_4_original = None
        any_5_original = None
        any_6_original = None

        if CPipeAny != None:
            any_1_original, any_2_original, any_3_original, any_4_original, any_5_original, any_6_original = CPipeAny

        CAnyPipeMod = []

        CAnyPipeMod.append(any_1 if any_1 is not None else any_1_original)
        CAnyPipeMod.append(any_2 if any_2 is not None else any_2_original)
        CAnyPipeMod.append(any_3 if any_3 is not None else any_3_original)
        CAnyPipeMod.append(any_4 if any_4 is not None else any_4_original)
        CAnyPipeMod.append(any_5 if any_5 is not None else any_5_original)
        CAnyPipeMod.append(any_6 if any_6 is not None else any_6_original)

        return (CAnyPipeMod,)

```
