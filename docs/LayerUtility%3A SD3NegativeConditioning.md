# Documentation
- Class name: SD3NegativeConditioning
- Category: 😺dzNodes/LayerUtility/SystemIO
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

把SD3的Negative Conditioning 的4个节点封装为一个单独节点。

# Input types

## Required

- conditioning
    - 输入的条件。
    - Comfy dtype: CONDITIONING
    - Python dtype: list

- zero_out_start
    - 设置Negative ConditioningZeroOut的ConditioningSetTimestepRange start值, 此数值与Negative的ConditioningSetTimestepRange end值相同。
    - Comfy dtype: FLOAT
    - Python dtype: float


# Output types

- CONDITIONING
    - 输出的条件。
    - Comfy dtype: CONDITIONING
    - Python dtype: list

# Usage tips
- Infra type: GPU

# Source code
```
class SD3NegativeConditioning:

    @classmethod
    def INPUT_TYPES(self):
        return {"required": {"conditioning": ("CONDITIONING", ),
                             "zero_out_start": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.001}),
                             }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = 'sd3_negative_conditioning'
    CATEGORY = '😺dzNodes/LayerUtility/SystemIO'

    def sd3_negative_conditioning(self, conditioning, zero_out_start):
        def zero_out(conditioning):
            c = []
            for t in conditioning:
                d = t[1].copy()
                if "pooled_output" in d:
                    d["pooled_output"] = torch.zeros_like(d["pooled_output"])
                n = [torch.zeros_like(t[0]), d]
                c.append(n)
            return c

        def set_range(conditioning, start, end):
            c = node_helpers.conditioning_set_values(conditioning, {"start_percent": start,
                                                                    "end_percent": end})
            return c

        zero_out_c = zero_out(conditioning)
        c_1 = set_range(zero_out_c, zero_out_start, 1.0)
        c_2 = set_range(conditioning, 0.0, zero_out_start)
        return (c_1 + c_2,)
```