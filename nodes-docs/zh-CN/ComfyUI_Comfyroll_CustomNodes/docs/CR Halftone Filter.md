# Documentation
- Class name: CR_HalftoneFilter
- Category: Comfyroll/Graphics/Filter
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_HalftoneFilter 节点为图像应用半色调效果，模拟打印点的外观。它提供了对点形状、大小和分辨率的定制，以创建各种半色调风格。该节点旨在增强图形设计和艺术应用的视觉效果，使用户能够实现复古或风格化的外观。

# Input types
## Required
- image
    - 要应用半色调效果的输入图像。它是节点处理的基础，并决定了半色调转换的主题。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- dot_size
    - 半色调效果中使用的点的大小，影响最终图像的粒度。较大的点大小会导致更粗糙的外观，而较小的尺寸则提供更精细的细节。
    - Comfy dtype: INT
    - Python dtype: int
- dot_shape
    - 确定半色调图案中点的形状。在椭圆和矩形之间的选择可以改变输出图像的视觉纹理，提供了一种调整半色调效果美感的手段。
    - Comfy dtype: COMBO['ellipse', 'rectangle']
    - Python dtype: str
- resolution
    - 控制半色调效果的分辨率。'hi-res'选项将输出大小加倍，为半色调图案提供更高的定义，但代价是增加处理时间和资源使用。
    - Comfy dtype: COMBO['normal', 'hi-res (2x output size)']
    - Python dtype: str
- angle_c
    - 指定CMYK颜色空间中青色通道的角度，影响半色调图案中青色点的方向。
    - Comfy dtype: INT
    - Python dtype: int
- angle_m
    - 指定CMYK颜色空间中品红色通道的角度，影响品红色点的方向。
    - Comfy dtype: INT
    - Python dtype: int
- angle_y
    - 指定CMYK颜色空间中黄色通道的角度，确定黄色点的方向。
    - Comfy dtype: INT
    - Python dtype: int
- angle_k
    - 指定CMYK颜色空间中关键（黑色）通道的角度，影响黑色点的方向。
    - Comfy dtype: INT
    - Python dtype: int
- greyscale
    - 一个标志，指示是否应该以灰度处理输入图像。启用时，半色调效果仅应用于亮度通道，将输出简化为单色色调。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- antialias
    - 启用或禁用抗锯齿，平滑半色调点的边缘并减少视觉伪影。这可以使最终图像的外观更自然、更精细。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- antialias_scale
    - 控制应用于半色调点的抗锯齿级别。更高的值会使外观更平滑，但可能会增加处理时间。
    - Comfy dtype: INT
    - Python dtype: int
- border_blending
    - 启用时，边框混合平滑了图像边缘附近半色调点之间的过渡，防止出现锐利的分界线，并促进更统一的外观。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- IMAGE
    - 应用了半色调效果的输出图像，可供进一步处理或展示。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- show_help
    - 提供文档或帮助页面的链接，以便进一步指导如何使用该节点。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_HalftoneFilter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        shapes = ['ellipse', 'rectangle']
        rez = ['normal', 'hi-res (2x output size)']
        return {'required': {'image': ('IMAGE',), 'dot_size': ('INT', {'default': 5, 'min': 1, 'max': 30, 'step': 1}), 'dot_shape': (shapes, {'default': 'ellipse'}), 'resolution': (rez, {'default': 'normal'}), 'angle_c': ('INT', {'default': 75, 'min': 0, 'max': 360, 'step': 1}), 'angle_m': ('INT', {'default': 45, 'min': 0, 'max': 360, 'step': 1}), 'angle_y': ('INT', {'default': 15, 'min': 0, 'max': 360, 'step': 1}), 'angle_k': ('INT', {'default': 0, 'min': 0, 'max': 360, 'step': 1}), 'greyscale': ('BOOLEAN', {'default': True}), 'antialias': ('BOOLEAN', {'default': True}), 'antialias_scale': ('INT', {'default': 2, 'min': 1, 'max': 4, 'step': 1}), 'border_blending': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'halftone_effect'
    CATEGORY = icons.get('Comfyroll/Graphics/Filter')

    def tensor_to_pil(self, tensor):
        if tensor.ndim == 4 and tensor.shape[0] == 1:
            tensor = tensor.squeeze(0)
        if tensor.dtype == torch.float32:
            tensor = tensor.mul(255).byte()
        elif tensor.dtype != torch.uint8:
            tensor = tensor.byte()
        numpy_image = tensor.cpu().numpy()
        if tensor.ndim == 3:
            if tensor.shape[2] == 1:
                mode = 'L'
            elif tensor.shape[2] == 3:
                mode = 'RGB'
            elif tensor.shape[2] == 4:
                mode = 'RGBA'
            else:
                raise ValueError(f'Unsupported channel number: {tensor.shape[2]}')
        else:
            raise ValueError(f'Unexpected tensor shape: {tensor.shape}')
        pil_image = Image.fromarray(numpy_image, mode)
        return pil_image

    def pil_to_tensor(self, pil_image):
        numpy_image = np.array(pil_image)
        tensor = torch.from_numpy(numpy_image).float().div(255)
        tensor = tensor.unsqueeze(0)
        return tensor

    def halftone_effect(self, image, dot_size, dot_shape, resolution, angle_c, angle_m, angle_y, angle_k, greyscale, antialias, border_blending, antialias_scale):
        sample = dot_size
        shape = dot_shape
        resolution_to_scale = {'normal': 1, 'hi-res (2x output size)': 2}
        scale = resolution_to_scale.get(resolution, 1)
        if isinstance(image, torch.Tensor):
            image = self.tensor_to_pil(image)
        if not isinstance(image, Image.Image):
            raise TypeError('The provided image is neither a PIL Image nor a PyTorch tensor.')
        pil_image = image
        if greyscale:
            pil_image = pil_image.convert('L')
            channel_images = [pil_image]
            angles = [angle_k]
        else:
            pil_image = pil_image.convert('CMYK')
            channel_images = list(pil_image.split())
            angles = [angle_c, angle_m, angle_y, angle_k]
        halftone_images = self._halftone_pil(pil_image, channel_images, sample, scale, angles, antialias, border_blending, antialias_scale, shape)
        if greyscale:
            new_image = halftone_images[0].convert('RGB')
        else:
            new_image = Image.merge('CMYK', halftone_images).convert('RGB')
        result_tensor = self.pil_to_tensor(new_image)
        print('Final tensor shape:', result_tensor.shape)
        return (result_tensor, show_help)

    def _halftone_pil(self, im, cmyk, sample, scale, angles, antialias, border_blending, antialias_scale, shape):
        antialias_res = antialias_scale if antialias else 1
        scale = scale * antialias_res
        dots = []
        for (channel_index, (channel, angle)) in enumerate(zip(cmyk, angles)):
            channel = channel.rotate(angle, expand=1)
            size = (channel.size[0] * scale, channel.size[1] * scale)
            half_tone = Image.new('L', size)
            draw = ImageDraw.Draw(half_tone)
            for x in range(0, channel.size[0], sample):
                for y in range(0, channel.size[1], sample):
                    if border_blending and angle % 90 != 0 and (x < sample or y < sample or x > channel.size[0] - sample or (y > channel.size[1] - sample)):
                        neighboring_pixels = channel.crop((max(x - 1, 0), max(y - 1, 0), min(x + 2, channel.size[0]), min(y + 2, channel.size[1])))
                        pixels = list(neighboring_pixels.getdata())
                        weights = [0.5 if i in [0, len(pixels) - 1] else 1 for i in range(len(pixels))]
                        weighted_mean = sum((p * w for (p, w) in zip(pixels, weights))) / sum(weights)
                        mean = weighted_mean
                    else:
                        box = channel.crop((x, y, x + sample, y + sample))
                        mean = ImageStat.Stat(box).mean[0]
                    size = (mean / 255) ** 0.5
                    box_size = sample * scale
                    draw_size = size * box_size
                    (box_x, box_y) = (x * scale, y * scale)
                    x1 = box_x + (box_size - draw_size) / 2
                    y1 = box_y + (box_size - draw_size) / 2
                    x2 = x1 + draw_size
                    y2 = y1 + draw_size
                    draw_method = getattr(draw, shape, None)
                    if draw_method:
                        draw_method([(x1, y1), (x2, y2)], fill=255)
            half_tone = half_tone.rotate(-angle, expand=1)
            (width_half, height_half) = half_tone.size
            xx1 = (width_half - im.size[0] * scale) / 2
            yy1 = (height_half - im.size[1] * scale) / 2
            xx2 = xx1 + im.size[0] * scale
            yy2 = yy1 + im.size[1] * scale
            half_tone = half_tone.crop((xx1, yy1, xx2, yy2))
            if antialias:
                w = int((xx2 - xx1) / antialias_scale)
                h = int((yy2 - yy1) / antialias_scale)
                half_tone = half_tone.resize((w, h), resample=Image.LANCZOS)
            dots.append(half_tone)
            show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Filter-Nodes#cr-halftone-filter'
        return (dots, show_help)
```