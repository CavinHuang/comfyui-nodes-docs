# Documentation
- Class name: GradientOverlay
- Category: 😺dzNodes/LayerStyle
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

渐变覆盖

# Input types
## Required

- background_image
    - 背景图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- layer_image
    - 用于合成的层图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- invert_mask
    - 是否反转遮罩。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- blend_mode
    - 描边的混合模式。
    - Comfy dtype: STRING
    - Python dtype: str

- opacity
    - 不透明度。
    - Comfy dtype: INT
    - Python dtype: int

- start_color
    - 渐变开始端的颜色。
    - Comfy dtype: STRING
    - Python dtype: str

- start_alpha
    - 渐变开始端的透明度。
    - Comfy dtype: INT
    - Python dtype: int

- end_color
    - 渐变结束端的颜色。
    - Comfy dtype: STRING
    - Python dtype: str

- end_alpha
    - 渐变结束端的透明度。
    - Comfy dtype: INT
    - Python dtype: int

- angle
    - 渐变旋转角度。
    - Comfy dtype: INT
    - Python dtype: int

## Optional

- layer_mask
    - 层图像的遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types

- image
    - 生成的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class GradientOverlay:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "background_image": ("IMAGE", ),  #
                "layer_image": ("IMAGE",),  #
                "invert_mask": ("BOOLEAN", {"default": True}),  # 反转mask
                "blend_mode": (chop_mode,),  # 混合模式
                "opacity": ("INT", {"default": 100, "min": 0, "max": 100, "step": 1}),  # 透明度
                "start_color": ("STRING", {"default": "#FFBF30"}),  # 渐变开始颜色
                "start_alpha": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                "end_color": ("STRING", {"default": "#FE0000"}),  # 渐变结束颜色
                "end_alpha": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                "angle": ("INT", {"default": 0, "min": -180, "max": 180, "step": 1}),  # 渐变角度
            },
            "optional": {
                "layer_mask": ("MASK",),  #
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'gradient_overlay'
    CATEGORY = '😺dzNodes/LayerStyle'

    def gradient_overlay(self, background_image, layer_image,
                  invert_mask, blend_mode, opacity,
                  start_color, start_alpha, end_color, end_alpha, angle,
                  layer_mask=None
                  ):

        b_images = []
        l_images = []
        l_masks = []
        ret_images = []
        for b in background_image:
            b_images.append(torch.unsqueeze(b, 0))
        for l in layer_image:
            l_images.append(torch.unsqueeze(l, 0))
            m = tensor2pil(l)
            if m.mode == 'RGBA':
                l_masks.append(m.split()[-1])
        if layer_mask is not None:
            if layer_mask.dim() == 2:
                layer_mask = torch.unsqueeze(layer_mask, 0)
            l_masks = []
            for m in layer_mask:
                if invert_mask:
                    m = 1 - m
                l_masks.append(tensor2pil(torch.unsqueeze(m, 0)).convert('L'))
        if len(l_masks) == 0:
            log(f"Error: {NODE_NAME} skipped, because the available mask is not found.", message_type='error')
            return (background_image,)
        max_batch = max(len(b_images), len(l_images), len(l_masks))
        width, height =  tensor2pil(l_images[0]).size
        _gradient = gradient(start_color, end_color, width, height, float(angle))
        start_color = RGB_to_Hex((start_alpha, start_alpha, start_alpha))
        end_color = RGB_to_Hex((end_alpha, end_alpha, end_alpha))
        comp_alpha = gradient(start_color, end_color, width, height, float(angle))
        comp_alpha = ImageChops.invert(comp_alpha).convert('L')

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

            # 合成layer
            _comp = chop_image(_layer, _gradient, blend_mode, opacity)
            if start_alpha < 255 or end_alpha < 255:
                _comp.paste(_layer, comp_alpha)
            _canvas.paste(_comp, mask=_mask)

            ret_images.append(pil2tensor(_canvas))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```