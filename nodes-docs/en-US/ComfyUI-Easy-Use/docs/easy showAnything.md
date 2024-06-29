---
tags:
- DataTypeAgnostic
- Debugging
---

# Show Any
## Documentation
- Class name: `easy showAnything`
- Category: `EasyUse/Logic`
- Output node: `True`

The `easy showAnything` node is designed to display any type of input data as a string, making it versatile for debugging or logging purposes. It abstracts the complexity of data type handling by converting various data types into a human-readable string format.
## Input types
### Required
### Optional
- **`anything`**
    - This parameter accepts any type of input, allowing for a wide range of data types to be displayed as strings. It's crucial for the node's functionality to convert diverse inputs into a unified string output.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`ui`**
    - The output is a user interface element that displays the converted string, providing a simple way to visualize any input data in text form.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class showAnything:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}, "optional": {"anything": (AlwaysEqualProxy("*"), {}), },
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO",
            }}

    RETURN_TYPES = ()
    INPUT_IS_LIST = True
    OUTPUT_NODE = True
    FUNCTION = "log_input"
    CATEGORY = "EasyUse/Logic"

    def log_input(self, unique_id=None, extra_pnginfo=None, **kwargs):

        values = []
        if "anything" in kwargs:
            for val in kwargs['anything']:
                try:
                    if type(val) is str:
                        values.append(val)
                    else:
                        val = json.dumps(val)
                        values.append(str(val))
                except Exception:
                    values.append(str(val))
                    pass

        if unique_id and extra_pnginfo and "workflow" in extra_pnginfo[0]:
            workflow = extra_pnginfo[0]["workflow"]
            node = next((x for x in workflow["nodes"] if str(x["id"]) == unique_id[0]), None)
            if node:
                node["widgets_values"] = [values]

        return {"ui": {"text": values}}

```
