# WidgetToString
## Documentation
- Class name: `WidgetToString`
- Category: `KJNodes/text`
- Output node: `False`

This node is designed to extract and return the value of a specified widget from a given node within a workflow. It focuses on retrieving widget values as strings, optionally aggregating all widget values from the specified node if required.
## Input types
### Required
- **`id`**
    - Specifies the unique identifier of the node from which to extract the widget value, playing a crucial role in identifying the correct node within a workflow.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`widget_name`**
    - The name of the widget whose value is to be retrieved, determining which specific widget's value is extracted from the node.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`return_all`**
    - A boolean flag that, when set to true, changes the node's behavior to return all widget values from the specified node instead of just the value of a single widget.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The extracted widget value(s) as a string, which may represent a single widget's value or a concatenation of multiple widget values if 'return_all' is true.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WidgetToString:
    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "id": ("INT", {"default": 0}),
                "widget_name": ("STRING", {"multiline": False}),
                "return_all": ("BOOLEAN", {"default": False}),
            },
            
            "hidden": {"extra_pnginfo": "EXTRA_PNGINFO",
                       "prompt": "PROMPT"},
        }

    RETURN_TYPES = ("STRING", )
    FUNCTION = "get_widget_value"
    CATEGORY = "KJNodes/text"
    DESCRIPTION = """
Selects a node and it's specified widget and outputs the value as a string.  
To see node id's, enable node id display from Manager badge menu.
"""

    def get_widget_value(self, id, widget_name, extra_pnginfo, prompt, return_all=False):
        workflow = extra_pnginfo["workflow"]
        print(workflow)
        results = []
        for node in workflow["nodes"]:
            print(node)
            node_id = node["id"]

            if node_id != id:
                continue

            values = prompt[str(node_id)]
            if "inputs" in values:
                if return_all:
                    results.append(', '.join(f'{k}: {str(v)}' for k, v in values["inputs"].items()))
                elif widget_name in values["inputs"]:
                    v = str(values["inputs"][widget_name])  # Convert to string here
                    return (v, )
                else:
                    raise NameError(f"Widget not found: {id}.{widget_name}")
        if not results:
            raise NameError(f"Node not found: {id}")
        return (', '.join(results).strip(', '), )

```
