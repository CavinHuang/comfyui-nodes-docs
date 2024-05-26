# Documentation
- Class name: BrownNoise
- Category: image/noise
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

BrownNoise节点旨在生成具有棕色噪声的图像，这是一种模拟自然变化的视觉噪声类型。它有助于创建随机但和谐的视觉效果，可用于多种目的，如视觉效果或图像处理任务中的数据增强。

# Input types
## Required
- width
    - 宽度参数定义了生成的噪声图像的宽度。它对于确定输出图像的尺寸至关重要，因此影响整体视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置噪声图像的高度。它与宽度一起工作，以确定图像的总体大小，影响最终的展示效果。
    - Comfy dtype: INT
    - Python dtype: int
- value_min
    - value_min参数允许设置噪声强度的最小值。它提供对噪声值下限的控制，影响图像的整体暗度。
    - Comfy dtype: INT
    - Python dtype: int
- value_max
    - value_max参数设置了噪声强度的上限。它对于控制图像中噪声值的亮度和范围很重要。
    - Comfy dtype: INT
    - Python dtype: int
- red_min
    - red_min参数指定了噪声中红色通道的最小强度。它在调整输出图像的颜色平衡，使其偏向红色调方面发挥作用。
    - Comfy dtype: INT
    - Python dtype: int
- red_max
    - red_max参数决定了红色通道的最大强度。它对于设置噪声图像中红色调的上限至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- green_min
    - green_min参数设置了绿色通道强度的下限。它通过允许噪声模式中有更多的绿色或更少的绿色来影响颜色组成。
    - Comfy dtype: INT
    - Python dtype: int
- green_max
    - green_max参数定义了绿色通道强度的上限。它控制噪声图像中绿色调的存在。
    - Comfy dtype: INT
    - Python dtype: int
- blue_min
    - blue_min参数建立了蓝色通道噪声的最小值。它是微调噪声图像中蓝色阴影的关键。
    - Comfy dtype: INT
    - Python dtype: int
- blue_max
    - blue_max参数设置了蓝色通道噪声的最大值。它对于生成图像中蓝色饱和度的总体水平很重要。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - seed参数用于初始化随机数生成器，确保噪声模式的可重复性。它对于在不同运行中获得一致的结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - IMAGE输出提供了生成的棕色噪声图像。它很重要，因为它是节点操作的主要结果，包含了视觉噪声效果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class BrownNoise:

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
                nr = clamp(int(np.power(np.power(random.randint(lr, mr) / 255, 1 / 3), 1 / 3) * 255), 0, 255)
                ng = clamp(int(np.power(np.power(random.randint(lg, mg) / 255, 1 / 3), 1 / 3) * 255), 0, 255)
                nb = clamp(int(np.power(np.power(random.randint(lb, mb) / 255, 1 / 3), 1 / 3) * 255), 0, 255)
                outimage.putpixel((x, y), (nr, ng, nb))
            step += 1
            pbar.update_absolute(step, ah)
        return conv_pil_tensor(outimage)
```