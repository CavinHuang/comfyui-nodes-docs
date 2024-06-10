---
tags:
- Searge
---

# Prompts
## Documentation
- Class name: `SeargeInput1`
- Category: `Searge/_deprecated_/UI/Inputs`
- Output node: `False`

SeargeInput1 is designed to aggregate and organize various textual prompts and styles into a unified parameter set for further processing. It serves as a multiplexer, combining inputs related to main and secondary prompts, style descriptions, and negative prompts and styles, along with optional image and mask inputs, into a single, structured output.
## Input types
### Required
- **`main_prompt`**
    - The primary text prompt for generating or influencing content. It serves as the main input for content creation or modification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`secondary_prompt`**
    - A supplementary text prompt that provides additional context or direction alongside the main prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`style_prompt`**
    - A text prompt that specifies the desired style or tone for the content being generated or modified.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_prompt`**
    - A text prompt that indicates what themes or elements should be avoided in the generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_style`**
    - A text prompt that specifies styles or tones to be avoided in the content creation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`inputs`**
    - An optional parameter for passing in previously defined inputs, allowing for dynamic input aggregation and modification.
    - Comfy dtype: `PARAMETER_INPUTS`
    - Python dtype: `dict`
- **`image`**
    - An optional image input that can be used to influence or guide the content generation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - An optional mask input for the image, used to specify areas of interest or exclusion in content generation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`inputs`**
    - Comfy dtype: `PARAMETER_INPUTS`
    - The aggregated set of parameters, including prompts, styles, and optional image and mask inputs, structured for further processing.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeInput1:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "main_prompt": ("STRING", {"multiline": True, "default": ""}),
            "secondary_prompt": ("STRING", {"multiline": True, "default": ""}),
            "style_prompt": ("STRING", {"multiline": True, "default": ""}),
            "negative_prompt": ("STRING", {"multiline": True, "default": ""}),
            "negative_style": ("STRING", {"multiline": True, "default": ""}),
        },
            "optional": {
                "inputs": ("PARAMETER_INPUTS",),
                "image": ("IMAGE",),
                "mask": ("MASK",),
            },
        }

    RETURN_TYPES = ("PARAMETER_INPUTS",)
    RETURN_NAMES = ("inputs",)
    FUNCTION = "mux"

    CATEGORY = "Searge/_deprecated_/UI/Inputs"

    def mux(self, main_prompt, secondary_prompt, style_prompt, negative_prompt, negative_style, inputs=None,
            image=None, mask=None):

        if inputs is None:
            parameters = {}
        else:
            parameters = inputs

        parameters["main_prompt"] = main_prompt
        parameters["secondary_prompt"] = secondary_prompt
        parameters["style_prompt"] = style_prompt
        parameters["negative_prompt"] = negative_prompt
        parameters["negative_style"] = negative_style
        parameters["image"] = image
        parameters["mask"] = mask

        return (parameters,)

```
