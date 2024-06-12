---
tags:
- Searge
---

# Misc Parameters
## Documentation
- Class name: `SeargeOutput7`
- Category: `Searge/_deprecated_/UI/Outputs`
- Output node: `False`

SeargeOutput7 is designed to demultiplex and output specific parameters related to miscellaneous settings, including the strength of LoRA adjustments, from a given set of parameters. It focuses on extracting and providing access to detailed configuration options that may affect the generation process or model behavior.
## Input types
### Required
- **`parameters`**
    - The 'parameters' input contains miscellaneous settings that may include various configuration options and values, such as LoRA strength, which are crucial for adjusting the generation process or model behavior.
    - Comfy dtype: `PARAMETERS`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`parameters`**
    - Comfy dtype: `PARAMETERS`
    - Returns the original set of miscellaneous parameters, allowing for further processing or utilization in subsequent steps.
    - Python dtype: `Dict[str, Any]`
- **`lora_strength`**
    - Comfy dtype: `FLOAT`
    - Outputs the LoRA strength value extracted from the input parameters, indicating the level of LoRA adjustments applied.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeOutput7:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "parameters": ("PARAMETERS",),
        },
        }

    RETURN_TYPES = ("PARAMETERS", "FLOAT",)
    RETURN_NAMES = ("parameters", "lora_strength",)
    FUNCTION = "demux"

    CATEGORY = "Searge/_deprecated_/UI/Outputs"

    def demux(self, parameters):
        lora_strength = parameters["lora_strength"]

        return (parameters, lora_strength,)

```
