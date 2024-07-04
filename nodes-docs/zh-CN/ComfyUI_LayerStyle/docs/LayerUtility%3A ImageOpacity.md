# Documentation
- Class name: ImageOpacity
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

调整图像不透明度。

# Input types

## Required

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- opacity
    - 透明度。
    - Comfy dtype: INT
    - Python dtype: int

- invert_mask
    - 反转蒙版。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

## Optional

- mask
    - 蒙版。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types

- image
    - 处理后的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 处理后的蒙版。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class ImageOpacity:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),  #
                "opacity": ("INT", {"default": 100, "min": 0, "max": 100, "step": 1}),  # 透明度
                "invert_mask": ("BOOLEAN", {"default": True}),  # 反转mask
            },
            "optional": {
                "mask": ("MASK",),  #
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK",)
    RETURN_NAMES = ("image", "mask",)
    FUNCTION = 'image_opacity'
    CATEGORY = '😺dzNodes/LayerUtility'

    def image_opacity(self, image, opacity, invert_mask,
                      mask=None,
                      ):

        ret_images = []
        ret_masks = []
        l_images = []
        l_masks = []
        for l in image:
            l_images.append(torch.unsqueeze(l, 0))
            m = tensor2pil(l)
            if m.mode == 'RGBA':
                l_masks.append(m.split()[-1])
            else:
                l_masks.append(Image.new('L', size=m.size, color='white'))

        if mask is not None:
            if mask.dim() == 2:
                mask = torch.unsqueeze(mask, 0)
            l_masks = []
            for m in mask:
                if invert_mask:
                    m = 1 - m
                l_masks.append(tensor2pil(torch.unsqueeze(m, 0)).convert('L'))

        max_batch = max(len(l_images), len(l_masks))

        for i in range(max_batch):
            _image = l_images[i] if i < len(l_images) else l_images[-1]
            _image = tensor2pil(_image)
            _mask = l_masks[i] if i < len(l_masks) else l_masks[-1]
            if invert_mask:
                _color = Image.new("L", _image.size, color=('white'))
                _mask = ImageChops.invert(_mask)
            else:
                _color = Image.new("L", _image.size, color=('black'))

            alpha = 1 - opacity / 100.0
            ret_mask = Image.blend(_mask, _color, alpha)
            R, G, B, = _image.convert('RGB').split()
            if invert_mask:
                ret_mask = ImageChops.invert(ret_mask)
            ret_image = Image.merge('RGBA', (R, G, B, ret_mask))

            ret_images.append(pil2tensor(ret_image))
            ret_masks.append(image2mask(ret_mask))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0),)
```