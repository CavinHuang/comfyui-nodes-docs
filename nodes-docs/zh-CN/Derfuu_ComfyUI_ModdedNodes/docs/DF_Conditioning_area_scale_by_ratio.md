
# Documentation
- Class name: DF_Conditioning_area_scale_by_ratio
- Category: Derfuu_Nodes/Modded nodes/Conditions
- Output node: False

这个节点旨在根据指定的比率调整条件区域的尺寸，同时修改条件的维度和强度以达到预期效果。它允许动态调整条件区域的大小，适用于需要精确控制条件对生成内容影响的应用场景。

# Input types
## Required
- conditioning
    - conditioning输入代表将要缩放的当前条件区域状态。它对于确定将被修改的基础维度和强度至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Union[int, float, Tuple[int, int, int, int]]]]]
- modifier
    - modifier是一个缩放因子，直接影响条件区域的大小，允许进行比例调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_modifier
    - 此参数调整条件的强度，能够微调其对生成过程的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 返回经过区域大小和强度调整后的条件，反映了应用的缩放修改。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Union[int, float, Tuple[int, int, int, int]]]]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningAreaScale_Ratio:
    def __init__(self):
        pass


    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "conditioning": Field.conditioning(),
                "modifier": Field.float(),
                "strength_modifier": Field.float(),
            }
        }

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "resize"
    CATEGORY = TREE_COND

    def resize(self, conditioning, modifier, strength_modifier, min_sigma=0.0, max_sigma=99.0):
        c = []

        for t in conditioning:
            n = [t[0], t[1].copy()]

            try:
                size, offset = get_conditioning_size(n[1])
            except:
                c.append(n)
                continue

            height = int(size["height"] * 8 * modifier)
            width = int(size["width"] * 8 * modifier)

            y = int(offset["y_offset"] * 8 * modifier)
            x = int(offset["x_offset"] * 8 * modifier)

            n[1]['area'] = (height // 8, width // 8, y // 8, x // 8)
            n[1]['strength'] *= strength_modifier
            n[1]['min_sigma'] = min_sigma
            n[1]['max_sigma'] = max_sigma
            c.append(n)

        return (c,)

```
