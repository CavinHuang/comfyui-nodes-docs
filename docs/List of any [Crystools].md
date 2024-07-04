
# Documentation
- Class name: List of any [Crystools]
- Category: crystools 🪛/List
- Output node: False
- Repo Ref: https://github.com/crystian/ComfyUI-Crystools

这个节点旨在将多个任意类型的输入整合成一个单一列表，从而便于在统一结构中处理多种数据类型。它强调了数据聚合的灵活性和包容性，允许广泛的输入类型。

# Input types
## Optional
- any_i
    - 表示任意类型的可选输入，将被包含在列表中。它的存在增强了节点在数据聚合方面的多功能性，允许动态数量的输入。
    - Comfy dtype: *
    - Python dtype: Any

# Output types
- any_list
    - 输出一个包含所有提供输入的列表，将各种数据类型封装在一个统一的结构中。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CListAny:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            },
            "optional": {
                "any_1": (any,),
                "any_2": (any,),
                "any_3": (any,),
                "any_4": (any,),
                "any_5": (any,),
                "any_6": (any,),
                "any_7": (any,),
                "any_8": (any,),
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.LIST.value
    RETURN_TYPES = (any,),
    RETURN_NAMES = ("any_list",)
    OUTPUT_IS_LIST = (True,)

    FUNCTION = "execute"

    def execute(self,
                any_1=None,
                any_2=None,
                any_3=None,
                any_4=None,
                any_5=None,
                any_6=None,
                any_7=None,
                any_8=None):

        list_any = []

        if any_1 is not None:
            try:
                list_any.append(any_1)
            except Exception as e:
                logger.warn(e)
        if any_2 is not None:
            try:
                list_any.append(any_2)
            except Exception as e:
                logger.warn(e)
        if any_3 is not None:
            try:
                list_any.append(any_3)
            except Exception as e:
                logger.warn(e)
        if any_4 is not None:
            try:
                list_any.append(any_4)
            except Exception as e:
                logger.warn(e)
        if any_5 is not None:
            try:
                list_any.append(any_5)
            except Exception as e:
                logger.warn(e)
        if any_6 is not None:
            try:
                list_any.append(any_6)
            except Exception as e:
                logger.warn(e)
        if any_7 is not None:
            try:
                list_any.append(any_7)
            except Exception as e:
                logger.warn(e)
        if any_8 is not None:
            try:
                list_any.append(any_8)
            except Exception as e:
                logger.warn(e)

        # yes, double brackets are needed because of the OUTPUT_IS_LIST... ¯\_(ツ)_/¯
        return [[list_any]]

```
