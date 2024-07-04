
# Documentation
- Class name: JWInteger
- Category: jamesWalker55
- Output node: False

JWInteger节点旨在封装一个整数值，使整数数据能够在计算图中直观地表示和操作。

# Input types
## Required
- value
    - 指定要由节点封装的整数值。这个参数对定义节点的行为和输出至关重要，因为它直接代表了节点操作的数据。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 输出封装的整数值，使其可用于计算图中的进一步处理或使用。
    - Comfy dtype: INT
    - Python dtype: int


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
