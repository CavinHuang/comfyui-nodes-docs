---
tags:
- Searge
---

# Style Preprocessor (wip)
## Documentation
- Class name: `SeargeStylePreprocessor`
- Category: `Searge/_deprecated_/UI`
- Output node: `False`

The SeargeStylePreprocessor node is designed to apply predefined styles to input parameters for further processing. It adjusts the inputs based on the active style name and style definitions, ensuring that the inputs are formatted and ready for the next stages of processing.
## Input types
### Required
- **`inputs`**
    - A collection of input parameters that may require styling before further processing. It plays a crucial role in determining how the inputs are modified based on the selected style.
    - Comfy dtype: `PARAMETER_INPUTS`
    - Python dtype: `Dict[str, Any]`
- **`active_style_name`**
    - Specifies the name of the style to be applied to the inputs. It influences the selection of styling rules that are applied, tailoring the inputs for specific processing needs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`style_definitions`**
    - Contains the definitions of available styles in a structured format. It is essential for determining how inputs are modified, providing a blueprint for the styling process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`inputs`**
    - Comfy dtype: `PARAMETER_INPUTS`
    - The modified collection of input parameters, adjusted according to the selected style. It represents the inputs ready for subsequent processing stages.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeStylePreprocessor:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "inputs": ("PARAMETER_INPUTS",),
            "active_style_name": ("STRING", {"multiline": False, "default": ""}),
            "style_definitions": ("STRING", {"multiline": True, "default": "[unfinished work in progress]"}),
        },
        }

    RETURN_TYPES = ("PARAMETER_INPUTS",)
    RETURN_NAMES = ("inputs",)
    FUNCTION = "process"

    CATEGORY = "Searge/_deprecated_/UI"

    def process(self, inputs, active_style_name, style_definitions):
        if inputs is None:
            inputs = {}

        style_template = inputs["style_template"]
        # not "from preprocessor"
        if style_template is None or style_template != SeargeParameterProcessor.STYLE_TEMPLATE[1]:
            return (inputs,)

        # TODO: do what needs to be done to apply the selected style

        return (inputs,)

```
