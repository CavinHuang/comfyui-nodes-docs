---
tags:
- Mask
- MaskGeneration
---

# ChameleonMask
## Documentation
- Class name: `ChameleonMask`
- Category: `Bmad/CV/C.Photography`
- Output node: `False`

The ChameleonMask node is designed to dynamically adapt or modify image masks based on certain criteria or inputs, allowing for flexible and context-sensitive mask manipulation.
## Input types
### Required
- **`dst`**
    - The destination image where the mask will be applied, serving as the canvas for the final output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`src`**
    - The source image from which the mask is generated, acting as the primary input for mask creation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`thresh_blur`**
    - Defines the threshold for blurring the mask, affecting the mask's edge smoothness.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`close_dist`**
    - Specifies the distance for the closing operation on the mask, influencing the mask's compactness.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`open_dist`**
    - Determines the distance for the opening operation, affecting the mask's granularity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`size_dist`**
    - Controls the size distribution adjustment for the mask, impacting the overall mask structure.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mask_blur`**
    - Sets the level of blurring applied to the mask, modifying its softness and transparency.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`contrast_adjust`**
    - Adjusts the contrast of the mask, enhancing or reducing the mask's visual intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mode`**
    - Specifies the mode of operation for mask generation, offering different strategies for mask creation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`output_format`**
    - Determines the format of the output image, affecting the visual representation of the mask.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`optional_roi_mask`**
    - An optional region of interest mask that can be applied to further refine the mask generation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image with the mask applied, showcasing the result of the mask manipulation.
    - Python dtype: `torch.Tensor`
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
