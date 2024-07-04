
# Documentation
- Class name: Join Image Lists
- Category: List Stuff
- Output node: False

Join Image Lists节点旨在将多个图像列表合并为单一列表，同时提供原始列表的大小。此功能对于需要整合来自不同来源的图像数据的操作至关重要，确保图像集合的无缝集成和操作。

# Input types
## Required
- In1
    - 表示要合并的第一个图像列表。这是一个必需的输入，在启动合并过程中起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: List[Tensor]
- In2
    - 表示要合并的第二个图像列表。这是一个必需的输入，与第一个列表一起参与合并过程。
    - Comfy dtype: IMAGE
    - Python dtype: List[Tensor]
## Optional
- In3
    - 一个可选的图像列表，可以包含在合并过程中，为处理不同数量的图像列表提供灵活性。
    - Comfy dtype: IMAGE
    - Python dtype: List[Tensor]
- In4
    - 一个可选的图像列表，可以包含在合并过程中，为处理不同数量的图像列表提供灵活性。
    - Comfy dtype: IMAGE
    - Python dtype: List[Tensor]
- In5
    - 一个可选的图像列表，可以包含在合并过程中，为处理不同数量的图像列表提供灵活性。
    - Comfy dtype: IMAGE
    - Python dtype: List[Tensor]

# Output types
- Joined
    - 来自所有输入列表的合并图像列表。
    - Comfy dtype: IMAGE
    - Python dtype: List[Tensor]
- Sizes
    - 表示原始输入列表大小的整数列表。
    - Comfy dtype: INT
    - Python dtype: List[int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class JoinImageLists:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(self) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "In1": ("IMAGE",),
                "In2": ("IMAGE",),
            },
            "optional": {
                "In3": ("IMAGE",),
                "In4": ("IMAGE",),
                "In5": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE", "INT")
    RETURN_NAMES = ("Joined", "Sizes")
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True)
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
