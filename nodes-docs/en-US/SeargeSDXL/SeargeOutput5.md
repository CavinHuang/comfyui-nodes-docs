---
tags:
- Searge
---

# Prompt Processing
## Documentation
- Class name: `SeargeOutput5`
- Category: `Searge/_deprecated_/UI/Outputs`
- Output node: `False`

SeargeOutput5 is designed to demultiplex and output prompt processing parameters, including various scales and powers related to base and refiner conditioning, as well as style prompt power adjustments. This node plays a crucial role in fine-tuning the generation process by providing detailed control over the influence of different components on the final output.
## Input types
### Required
- **`parameters`**
    - The 'parameters' input contains key-value pairs specifying the scales and powers for base conditioning, refiner conditioning, style prompt, and negative style, which are essential for adjusting the generation process.
    - Comfy dtype: `PARAMETERS`
    - Python dtype: `Dict[str, float]`
## Output types
- **`parameters`**
    - Comfy dtype: `PARAMETERS`
    - Returns the original set of parameters provided as input, allowing for further processing or utilization downstream.
    - Python dtype: `Dict[str, float]`
- **`base_conditioning_scale`**
    - Comfy dtype: `FLOAT`
    - Specifies the scale factor for base conditioning, influencing the initial stage of generation.
    - Python dtype: `float`
- **`refiner_conditioning_scale`**
    - Comfy dtype: `FLOAT`
    - Determines the scale factor for refiner conditioning, affecting the refinement stage of generation.
    - Python dtype: `float`
- **`style_prompt_power`**
    - Comfy dtype: `FLOAT`
    - Indicates the power applied to the style prompt, adjusting its influence on the generation.
    - Python dtype: `float`
- **`negative_style_power`**
    - Comfy dtype: `FLOAT`
    - Specifies the power applied to negative styles, allowing for the reduction of unwanted stylistic elements.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeOutput5:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "parameters": ("PARAMETERS",),
        },
        }

    RETURN_TYPES = ("PARAMETERS", "FLOAT", "FLOAT", "FLOAT", "FLOAT",)
    RETURN_NAMES = ("parameters", "base_conditioning_scale", "refiner_conditioning_scale", "style_prompt_power",
                    "negative_style_power",)
    FUNCTION = "demux"

    CATEGORY = "Searge/_deprecated_/UI/Outputs"

    def demux(self, parameters):
        base_conditioning_scale = parameters["base_conditioning_scale"]
        refiner_conditioning_scale = parameters["refiner_conditioning_scale"]
        style_prompt_power = parameters["style_prompt_power"]
        negative_style_power = parameters["negative_style_power"]

        return (parameters, base_conditioning_scale, refiner_conditioning_scale, style_prompt_power,
                negative_style_power,)

```
