# List Counter (Inspire)
## Documentation
- Class name: `ListCounter __Inspire`
- Category: `InspirePack/Util`
- Output node: `False`

The ListCounter node is designed to maintain and increment a count associated with a unique identifier, allowing for the tracking of occurrences or iterations of specific actions or items within a list. It provides a mechanism to generate a sequential count, which can be reset or continued based on the unique identifier, making it useful for operations that require counting within a dynamic or iterative context.
## Input types
### Required
- **`signal`**
    - The signal input acts as a trigger for the counting operation, indicating when to increment the count. It is essential for initiating the count increment process.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`base_value`**
    - The base_value parameter sets the starting point for the count, allowing the count to begin from a specified value other than zero. This flexibility is useful for operations that require a custom starting point for counting.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - Returns the current count after incrementation, adjusted by the base value. This output is essential for tracking the progression of counts within the specified context.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ListCounter:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "signal": (utils.any_typ,),
                    "base_value": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    },
                "hidden": {"unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ("INT",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, signal, base_value, unique_id):
        if unique_id not in list_counter_map:
            count = 0
        else:
            count = list_counter_map[unique_id]

        list_counter_map[unique_id] = count + 1

        return (count + base_value, )

```
