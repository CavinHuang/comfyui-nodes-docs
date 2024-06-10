---
tags:
- LoRA
---

# LoRA Stack to String converter
## Documentation
- Class name: `LoRA Stack to String converter`
- Category: `Efficiency Nodes/Misc`
- Output node: `False`

The LoRA Stack to String converter node is designed to transform a list of LoRA (Low-Rank Adaptation) model configurations, each represented as a tuple, into a single, space-separated string. This conversion facilitates the efficient representation and communication of LoRA model parameters for various applications, including model configuration and debugging.
## Input types
### Required
- **`lora_stack`**
    - Represents a list of tuples, each containing a model identifier and two numerical values, which are to be converted into a formatted string. This input is crucial for generating a compact representation of LoRA model configurations.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `List[Tuple[str, float, float]]`
## Output types
- **`LoRA string`**
    - Comfy dtype: `STRING`
    - A single string that concatenates all the input tuples into a formatted, space-separated sequence, enabling easy interpretation and use of LoRA model configurations.
    - Python dtype: `str`
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
