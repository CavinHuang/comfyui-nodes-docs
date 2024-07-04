
# Documentation
- Class name: DebugPrint
- Category: Logic
- Output node: True

DebugPrint节点是为调试目的而设计的，它允许开发者将任何输入直接打印到控制台。这有助于跟踪和检查通过节点网络的数据流，从而帮助识别和解决问题。

# Input types
## Required
- ANY
    - 接受任何输入，作为灵活的数据记录通道。这种通用性确保了该节点可以无缝集成到节点网络的各个点，而不会出现兼容性问题。
    - Comfy dtype: {}
    - Python dtype: Any

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DebugPrint:
    """
    This node prints the input to the console.
    """

    @classmethod
    def INPUT_TYPES(s):
        """
        Takes in any input.

        """
        return {"required": {"ANY": (AlwaysEqualProxy({}),)}}

    RETURN_TYPES = ()

    OUTPUT_NODE = True

    FUNCTION = "log_input"

    CATEGORY = "Logic"

    def log_input(self, ANY):
        print(ANY)
        return {}

```
