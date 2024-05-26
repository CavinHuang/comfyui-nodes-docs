# Documentation
- Class name: RandNoise
- Category: image/noise
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

RandNoise节点旨在生成随机噪声图像。它通过创建指定尺寸的图像，并为每个像素应用用户定义范围内的随机颜色来操作。该节点的功能集中在生成噪声模式，这些模式可用于各种图像处理任务，如数据增强或噪声过滤。

# Input types
## Required
- width
    - 宽度参数指定了生成的噪声图像的宽度。它至关重要，因为它决定了输出图像的水平分辨率，影响图像的整体尺寸和噪声模式的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置了噪声图像的垂直尺寸。它对于建立垂直分辨率很重要，并且与宽度一起定义了噪声模式的整体大小。
    - Comfy dtype: INT
    - Python dtype: int
- value_min
    - value_min参数允许设置噪声强度的最小值。它影响分配给每个像素的随机颜色值的下限，从而影响噪声图像的整体亮度。
    - Comfy dtype: INT
    - Python dtype: int
- value_max
    - value_max参数设置了噪声强度的上限。它与value_min一起工作，定义可以分配给每个像素的随机值范围，形成噪声的动态范围。
    - Comfy dtype: INT
    - Python dtype: int
- red_min
    - red_min参数指定了噪声图像中红色通道的最小值。它对于控制噪声中红色的颜色强度很重要，并且有助于图像的最终颜色组成。
    - Comfy dtype: INT
    - Python dtype: int
- red_max
    - red_max参数设置了红色通道的最大值。它与red_min一起，决定了噪声中红色颜色值的范围，影响噪声图案的整体色调。
    - Comfy dtype: INT
    - Python dtype: int
- green_min
    - green_min参数建立了绿色通道的最小值。它在确定噪声中绿色颜色的强度方面发挥作用，影响图像的颜色平衡。
    - Comfy dtype: INT
    - Python dtype: int
- green_max
    - green_max参数定义了绿色通道的最大值。它与green_min一起设置绿色通道颜色值的范围，这影响了噪声图像中绿色的活力。
    - Comfy dtype: INT
    - Python dtype: int
- blue_min
    - blue_min参数设置了噪声图像中蓝色通道的最小值。它对于控制蓝色颜色的强度至关重要，并有助于生成的噪声的最终颜色方案。
    - Comfy dtype: INT
    - Python dtype: int
- blue_max
    - blue_max参数指定了蓝色通道的最大值。它与blue_min一起，决定了噪声中蓝色颜色值的范围，影响图像的整体颜色组成。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - seed参数用于初始化随机数生成器，确保噪声模式的可重复性。当需要在不同运行中生成相同的噪声图像时，它很重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - RandNoise节点的输出是一个包含随机噪声的图像。这个图像可以用于多种目的，比如为机器学习添加噪声数据、测试图像处理算法或创建视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: Tuple[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class RandNoise:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 128, 'max': 8192, 'step': 8}), 'height': ('INT', {'default': 512, 'min': 128, 'max': 8192, 'step': 8}), 'value_min': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'value_max': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'red_min': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'red_max': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'green_min': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'green_max': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'blue_min': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'blue_max': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'generate_noise'
    CATEGORY = 'image/noise'

    def generate_noise(self, width, height, value_min, value_max, red_min, red_max, green_min, green_max, blue_min, blue_max, seed):
        w = width
        h = height
        aw = copy.deepcopy(w)
        ah = copy.deepcopy(h)
        outimage = Image.new('RGB', (aw, ah))
        random.seed(seed)
        clamp_v_min = value_min
        clamp_v_max = value_max
        clamp_r_min = red_min
        clamp_r_max = red_max
        clamp_g_min = green_min
        clamp_g_max = green_max
        clamp_b_min = blue_min
        clamp_b_max = blue_max
        lv = 0
        mv = 0
        if clamp_v_min == -1:
            lv = 0
        else:
            lv = clamp_v_min
        if clamp_v_max == -1:
            mv = 255
        else:
            mv = clamp_v_max
        lr = 0
        mr = 0
        if clamp_r_min == -1:
            lr = lv
        else:
            lr = clamp_r_min
        if clamp_r_max == -1:
            mr = mv
        else:
            mr = clamp_r_max
        lg = 0
        mg = 0
        if clamp_g_min == -1:
            lg = lv
        else:
            lg = clamp_g_min
        if clamp_g_max == -1:
            mg = mv
        else:
            mg = clamp_g_max
        lb = 0
        mb = 0
        if clamp_b_min == -1:
            lb = lv
        else:
            lb = clamp_b_min
        if clamp_b_max == -1:
            mb = mv
        else:
            mb = clamp_b_max
        pbar = comfy.utils.ProgressBar(ah)
        step = 0
        for y in range(ah):
            for x in range(aw):
                nr = random.randint(lr, mr)
                ng = random.randint(lg, mg)
                nb = random.randint(lb, mb)
                outimage.putpixel((x, y), (nr, ng, nb))
            step += 1
            pbar.update_absolute(step, ah)
        return conv_pil_tensor(outimage)
```