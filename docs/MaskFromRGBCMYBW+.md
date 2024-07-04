
# Documentation
- Class name: MaskFromRGBCMYBW+
- Category: essentials
- Output node: False

MaskFromRGBCMYBW+节点旨在基于图像中特定的RGB、CMY和BW（黑白）值生成蒙版。它简化了色彩空间转换和阈值操作的复杂性，为用户提供了一种直观的方式来创建突出或隔离图像中特定颜色范围或强度级别的蒙版。

# Input types
## Required
- image
    - 'image'参数是输入图像，将从中生成蒙版。它在基于指定的颜色或强度值确定感兴趣区域方面起着至关重要的作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- threshold_r
    - 指定用于过滤图像和生成蒙版的红色分量阈值。此参数有助于基于红色强度隔离区域。
    - Comfy dtype: FLOAT
    - Python dtype: int
- threshold_g
    - 指定用于过滤图像和生成蒙版的绿色分量阈值。此参数有助于基于绿色强度隔离区域。
    - Comfy dtype: FLOAT
    - Python dtype: int
- threshold_b
    - 指定用于过滤图像和生成蒙版的蓝色分量阈值。此参数有助于基于蓝色强度隔离区域。
    - Comfy dtype: FLOAT
    - Python dtype: int
- remove_isolated_pixels
    - 确定是否从生成的蒙版中移除孤立像素，增强蒙版的清晰度和与目标颜色或强度级别的相关性。
    - Comfy dtype: INT
    - Python dtype: int
- fill_holes
    - 指示是否填充生成蒙版中的孔洞，确保产生更连续、更有用的蒙版，以便进行进一步的图像处理或分析。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- red
    - Comfy dtype: MASK
    - 基于指定阈值和处理参数隔离红色分量的输出蒙版。
    - Python dtype: torch.Tensor
- green
    - Comfy dtype: MASK
    - 基于指定阈值和处理参数隔离绿色分量的输出蒙版。
    - Python dtype: torch.Tensor
- blue
    - Comfy dtype: MASK
    - 基于指定阈值和处理参数隔离蓝色分量的输出蒙版。
    - Python dtype: torch.Tensor
- cyan
    - Comfy dtype: MASK
    - 基于指定阈值和处理参数隔离青色分量的输出蒙版。
    - Python dtype: torch.Tensor
- magenta
    - Comfy dtype: MASK
    - 基于指定阈值和处理参数隔离品红色分量的输出蒙版。
    - Python dtype: torch.Tensor
- yellow
    - Comfy dtype: MASK
    - 基于指定阈值和处理参数隔离黄色分量的输出蒙版。
    - Python dtype: torch.Tensor
- black
    - Comfy dtype: MASK
    - 基于指定阈值和处理参数隔离黑色分量的输出蒙版。
    - Python dtype: torch.Tensor
- white
    - Comfy dtype: MASK
    - 基于指定阈值和处理参数隔离白色分量的输出蒙版。
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskFromRGBCMYBW:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE", ),
                "threshold_r": ("FLOAT", { "default": 0.15, "min": 0.0, "max": 1, "step": 0.01, }),
                "threshold_g": ("FLOAT", { "default": 0.15, "min": 0.0, "max": 1, "step": 0.01, }),
                "threshold_b": ("FLOAT", { "default": 0.15, "min": 0.0, "max": 1, "step": 0.01, }),
                "remove_isolated_pixels": ("INT", { "default": 0, "min": 0, "max": 32, "step": 1, }),
                "fill_holes": ("BOOLEAN", { "default": False }),
            }
        }

    RETURN_TYPES = ("MASK","MASK","MASK","MASK","MASK","MASK","MASK","MASK",)
    RETURN_NAMES = ("red","green","blue","cyan","magenta","yellow","black","white",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, threshold_r, threshold_g, threshold_b, remove_isolated_pixels, fill_holes):
        red = ((image[..., 0] >= 1-threshold_r) & (image[..., 1] < threshold_g) & (image[..., 2] < threshold_b)).float()
        green = ((image[..., 0] < threshold_r) & (image[..., 1] >= 1-threshold_g) & (image[..., 2] < threshold_b)).float()
        blue = ((image[..., 0] < threshold_r) & (image[..., 1] < threshold_g) & (image[..., 2] >= 1-threshold_b)).float()

        cyan = ((image[..., 0] < threshold_r) & (image[..., 1] >= 1-threshold_g) & (image[..., 2] >= 1-threshold_b)).float()
        magenta = ((image[..., 0] >= 1-threshold_r) & (image[..., 1] < threshold_g) & (image[..., 2] > 1-threshold_b)).float()
        yellow = ((image[..., 0] >= 1-threshold_r) & (image[..., 1] >= 1-threshold_g) & (image[..., 2] < threshold_b)).float()

        black = ((image[..., 0] <= threshold_r) & (image[..., 1] <= threshold_g) & (image[..., 2] <= threshold_b)).float()
        white = ((image[..., 0] >= 1-threshold_r) & (image[..., 1] >= 1-threshold_g) & (image[..., 2] >= 1-threshold_b)).float()

        if remove_isolated_pixels > 0 or fill_holes:
            colors = [red, green, blue, cyan, magenta, yellow, black, white]
            color_names = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow', 'black', 'white']
            processed_colors = {}

            for color_name, color in zip(color_names, colors):
                color = color.cpu().numpy()
                masks = []

                for i in range(image.shape[0]):
                    mask = color[i]
                    if remove_isolated_pixels > 0:
                        mask = scipy.ndimage.binary_opening(mask, structure=np.ones((remove_isolated_pixels, remove_isolated_pixels)))
                    if fill_holes:
                        mask = scipy.ndimage.binary_fill_holes(mask)
                    mask = torch.from_numpy(mask)
                    masks.append(mask)

                processed_colors[color_name] = torch.stack(masks, dim=0).float()

            red = processed_colors['red']
            green = processed_colors['green']
            blue = processed_colors['blue']
            cyan = processed_colors['cyan']
            magenta = processed_colors['magenta']
            yellow = processed_colors['yellow']
            black = processed_colors['black']
            white = processed_colors['white']

            del colors, processed_colors
        
        return (red, green, blue, cyan, magenta, yellow, black, white,)

```
