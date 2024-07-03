
# Documentation
- Class name: OtsuThreshold
- Category: Bmad/CV/Thresholding
- Output node: False

OtsuThreshold节点使用Otsu阈值法对图像进行前景和背景的分割。它可以选择性地使用高斯模糊对图像进行预处理，以减少噪声并改善阈值分割的结果。

# Input types
## Required
- image
    - 需要进行阈值分割的输入图像。这是Otsu方法将要应用的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- threshold_type
    - 指定要应用的阈值分割类型，这会影响前景和背景的区分方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- gaussian_blur_x
    - 高斯模糊的核宽度。较高的值意味着更强的模糊效果，这有助于在阈值分割前减少噪声。
    - Comfy dtype: INT
    - Python dtype: int
- gaussian_blur_y
    - 高斯模糊的核高度。与gaussian_blur_x一起定义模糊的程度。
    - Comfy dtype: INT
    - Python dtype: int
- gaussian_border_type
    - 决定在高斯模糊过程中如何处理图像的边界。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 应用Otsu阈值分割后的输出图像，其中前景和背景已被分离。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class OtsuThreshold:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                # "channel": (s.channels, {"default": "greyscale"}),
                "threshold_type": (thresh_types, {"default": thresh_types[0]}),
                "gaussian_blur_x": ("INT", {
                    "default": 4,
                    "min": 0,
                    "max": 200,
                    "step": 2
                }),
                "gaussian_blur_y": ("INT", {
                    "default": 4,
                    "min": 0,
                    "max": 200,
                    "step": 2
                }),
                "gaussian_border_type": (border_types, {"default": border_types[0]}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "otsu_thresthold"
    CATEGORY = "Bmad/CV/Thresholding"

    def otsu_thresthold(self, image, threshold_type, gaussian_blur_x, gaussian_blur_y, gaussian_border_type):
        image = tensor2opencv(image, 1)
        if gaussian_blur_x > 0 and gaussian_blur_y > 0:
            image = cv.GaussianBlur(image, (gaussian_blur_x + 1, gaussian_blur_y + 1),
                                    border_types_map[gaussian_border_type])
        _, image = cv.threshold(image, 0, 255, thresh_types_map[threshold_type] + cv.THRESH_OTSU)
        image = cv.cvtColor(image, cv.COLOR_GRAY2RGB)
        image = opencv2tensor(image)
        return (image,)

```
