
# Documentation
- Class name: Unpack SDXL Tuple
- Category: Efficiency Nodes/Misc
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

"Unpack SDXL Tuple"节点旨在将复杂的元组结构分解为其组成部分，专门用于高效处理与模型、剪辑和条件元素相关的数据。它促进了基础和精炼元素的分离和单独处理，提高了处理SDXL元组的模块化和灵活性。

# Input types
## Required
- sdxl_tuple
    - 需要解包的SDXL元组，包含基础和精炼阶段的组合模型、剪辑和条件信息。
    - Comfy dtype: SDXL_TUPLE
    - Python dtype: Tuple[torch.nn.Module, Any, str, str, torch.nn.Module, Any, str, str]

# Output types
- BASE_MODEL
    - 从SDXL元组中提取的基础模型组件。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- BASE_CLIP
    - 从SDXL元组中提取的基础剪辑组件。
    - Comfy dtype: CLIP
    - Python dtype: Any
- BASE_CONDITIONING+
    - 从SDXL元组中提取的正面基础条件组件。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- BASE_CONDITIONING-
    - 从SDXL元组中提取的负面基础条件组件。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- REFINER_MODEL
    - 从SDXL元组中提取的精炼模型组件。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- REFINER_CLIP
    - 从SDXL元组中提取的精炼剪辑组件。
    - Comfy dtype: CLIP
    - Python dtype: Any
- REFINER_CONDITIONING+
    - 从SDXL元组中提取的正面精炼条件组件。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- REFINER_CONDITIONING-
    - 从SDXL元组中提取的负面精炼条件组件。
    - Comfy dtype: CONDITIONING
    - Python dtype: str


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
