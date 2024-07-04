
# Documentation
- Class name: SaltMaskBilateralFilter
- Category: SALT/Masking/Filter
- Output node: False

SaltMaskBilateralFilter节点对遮罩区域应用双边滤波,在平滑区域的同时保留边缘,通过降低噪声并保持结构完整性来提高遮罩区域的质量。

# Input types
## Required
- masks
    - 要使用双边滤波处理的输入遮罩,旨在平滑遮罩区域同时保留其边缘。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]
## Optional
- diameter
    - 指定过滤过程中使用的每个像素邻域的直径。
    - Comfy dtype: INT
    - Python dtype: List[int] or int
- sigmaColor
    - 表示颜色空间中的滤波器sigma,控制邻域中的颜色混合程度。
    - Comfy dtype: FLOAT
    - Python dtype: List[float] or float
- sigmaSpace
    - 确定坐标空间中的滤波器sigma,影响在过滤过程中要考虑的像素的空间接近程度。
    - Comfy dtype: FLOAT
    - Python dtype: List[float] or float

# Output types
- MASKS
    - 应用双边滤波后的区域输出张量,其中每个区域都经过平滑处理同时保留了边缘。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskBilateralFilter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "diameter": ("INT", {"default": 9, "min": 1, "max": 31, "step": 1}),
                "sigmaColor": ("FLOAT", {"default": 75.0, "min": 0.0, "max": 200.0, "step": 0.1}),
                "sigmaSpace": ("FLOAT", {"default": 75.0, "min": 0.0, "max": 200.0, "step": 0.1}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "bilateral_filter"

    def bilateral_filter(self, masks, diameter=9, sigmaColor=75.0, sigmaSpace=75.0):
        if not isinstance(diameter, list):
            diameter = [diameter]
        if not isinstance(sigmaColor, list):
            sigmaColor = [sigmaColor]
        if not isinstance(sigmaSpace, list):
            sigmaSpace = [sigmaSpace]

        regions = []
        for i, mask in enumerate(masks):
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            image_array = np.array(pil_image.convert('RGB'))

            current_diameter = diameter[i if i < len(diameter) else -1]
            current_sigmaColor = sigmaColor[i if i < len(sigmaColor) else -1]
            current_sigmaSpace = sigmaSpace[i if i < len(sigmaSpace) else -1]

            filtered = cv2.bilateralFilter(image_array, current_diameter, current_sigmaColor, current_sigmaSpace)

            filtered_pil = Image.fromarray(filtered)
            region_tensor = pil2mask(filtered_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
