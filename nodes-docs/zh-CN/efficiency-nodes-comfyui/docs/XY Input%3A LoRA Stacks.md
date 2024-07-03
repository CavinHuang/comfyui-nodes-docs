
# Documentation
- Class name: XY Input: LoRA Stacks
- Category: Efficiency Nodes/XY Inputs
- Output node: False

该节点旨在处理和可视化特定用于LoRA (Low-Rank Adaptation) 堆栈的XY图数据，从而实现对不同LoRA配置的分析和比较，以及它们对模型效率和性能的影响。

# Input types
## Required
- node_state
    - 表示节点是否处于活跃状态，影响LoRA堆栈是否会被处理用于XY绘图。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

## Optional
- lora_stack_i
    - 代表要包含在XY图分析中的LoRA堆栈配置。索引'i'可以从1到5不等，允许分析多个LoRA堆栈配置。
    - Comfy dtype: LORA_STACK
    - Python dtype: Tuple[str, ...]

# Output types
- X or Y
    - 输出给定LoRA堆栈的XY图数据，便于可视化和比较。根据LoRA堆栈的处理，输出可以表示'X'或'Y'数据。
    - Comfy dtype: XY
    - Python dtype: Tuple[str, List[Tuple]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_LoRA_Stacks:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "node_state": (["Enabled"],)},
                "optional": {
                    "lora_stack_1": ("LORA_STACK",),
                    "lora_stack_2": ("LORA_STACK",),
                    "lora_stack_3": ("LORA_STACK",),
                    "lora_stack_4": ("LORA_STACK",),
                    "lora_stack_5": ("LORA_STACK",),},
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, node_state, lora_stack_1=None, lora_stack_2=None, lora_stack_3=None, lora_stack_4=None, lora_stack_5=None):
        xy_type = "LoRA"
        xy_value = [stack for stack in [lora_stack_1, lora_stack_2, lora_stack_3, lora_stack_4, lora_stack_5] if stack is not None]
        if not xy_value or not any(xy_value) or node_state == "Disabled":
            return (None,)
        else:
            return ((xy_type, xy_value),)

```
