# Documentation
- Class name: Film
- Category: 😺dzNodes/LayerFilter
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

模拟胶片的颗粒、暗边和边缘模糊，支持输入深度图模拟虚焦。
这个节点是digitaljohn/comfyui-propost的重新封装，感谢原作者。

# Input types
## Required

- image
    - 图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- center_x
    - 暗边和径向模糊的中心点位置横坐标，0表示最左侧，1表示最右侧，0.5表示在中心。
    - Comfy dtype: FLOAT
    - Python dtype: float

- center_y
    - 暗边和径向模糊的中心点位置纵坐标，0表示最左侧，1表示最右侧，0.5表示在中心。
    - Comfy dtype: FLOAT
    - Python dtype: float

- saturation
    - 颜色饱和度，1为原始值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- vignette_intensity
    - 暗边强度，0为原始值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- grain_power
    - 噪点强度。数值越大，噪点越明显。。
    - Comfy dtype: FLOAT
    - Python dtype: float

- grain_scale
    - 噪点颗粒大小。数值越大，颗粒越大。
    - Comfy dtype: FLOAT
    - Python dtype: float

- grain_sat
    - 噪点的色彩饱和度。0表示黑白噪点，数值越大，彩色越明显
    - Comfy dtype: FLOAT
    - Python dtype: float

- grain_shadows
    - 噪点阴影强度。数值越大，阴影越明显。
    - Comfy dtype: FLOAT
    - Python dtype: float

- grain_highs
    - 噪点高光强度。数值越大，高光越明显。
    - Comfy dtype: FLOAT
    - Python dtype: float

- blur_strength
    - 模糊强度。0表示不模糊。
    - Comfy dtype: INT
    - Python dtype: int

- blur_focus_spread
    - 焦点扩散范围。数值越大，清晰的范围越大。
    - Comfy dtype: FLOAT
    - Python dtype: float

- focal_depth
    - 模拟虚焦的焦点距离。0表示焦点在最远，1表示焦点在最近。此项设置只在depth_map有输入时才生效。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Optional

- depth_map
    - 深度图输入，由此模拟虚焦效果。此项是可选输入，如果没有输入则模拟为图片边缘的径向模糊。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


# Output types

- image
    - 生成的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 生成的mask。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class Film:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),  #
                "center_x": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": 0.01}),
                "center_y": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": 0.01}),
                "saturation": ("FLOAT", {"default": 1, "min": 0.01, "max": 3, "step": 0.01}),
                "vignette_intensity": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": 0.01}),
                "grain_power": ("FLOAT", {"default": 0.15, "min": 0, "max": 1, "step": 0.01}),
                "grain_scale": ("FLOAT", {"default": 1.0, "min": 0.1, "max": 10, "step": 0.1}),
                "grain_sat": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": 0.01}),
                "grain_shadows": ("FLOAT", {"default": 0.6, "min": 0, "max": 1, "step": 0.01}),
                "grain_highs": ("FLOAT", {"default": 0.2, "min": 0, "max": 1, "step": 0.01}),
                "blur_strength": ("INT", {"default": 90, "min": 0, "max": 256, "step": 1}),
                "blur_focus_spread": ("FLOAT", {"default": 2.2, "min": 0.1, "max": 8, "step": 0.1}),
                "focal_depth": ("FLOAT", {"default": 0.9, "min": 0.0, "max": 1, "step": 0.01}),
            },
            "optional": {
                "depth_map": ("IMAGE",),  #
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'film'
    CATEGORY = '😺dzNodes/LayerFilter'

    def film(self, image, center_x, center_y, saturation, vignette_intensity,
                  grain_power, grain_scale, grain_sat, grain_shadows, grain_highs,
                  blur_strength, blur_focus_spread, focal_depth,
                  depth_map=None
                  ):

        ret_images = []

        for i in image:
            i = torch.unsqueeze(i, 0)
            _canvas = tensor2pil(i).convert('RGB')

            if saturation != 1:
                color_image = ImageEnhance.Color(_canvas)
                _canvas = color_image.enhance(factor= saturation)

            if blur_strength:
                if depth_map is not None:
                    depth_map = tensor2pil(depth_map).convert('L').convert('RGB')
                    if depth_map.size != _canvas.size:
                        depth_map.resize((_canvas.size), Image.BILINEAR)
                    _canvas = depthblur_image(_canvas, depth_map, blur_strength, focal_depth, blur_focus_spread)
                else:
                    _canvas = radialblur_image(_canvas, blur_strength, center_x, center_y, blur_focus_spread * 2)

            if vignette_intensity:
                # adjust image gamma and saturation
                _canvas = gamma_trans(_canvas, 1 - vignette_intensity / 3)
                color_image = ImageEnhance.Color(_canvas)
                _canvas = color_image.enhance(factor= 1+ vignette_intensity / 3)
                # add vignette
                _canvas = vignette_image(_canvas, vignette_intensity, center_x, center_y)

            if grain_power:
                _canvas = filmgrain_image(_canvas, grain_scale, grain_power, grain_shadows, grain_highs, grain_sat)

            ret_image = _canvas
            ret_images.append(pil2tensor(ret_image))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```