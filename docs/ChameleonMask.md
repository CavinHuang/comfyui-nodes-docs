
# Documentation
- Class name: ChameleonMask
- Category: Bmad/CV/C.Photography
- Output node: False

ChameleonMask节点旨在基于特定标准或输入动态调整或修改图像蒙版，实现灵活且上下文敏感的蒙版处理。

# Input types
## Required
- dst
    - 目标图像，即蒙版将应用的位置，作为最终输出的画布。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- src
    - 源图像，用于生成蒙版，是蒙版创建的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- thresh_blur
    - 定义蒙版模糊的阈值，影响蒙版边缘的平滑程度。
    - Comfy dtype: INT
    - Python dtype: int
- close_dist
    - 指定蒙版闭合操作的距离，影响蒙版的紧凑性。
    - Comfy dtype: INT
    - Python dtype: int
- open_dist
    - 确定开放操作的距离，影响蒙版的粒度。
    - Comfy dtype: INT
    - Python dtype: int
- size_dist
    - 控制蒙版的尺寸分布调整，影响整体蒙版结构。
    - Comfy dtype: INT
    - Python dtype: int
- mask_blur
    - 设置应用于蒙版的模糊程度，修改其柔和度和透明度。
    - Comfy dtype: INT
    - Python dtype: int
- contrast_adjust
    - 调整蒙版的对比度，增强或减弱蒙版的视觉强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mode
    - 指定蒙版生成的操作模式，提供不同的蒙版创建策略。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- output_format
    - 确定输出图像的格式，影响蒙版的视觉呈现。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- optional_roi_mask
    - 可选的感兴趣区域蒙版，可用于进一步优化蒙版生成过程。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是一个应用了蒙版的图像，展示蒙版操作的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ChameleonMask:  # wtf would I name this node as?
    mode_func_map = {
        "GRAY": lambda i: cv.cvtColor(i, cv.COLOR_BGR2GRAY),
        "VALUE": lambda i: cv.cvtColor(i, cv.COLOR_RGB2HSV)[:, :, 2],
        "LIGHTNESS": lambda i: cv.cvtColor(i, cv.COLOR_RGB2HLS)[:, :, 1],

        # not sure if these would be useful, but costs nothing to leave them here
        "HUE": lambda i: cv.cvtColor(i, cv.COLOR_RGB2HSV)[:, :, 0],
        "SATURATION (HSV)": lambda i: cv.cvtColor(i, cv.COLOR_RGB2HSV)[:, :, 1],
        "SATURATION (HSL)": lambda i: cv.cvtColor(i, cv.COLOR_RGB2HLS)[:, :, 2],
    }
    modes = list(mode_func_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "dst": ("IMAGE",),
                "src": ("IMAGE",),
                "thresh_blur": ("INT", {"default": 30, "min": 2, "step": 2}),
                "close_dist": ("INT", {"default": 32, "min": 0, "step": 1}),
                "open_dist": ("INT", {"default": 32, "min": 0, "step": 1}),
                "size_dist": ("INT", {"default": 8, "min": -99999, "step": 1}),
                "mask_blur": ("INT", {"default": 64, "min": 0, "step": 2}),
                "contrast_adjust": ("FLOAT", {"default": 2.4, "min": 0, "max": 20, "step": .5}),
                "mode": (s.modes, {"default": s.modes[0]}),
                "output_format": (image_output_formats_options, {
                    "default": image_output_formats_options[0]
                }),

            },
            "optional": {
                "optional_roi_mask": ("IMAGE",)
            }
        }

    RETURN_TYPES = ("IMAGE", "IMAGE",)
    FUNCTION = "create_mask"
    CATEGORY = "Bmad/CV/C.Photography"

    def create_mask(self, src, dst, thresh_blur, close_dist, open_dist, size_dist, mask_blur,
                    contrast_adjust, mode, output_format, optional_roi_mask=None):
        src = tensor2opencv(src)
        dst = tensor2opencv(dst)

        thresh_blur += 1
        if mask_blur > 0:
            mask_blur += 1

        # compute the difference between images based on mode
        src = self.mode_func_map[mode](src)
        dst = self.mode_func_map[mode](dst)
        diff = cv.absdiff(src, dst)

        if mode == "HUE":
            diff = np.minimum(diff, 180 - diff)

        # binary thresholding
        # _, mask = cv.threshold(diff, threshold, 255, cv.THRESH_BINARY)
        diff = cv.GaussianBlur(diff, (thresh_blur, thresh_blur), 0)
        ret3, mask = cv.threshold(diff, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)
        if optional_roi_mask is not None:
            optional_roi_mask = tensor2opencv(optional_roi_mask, 1)
            mask[optional_roi_mask < 127] = 0

        # morphological closing > closing > dilate/erode
        if close_dist > 0:
            close_kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, (close_dist, close_dist))
            mask = cv.morphologyEx(mask, cv.MORPH_CLOSE, close_kernel)
        if open_dist > 0:
            open_kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, (open_dist, open_dist))
            mask = cv.morphologyEx(mask, cv.MORPH_OPEN, open_kernel)

        if size_dist > 0:
            size_op = cv.MORPH_DILATE
            size = size_dist
        else:
            size_op = cv.MORPH_ERODE
            size = abs(size_dist)
        if size_dist != 0:
            size_kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, (size, size))
            mask = cv.morphologyEx(mask, size_op, size_kernel)

        # gaussian blur + contrast adjust
        if mask_blur > 0:
            mask = cv.GaussianBlur(mask, (mask_blur, mask_blur), 0)
        mask = cv.convertScaleAbs(mask, alpha=1 + contrast_adjust, beta=0)  # / 100, beta=0)

        # convert to target format and output as tensor
        # note: diff is only meant to be used for debug purposes
        mask = maybe_convert_img(mask, 1, image_output_formats_options_map[output_format])
        diff = opencv2tensor(diff)
        mask = opencv2tensor(mask)

        return (mask, diff,)

```
