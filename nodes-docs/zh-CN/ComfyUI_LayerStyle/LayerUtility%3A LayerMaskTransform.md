# Documentation
- Class name: LayerMaskTransform
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

与LayerImageTransform类似，这个节点用于单独对layer_mask进行变换，可改变大小，旋转，改变长宽比以及镜像翻转。

# Input types

## Required

- mask
    - 蒙版。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

- x
    - 坐标x值。
    - Comfy dtype: INT
    - Python dtype: int

- y
    - 坐标y值。
    - Comfy dtype: INT
    - Python dtype: int

- mirror
    - 镜像翻转。提供2种翻转模式, 水平翻转和垂直翻转。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - None
        - horizontal
        - vertical

- scale
    - 图层放大倍数，1.0 表示原大。
    - Comfy dtype: FLOAT
    - Python dtype: float

- aspect_ratio
    - 图层长宽比。1.0 是原始比例，大于此值表示拉长，小于此值表示压扁。
    - Comfy dtype: FLOAT
    - Python dtype: float

- rotate
    - 图层旋转度数。
    - Comfy dtype: FLOAT
    - Python dtype: float

- transform_method
    - 用于图层放大和旋转的采样方法，包括lanczos、bicubic、hamming、bilinear、box和nearest。不同的采样方法会影响合成的画质和画面处理时间。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - lanczos
        - bicubic
        - hamming
        - bilinear
        - box
        - nearest

- anti_aliasing
    - 抗锯齿，范围从0-16，数值越大，锯齿越不明显。过高的数值将显著降低节点的处理速度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types

- mask
    - 变换后的蒙版。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class LayerMaskTransform:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        mirror_mode = ['None', 'horizontal', 'vertical']
        method_mode = ['lanczos', 'bicubic', 'hamming', 'bilinear', 'box', 'nearest']
        return {
            "required": {
                "mask": ("MASK",),  #
                "x": ("INT", {"default": 0, "min": -99999, "max": 99999, "step": 1}),
                "y": ("INT", {"default": 0, "min": -99999, "max": 99999, "step": 1}),
                "mirror": (mirror_mode,),  # 镜像翻转
                "scale": ("FLOAT", {"default": 1, "min": 0.01, "max": 100, "step": 0.01}),
                "aspect_ratio": ("FLOAT", {"default": 1, "min": 0.01, "max": 100, "step": 0.01}),
                "rotate": ("FLOAT", {"default": 0, "min": -999999, "max": 999999, "step": 0.01}),
                "transform_method": (method_mode,),
                "anti_aliasing": ("INT", {"default": 2, "min": 0, "max": 16, "step": 1}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = 'layer_mask_transform'
    CATEGORY = '😺dzNodes/LayerUtility'

    def layer_mask_transform(self, mask, x, y, mirror, scale, aspect_ratio, rotate,
                            transform_method, anti_aliasing,
                  ):

        l_masks = []
        ret_masks = []

        if mask.dim() == 2:
            mask = torch.unsqueeze(mask, 0)
        for m in mask:
            l_masks.append(torch.unsqueeze(m, 0))
        for i in range(len(l_masks)):
            _mask = l_masks[i] if i < len(l_masks) else l_masks[-1]
            _mask = tensor2pil(_mask).convert('L')
            _mask_canvas = Image.new('L', size=_mask.size, color='black')
            orig_width = _mask.width
            orig_height = _mask.height
            target_layer_width = int(orig_width * scale)
            target_layer_height = int(orig_height * scale * aspect_ratio)
            # mirror
            if mirror == 'horizontal':
                _mask = _mask.transpose(Image.FLIP_LEFT_RIGHT)
            elif mirror == 'vertical':
                _mask = _mask.transpose(Image.FLIP_TOP_BOTTOM)
            # scale
            _mask = _mask.resize((target_layer_width, target_layer_height))
            # rotate
            _, _mask, _ = image_rotate_extend_with_alpha(_mask.convert('RGB'), rotate, _mask, transform_method, anti_aliasing)
            paste_x = (orig_width - _mask.width) // 2 + x
            paste_y = (orig_height - _mask.height) // 2 + y
            # composit layer
            _mask_canvas.paste(_mask, (paste_x, paste_y))

            ret_masks.append(image2mask(_mask_canvas))

        log(f"{NODE_NAME} Processed {len(l_masks)} mask(s).", message_type='finish')
        return (torch.cat(ret_masks, dim=0),)
```