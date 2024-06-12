---
tags:
- Searge
---

# Prompt Processing
## Documentation
- Class name: `SeargeInput5`
- Category: `Searge/_deprecated_/UI/Inputs`
- Output node: `False`

SeargeInput5 is designed for prompt processing within the SeargeSDXL framework. It focuses on refining and adjusting input prompts to better suit the generation process, ensuring that the prompts are optimized for the specific requirements of the SeargeSDXL models.
## Input types
### Required
- **`base_conditioning_scale`**
    - Specifies the scale factor for base conditioning, influencing the impact of the base prompts on the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`refiner_conditioning_scale`**
    - Determines the scale factor for refiner conditioning, affecting how much the refiner prompts contribute to the final generated content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`style_prompt_power`**
    - Controls the intensity of the style prompt's influence, allowing for fine-tuning of the stylistic elements in the generated content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`negative_style_power`**
    - Adjusts the degree to which negative style prompts are considered, helping to avoid undesired stylistic elements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`style_template`**
    - A template for styling the prompts, providing a structured approach to applying stylistic adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`inputs`**
    - A collection of input parameters and prompts that are processed and refined for content generation.
    - Comfy dtype: `PARAMETER_INPUTS`
    - Python dtype: `dict`
## Output types
- **`inputs`**
    - Comfy dtype: `PARAMETER_INPUTS`
    - The processed and refined collection of input parameters and prompts, ready for further processing or content generation.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeInput5:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "base_conditioning_scale": ("FLOAT", {"default": 2.0, "min": 0.25, "max": 4.0, "step": 0.25}),
            "refiner_conditioning_scale": ("FLOAT", {"default": 2.0, "min": 0.25, "max": 4.0, "step": 0.25}),
            "style_prompt_power": ("FLOAT", {"default": 0.33, "min": 0.0, "max": 1.0, "step": 0.01}),
            "negative_style_power": ("FLOAT", {"default": 0.67, "min": 0.0, "max": 1.0, "step": 0.01}),
            "style_template": (SeargeParameterProcessor.STYLE_TEMPLATE,
                               {"default": SeargeParameterProcessor.STYLE_TEMPLATE[0]}),
        },
            "optional": {
                "inputs": ("PARAMETER_INPUTS",),
            },
        }

    RETURN_TYPES = ("PARAMETER_INPUTS",)
    RETURN_NAMES = ("inputs",)
    FUNCTION = "mux"

    CATEGORY = "Searge/_deprecated_/UI/Inputs"

    def mux(self, base_conditioning_scale, refiner_conditioning_scale, style_prompt_power, negative_style_power,
            style_template, inputs=None):

        if inputs is None:
            parameters = {}
        else:
            parameters = inputs

        parameters["base_conditioning_scale"] = base_conditioning_scale
        parameters["refiner_conditioning_scale"] = refiner_conditioning_scale
        parameters["style_prompt_power"] = style_prompt_power
        parameters["negative_style_power"] = negative_style_power
        parameters["style_template"] = style_template

        return (parameters,)

```
