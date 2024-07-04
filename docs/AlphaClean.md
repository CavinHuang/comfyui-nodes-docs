
# Documentation
- Class name: AlphaClean
- Category: image/filters
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AlphaClean节点专门用于图像预处理，特别是针对图像alpha通道的增强和清理。它采用了双边滤波、高斯模糊和动态阈值等技术来优化图像的透明度和边缘，这在需要精确alpha通道操作的图形和图像处理应用中尤其有用。

# Input types
## Required
- images
    - 需要处理的输入图像，预期其alpha通道将被清理和增强。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- radius
    - 指定高斯模糊的半径，影响alpha通道边缘的平滑度。
    - Comfy dtype: INT
    - Python dtype: int
- fill_holes
    - 决定是否以及在多大程度上填充alpha通道中的空洞，以提高图像的完整性。
    - Comfy dtype: INT
    - Python dtype: int
- white_threshold
    - 设置将像素视为白色的阈值，有助于将前景与背景分离。
    - Comfy dtype: FLOAT
    - Python dtype: float
- extra_clip
    - 对图像应用额外的裁剪因子，调整清理效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 处理后的图像，其alpha通道已被清理和增强，可供进一步使用或显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AlphaClean:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "radius": ("INT", {
                    "default": 8,
                    "min": 1,
                    "max": 64,
                    "step": 1
                }),
                "fill_holes": ("INT", {
                    "default": 1,
                    "min": 0,
                    "max": 16,
                    "step": 1
                }),
                "white_threshold": ("FLOAT", {
                    "default": 0.9,
                    "min": 0.01,
                    "max": 1.0,
                    "step": 0.01
                }),
                "extra_clip": ("FLOAT", {
                    "default": 0.98,
                    "min": 0.01,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "alpha_clean"

    CATEGORY = "image/filters"

    def alpha_clean(self, images: torch.Tensor, radius: int, fill_holes: int, white_threshold: float, extra_clip: float):
        
        d = radius * 2 + 1
        i_dup = copy.deepcopy(images.cpu().numpy())
        
        for index, image in enumerate(i_dup):
            
            cleaned = cv2.bilateralFilter(image, 9, 0.05, 8)
            
            alpha = np.clip((image - white_threshold) / (1 - white_threshold), 0, 1)
            rgb = image * alpha
            
            alpha = cv2.GaussianBlur(alpha, (d,d), 0) * 0.99 + np.average(alpha) * 0.01
            rgb = cv2.GaussianBlur(rgb, (d,d), 0) * 0.99 + np.average(rgb) * 0.01
            
            rgb = rgb / np.clip(alpha, 0.00001, 1)
            rgb = rgb * extra_clip
            
            cleaned = np.clip(cleaned / rgb, 0, 1)
            
            if fill_holes > 0:
                fD = fill_holes * 2 + 1
                gamma = cleaned * cleaned
                kD = np.ones((fD, fD), np.uint8)
                kE = np.ones((fD + 2, fD + 2), np.uint8)
                gamma = cv2.dilate(gamma, kD, iterations=1)
                gamma = cv2.erode(gamma, kE, iterations=1)
                gamma = cv2.GaussianBlur(gamma, (fD, fD), 0)
                cleaned = np.maximum(cleaned, gamma)

            i_dup[index] = cleaned
        
        return (torch.from_numpy(i_dup),)

```
