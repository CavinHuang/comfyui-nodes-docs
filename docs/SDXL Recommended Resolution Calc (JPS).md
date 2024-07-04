
# Documentation
- Class name: SDXL Recommended Resolution Calc (JPS)
- Category: JPS Nodes/Math
- Output node: False

该节点根据目标宽度和高度计算SDXL（Stable Diffusion XL）的推荐分辨率，旨在从预定义的集合中找到最接近的宽高比。它考虑了横向、纵向和正方形的宽高比，以确定最适合生成具有所需尺寸图像的分辨率。

# Input types
## Required
- target_width
    - 指定图像的目标宽度。它在确定推荐分辨率的最接近匹配宽高比中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- target_height
    - 指定图像的目标高度。它与目标宽度一起用于计算推荐分辨率的最接近匹配宽高比。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- SDXL_width
    - 基于最接近匹配宽高比的SDXL图像推荐宽度。
    - Comfy dtype: INT
    - Python dtype: int
- SDXL_height
    - 基于最接近匹配宽高比的SDXL图像推荐高度。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Recommended_Resolution_Calc:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "target_width": ("INT", {
                    "default": 1024, 
                    "min": 0, 
                    "max": 8192, 
                    "step": 2 
                }),
                "target_height": ("INT", {
                    "default": 1024, 
                    "min": 0, 
                    "max": 8192, 
                    "step": 2 
                }),
            },
        }

    RETURN_TYPES = ("INT","INT",)
    RETURN_NAMES = ("SDXL_width","SDXL_height",)
    FUNCTION = "calcSDXLres"

    CATEGORY = "JPS Nodes/Math"

    def calcSDXLres(self, target_width, target_height):
        target_ratio = target_width / target_height
        
        closest_ratio = None
        closest_diff = float('inf')
        
        for ratio, (x_size, y_size, num_ratio) in accepted_ratios_horizontal.items():
            diff = abs(num_ratio - target_ratio)
            if diff < closest_diff:
                closest_ratio = ratio
                closest_diff = diff
        
        for ratio, (x_size, y_size, num_ratio) in accepted_ratios_vertical.items():
            diff = abs(num_ratio - target_ratio)
            if diff < closest_diff:
                closest_ratio = ratio
                closest_diff = diff
        
        # Compare with square aspect ratio
        x_size, y_size, num_ratio = accepted_ratios_square["1:1"]
        diff = abs(num_ratio - target_ratio)
        if diff < closest_diff:
            closest_ratio = "1:1"

        if closest_ratio in accepted_ratios_horizontal:
            SDXL_width, SDXL_height, _ = accepted_ratios_horizontal[closest_ratio]
        elif closest_ratio in accepted_ratios_vertical:
            SDXL_width, SDXL_height, _ = accepted_ratios_vertical[closest_ratio]
        else:
            SDXL_width, SDXL_height, _ = accepted_ratios_square[closest_ratio]
        
        return (SDXL_width, SDXL_height)

```
