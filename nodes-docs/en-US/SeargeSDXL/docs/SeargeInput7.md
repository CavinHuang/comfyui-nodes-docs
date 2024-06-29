---
tags:
- Searge
---

# Misc Parameters
## Documentation
- Class name: `SeargeInput7`
- Category: `Searge/_deprecated_/UI/Inputs`
- Output node: `False`

SeargeInput7 is designed to process miscellaneous parameters for a user interface, specifically handling inputs like 'lora_strength', 'operation_mode', and 'prompt_style'. It combines these inputs, optionally with additional parameters, to configure and customize the operation of a system or application.
## Input types
### Required
- **`lora_strength`**
    - Specifies the strength of the LoRA (Long Range) parameter, affecting the intensity or effect of an operation within the system.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`operation_mode`**
    - Defines the mode of operation for the system, allowing users to select from predefined modes to tailor the system's behavior.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`prompt_style`**
    - Determines the style of prompts used within the system, enabling customization of user interactions or outputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`inputs`**
    - Optional additional parameters provided by the user, which are merged with the primary inputs to further customize the system's operation.
    - Comfy dtype: `PARAMETER_INPUTS`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`inputs`**
    - Comfy dtype: `PARAMETER_INPUTS`
    - A comprehensive set of parameters, including 'lora_strength', 'operation_mode', and 'prompt_style', along with any additional inputs, configured for system operation.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeInput7:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "lora_strength": ("FLOAT", {"default": 0.2, "min": -10.0, "max": 10.0, "step": 0.05}),
            "operation_mode": (SeargeParameterProcessor.OPERATION_MODE,
                               {"default": SeargeParameterProcessor.OPERATION_MODE[0]}),
            "prompt_style": (SeargeParameterProcessor.PROMPT_STYLE,
                             {"default": SeargeParameterProcessor.PROMPT_STYLE[0]}),
        },
            "optional": {
                "inputs": ("PARAMETER_INPUTS",),
            },
        }

    RETURN_TYPES = ("PARAMETER_INPUTS",)
    RETURN_NAMES = ("inputs",)
    FUNCTION = "mux"

    CATEGORY = "Searge/_deprecated_/UI/Inputs"

    def mux(self, lora_strength, operation_mode, prompt_style, inputs=None):
        if inputs is None:
            parameters = {}
        else:
            parameters = inputs

        parameters["lora_strength"] = lora_strength
        parameters["operation_mode"] = operation_mode
        parameters["prompt_style"] = prompt_style

        return (parameters,)

```
