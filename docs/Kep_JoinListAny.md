
# Documentation
- Class name: Kep_JoinListAny
- Category: List Stuff
- Output node: False

Kep_JoinListAny 节点旨在将多个列表合并为一个单一列表，无论这些列表中包含的元素类型如何。该节点促进了不同列表的组合，提高了列表操作的灵活性。

# Input types
## Required
- In1
    - 表示要合并的第一个输入列表。其元素可以是任何类型，为节点提供了灵活性。
    - Comfy dtype: *
    - Python dtype: List[Any]
- In2
    - 表示要合并的第二个输入列表，类似于 In1，它可以包含任何类型的元素。
    - Comfy dtype: *
    - Python dtype: List[Any]
## Optional
- In3
    - 一个可选的第三个输入列表，可以与之前的列表合并。它可以包含任何类型的元素。
    - Comfy dtype: *
    - Python dtype: List[Any]
- In4
    - 一个可选的第四个用于合并的输入列表。它可以包含任何类型的元素，进一步扩展了节点的合并能力。
    - Comfy dtype: *
    - Python dtype: List[Any]
- In5
    - 一个可选的第五个可以合并的输入列表，允许进行更广泛的列表合并操作。
    - Comfy dtype: *
    - Python dtype: List[Any]

# Output types
- Joined
    - 合并所有输入列表后产生的结果列表。
    - Comfy dtype: *
    - Python dtype: List[Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class JoinListAny:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(self) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "In1": (any_type, {}),
                "In2": (any_type, {}),
            },
            "optional": {
                "In3": (any_type, {}),
                "In4": (any_type, {}),
                "In5": (any_type, {}),
            },
        }

    RETURN_TYPES = (any_type,)
    RETURN_NAMES = ("Joined", "Sizes")
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "join_lists"

    CATEGORY = "List Stuff"


    def join_lists(
            self,
            *args: List[Tensor],
            **kwargs: List[Tensor],
    ) -> Tuple[List[Tensor], List[int]]:
        sizes = []
        joined = []
        for arg in args:
            sizes.append(len(arg))
            joined.extend(arg)
        for arg in kwargs.values():
            if arg is not None:
                sizes.append(len(arg))
                joined.extend(arg)

        return joined, sizes

```
