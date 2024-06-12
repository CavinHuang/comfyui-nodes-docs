# Documentation
- Class name: IPAdapterCombineParams
- Category: ipadapter/params
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterCombineParams该节点的主要功能是将多个 IP 适配器的参数组合成一个统一的参数集合。
适用于需要将多个参数来源合并以简化配置和处理的场景

# Input types

## Required
- params_1
    - 第一个参数，用于指定生成图像的参数。这个参数可以用来控制生成图像的参数，以获得更好的效果。
    - Comfy dtype: IPADAPTER_PARAMS
    - Python dtype: torch.Tensor
- params_2
    - 第二个参数，用于指定生成图像的参数。这个参数可以用来控制生成图像的参数，以获得更好的效果。
    - Comfy dtype: IPADAPTER_PARAMS
    - Python dtype: torch.Tensor

## Optional

- params_3
    - 第三个参数，用于指定生成图像的参数
    - Comfy dtype: IPADAPTER_PARAMS
    - Python dtype: torch.Tensor
- params_4
    - 第四个参数，用于指定生成图像的参数
    - Comfy dtype: IPADAPTER_PARAMS
    - Python dtype: torch.Tensor

# Output types
- IPADAPTER_PARAMS
    - 生成图像的参数集合，包含了所有输入参数的内容

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterCombineParams:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "params_1": ("IPADAPTER_PARAMS",),
            "params_2": ("IPADAPTER_PARAMS",),
        }, "optional": {
            "params_3": ("IPADAPTER_PARAMS",),
            "params_4": ("IPADAPTER_PARAMS",),
            "params_5": ("IPADAPTER_PARAMS",),
        }}

    RETURN_TYPES = ("IPADAPTER_PARAMS",)
    FUNCTION = "combine"
    CATEGORY = "ipadapter/params"

    def combine(self, params_1, params_2, params_3=None, params_4=None, params_5=None):
        ipadapter_params = {
            "image": params_1["image"] + params_2["image"],
            "attn_mask": params_1["attn_mask"] + params_2["attn_mask"],
            "weight": params_1["weight"] + params_2["weight"],
            "weight_type": params_1["weight_type"] + params_2["weight_type"],
            "start_at": params_1["start_at"] + params_2["start_at"],
            "end_at": params_1["end_at"] + params_2["end_at"],
        }

        if params_3 is not None:
            ipadapter_params["image"] += params_3["image"]
            ipadapter_params["attn_mask"] += params_3["attn_mask"]
            ipadapter_params["weight"] += params_3["weight"]
            ipadapter_params["weight_type"] += params_3["weight_type"]
            ipadapter_params["start_at"] += params_3["start_at"]
            ipadapter_params["end_at"] += params_3["end_at"]
        if params_4 is not None:
            ipadapter_params["image"] += params_4["image"]
            ipadapter_params["attn_mask"] += params_4["attn_mask"]
            ipadapter_params["weight"] += params_4["weight"]
            ipadapter_params["weight_type"] += params_4["weight_type"]
            ipadapter_params["start_at"] += params_4["start_at"]
            ipadapter_params["end_at"] += params_4["end_at"]
        if params_5 is not None:
            ipadapter_params["image"] += params_5["image"]
            ipadapter_params["attn_mask"] += params_5["attn_mask"]
            ipadapter_params["weight"] += params_5["weight"]
            ipadapter_params["weight_type"] += params_5["weight_type"]
            ipadapter_params["start_at"] += params_5["start_at"]
            ipadapter_params["end_at"] += params_5["end_at"]

        return (ipadapter_params, )
```