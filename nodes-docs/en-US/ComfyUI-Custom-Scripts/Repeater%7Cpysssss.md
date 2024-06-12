# Repeater 🐍
## Documentation
- Class name: `Repeater|pysssss`
- Category: `utils`
- Output node: `False`

The Repeater node is designed to duplicate a given input source a specified number of times, with the ability to output either as a single node or multiple nodes based on the mode selected. It abstracts the functionality of repeating data, facilitating the creation of multiple instances of data or nodes within a workflow.
## Input types
### Required
- **`source`**
    - The source input represents the data to be repeated. Its role is crucial as it determines the base content that will be duplicated according to the specified repeat count.
    - Comfy dtype: `*`
    - Python dtype: `AnyType`
- **`repeats`**
    - Specifies the number of times the source input should be repeated. This parameter directly influences the output by determining the quantity of the duplicated data.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`output`**
    - Determines whether the repeated data should be output as a single node or multiple nodes, affecting the structure of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`node_mode`**
    - Controls whether the repeated nodes are reused or newly created, impacting the way nodes are added to the graph when serialized.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`*`**
    - Comfy dtype: `*`
    - The output is a list of repeated data, which can vary in structure based on the output and node_mode parameters.
    - Python dtype: `List[AnyType]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Repeater:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "source": (any, {}),
            "repeats": ("INT", {"min": 0, "max": 5000, "default": 2}),
            "output": (["single", "multi"], {}),
            "node_mode": (["reuse", "create"], {}),
        }}

    RETURN_TYPES = (any,)
    FUNCTION = "repeat"
    OUTPUT_NODE = False
    OUTPUT_IS_LIST = (True,)

    CATEGORY = "utils"

    def repeat(self, repeats, output, node_mode, **kwargs):
        if output == "multi":
            # Multi outputs are split to indiviual nodes on the frontend when serializing
            return ([kwargs["source"]],)
        elif node_mode == "reuse":
            # When reusing we have a single input node, repeat that N times
            return ([kwargs["source"]] * repeats,)
        else:
            # When creating new nodes, they'll be added dynamically when the graph is serialized
            return ((list(kwargs.values())),)

```
