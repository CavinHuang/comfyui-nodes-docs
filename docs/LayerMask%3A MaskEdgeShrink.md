# Documentation
- Class name: MaskEdgeShrink
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

使mask边缘平滑地过渡收缩，并保留边缘细节。

# Input types

## Required

- mask
    - 输入的遮罩
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

- invert_mask
    - 反转遮罩
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- shrink_level
    - 收缩级别。
    - Comfy dtype: INT
    - Python dtype: int

- soft
    - 软化级别。
    - Comfy dtype: INT
    - Python dtype: int

- edge_shrink
    - 边缘收缩。
    - Comfy dtype: INT
    - Python dtype: int

- edge_reserve
    - 透明度保留。
    - Comfy dtype: INT
    - Python dtype: int

# Output types

- mask
    - 输出的遮罩
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class MaskEdgeShrink:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "mask": ("MASK", ),  #
                "invert_mask": ("BOOLEAN", {"default": True}),  # 反转mask
                "shrink_level": ("INT", {"default": 4, "min": 0, "max": 16, "step": 1}),
                "soft": ("INT", {"default": 6, "min": 0, "max": 64, "step": 1}),
                "edge_shrink": ("INT", {"default": 1, "min": 0, "max": 999, "step": 1}),
                "edge_reserve": ("INT", {"default": 25, "min": 0, "max": 100, "step": 1}),  # 透明度
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = 'mask_edge_shrink'
    CATEGORY = '😺dzNodes/LayerMask'

    def mask_edge_shrink(self, mask, invert_mask, shrink_level, soft, edge_shrink, edge_reserve):

        l_masks = []
        ret_masks = []

        if mask.dim() == 2:
            mask = torch.unsqueeze(mask, 0)

        for m in mask:
            if invert_mask:
                m = 1 - m
            l_masks.append(tensor2pil(torch.unsqueeze(m, 0)).convert('L'))

        glow_range = shrink_level * soft
        blur = 12

        for i in range(len(l_masks)):
            _mask = l_masks[i]
            _canvas = Image.new('RGB', size=_mask.size, color='black')
            _layer = Image.new('RGB', size=_mask.size, color='white')
            loop_grow = glow_range
            inner_mask = _mask
            for x in range(shrink_level):
                _color = step_color('#FFFFFF', '#000000', shrink_level, x)
                glow_mask = expand_mask(image2mask(inner_mask), -loop_grow, blur / (x+0.1))  #扩张，模糊
                # 合成
                color_image = Image.new("RGB", _layer.size, color=_color)
                alpha = tensor2pil(mask_invert(glow_mask)).convert('L')
                _glow = chop_image(_layer, color_image, 'subtract', int(step_value(1, 100, shrink_level, x)))
                _layer.paste(_glow, mask=alpha)
                loop_grow = loop_grow - int(glow_range / shrink_level)
            # 合成layer
            _edge = tensor2pil(expand_mask(image2mask(_mask), -edge_shrink, 0)).convert('RGB')
            _layer = chop_image(_layer, _edge, 'normal', edge_reserve)
            _layer.paste(_canvas, mask=ImageChops.invert(_mask))

            ret_masks.append(image2mask(_layer))

        log(f"{NODE_NAME} Processed {len(ret_masks)} mask(s).", message_type='finish')
        return (torch.cat(ret_masks, dim=0),)
```