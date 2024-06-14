# Documentation
- Class name: MaskByColor
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

根据颜色创建Mask的节点。

# Input types

## Required

- image
    - 输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- color
    - 颜色选择器。点击色块选择颜色，可以使用选色器面板上的吸管拾取屏幕颜色。注意:使用吸管时，需将浏览器窗口最大化。
    - Comfy dtype: COLOR
    - Python dtype: str
    - 默认值: #FFFFFF

- color_in_HEX
    - 输入色值。如果此项有输入，则优先使用，忽略color选取的颜色。
    - Comfy dtype: STRING
    - Python dtype: str
    - 默认值: ""

- threshold
    - 遮罩范围阈值，数值越大，遮罩范围越大。
    - Comfy dtype: INT
    - Python dtype: int

- fix_gap
    - 修补遮罩中的空隙。如果遮罩中有比较明显的空隙，适当调高此数值。
    - Comfy dtype: INT
    - Python dtype: int

- fix_threshold
    - 修补遮罩的阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- invert_mask
    - 是否反转遮罩。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

## Optional

- mask
    - 遮罩输入。此输入是可选项，如果有遮罩则仅遮罩内的颜色被纳入范围。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types

- mask
    - 输出Mask。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class MaskByColor:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE", ),
                "color": ("COLOR", {"default": "#FFFFFF"},),
                "color_in_HEX": ("STRING", {"default": ""}),
                "threshold": ("INT", { "default": 0, "min": 0, "max": 100, "step": 1, }),
                "fix_gap": ("INT", {"default": 2, "min": 0, "max": 32, "step": 1}),
                "fix_threshold": ("FLOAT", {"default": 0.75, "min": 0.01, "max": 0.99, "step": 0.01}),
                "invert_mask": ("BOOLEAN", {"default": False}),  # 反转mask
            },
            "optional": {
                "mask": ("MASK",),  #
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = "mask_by_color"
    CATEGORY = '😺dzNodes/LayerMask'

    def mask_by_color(self, image, color, color_in_HEX, threshold,
                      fix_gap, fix_threshold, invert_mask, mask=None):

        if color_in_HEX != "" and color_in_HEX.startswith('#') and len(color_in_HEX) == 7:
            color = color_in_HEX

        ret_masks = []
        l_images = []
        l_masks = []

        for l in image:
            l_images.append(torch.unsqueeze(l, 0))
            m = tensor2pil(l)
            if m.mode == 'RGBA':
                l_masks.append(m.split()[-1])
            else:
                l_masks.append(Image.new('L', m.size, 'white'))
        if mask is not None:
            if mask.dim() == 2:
                mask = torch.unsqueeze(mask, 0)
            l_masks = []
            for m in mask:
                if invert_mask:
                    m = 1 - m
                l_masks.append(tensor2pil(torch.unsqueeze(m, 0)).convert('L'))

        for i in range(len(l_images)):
            img = l_images[i] if i < len(l_images) else l_images[-1]
            img = tensor2pil(img)
            _mask = l_masks[i] if i < len(l_masks) else l_masks[-1]

            mask = Image.new('L', _mask.size, 'black')
            mask.paste(create_mask_from_color_tensor(img, color, threshold), mask=_mask)
            mask = image2mask(mask)
            if invert_mask:
                mask = 1 - mask
            if fix_gap:
                mask = mask_fix(mask, 1, fix_gap, fix_threshold, fix_threshold)
            ret_masks.append(mask)

        return (torch.cat(ret_masks, dim=0), )
```