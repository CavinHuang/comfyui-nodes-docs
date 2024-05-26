# Documentation
- Class name: PinkNoise
- Category: image/noise
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

PinkNoise节点旨在根据指定的尺寸和颜色范围生成带有噪声模式的图像，该模式模拟了粉红噪声谱。该节点特别适用于创建具有自然、非均匀像素强度分布的视觉内容，可应用于图像处理、计算机图形学和机器学习数据增强等多种场景。

# Input types
## Required
- width
    - 宽度决定了输出图像的水平维度，这对于定义噪声模式将生成的画布至关重要。它直接影响生成图像的整体大小和分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度设置了输出图像的垂直维度，与宽度参数协同工作，确定图像的分辨率和整体尺寸。它是决定噪声模式规模的重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 种子值用于初始化随机数生成器，确保噪声模式在节点的不同运行中是可复现和一致的。该参数对于保持噪声生成过程的可靠性和可预测性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- value_min
    - 值最小值设定了生成噪声的强度值的下限，允许控制噪声模式的最小亮度或暗度。该参数影响噪声的整体视觉效果，有助于实现所需的美学或效果。
    - Comfy dtype: INT
    - Python dtype: int
- value_max
    - 值最大值设定了噪声的强度值的上限，确保噪声模式不会超过一定的亮度水平。该参数在实现平衡和可控的噪声分布方面至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- red_min
    - 红色最小值指定了噪声模式中红色通道的最小允许值，使得可以微调颜色谱，并确保生成的噪声满足特定的颜色要求。
    - Comfy dtype: INT
    - Python dtype: int
- red_max
    - 红色最大值设定了红色通道的最大值，控制噪声模式中红色色调的上限，并有助于整体颜色平衡。
    - Comfy dtype: INT
    - Python dtype: int
- green_min
    - 绿色最小值定义了噪声中绿色通道的最小值，允许对噪声的绿色成分进行精确控制，并确保最终图像与期望的颜色配置一致。
    - Comfy dtype: INT
    - Python dtype: int
- green_max
    - 绿色最大值设定了绿色通道的最大值，确保噪声模式中的绿色色调不超过某个阈值，并有助于整体颜色的和谐。
    - Comfy dtype: INT
    - Python dtype: int
- blue_min
    - 蓝色最小值设定了蓝色通道的最小值，允许用户控制噪声模式中蓝色的存在，并实现特定的视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- blue_max
    - 蓝色最大值定义了蓝色通道的最大值，确保噪声模式中的蓝色色调在期望的范围内，并有助于整体的颜色方案。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 输出是根据指定参数生成的带有粉红噪声模式的图像。这个图像可以作为纹理、背景或输入用于进一步处理在各种应用中。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class PinkNoise:

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
                nr = clamp(int(np.power(random.randint(lr, mr) / 255, 1 / 3) * 255), 0, 255)
                ng = clamp(int(np.power(random.randint(lg, mg) / 255, 1 / 3) * 255), 0, 255)
                nb = clamp(int(np.power(random.randint(lb, mb) / 255, 1 / 3) * 255), 0, 255)
                outimage.putpixel((x, y), (nr, ng, nb))
            step += 1
            pbar.update_absolute(step, ah)
        return conv_pil_tensor(outimage)
```