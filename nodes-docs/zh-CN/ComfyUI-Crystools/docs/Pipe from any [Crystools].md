
# Documentation
- Class name: Pipe from any [Crystools]
- Category: crystools 🪛/Pipe
- Output node: False

这个节点旨在促进数据从通用输入到指定输出的流动，允许动态处理和转换各种数据类型。它抽象了数据操作的复杂性，为数据管道操作提供了一个简化的接口。

# Input types
## Required
- CPipeAny
    - 这个参数代表可以是任何类型的通用输入。它对节点的操作至关重要，因为它作为数据提取和随后转换或传递的源。
    - Comfy dtype: CPipeAny
    - Python dtype: tuple

# Output types
- CPipeAny
    - 这个输出代表原始输入数据，保持不变，作为进一步处理的传递。
    - Comfy dtype: CPipeAny
    - Python dtype: tuple
- any_1
    - 这个输出代表输入元组的第一个元素，可能被转换或直接传递。
    - Comfy dtype: *
    - Python dtype: object
- any_2
    - 这个输出代表输入元组的第二个元素，可能被转换或直接传递。
    - Comfy dtype: *
    - Python dtype: object
- any_3
    - 这个输出代表输入元组的第三个元素，可能被转换或直接传递。
    - Comfy dtype: *
    - Python dtype: object
- any_4
    - 这个输出代表输入元组的第四个元素，可能被转换或直接传递。
    - Comfy dtype: *
    - Python dtype: object
- any_5
    - 这个输出代表输入元组的第五个元素，可能被转换或直接传递。
    - Comfy dtype: *
    - Python dtype: object
- any_6
    - 这个输出代表输入元组的第六个元素，可能被转换或直接传递。
    - Comfy dtype: *
    - Python dtype: object


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
