# Documentation
- Class name: GetColorToneV2
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

GetColorTone的V2升级版。可以指定获取主体或背景的主色或平均色。

# Input types
## Required

- image
    - 输入的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mode
    - 模式，有两种可选择，主颜色main_color和平均色average。
    - Comfy dtype: STRING
    - Python dtype: str
    - 可选值: 'average', 'main'

- color_of
    - 提供三个选项，entire, background和subject, 分别表示选择整个图片，背景，或主体的颜色。
    - Comfy dtype: STRING
    - Python dtype: str
    - 可选值: 'entire', 'subject', 'background'

- remove_bkgd_method
    - 背景识别的方法, 有BiRefNet和RMBG V1.4两种可以选择。
    - Comfy dtype: STRING
    - Python dtype: str
    - 可选值: 'BiRefNet', 'RMBG 1.4'

- invert_mask
    - 是否反转mask。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- mask_grow
    - mask扩张的像素数。
    - Comfy dtype: INT
    - Python dtype: int

## Optional

- mask
    - 输入的mask。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


# Output types

- image
    - 输出的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- color_in_hex
    - 使用16进制RGB字符串格式描述，例如 '#FA3D86'。
    - Comfy dtype: STRING
    - Python dtype: str

- HSV color in list
    - HSV颜色值。
    - Comfy dtype: LIST
    - Python dtype: list

# Usage tips
- Infra type: GPU

# Source code
```
class GetColorToneV2:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        remove_background_list = ['BiRefNet', 'RMBG 1.4',]
        subject_list = ['entire', 'background', 'subject']
        mode_list = ['main_color', 'average']
        return {
            "required": {
                "image": ("IMAGE", ),  #
                "mode": (mode_list,),  # 主色/平均色
                "color_of": (subject_list,),
                "remove_bkgd_method": (remove_background_list,),
                "invert_mask": ("BOOLEAN", {"default": False}),  # 反转mask#
                "mask_grow": ("INT", {"default": 16, "min": -999, "max": 999, "step": 1}),
            },
            "optional": {
                "mask": ("MASK",),  #
            }
        }

    RETURN_TYPES = ("IMAGE", "STRING", "LIST",)
    RETURN_NAMES = ("image", "color_in_hex", "HSV color in list",)
    FUNCTION = 'get_color_tone_v2'
    CATEGORY = '😺dzNodes/LayerUtility'

    def get_color_tone_v2(self, image, mode, remove_bkgd_method, color_of, invert_mask, mask_grow,
                  mask=None
                  ):

        _images = []
        _masks = []
        ret_images = []
        need_rmbg = False
        for i in image:
            _images.append(torch.unsqueeze(i, 0))
            m = tensor2pil(i)
            if m.mode == 'RGBA':
                _masks.append(1 - image2mask(m.split()[-1]))
            else:
                need_rmbg = True
        if mask is not None:
            if mask.dim() == 2:
                mask = torch.unsqueeze(mask, 0)
            _masks = []
            for m in mask:
                if not invert_mask:
                    m = 1 - m
                _masks.append(torch.unsqueeze(m, 0))
            need_rmbg = False

        max_batch = max(len(_images), len(_masks))

        if remove_bkgd_method == 'BiRefNet':
            from .birefnet_func import BiRefNetRemoveBackground
            birefnetrmbg = BiRefNetRemoveBackground()

        for i in range(max_batch):
            _image = _images[i] if i < len(_images) else _images[-1]
            _image = tensor2pil(_image).convert("RGB")
            if need_rmbg:
                if remove_bkgd_method == 'BiRefNet':
                    _mask = birefnetrmbg.generate_mask(_image)
                else:
                    _mask = RMBG(_image)
                _mask = image2mask(_mask)
                _mask = 1 - _mask
            else:
                _mask = _masks[i] if i < len(_masks) else _masks[-1]

            if mask_grow != 0:
                _mask = expand_mask(_mask, mask_grow, 0)  # 扩张，模糊

            if color_of == 'subject':
                _mask = 1 - _mask

            if color_of == 'entire':
                blured_image = gaussian_blur(_image, int((_image.width + _image.height) / 400))
            else:
                _mask = tensor2pil(_mask)
                pixel_spread_image = pixel_spread(_image, _mask.convert('RGB'))
                blured_image = gaussian_blur(pixel_spread_image, int((_image.width + _image.height) / 400))
            if mode == 'main_color':
                ret_color = get_image_color_tone(blured_image)
            else:
                ret_color = get_image_color_average(blured_image)

            ret_image = Image.new('RGB', size=_image.size, color=ret_color)
            ret_images.append(pil2tensor(ret_image))
        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        hsv_color = RGB_to_HSV(Hex_to_RGB(ret_color))
        return (torch.cat(ret_images, dim=0), ret_color, hsv_color,)
```