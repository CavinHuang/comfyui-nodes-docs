
# Documentation
- Class name: Pipe to_edit any [Crystools]
- Category: crystools 🪛/Pipe
- Output node: False

"Pipe to/edit any"节点旨在灵活修改或更新任意数据类型的序列。它允许通过替换或保留原始值来灵活编辑输入，使其成为管道内数据操作和流程控制的多功能工具。

# Input types
## Required
## Optional
- CPipeAny
    - 表示待修改的原始数据序列。它作为通过节点应用的任何编辑或更新的基准。
    - Comfy dtype: CPipeAny
    - Python dtype: Tuple[Any, ...]
- any_i
    - 一个可选参数，如果提供，将替换原始数据序列中的相应元素。索引'i'可以从1到6不等，允许对序列进行有针对性的修改。
    - Comfy dtype: *
    - Python dtype: Any

# Output types
- cpipeany
    - 输出的cpipeany参数代表经过"Pipe to/edit any"节点处理后的修改或更新后的数据序列。它封装了可能包含替换或保留的原始值的新序列。
    - Comfy dtype: CPipeAny
    - Python dtype: unknown


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
