---
tags:
- LoRA
- LoRAVisualization
---

# XY Input: LoRA Stacks
## Documentation
- Class name: `XY Input: LoRA Stacks`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

This node is designed to process and visualize XY plot data specifically for LoRA (Low-Rank Adaptation) stacks, enabling the analysis and comparison of different LoRA configurations and their impacts on model efficiency and performance.
## Input types
### Required
- **`node_state`**
    - Indicates whether the node is active or not, affecting whether the LoRA stacks are processed for XY plotting.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`lora_stack_i`**
    - Represents a LoRA stack configuration to be included in the XY plot analysis. The index 'i' can range from 1 to 5, allowing for multiple LoRA stack configurations to be analyzed.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `Tuple[str, ...]`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - Outputs the XY plot data for the given LoRA stacks, facilitating visualization and comparison. The output can represent either 'X' or 'Y' data based on the processing of LoRA stacks.
    - Python dtype: `Tuple[str, List[Tuple]]`
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
