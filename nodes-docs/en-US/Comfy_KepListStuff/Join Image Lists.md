---
tags:
- ModelMerge
---

# Join Image Lists
## Documentation
- Class name: `Join Image Lists`
- Category: `List Stuff`
- Output node: `False`

The Join Image Lists node is designed to merge multiple lists of images into a single list, while also providing the sizes of the original lists. This functionality is essential for operations that require the consolidation of image data from various sources, ensuring seamless integration and manipulation of image collections.
## Input types
### Required
- **`In1`**
    - Represents the first list of images to be joined. It is a required input that plays a crucial role in initiating the merging process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Tensor]`
- **`In2`**
    - Represents the second list of images to be joined. It is a required input that contributes to the merging process alongside the first list.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Tensor]`
### Optional
- **`In3`**
    - An optional list of images that can be included in the merging process, providing flexibility in handling varying numbers of image lists.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Tensor]`
- **`In4`**
    - An optional list of images that can be included in the merging process, providing flexibility in handling varying numbers of image lists.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Tensor]`
- **`In5`**
    - An optional list of images that can be included in the merging process, providing flexibility in handling varying numbers of image lists.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Tensor]`
## Output types
- **`Joined`**
    - Comfy dtype: `IMAGE`
    - The combined list of images from all input lists.
    - Python dtype: `List[Tensor]`
- **`Sizes`**
    - Comfy dtype: `INT`
    - A list of integers representing the sizes of the original input lists.
    - Python dtype: `List[int]`
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
