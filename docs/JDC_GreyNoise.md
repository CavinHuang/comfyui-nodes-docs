# Documentation
- Class name: GreyNoise
- Category: image/noise
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

GreyNoise类用于按需生成噪声图像，并通过可定制的参数提供工具以支持各种图像处理任务和噪声分析。

# Input types
## Required
- width
    - 宽度决定了生成的噪声图像的水平维度，并显著影响噪声生成的整体画布。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度设置了噪声图像的垂直维度，这对定义图像的结构和布局至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 种子用于初始化随机数生成器，确保可重复的噪声模式以获得一致的实验结果。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- value_min
    - 值最小值设定了噪声强度的下限，影响了图像中可能的最小噪声水平。
    - Comfy dtype: INT
    - Python dtype: int
- value_max
    - 值最大值设定了噪声强度的上限，控制最大噪声水平以实现期望的视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- red_min
    - 红色最小值指定了红色通道的最小值，影响噪声图像中的整体色调和颜色分布。
    - Comfy dtype: INT
    - Python dtype: int
- red_max
    - 红色最大值定义了红色通道的最大值，规定了颜色范围的上限并有助于最终的外观表现。
    - Comfy dtype: INT
    - Python dtype: int
- green_min
    - 绿色通道最小值设定了绿色通道的最小值，影响中程色调和整体颜色平衡。
    - Comfy dtype: INT
    - Python dtype: int
- green_max
    - 绿色通道最大值设定了绿色通道的最大值，控制中程色调的上限。
    - Comfy dtype: INT
    - Python dtype: int
- blue_min
    - 蓝色最小值指定了蓝色通道的最小值，影响噪声图像的整体冷度或暖度。
    - Comfy dtype: INT
    - Python dtype: int
- blue_max
    - 蓝色最大值定义了蓝色通道的最大值，决定了最终图像中冷度或暖度的上限。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 输出是一个反映输入参数的噪声图像，作为按需生成的噪声的视觉表示。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class GreyNoise:

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
                nv = random.randint(lv, mv)
                nr = int(remap(nv, lv, mv, lr, mr))
                ng = int(remap(nv, lv, mv, lg, mg))
                nb = int(remap(nv, lv, mv, lb, mb))
                outimage.putpixel((x, y), (nr, ng, nb))
            step += 1
            pbar.update_absolute(step, ah)
        return conv_pil_tensor(outimage)
```