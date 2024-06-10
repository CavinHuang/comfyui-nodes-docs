---
tags:
- Text
---

# RequestInputs
## Documentation
- Class name: `RequestInputs`
- Category: `Bmad/api`
- Output node: `False`

The RequestInputs node is designed to accept a JSON string of key-value pairs, parse it, and output the values as a tuple of strings. This node serves as a foundational component in processing and transforming input data received in JSON format into a more manageable and usable form for subsequent nodes in a pipeline.
## Input types
### Required
- **`values`**
    - The 'values' parameter takes a JSON string containing key-value pairs. It plays a crucial role in the node's operation by providing the raw data that will be parsed and transformed into a tuple of strings, which are then passed on for further processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Outputs a tuple of strings extracted from the input JSON string. Each element of the tuple represents a value from the key-value pairs in the input JSON, making it easier to handle and process the data further.
    - Python dtype: `Tuple[str, ...]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RequestInputs:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "values": ("STRING", {"default": ""}),
        },
        }

    RETURN_TYPES = tuple(["STRING" for x in range(32)])
    FUNCTION = "start"
    CATEGORY = "Bmad/api"

    def start(self, values):
        values = tuple(json.loads(values).values())
        return values

```
