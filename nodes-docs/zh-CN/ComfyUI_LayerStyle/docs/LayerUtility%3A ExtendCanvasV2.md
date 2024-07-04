# Documentation
- Class name: ExtendCanvas
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

ExtendCanvas的V2升级版。

在ExtendCanvas基础上修改了color为字符串类型，支持外接ColorPicker输入。

# Input types
## Required

- image
    - 图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- invert_mask
    - 反转mask
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- top
    - 顶部扩展。
    - Comfy dtype: INT
    - Python dtype: int

- bottom
    - 底部扩展。
    - Comfy dtype: INT
    - Python dtype: int

- left
    - 左侧扩展。
    - Comfy dtype: INT
    - Python dtype: int

- right
    - 右侧扩展。
    - Comfy dtype: INT
    - Python dtype: int

- color
    - 颜色。
    - Comfy dtype: STRING
    - Python dtype: str


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
class ExtendCanvasV2:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),
                "invert_mask": ("BOOLEAN", {"default": True}),  # 反转mask
                "top": ("INT", {"default": 0, "min": 0, "max": 99999, "step": 1}),
                "bottom": ("INT", {"default": 0, "min": 0, "max": 99999, "step": 1}),
                "left": ("INT", {"default": 0, "min": 0, "max": 99999, "step": 1}),
                "right": ("INT", {"default": 0, "min": 0, "max": 99999, "step": 1}),
                "color": ("STRING", {"default": "#000000"}),
            },
            "optional": {
                "mask": ("MASK",),  #
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK",)
    RETURN_NAMES = ("image", "mask")
    FUNCTION = 'extend_canvas_v2'
    CATEGORY = '😺dzNodes/LayerUtility'

    def extend_canvas_v2(self, image, invert_mask,
                  top, bottom, left, right, color,
                  mask=None,
                  ):

        l_images = []
        l_masks = []
        ret_images = []
        ret_masks = []

        for l in image:
            l_images.append(torch.unsqueeze(l, 0))
            m = tensor2pil(l)
            if m.mode == 'RGBA':
                l_masks.append(m.split()[-1])

        if mask is not None:
            if mask.dim() == 2:
                mask = torch.unsqueeze(mask, 0)
            l_masks = []
            for m in mask:
                if invert_mask:
                    m = 1 - m
                l_masks.append(tensor2pil(torch.unsqueeze(m, 0)).convert('L'))
        else:
            if len(l_masks) == 0:
                l_masks.append(Image.new('L', size=tensor2pil(l_images[0]).size, color='white'))

        max_batch = max(len(l_images), len(l_masks))
        for i in range(max_batch):

            _image = l_images[i] if i < len(l_images) else l_images[-1]
            _image = tensor2pil(_image).convert('RGB')
            _mask = l_masks[i] if i < len(l_masks) else l_masks[-1]

            width = _image.width + left + right
            height = _image.height + top + bottom
            _canvas = Image.new('RGB', (width, height), color)
            _mask_canvas = Image.new('L', (width, height), "black")

            _canvas.paste(_image, box=(left,top))
            _mask_canvas.paste(_mask.convert('L'), box=(left, top))

            ret_images.append(pil2tensor(_canvas))
            ret_masks.append(image2mask(_mask_canvas))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0),)
```