---
tags:
- Searge
---

# Prompts
## Documentation
- Class name: `SeargeOutput1`
- Category: `Searge/_deprecated_/UI/Outputs`
- Output node: `False`

SeargeOutput1 is designed to demultiplex and output a variety of prompt-related parameters and media from a single input structure. It focuses on extracting and organizing textual prompts, styles, and associated images or masks for further processing or display, serving as a critical node in the pipeline for handling and refining user inputs into actionable data for generative models.
## Input types
### Required
- **`parameters`**
    - The 'parameters' input is the central data structure from which all output parameters are derived, containing all necessary information about prompts, styles, and media for the node to process.
    - Comfy dtype: `PARAMETERS`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`parameters`**
    - Comfy dtype: `PARAMETERS`
    - Returns the original input parameters for reference or further use.
    - Python dtype: `Dict[str, Any]`
- **`main_prompt`**
    - Comfy dtype: `STRING`
    - Extracts the main textual prompt for generation.
    - Python dtype: `str`
- **`secondary_prompt`**
    - Comfy dtype: `STRING`
    - Extracts a secondary textual prompt, potentially for refinement or additional context.
    - Python dtype: `str`
- **`style_prompt`**
    - Comfy dtype: `STRING`
    - Extracts a style-related textual prompt, indicating the desired artistic or thematic direction.
    - Python dtype: `str`
- **`negative_prompt`**
    - Comfy dtype: `STRING`
    - Extracts a textual prompt meant to guide the generation away from certain themes or elements.
    - Python dtype: `str`
- **`negative_style`**
    - Comfy dtype: `STRING`
    - Extracts a style-related prompt intended to negate or counterbalance certain stylistic directions.
    - Python dtype: `str`
- **`image`**
    - Comfy dtype: `IMAGE`
    - Outputs an image associated with the input parameters, potentially for use as a reference or starting point in generation.
    - Python dtype: `Any`
- **`mask`**
    - Comfy dtype: `MASK`
    - Outputs a mask associated with the input parameters, potentially for use in targeted image manipulation or generation.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeOutput1:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "parameters": ("PARAMETERS",),
        },
        }

    RETURN_TYPES = ("PARAMETERS", "STRING", "STRING", "STRING", "STRING", "STRING", "IMAGE", "MASK",)
    RETURN_NAMES = ("parameters", "main_prompt", "secondary_prompt", "style_prompt", "negative_prompt",
                    "negative_style", "image", "mask",)
    FUNCTION = "demux"

    CATEGORY = "Searge/_deprecated_/UI/Outputs"

    def demux(self, parameters):
        main_prompt = parameters["main_prompt"]
        secondary_prompt = parameters["secondary_prompt"]
        style_prompt = parameters["style_prompt"]
        negative_prompt = parameters["negative_prompt"]
        negative_style = parameters["negative_style"]
        image = parameters["image"]
        mask = parameters["mask"]

        return (parameters, main_prompt, secondary_prompt, style_prompt, negative_prompt, negative_style, image, mask,)

```
