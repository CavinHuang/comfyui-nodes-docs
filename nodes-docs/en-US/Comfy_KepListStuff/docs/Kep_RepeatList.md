# Repeat List
## Documentation
- Class name: `Kep_RepeatList`
- Category: `List Stuff`
- Output node: `False`

The Kep_RepeatList node is designed to replicate a given list a specified number of times, effectively extending the list by repeating its elements. This node is part of the 'List Stuff' category, emphasizing its utility in manipulating list structures within a data processing pipeline.
## Input types
### Required
- **`In`**
    - The input list to be repeated. It serves as the base list whose elements will be replicated according to the specified count.
    - Comfy dtype: `*`
    - Python dtype: `List[Any]`
- **`Count`**
    - Specifies the number of times the input list should be repeated. This parameter determines the final length of the output list by multiplying the original list's length.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`Extended`**
    - Comfy dtype: `*`
    - The output list resulting from repeating the input list elements a specified number of times. It represents the extended version of the original list.
    - Python dtype: `Tuple[List[Any]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RepeatList:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(self) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "In": (any_type, {}),
                "Count": ("INT", {"default": 0, "min": 0, "max": 99999, "step": 1}),
            },
        }

    RETURN_TYPES = (any_type,)
    RETURN_NAMES = ("Extended",)
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "repeat_list"

    CATEGORY = "List Stuff"

    def repeat_list(self, In: List[Any], Count: List[int]) -> Tuple[List[Any]]:
        if len(Count) != 1:
            raise ValueError("Count does not support multiple values")
        return (In * Count[0],)

```
