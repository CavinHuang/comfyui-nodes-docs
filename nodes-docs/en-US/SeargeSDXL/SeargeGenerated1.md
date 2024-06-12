---
tags:
- Searge
---

# Flow Control Parameters
## Documentation
- Class name: `SeargeGenerated1`
- Category: `Searge/_deprecated_/UI/Generated`
- Output node: `False`

SeargeGenerated1 is designed to manage and generate flow control parameters within the SeargeSDXL framework. It plays a crucial role in orchestrating the flow of data and operations across various stages of the image generation process, ensuring that the right parameters are available at the right time for optimal performance and output quality.
## Input types
### Required
- **`parameters`**
    - This input represents the parameters required for generating flow control outputs, serving as the foundation for orchestrating the data and operations within the SeargeSDXL framework.
    - Comfy dtype: `PARAMETERS`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`parameters`**
    - Comfy dtype: `PARAMETERS`
    - Returns the original parameters provided as input, facilitating the flow of data through the system.
    - Python dtype: `Dict[str, Any]`
- **`operation_selector`**
    - Comfy dtype: `INT`
    - Generates an integer value to select the operation mode, influencing the flow and processing of image generation.
    - Python dtype: `int`
- **`prompt_style_selector`**
    - Comfy dtype: `INT`
    - Generates an integer value to select the prompt style, affecting the thematic direction of the generation process.
    - Python dtype: `int`
- **`prompt_style_group`**
    - Comfy dtype: `INT`
    - Generates an integer value to select the prompt style group, further refining the thematic direction of the generation process.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeGenerated1:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "parameters": ("PARAMETERS",),
        },
        }

    RETURN_TYPES = ("PARAMETERS", "INT", "INT", "INT",)
    RETURN_NAMES = ("parameters", "operation_selector", "prompt_style_selector", "prompt_style_group",)
    FUNCTION = "demux"

    CATEGORY = "Searge/_deprecated_/UI/Generated"

    def demux(self, parameters):
        operation_selector = parameters["operation_selector"]
        prompt_style_selector = parameters["prompt_style_selector"]
        prompt_style_group = parameters["prompt_style_group"]

        return (parameters, operation_selector, prompt_style_selector, prompt_style_group,)

```
