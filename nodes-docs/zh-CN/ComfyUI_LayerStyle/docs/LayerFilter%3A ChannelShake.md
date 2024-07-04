# Documentation
- Class name: ChannelShake
- Category: 😺dzNodes/LayerFilter
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

通道错位。类似抖音logo的效果。

# Input types
## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- distance
    - 通道错位的距离。
    - Comfy dtype: INT
    - Python dtype: int
    - 取值范围: 1-999

- angle
    - 通道错位的角度。
    - Comfy dtype: FLOAT
    - Python dtype: float
    - 取值范围: -360-360

- mode
    - 通道错位的模式。
    - Comfy dtype: ENUM
    - Python dtype: str
    - 可选值: RGB, RBG, BGR, BRG, GBR, GRB

# Output types

- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ChannelShake:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        channel_mode = ['RGB', 'RBG', 'BGR', 'BRG', 'GBR', 'GRB']
        return {
            "required": {
                "image": ("IMAGE", ),  #
                "distance": ("INT", {"default": 20, "min": 1, "max": 999, "step": 1}),  # 距离
                "angle": ("FLOAT", {"default": 40, "min": -360, "max": 360, "step": 0.1}),  # 角度
                "mode": (channel_mode,),  # 模式
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'channel_shake'
    CATEGORY = '😺dzNodes/LayerFilter'

    def channel_shake(self, image, distance, angle, mode, ):

        ret_images = []

        for i in image:
            i = torch.unsqueeze(i, 0)
            _canvas = tensor2pil(i).convert('RGB')
            R, G, B = _canvas.split()
            x = int(math.cos(angle) * distance)
            y = int(math.sin(angle) * distance)
            if mode.startswith('R'):
                R = shift_image(R.convert('RGB'), -x, -y).convert('L')
            if mode.startswith('G'):
                G = shift_image(G.convert('RGB'), -x, -y).convert('L')
            if mode.startswith('B'):
                B = shift_image(B.convert('RGB'), -x, -y).convert('L')
            if mode.endswith('R'):
                R = shift_image(R.convert('RGB'), x, y).convert('L')
            if mode.endswith('G'):
                G = shift_image(G.convert('RGB'), x, y).convert('L')
            if mode.endswith('B'):
                B = shift_image(B.convert('RGB'), x, y).convert('L')

            ret_image = Image.merge('RGB', [R, G, B])
            ret_images.append(pil2tensor(ret_image))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```