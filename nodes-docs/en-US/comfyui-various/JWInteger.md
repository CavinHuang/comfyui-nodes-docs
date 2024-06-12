---
tags:
- DataTypeConversion
- MathematicalFunctions
---

# Integer
## Documentation
- Class name: `JWInteger`
- Category: `jamesWalker55`
- Output node: `False`

The JWInteger node is designed to encapsulate an integer value, allowing for the straightforward representation and manipulation of integer data within a computational graph.
## Input types
### Required
- **`value`**
    - Specifies the integer value to be encapsulated by the node. This parameter is fundamental for defining the node's behavior and output, as it directly represents the data the node operates on.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - Outputs the encapsulated integer value, making it available for further processing or use within the computational graph.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncodeSDXL](../../Comfy/Nodes/CLIPTextEncodeSDXL.md)
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - [Image Resize](../../was-node-suite-comfyui/Nodes/Image Resize.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)



## Source code
```python
        @register_node(identifier, display_name)
        class _:
            CATEGORY = category
            INPUT_TYPES = lambda: {"required": required_inputs}
            RETURN_TYPES = tuple(return_types)
            OUTPUT_NODE = output_node
            FUNCTION = "execute"

            def execute(self, *args, **kwargs):
                return func(*args, **kwargs)

```
