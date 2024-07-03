
# Documentation
- Class name: Contour To Mask
- Category: Bmad/CV/Contour
- Output node: False
- Repo Ref: https://github.com/bmad4ever/ComfyUI-Bmad-Custom-Nodes

此节点旨在将轮廓转换为掩码图像，同时利用指定的输出格式。它有效地将轮廓定义的形状转换为二值掩码，可用于各种图像处理任务。

# Input types
## Required
- image
    - 需要在其上绘制轮廓的输入图像。它作为创建掩码过程的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- contour
    - 需要转换为掩码的轮廓。它定义了将在掩码中填充的形状。
    - Comfy dtype: CV_CONTOUR
    - Python dtype: 代表计算机视觉任务中轮廓的自定义类型
- output_format
    - 指定掩码图像所需的输出格式，允许灵活地在下游使用掩码。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: 表示不同图像输出格式的枚举

# Output types
- image
    - 生成的掩码图像，其中指定的轮廓已被填充以创建二值掩码。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ContourToMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "contour": ("CV_CONTOUR",),
                "output_format": (image_output_formats_options, {
                    "default": image_output_formats_options[0]
                })
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "draw"
    CATEGORY = "Bmad/CV/Contour"

    def draw(self, image, contour, output_format):
        image = tensor2opencv(image, 1)
        image = np.zeros(image.shape, dtype=np.uint8)
        cv.drawContours(image, [contour], 0, (255), -1)
        image = maybe_convert_img(image, 1, image_output_formats_options_map[output_format])
        image = opencv2tensor(image)
        return (image,)

```
