
# Documentation
- Class name: Pack SDXL Tuple
- Category: Efficiency Nodes/Misc
- Output node: False

Pack SDXL Tuple节点旨在将多个模型和条件参数聚合成一个结构化的元组。这有助于在生成式AI管道的不同阶段之间高效地处理和传输一套完整的参数，特别是在涉及基础模型和精炼模型及其各自的条件输入的场景中。

# Input types
## Required
- base_model
    - 代表要包含在元组中的基础生成模型，在生成的初始阶段扮演着关键角色。
    - Comfy dtype: MODEL
    - Python dtype: str
- base_clip
    - 指定用于引导生成朝向期望结果的基础CLIP模型。
    - Comfy dtype: CLIP
    - Python dtype: str
- base_positive
    - 定义基础模型的正面条件输入，影响内容生成的方向。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- base_negative
    - 描述基础模型的负面条件输入，用于避开不需要的内容。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- refiner_model
    - 代表对基础模型输出进行微调或增强的精炼模型。
    - Comfy dtype: MODEL
    - Python dtype: str
- refiner_clip
    - 指定在精炼阶段用于额外引导的精炼CLIP模型。
    - Comfy dtype: CLIP
    - Python dtype: str
- refiner_positive
    - 定义精炼模型的正面条件输入，进一步指导精炼过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- refiner_negative
    - 描述精炼模型的负面条件输入，有助于在精炼阶段消除不需要的方面。
    - Comfy dtype: CONDITIONING
    - Python dtype: str

# Output types
- SDXL_TUPLE
    - 包含所有指定模型和条件输入的结构化元组，可直接用于后续处理阶段。
    - Comfy dtype: SDXL_TUPLE
    - Python dtype: Tuple[str, str, str, str, str, str, str, str]


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
