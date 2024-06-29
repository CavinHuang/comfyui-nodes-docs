---
tags:
- DataConversion
- DataTypeConversion
- Float
- FloatData
- NumericConversion
---

# Float
## Documentation
- Class name: `JWFloat`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed to handle floating-point operations, providing a platform for performing calculations or manipulations involving float values. It focuses on enabling precise numerical computations and transformations within a given workflow.
## Input types
### Required
- **`value`**
    - Represents the floating-point value to be processed or manipulated by the node. Its role is crucial for the execution of float-specific operations, directly influencing the outcome of the node's functionality.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output is a floating-point value, which is the result of the node's operation on the input float. This output is essential for further numerical computations or analyses within the workflow.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - ezMath
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - Reroute
    - workflow/IP Adapter full bundle



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
