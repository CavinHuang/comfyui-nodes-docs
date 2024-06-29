# Repeater 🐍
## Documentation
- Class name: Repeater|pysssss
- Category: utils
- Output node: False
- Repo Ref: https://github.com/pythongosssss/ComfyUI-Custom-Scripts

Repeater节点旨在将给定的输入源重复指定次数，可以根据所选模式输出为单个节点或多个节点。它抽象了重复数据的功能，便于在工作流程中创建多个数据实例或节点。

## Input types
### Required
- source
    - 表示要重复的数据的源输入。其作用至关重要，因为它决定了将根据指定的重复次数重复的基本内容。
    - Comfy dtype: *
    - Python dtype: AnyType
- repeats
    - 指定源输入应重复的次数。此参数直接影响输出，确定重复数据的数量。
    - Comfy dtype: INT
    - Python dtype: int
- output
    - 确定重复数据应作为单个节点还是多个节点输出，影响输出的结构。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- node_mode
    - 控制重复节点是重用还是新创建，影响节点在序列化时添加到图中的方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Output types
- *
    - Comfy dtype: *
    - 输出是重复数据的列表，根据output和node_mode参数可以具有不同的结构。
    - Python dtype: List[AnyType]

## Usage tips
- Infra type: CPU
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