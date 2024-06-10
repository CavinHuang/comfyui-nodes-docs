---
tags:
- Image
- Pipeline
---

# Prompts to Pipe
## Documentation
- Class name: `AV_PromptsToParametersPipe`
- Category: `Art Venture/Parameters`
- Output node: `False`

This node is designed to convert textual prompts into a structured parameters pipe, facilitating the integration of user-defined positive and negative prompts into a broader pipeline for art generation or modification. It allows for the dynamic customization of content by incorporating these prompts into the processing flow, alongside optional image and mask inputs for further refinement.
## Input types
### Required
- **`positive`**
    - The positive prompt represents the desired attributes or elements to include in the art generation process, serving as a guide for the output creation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative`**
    - The negative prompt specifies the attributes or elements to exclude from the art generation process, helping to refine the output by avoiding undesired features.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`pipe`**
    - A structured data pipeline that can be optionally provided to include existing parameters for further processing or modification.
    - Comfy dtype: `PIPE`
    - Python dtype: `Dict`
- **`image`**
    - An optional image input that can be used to influence the art generation process, providing a visual context or basis for modification.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[Image]`
- **`mask`**
    - An optional mask input that can be used to specify areas of interest or exclusion in the provided image, aiding in targeted modifications or enhancements.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[Mask]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE`
    - The output is a structured parameters pipe enriched with the provided positive and negative prompts, and optionally, image and mask data for tailored art generation.
    - Python dtype: `Dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVPromptsToParametersPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive": ("STRING", {"multiline": True, "default": "Positive"}),
                "negative": ("STRING", {"multiline": True, "default": "Negative"}),
            },
            "optional": {
                "pipe": ("PIPE",),
                "image": ("IMAGE",),
                "mask": ("MASK",),
            },
        }

    RETURN_TYPES = ("PIPE",)
    CATEGORY = "Art Venture/Parameters"
    FUNCTION = "prompt_to_parameter_pipe"

    def prompt_to_parameter_pipe(self, positive, negative, pipe: Dict = {}, image=None, mask=None):
        pipe["positive"] = positive
        pipe["negative"] = negative
        pipe["image"] = image
        pipe["mask"] = mask
        return (pipe,)

```
