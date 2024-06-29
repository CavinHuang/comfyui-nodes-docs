# Documentation
- Class name: IPAdapterRegionalConditioning
- Category: ipadapter/params
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterRegionalConditioning节点是一种用于实现区域性条件化生成图像的工具。这个节点主要用于处理图像生成过程中指定区域的注意力遮罩和文本条件化。

# Input types

## Required
- image
    - 参考图像，这个图像将被编码并用作生成新图像的条件。确保参考图像的关键部分位于图像的中心，这样可以获得更好的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_weight
    - 图像权重，用于调整图像的影响力。这个参数可以用来平衡图像和文本之间的关系，确保生成的图像符合预期。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prompt_weight
    - 文本权重，用于调整文本的影响力。这个参数可以用来平衡文本和图像之间的关系，确保生成的图像符合预期。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - 权重类型，用于指定权重的计算方法。这个参数可以用来控制权重的计算方式，以获得更好的生成效果。
    - Comfy dtype: WEIGHT_TYPES
    - Python dtype: str
- start_at
    - 开始位置，用于指定条件化生成的开始位置。这个参数可以用来控制生成图像的起始位置，以获得更好的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - 结束位置，用于指定条件化生成的结束位置。这个参数可以用来控制生成图像的结束位置，以获得更好的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- mask
    - 注意力遮罩，用于指定生成图像的注意力区域。这个参数可以用来控制生成图像的关注区域，以获得更好的效果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- positive
    - 正向条件化，用于指定生成图像的正向条件。这个参数可以用来控制生成图像的正向条件，以获得更好的效果。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - 负向条件化，用于指定生成图像的负向条件。这个参数可以用来控制生成图像的负向条件，以获得更好的效果。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor


# Output types

- IPADAPTER_PARAMS
  - IP适配器参数，包含了所有输入参数的内容
- POSITIVE
  - 正向条件化，包含了所有输入参数的内容
- NEGATIVE
  - 负向条件化，包含了所有输入参数的内容

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterRegionalConditioning:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            #"set_cond_area": (["default", "mask bounds"],),
            "image": ("IMAGE",),
            "image_weight": ("FLOAT", { "default": 1.0, "min": -1.0, "max": 3.0, "step": 0.05 }),
            "prompt_weight": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 10.0, "step": 0.05 }),
            "weight_type": (WEIGHT_TYPES, ),
            "start_at": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
            "end_at": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
        }, "optional": {
            "mask": ("MASK",),
            "positive": ("CONDITIONING",),
            "negative": ("CONDITIONING",),
        }}

    RETURN_TYPES = ("IPADAPTER_PARAMS", "CONDITIONING", "CONDITIONING", )
    RETURN_NAMES = ("IPADAPTER_PARAMS", "POSITIVE", "NEGATIVE")
    FUNCTION = "conditioning"

    CATEGORY = "ipadapter/params"

    def conditioning(self, image, image_weight, prompt_weight, weight_type, start_at, end_at, mask=None, positive=None, negative=None):
        set_area_to_bounds = False #if set_cond_area == "default" else True

        if mask is not None:
            if positive is not None:
                positive = conditioning_set_values(positive, {"mask": mask, "set_area_to_bounds": set_area_to_bounds, "mask_strength": prompt_weight})
            if negative is not None:
                negative = conditioning_set_values(negative, {"mask": mask, "set_area_to_bounds": set_area_to_bounds, "mask_strength": prompt_weight})

        ipadapter_params = {
            "image": [image],
            "attn_mask": [mask],
            "weight": [image_weight],
            "weight_type": [weight_type],
            "start_at": [start_at],
            "end_at": [end_at],
        }

        return (ipadapter_params, positive, negative, )
```