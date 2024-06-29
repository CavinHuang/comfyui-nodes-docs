---
tags:
- Image
- Pipeline
---

# Pipe to Prompts
## Documentation
- Class name: `AV_ParametersPipeToPrompts`
- Category: `Art Venture/Parameters`
- Output node: `False`

The AV_ParametersPipeToPrompts node is designed to transform a parameters pipe into specific prompt outputs, facilitating the generation of positive, negative, image, and mask outputs based on the input parameters pipe. This node plays a crucial role in the art creation pipeline by enabling the conversion of abstract parameter sets into concrete, actionable prompts and visual elements.
## Input types
### Required
- **`pipe`**
    - The 'pipe' input is a dictionary that serves as a container for various parameters, acting as the source from which the node extracts specific values to generate the prompts and visual outputs. It is central to the node's operation, dictating the content of the generated outputs.
    - Comfy dtype: `PIPE`
    - Python dtype: `Dict`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE`
    - Returns the original input parameters pipe, allowing for further processing or utilization in subsequent nodes.
    - Python dtype: `Dict`
- **`positive`**
    - Comfy dtype: `STRING`
    - Generates a positive prompt text based on the input parameters.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `STRING`
    - Generates a negative prompt text based on the input parameters.
    - Python dtype: `str`
- **`image`**
    - Comfy dtype: `IMAGE`
    - Produces an image output if specified in the input parameters.
    - Python dtype: `Optional[ImageType]`
- **`mask`**
    - Comfy dtype: `MASK`
    - Produces a mask output if specified in the input parameters.
    - Python dtype: `Optional[MaskType]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVParametersPipeToPrompts:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE",),
            },
        }

    RETURN_TYPES = (
        "PIPE",
        "STRING",
        "STRING",
        "IMAGE",
        "MASK",
    )
    RETURN_NAMES = (
        "pipe",
        "positive",
        "negative",
        "image",
        "mask",
    )
    CATEGORY = "Art Venture/Parameters"
    FUNCTION = "parameter_pipe_to_prompt"

    def parameter_pipe_to_prompt(self, pipe: Dict = {}):
        positive = pipe.get("positive", None)
        negative = pipe.get("negative", None)
        image = pipe.get("image", None)
        mask = pipe.get("mask", None)

        return (
            pipe,
            positive,
            negative,
            image,
            mask,
        )

```
