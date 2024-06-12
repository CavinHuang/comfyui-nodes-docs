---
tags:
- Conditioning
---

# Conditioning area scale by ratio
## Documentation
- Class name: `DF_Conditioning_area_scale_by_ratio`
- Category: `Derfuu_Nodes/Modded nodes/Conditions`
- Output node: `False`

This node is designed to adjust the scale of conditioning areas based on a specified ratio, modifying both the dimensions and strength of the conditioning to achieve a desired effect. It allows for dynamic resizing of conditioning areas, making it suitable for applications requiring precise control over the conditioning's influence on generated content.
## Input types
### Required
- **`conditioning`**
    - The conditioning input represents the current state of conditioning areas that will be scaled. It is crucial for determining the base dimensions and strength that will be modified.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Union[int, float, Tuple[int, int, int, int]]]]]`
- **`modifier`**
    - The modifier is a scaling factor that directly influences the size of the conditioning areas, allowing for proportional resizing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_modifier`**
    - This parameter adjusts the strength of the conditioning, enabling fine-tuning of its impact on the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Returns the conditioning with adjusted area sizes and strength, reflecting the applied scaling modifications.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Union[int, float, Tuple[int, int, int, int]]]]]`
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
