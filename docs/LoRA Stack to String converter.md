
# Documentation
- Class name: LoRA Stack to String converter
- Category: Efficiency Nodes/Misc
- Output node: False

LoRA Stack to String converter节点旨在将一系列LoRA（低秩适应）模型配置（每个配置以元组形式表示）转换为一个以空格分隔的字符串。这种转换有助于高效地表示和传输LoRA模型参数，适用于各种场景，包括模型配置和调试。

# Input types
## Required
- lora_stack
    - 代表一个元组列表，每个元组包含一个模型标识符和两个数值，这些将被转换成格式化的字符串。该输入对于生成LoRA模型配置的紧凑表示至关重要。
    - Comfy dtype: LORA_STACK
    - Python dtype: List[Tuple[str, float, float]]

# Output types
- LoRA string
    - 一个单一的字符串，将所有输入元组连接成一个格式化的、以空格分隔的序列，便于LoRA模型配置的解释和使用。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_LoRA_Stack2String:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"lora_stack": ("LORA_STACK",)}}

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("LoRA string",)
    FUNCTION = "convert"
    CATEGORY = "Efficiency Nodes/Misc"

    def convert(self, lora_stack):
        """
        Converts a list of tuples into a single space-separated string.
        Each tuple contains (STR, FLOAT1, FLOAT2) and is converted to the format "<lora:STR:FLOAT1:FLOAT2>".
        """
        output = ' '.join(f"<lora:{tup[0]}:{tup[1]}:{tup[2]}>" for tup in lora_stack)
        return (output,)

```
