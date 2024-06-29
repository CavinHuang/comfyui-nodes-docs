---
tags:
- Sampling
---

# Pack SDXL Tuple
## Documentation
- Class name: `Pack SDXL Tuple`
- Category: `Efficiency Nodes/Misc`
- Output node: `False`

The Pack SDXL Tuple node is designed to aggregate multiple model and conditioning parameters into a single, structured tuple. This facilitates the efficient handling and transfer of a comprehensive set of parameters between different stages of a generative AI pipeline, particularly in scenarios involving base and refiner models along with their respective conditioning inputs.
## Input types
### Required
- **`base_model`**
    - Represents the base generative model to be included in the tuple, playing a crucial role in the initial stages of generation.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`base_clip`**
    - Specifies the base CLIP model used for guiding the generation towards the desired outcome.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`base_positive`**
    - Defines positive conditioning inputs for the base model, influencing the direction of content generation.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`base_negative`**
    - Describes negative conditioning inputs for the base model, used to steer away from undesired content.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_model`**
    - Represents the refiner model that fine-tunes or enhances the output of the base model.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`refiner_clip`**
    - Specifies the refiner CLIP model used for additional guidance in the refining stage.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`refiner_positive`**
    - Defines positive conditioning inputs for the refiner model, further directing the refinement process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_negative`**
    - Describes negative conditioning inputs for the refiner model, helping to eliminate undesired aspects in the refinement stage.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
## Output types
- **`SDXL_TUPLE`**
    - Comfy dtype: `SDXL_TUPLE`
    - The structured tuple containing all specified models and conditioning inputs, ready for use in subsequent processing stages.
    - Python dtype: `Tuple[str, str, str, str, str, str, str, str]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler SDXL (Eff.)](../../efficiency-nodes-comfyui/Nodes/KSampler SDXL (Eff.).md)
    - [Unpack SDXL Tuple](../../efficiency-nodes-comfyui/Nodes/Unpack SDXL Tuple.md)



## Source code
```python
class TSC_Pack_SDXL_Tuple:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"base_model": ("MODEL",),
                             "base_clip": ("CLIP",),
                             "base_positive": ("CONDITIONING",),
                             "base_negative": ("CONDITIONING",),
                             "refiner_model": ("MODEL",),
                             "refiner_clip": ("CLIP",),
                             "refiner_positive": ("CONDITIONING",),
                             "refiner_negative": ("CONDITIONING",),},}

    RETURN_TYPES = ("SDXL_TUPLE",)
    RETURN_NAMES = ("SDXL_TUPLE",)
    FUNCTION = "pack_sdxl_tuple"
    CATEGORY = "Efficiency Nodes/Misc"

    def pack_sdxl_tuple(self, base_model, base_clip, base_positive, base_negative,
                        refiner_model, refiner_clip, refiner_positive, refiner_negative):
        return ((base_model, base_clip, base_positive, base_negative,
                 refiner_model, refiner_clip, refiner_positive, refiner_negative),)

```
