# Documentation
- Class name: IPAdapterFromParams
- Category: ipadapter/params
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterFromParams该节点的主要功能是从用户提供的参数创建一个 IP 适配器对象

# Input types

## Required
- model
    - 模型，用于指定生成图像的模型。这个参数可以用来控制生成图像的模型，以获得更好的效果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - IP适配器，用于指定生成图像的IP适配器。这个参数可以用来控制生成图像的IP适配器，以获得更好的效果。
    - Comfy dtype: IPADAPTER
    - Python dtype: torch.nn.Module
- ipadapter_params
    - IP适配器参数，用于指定生成图像的IP适配器参数。这个参数可以用来控制生成图像的IP适配器参数，以获得更好的效果。
    - Comfy dtype: IPADAPTER_PARAMS
    - Python dtype: torch.Tensor
- combine_embeds
    - combine_embeds参数决定了嵌入是如何组合的。它至关重要，因为它决定应用于嵌入输入的数学运算，显著影响节点的功能和输出的性质。
    - Comfy dtype: ['concat', 'add', 'subtract', 'average', 'norm average']
    - Python dtype: str
- embeds_scaling
    - embeds_scaling参数决定了嵌入是如何缩放的。它至关重要，因为它决定应用于嵌入输入的数学运算，显著影响节点的功能和输出的性质。
    - Comfy dtype: ['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty']
    - Python dtype: str

## Optional

- image_negative
    - 图像负向，用于指定生成图像的负向。这个参数可以用来控制生成图像的负向，以获得更好的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- clip_vision
    - 用于指定生成图像的clip_vision。这个参数可以用来控制生成图像的clip_vision，以获得更好的效果。
    - Comfy dtype: CLIP_VISION
    - Python dtype: torch.Tensor


# Output types
- model
    - 生成图像的模型，包含了所有输入参数的内容

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterFromParams(IPAdapterAdvanced):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL", ),
                "ipadapter": ("IPADAPTER", ),
                "ipadapter_params": ("IPADAPTER_PARAMS", ),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average"],),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'], ),
            },
            "optional": {
                "image_negative": ("IMAGE",),
                "clip_vision": ("CLIP_VISION",),
            }
        }

    CATEGORY = "ipadapter/params"
```