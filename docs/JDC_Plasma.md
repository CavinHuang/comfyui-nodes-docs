# Documentation
- Class name: PlasmaNoise
- Category: image/noise
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

PlasmaNoise 节点旨在生成类似等离子体的噪声图案。它通过使用分形噪声算法创建基础图像，然后对颜色通道和钳制值进行调整，以产生视觉丰富和多样化的输出。该节点特别适用于创建具有自然、有机感觉的纹理或背景。

# Input types
## Required
- width
    - 宽度参数定义了生成图像的宽度。它对于确定输出的总体尺寸至关重要，并影响噪声图案的细节和分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置生成图像的高度。它与宽度一起工作，以确定图像的纵横比和总体大小。
    - Comfy dtype: INT
    - Python dtype: int
- turbulence
    - 湍流参数控制噪声模式中的详细程度。较高的值会产生更复杂和多变的噪声，而较低的值则产生更平滑和更均匀的图案。
    - Comfy dtype: FLOAT
    - Python dtype: float
- value_min
    - value_min 参数允许为噪声模式设置最小值，可用于调整整体亮度或创建特定视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- value_max
    - value_max 参数设置噪声模式的最大值，可用于控制对比度或实现所需的美学效果。
    - Comfy dtype: INT
    - Python dtype: int
- red_min
    - red_min 参数指定红色通道的最小值，可以微调噪声模式内的颜色平衡和饱和度。
    - Comfy dtype: INT
    - Python dtype: int
- red_max
    - red_max 参数确定红色通道的最大值，允许控制噪声模式中红色色调的强度和活力。
    - Comfy dtype: INT
    - Python dtype: int
- green_min
    - green_min 参数设置绿色通道的最小值，这对于实现噪声模式中所需的颜色组成和和谐非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- green_max
    - green_max 参数控制绿色通道的最大值，影响噪声模式的整体色调和绿色在其中的突出程度。
    - Comfy dtype: INT
    - Python dtype: int
- blue_min
    - blue_min 参数定义了蓝色通道的最小值，可以调整以创建特定的颜色情绪或增强噪声模式的某些视觉方面。
    - Comfy dtype: INT
    - Python dtype: int
- blue_max
    - blue_max 参数设置蓝色通道的最大值，这对于定义噪声模式中蓝色阴影的深度和丰富度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - seed 参数用于初始化随机数生成器，确保使用相同的种子值时结果可重复。这对于在多个实例中生成一致的噪声模式特别有用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - IMAGE 输出提供了作为图像生成的等离子体噪声模式。它是节点处理的最终结果，代表了噪声生成算法的最终视觉结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class PlasmaNoise:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 128, 'max': 8192, 'step': 8}), 'height': ('INT', {'default': 512, 'min': 128, 'max': 8192, 'step': 8}), 'turbulence': ('FLOAT', {'default': 2.75, 'min': 0.5, 'max': 32, 'step': 0.01}), 'value_min': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'value_max': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'red_min': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'red_max': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'green_min': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'green_max': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'blue_min': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'blue_max': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'generate_plasma'
    CATEGORY = 'image/noise'

    def generate_plasma(self, width, height, turbulence, value_min, value_max, red_min, red_max, green_min, green_max, blue_min, blue_max, seed):
        w = width
        h = height
        aw = copy.deepcopy(w)
        ah = copy.deepcopy(h)
        outimage = Image.new('RGB', (aw, ah))
        if w >= h:
            h = w
        else:
            w = h
        clamp_v_min = value_min
        clamp_v_max = value_max
        clamp_r_min = red_min
        clamp_r_max = red_max
        clamp_g_min = green_min
        clamp_g_max = green_max
        clamp_b_min = blue_min
        clamp_b_max = blue_max
        roughness = turbulence
        pixmap = []
        random.seed(seed)

        def adjust(xa, ya, x, y, xb, yb):
            if pixmap[x][y] == 0:
                d = math.fabs(xa - xb) + math.fabs(ya - yb)
                v = (pixmap[xa][ya] + pixmap[xb][yb]) / 2.0 + (random.random() - 0.555) * d * roughness
                c = int(math.fabs(v + random.randint(-48, 48)))
                if c < 0:
                    c = 0
                elif c > 255:
                    c = 255
                pixmap[x][y] = c

        def subdivide(x1, y1, x2, y2):
            if not (x2 - x1 < 2.0 and y2 - y1 < 2.0):
                x = int((x1 + x2) / 2.0)
                y = int((y1 + y2) / 2.0)
                adjust(x1, y1, x, y1, x2, y1)
                adjust(x2, y1, x2, y, x2, y2)
                adjust(x1, y2, x, y2, x2, y2)
                adjust(x1, y1, x1, y, x1, y2)
                if pixmap[x][y] == 0:
                    v = int((pixmap[x1][y1] + pixmap[x2][y1] + pixmap[x2][y2] + pixmap[x1][y2]) / 4.0)
                    pixmap[x][y] = v
                subdivide(x1, y1, x, y)
                subdivide(x, y1, x2, y)
                subdivide(x, y, x2, y2)
                subdivide(x1, y, x, y2)
        pbar = comfy.utils.ProgressBar(4)
        step = 0
        pixmap = [[0 for i in range(h)] for j in range(w)]
        pixmap[0][0] = random.randint(0, 255)
        pixmap[w - 1][0] = random.randint(0, 255)
        pixmap[w - 1][h - 1] = random.randint(0, 255)
        pixmap[0][h - 1] = random.randint(0, 255)
        subdivide(0, 0, w - 1, h - 1)
        r = copy.deepcopy(pixmap)
        step += 1
        pbar.update_absolute(step, 4)
        pixmap = [[0 for i in range(h)] for j in range(w)]
        pixmap[0][0] = random.randint(0, 255)
        pixmap[w - 1][0] = random.randint(0, 255)
        pixmap[w - 1][h - 1] = random.randint(0, 255)
        pixmap[0][h - 1] = random.randint(0, 255)
        subdivide(0, 0, w - 1, h - 1)
        g = copy.deepcopy(pixmap)
        step += 1
        pbar.update_absolute(step, 4)
        pixmap = [[0 for i in range(h)] for j in range(w)]
        pixmap[0][0] = random.randint(0, 255)
        pixmap[w - 1][0] = random.randint(0, 255)
        pixmap[w - 1][h - 1] = random.randint(0, 255)
        pixmap[0][h - 1] = random.randint(0, 255)
        subdivide(0, 0, w - 1, h - 1)
        b = copy.deepcopy(pixmap)
        step += 1
        pbar.update_absolute(step, 4)
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
        for y in range(ah):
            for x in range(aw):
                nr = int(remap(r[x][y], 0, 255, lr, mr))
                ng = int(remap(g[x][y], 0, 255, lg, mg))
                nb = int(remap(b[x][y], 0, 255, lb, mb))
                outimage.putpixel((x, y), (nr, ng, nb))
        step += 1
        pbar.update_absolute(step, 4)
        return conv_pil_tensor(outimage)
```