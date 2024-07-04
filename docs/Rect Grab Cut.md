
# Documentation
- Class name: Rect Grab Cut
- Category: Bmad/CV/GrabCut
- Output node: False

RectGrabCut节点利用GrabCut算法对预定义的矩形区域进行图像分割。它旨在将指定矩形内的前景与背景分离，从而增强图像中所需物体或区域的聚焦效果。

# Input types
## Required
- image
    - 需要进行分割的输入图像。该图像将在指定的矩形区域内进行前景和背景的分离处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- x1
    - 矩形左上角的x坐标。
    - Comfy dtype: INT
    - Python dtype: int
- y1
    - 矩形左上角的y坐标。
    - Comfy dtype: INT
    - Python dtype: int
- x2
    - 矩形右下角的x坐标。
    - Comfy dtype: INT
    - Python dtype: int
- y2
    - 矩形右下角的y坐标。
    - Comfy dtype: INT
    - Python dtype: int
- iterations
    - GrabCut算法应运行的迭代次数，用于优化分割效果。
    - Comfy dtype: INT
    - Python dtype: int
- output_format
    - 分割后图像的输出格式，影响图像分割后的处理和显示方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 在指定矩形区域内前景与背景分离后的分割图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RectGrabCut:
    # TODO add option to crop or just leave as 0 the section outside the rect
    # TODO maybe add option to exclude PR_BGD or include PR_FGD in outputMask

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "x1": ("INT", {
                    "default": 5,
                    "min": 0,
                    "max": 2000,
                    "step": 1
                }),
                "y1": ("INT", {
                    "default": 5,
                    "min": 0,
                    "max": 2000,
                    "step": 1
                }),
                "x2": ("INT", {
                    "default": 5,
                    "min": 0,
                    "max": 2000,
                    "step": 1
                }),
                "y2": ("INT", {
                    "default": 5,
                    "min": 0,
                    "max": 2000,
                    "step": 1
                }),
                "iterations": ("INT", {
                    "default": 25,
                    "min": 0,
                    "max": 200,
                    "step": 1
                }),
                "output_format": (image_output_formats_options, {
                    "default": image_output_formats_options[0]
                })
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "grab_cut"

    CATEGORY = "Bmad/CV/GrabCut"

    def grab_cut(self, image, iterations, x1, y1, x2, y2, output_format):
        image = tensor2opencv(image)

        fg_model = np.zeros((1, 65), dtype="float")
        bg_model = np.zeros((1, 65), dtype="float")
        mask = np.zeros(image.shape[:2], dtype="uint8")
        rect = (x1, y1, x2, y2)

        mask, bg_model, fg_model = cv.grabCut(image, mask, rect, bg_model,
                                              fg_model, iterCount=iterations, mode=cv.GC_INIT_WITH_RECT)

        # generate mask with "pixels" classified as background/foreground
        output_mask = np.where((mask == cv.GC_BGD) | (mask == cv.GC_PR_BGD),
                               0, 1)
        output_mask = (output_mask * 255).astype("uint8")

        output_mask = maybe_convert_img(output_mask, 1, image_output_formats_options_map[output_format])
        image = opencv2tensor(output_mask)
        # image = image[y1:y2, x1:x2] #TODO maybe add option whether to crop or not

        return (image,)

```
