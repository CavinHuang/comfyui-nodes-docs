---
tags:
- Image
- Pipeline
---

# 🪛 Pipe from any
## Documentation
- Class name: `Pipe from any [Crystools]`
- Category: `crystools 🪛/Pipe`
- Output node: `False`

This node is designed to facilitate the flow of data from a generic input to a specified output, allowing for the dynamic handling and transformation of various data types. It abstracts the complexity of data manipulation, providing a streamlined interface for data piping operations.
## Input types
### Required
- **`CPipeAny`**
    - This parameter represents a generic input that can be of any type. It is crucial for the node's operation as it serves as the source from which data is extracted and subsequently transformed or passed through.
    - Comfy dtype: `CPipeAny`
    - Python dtype: `tuple`
### Optional
## Output types
- **`CPipeAny`**
    - Comfy dtype: `CPipeAny`
    - This output represents the original input data, unaltered, serving as a pass-through for further processing.
    - Python dtype: `tuple`
- **`any_1`**
    - Comfy dtype: `*`
    - This output represents the first element of the input tuple, potentially transformed or directly passed through.
    - Python dtype: `object`
- **`any_2`**
    - Comfy dtype: `*`
    - This output represents the second element of the input tuple, potentially transformed or directly passed through.
    - Python dtype: `object`
- **`any_3`**
    - Comfy dtype: `*`
    - This output represents the third element of the input tuple, potentially transformed or directly passed through.
    - Python dtype: `object`
- **`any_4`**
    - Comfy dtype: `*`
    - This output represents the fourth element of the input tuple, potentially transformed or directly passed through.
    - Python dtype: `object`
- **`any_5`**
    - Comfy dtype: `*`
    - This output represents the fifth element of the input tuple, potentially transformed or directly passed through.
    - Python dtype: `object`
- **`any_6`**
    - Comfy dtype: `*`
    - This output represents the sixth element of the input tuple, potentially transformed or directly passed through.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CPipeFromAny:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                CLASSES.CPIPE_ANY_TYPE.value: (CLASSES.CPIPE_ANY_TYPE.value,),
            },
            "optional": {
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PIPE.value
    RETURN_TYPES = (CLASSES.CPIPE_ANY_TYPE.value, any, any, any, any, any, any,)
    RETURN_NAMES = (CLASSES.CPIPE_ANY_TYPE.value, "any_1", "any_2", "any_3", "any_4", "any_5", "any_6",)

    FUNCTION = "execute"

    def execute(self, CPipeAny=None, ):
        any_1, any_2, any_3, any_4, any_5, any_6 = CPipeAny
        return CPipeAny, any_1, any_2, any_3, any_4, any_5, any_6

```
