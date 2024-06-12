# Integer place counter
## Documentation
- Class name: `Integer place counter`
- Category: `WAS Suite/Integer`
- Output node: `False`

This node is designed to calculate the number of places in an integer, effectively determining its length. It abstracts the process of converting an integer to a string to count its characters, providing a straightforward way to assess the magnitude of an integer.
## Input types
### Required
- **`int_input`**
    - Specifies the integer whose places are to be counted. This input is crucial for determining the length of the integer, which directly influences the node's output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`INT_PLACES`**
    - Comfy dtype: `INT`
    - Represents the number of places in the input integer. This output is significant as it quantifies the length of the integer, offering insight into its magnitude.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Integer_Place_Counter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "int_input": ("INT", {"default": 0, "min": 0, "max": 10000000, "step": 1}),
            }
        }
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("INT_PLACES",)
    FUNCTION = "count_places"

    CATEGORY = "WAS Suite/Integer"

    def count_places(self, int_input):
        output = len(str(int_input))
        cstr("\nInteger Places Count: "+str(output)).msg.print()
        return (output,)

```
