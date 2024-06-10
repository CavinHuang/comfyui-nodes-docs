---
tags:
- Sampling
---

# Unpack SDXL Tuple
## Documentation
- Class name: `Unpack SDXL Tuple`
- Category: `Efficiency Nodes/Misc`
- Output node: `False`

The 'Unpack SDXL Tuple' node is designed to decompose a complex tuple structure into its constituent components, specifically tailored for handling data related to models, clips, and conditioning elements in an efficient manner. It facilitates the separation and individual handling of base and refiner elements, enhancing modularity and flexibility in processing SDXL tuples.
## Input types
### Required
- **`sdxl_tuple`**
    - The SDXL tuple to be unpacked, containing combined model, clip, and conditioning information for both base and refiner stages.
    - Comfy dtype: `SDXL_TUPLE`
    - Python dtype: `Tuple[torch.nn.Module, Any, str, str, torch.nn.Module, Any, str, str]`
## Output types
- **`BASE_MODEL`**
    - Comfy dtype: `MODEL`
    - The base model component extracted from the SDXL tuple.
    - Python dtype: `torch.nn.Module`
- **`BASE_CLIP`**
    - Comfy dtype: `CLIP`
    - The base clip component extracted from the SDXL tuple.
    - Python dtype: `Any`
- **`BASE_CONDITIONING+`**
    - Comfy dtype: `CONDITIONING`
    - The positive base conditioning component extracted from the SDXL tuple.
    - Python dtype: `str`
- **`BASE_CONDITIONING-`**
    - Comfy dtype: `CONDITIONING`
    - The negative base conditioning component extracted from the SDXL tuple.
    - Python dtype: `str`
- **`REFINER_MODEL`**
    - Comfy dtype: `MODEL`
    - The refiner model component extracted from the SDXL tuple.
    - Python dtype: `torch.nn.Module`
- **`REFINER_CLIP`**
    - Comfy dtype: `CLIP`
    - The refiner clip component extracted from the SDXL tuple.
    - Python dtype: `Any`
- **`REFINER_CONDITIONING+`**
    - Comfy dtype: `CONDITIONING`
    - The positive refiner conditioning component extracted from the SDXL tuple.
    - Python dtype: `str`
- **`REFINER_CONDITIONING-`**
    - Comfy dtype: `CONDITIONING`
    - The negative refiner conditioning component extracted from the SDXL tuple.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Pack SDXL Tuple](../../efficiency-nodes-comfyui/Nodes/Pack SDXL Tuple.md)
    - [TonemapNoiseWithRescaleCFG](../../ComfyUI_experiments/Nodes/TonemapNoiseWithRescaleCFG.md)
    - [FreeU_V2](../../Comfy/Nodes/FreeU_V2.md)



## Source code
```python
class TSC_Unpack_SDXL_Tuple:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"sdxl_tuple": ("SDXL_TUPLE",)},}

    RETURN_TYPES = ("MODEL", "CLIP", "CONDITIONING","CONDITIONING", "MODEL", "CLIP", "CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("BASE_MODEL", "BASE_CLIP", "BASE_CONDITIONING+", "BASE_CONDITIONING-",
                    "REFINER_MODEL", "REFINER_CLIP","REFINER_CONDITIONING+","REFINER_CONDITIONING-",)
    FUNCTION = "unpack_sdxl_tuple"
    CATEGORY = "Efficiency Nodes/Misc"

    def unpack_sdxl_tuple(self, sdxl_tuple):
        return (sdxl_tuple[0], sdxl_tuple[1],sdxl_tuple[2],sdxl_tuple[3],
                sdxl_tuple[4],sdxl_tuple[5],sdxl_tuple[6],sdxl_tuple[7],)

```
