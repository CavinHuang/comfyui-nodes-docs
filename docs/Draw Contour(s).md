
# Documentation
- Class name: Draw Contour(s)
- Category: Bmad/CV/Contour
- Output node: False

DrawContours节点旨在通过在原始图像上绘制轮廓来可视化轮廓。它允许自定义轮廓的可视化效果，比如选择要绘制的特定轮廓、调整轮廓线的粗细以及选择颜色，从而增强基于轮廓分析的可解释性。

# Input types
## Required
- image
    - 原始图像，用于绘制轮廓。它作为轮廓可视化的背景。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- contours
    - 要在图像上绘制的轮廓集合。每个轮廓是定义其形状的点序列。
    - Comfy dtype: CV_CONTOURS
    - Python dtype: List[List[Tuple[int, int]]]
- index_to_draw
    - 指定要从集合中绘制哪个轮廓。值为-1表示应绘制所有轮廓。
    - Comfy dtype: INT
    - Python dtype: int
- thickness
    - 轮廓线的粗细。负值表示轮廓应被填充。
    - Comfy dtype: INT
    - Python dtype: int
- color
    - 轮廓线的颜色。这允许自定义轮廓的视觉外观。
    - Comfy dtype: COLOR
    - Python dtype: Tuple[int, int, int]

# Output types
- image
    - 带有指定轮廓绘制的图像，增强了轮廓的视觉分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DrawContours:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "contours": ("CV_CONTOURS",),
                "index_to_draw": ("INT", {
                    "default": -1,
                    "min": -1,
                    "max": 1000,
                    "step": 1
                }),
                "thickness": ("INT", {
                    "default": 5,
                    "min": -1,
                    "max": 32,
                    "step": 1
                }),
                "color": ("COLOR",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "draw"

    CATEGORY = "Bmad/CV/Contour"

    def draw(self, image, contours, index_to_draw, color, thickness):
        background = tensor2opencv(image)

        um_image = cv.UMat(background)
        cv.drawContours(um_image, contours, index_to_draw, ImageColor.getcolor(color, "RGB"), thickness)
        contour_image = um_image.get()

        image = opencv2tensor(contour_image)

        return (image,)

```
