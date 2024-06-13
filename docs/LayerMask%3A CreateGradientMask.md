# Documentation
- Class name: CreateGradientMask
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

创建一个渐变的遮罩。请注意此节点与MaskGradient的区别。

# Input types
## Required
- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- width
    - 画面的宽度。如果有size_as输入，此设置将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

- height
    - 画面的高度。如果有size_as输入，此设置将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

- gradient_side
    - 从哪个边产生渐变。有5个方向：顶侧top、底侧bottom、左侧left、右侧right和中央center。
    - Comfy dtype: ENUM
    - Python dtype: str
    - Options:
        - bottom
        - top
        - left
        - right
        - center

- gradient_scale
    - 渐变距离。默认值100表示渐变产生一侧完全透明，另一侧完全不透明。数值越小，从透明到不透明的距离越短。
    - Comfy dtype: INT
    - Python dtype: int

- gradient_offset
    - 渐变位置偏移。gradient_side为center时这里调整渐变区域的大小，正值是变小，负值是扩大。
    - Comfy dtype: INT
    - Python dtype: int

- opacity
    - 渐变的不透明度。
    - Comfy dtype: INT
    - Python dtype: int

## Optional

- size_as
    - 用于指定输出的大小。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 输出的遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class CreateGradientMask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        side = ['bottom', 'top', 'left', 'right', 'center']
        return {
            "required": {
                "width": ("INT", {"default": 512, "min": 4, "max": 99999, "step": 1}),
                "height": ("INT", {"default": 512, "min": 4, "max": 99999, "step": 1}),
                "gradient_side": (side,),
                "gradient_scale": ("INT", {"default": 100, "min": 1, "max": 9999, "step": 1}),
                "gradient_offset": ("INT", {"default": 0, "min": -9999, "max": 9999, "step": 1}),
                "opacity": ("INT", {"default": 100, "min": 0, "max": 100, "step": 1}),
            },
            "optional": {
                "size_as": (any, {}),
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = 'create_gradient_mask'
    CATEGORY = '😺dzNodes/LayerMask'

    def create_gradient_mask(self, width, height, gradient_side, gradient_scale, gradient_offset, opacity, size_as=None):

        if size_as is not None:
            if size_as.shape[0] > 0:
                _asimage = tensor2pil(size_as[0])
            else:
                _asimage = tensor2pil(size_as)
            width, height = _asimage.size

        _black = Image.new('L', size=(width, height), color='black')
        _white = Image.new('L', size=(width, height), color='white')
        _canvas = copy.deepcopy(_black)
        debug_image1 = copy.deepcopy(_black).convert('RGB')
        debug_image2 = copy.deepcopy(_black).convert('RGB')
        start_color = '#FFFFFF'
        end_color = '#000000'
        if gradient_side == 'bottom':
            _gradient = create_gradient(start_color, end_color, width, height, direction='bottom')
            if gradient_scale != 100:
                _gradient = _gradient.resize((width, int(height * gradient_scale / 100)))
            _canvas.paste(_gradient.convert('L'), box=(0, gradient_offset))
            if gradient_offset > height:
                _canvas = _white
            elif gradient_offset > 0:
                _canvas.paste(_white, box=(0, gradient_offset - height))
        elif gradient_side == 'top':
            _gradient = create_gradient(start_color, end_color, width, height, direction='top')
            if gradient_scale != 100:
                _gradient = _gradient.resize((width, int(height * gradient_scale / 100)))
            _canvas.paste(_gradient.convert('L'), box=(0, height - int(height * gradient_scale / 100) + gradient_offset))
            if gradient_offset < -height:
                _canvas = _white
            elif gradient_offset < 0:
                _canvas.paste(_white, box=(0, height + gradient_offset))
        elif gradient_side == 'left':
            _gradient = create_gradient(start_color, end_color, width, height, direction='left')
            if gradient_scale != 100:
                _gradient = _gradient.resize((int(width * gradient_scale / 100), height))
            _canvas.paste(_gradient.convert('L'), box=(width - int(width * gradient_scale / 100) + gradient_offset, 0))
            if gradient_offset < -width:
                _canvas = _white
            elif gradient_offset < 0:
                _canvas.paste(_white, box=(width + gradient_offset, 0))
        elif gradient_side == 'right':
            _gradient = create_gradient(start_color, end_color, width, height, direction='right')
            if gradient_scale != 100:
                _gradient = _gradient.resize((int(width * gradient_scale / 100), height))
            _canvas.paste(_gradient.convert('L'), box=(gradient_offset, 0))
            if gradient_offset > width:
                _canvas = _white
            elif gradient_offset > 0:
                _canvas.paste(_white, box=(gradient_offset - width, 0))
        else:
            _gradient = create_box_gradient(start_color_inhex='#000000', end_color_inhex='#FFFFFF',
                                            width=width, height=height, scale=int(gradient_scale))
            _gradient = _gradient.convert('L')
            debug_image1 = _gradient
            _blur_mask = Image.new('L', size=(width*2, height*2), color='black')
            _blur_mask.paste(_gradient, box=(int(width/2), int(height/2)))
            _blur_mask = gaussian_blur(_blur_mask, int((width + height) * gradient_scale / 100 / 16))
            _gamma_mask = gamma_trans(_blur_mask, 0.15)
            (crop_x, crop_y, crop_width, crop_height) = mask_area(_gamma_mask)
            crop_box = (crop_x, crop_y, crop_x + crop_width, crop_y + crop_height)
            _blur_mask = _blur_mask.crop(crop_box)
            _blur_mask = _blur_mask.resize((width, height), Image.BILINEAR)
            if gradient_offset != 0:
                resize_width = int(width - gradient_offset)
                resize_height = int(height - gradient_offset)
                if resize_width < 1:
                    resize_width = 1
                if resize_height < 1:
                    resize_height = 1
                _blur_mask = _blur_mask.resize((resize_width, resize_height), Image.BILINEAR)
                paste_box = (int((width - resize_width) / 2), int((height - resize_height) / 2))
            else:
                paste_box = (0,0)
            _canvas.paste(_blur_mask, box=paste_box)
        # opacity
        if opacity < 100:
            _canvas = chop_image(_black, _canvas, 'normal', opacity)
        log(f"{NODE_NAME} Processed.", message_type='finish')
        return (image2mask(_canvas),)

```