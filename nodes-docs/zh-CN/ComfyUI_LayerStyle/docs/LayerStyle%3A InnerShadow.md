# Documentation
- Class name: InnerShadow
- Category: 😺dzNodes/LayerStyle
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

生成内阴影效果。

# Input types

## Required

- background_image1
    - 背景图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- layer_image1
    - 用于合成的层图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- invert_mask
    - 是否反转遮罩。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- blend_mode3
    - 阴影的混合模式。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - screen
        - add
        - lighter
        - normal
        - multply
        - subtract
        - difference
        - darker
        - color_burn
        - color_dodge
        - linear_burn
        - linear_dodge
        - overlay
        - soft_light
        - hard_light
        - vivid_light
        - pin_light
        - linear_light
        - hard_mix

- opacity
    - 阴影的不透明度。
    - Comfy dtype: INT
    - Python dtype: int

- distance_x
    - 阴影的水平方向偏移量。
    - Comfy dtype: INT
    - Python dtype: int

- distance_y
    - 阴影的垂直方向偏移量。
    - Comfy dtype: INT
    - Python dtype: int

- grow
    - 阴影扩张幅度。
    - Comfy dtype: INT
    - Python dtype: int

- blur
    - 阴影模糊程度。
    - Comfy dtype: INT
    - Python dtype: int

- shadow_color4
    - 阴影颜色。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional

- layer_mask1,2
    - 层图像的遮罩，阴影按此生成。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types

- image
    - 最终处理后的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class InnerShadow:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        chop_mode = [
            'screen', 'add', 'lighter', 'normal', 'multply', 'subtract', 'difference',
            'darker', 'color_burn', 'color_dodge', 'linear_burn', 'linear_dodge', 'overlay',
            'soft_light', 'hard_light', 'vivid_light', 'pin_light', 'linear_light', 'hard_mix'
        ]

        return {
            "required": {
                "background_image1": ("IMAGE", ),  #
                "layer_image1": ("IMAGE",),  #
                "invert_mask": ("BOOLEAN", {"default": True}),  # 是否反转遮罩
                "blend_mode3": (chop_mode,),  # 阴影的混合模式
                "opacity": ("INT", {"default": 50, "min": 0, "max": 100, "step": 1}),  # 阴影的不透明度
                "distance_x": ("INT", {"default": 5, "min": -9999, "max": 9999, "step": 1}),  # 阴影的水平方向偏移量
                "distance_y": ("INT", {"default": 5, "min": -9999, "max": 9999, "step": 1}),  # 阴影的垂直方向偏移量
                "grow": ("INT", {"default": 2, "min": -9999, "max": 9999, "step": 1}),  # 阴影扩张幅度
                "blur": ("INT", {"default": 15, "min": 0, "max": 100, "step": 1}),  # 阴影模糊程度
                "shadow_color4": ("STRING", {"default": "#000000"}),  # 阴影颜色
            },
            "optional": {
                "layer_mask1,2": ("MASK",),  #
            }
        }


    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'inner_shadow'
    CATEGORY = '😺dzNodes/LayerStyle'

    def inner_shadow(self, background_image1, layer_image1,
                     invert_mask, blend_mode3, opacity, distance_x, distance_y,
                     grow, blur, shadow_color4,
                     layer_mask1=None, layer_mask2=None
                     ):

        b_images = []
        l_images = []
        l_masks = []
        ret_images = []
        for b in background_image1:
            b_images.append(torch.unsqueeze(b, 0))
        for l in layer_image1:
            l_images.append(torch.unsqueeze(l, 0))
            m = tensor2pil(l)
            if m.mode == 'RGBA':
                l_masks.append(m.split()[-1])
        if layer_mask1 is not None or layer_mask2 is not None:
            masks = [layer_mask1, layer_mask2]
            l_masks = []
            for m in masks:
                if m is not None:
                    if m.dim() == 2:
                        m = torch.unsqueeze(m, 0)
                    if invert_mask:
                        m = 1 - m
                    l_masks.append(tensor2pil(torch.unsqueeze(m, 0)).convert('L'))
        if len(l_masks) == 0:
            log(f"Error: {NODE_NAME} skipped, because the available mask is not found.", message_type='error')
            return (background_image1,)
        max_batch = max(len(b_images), len(l_images), len(l_masks))
        distance_x = -distance_x
        distance_y = -distance_y
        shadow_color = Image.new("RGB", tensor2pil(l_images[0]).size, color=shadow_color4)
        for i in range(max_batch):
            background_image = b_images[i] if i < len(b_images) else b_images[-1]
            layer_image = l_images[i] if i < len(l_images) else l_images[-1]
            _mask = l_masks[i] if i < len(l_masks) else l_masks[-1]
            # preprocess
            _canvas = tensor2pil(background_image).convert('RGB')
            _layer = tensor2pil(layer_image).convert('RGB')
            if _mask.size != _layer.size:
                _mask = Image.new('L', _layer.size, 'white')
                log(f"Warning: {NODE_NAME} mask mismatch, dropped!", message_type='warning')

            if distance_x != 0 or distance_y != 0:
                __mask = shift_image(_mask, distance_x, distance_y)  # 位移
            shadow_mask = expand_mask(image2mask(__mask), grow, blur)  #扩张，模糊
            # 合成阴影
            alpha = tensor2pil(shadow_mask).convert('L')
            _shadow = chop_image(_layer, shadow_color, blend_mode3, opacity)
            _layer.paste(_shadow, mask=ImageChops.invert(alpha))
            # 合成layer
            _canvas.paste(_layer, mask=_mask)

            ret_images.append(pil2tensor(_canvas))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```