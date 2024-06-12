---
tags:
- Image
- ImageThresholding
---

# FindThreshold
## Documentation
- Class name: `FindThreshold`
- Category: `Bmad/CV/Thresholding`
- Output node: `False`

The FindThreshold node is designed to identify the optimal threshold value for image segmentation or binarization based on specific criteria. It dynamically adjusts the thresholding parameters to meet the desired conditions, enhancing the adaptability and precision of image processing tasks.
## Input types
### Required
- **`src`**
    - The source image on which thresholding needs to be applied. It's crucial for determining the optimal threshold value for segmentation or binarization.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`start_at`**
    - The starting point of the threshold value range to be considered. It defines the lower bound of the search space for finding the optimal threshold.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at`**
    - The ending point of the threshold value range to be considered. It sets the upper limit of the search space for the optimal threshold determination.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`thresh_type`**
    - Specifies the type of thresholding to be applied. It influences how the thresholding operation is performed on the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`downscale_factor`**
    - A factor by which the image is downscaled. This can help in reducing the computational load during the threshold search process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`condition`**
    - A condition that must be met by the thresholded image. It's used to evaluate and select the optimal threshold value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The image after applying the optimal threshold value found. It represents the segmented or binarized version of the source image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FindThreshold:
    """
    simple cond examples:
        cv.countNonZero(t)  > 100  # the number of non black pixels (white when using binary thresh type)
        (t.size - cv.countNonZero(t)) / t.size > .50 # the percentage of black pixels is higher than 50%
        # TODO can detect some shape(s) (requires optional inputs, and for current output maybe not that useful
    if none is found, returns the last
    """

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "src": ("IMAGE",),
                "start_at": ("INT", {"default": 1, "min": 1, "max": 255, "step": 1}),
                "end_at": ("INT", {"default": 255, "min": 1, "max": 255, "step": 1}),
                "thresh_type": (thresh_types, {"default": thresh_types[0]}),
                "downscale_factor": ("INT", {"default": 2, "min": 1, "step": 1}),
                "condition": ("STRING", {"multiline": True, "default":
                    "# Some expression that returns True or False\n"}),
            },
        }  # TODO optional inputs

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "search"
    CATEGORY = "Bmad/CV/Thresholding"

    def search(self, src, start_at, end_at, thresh_type, downscale_factor, condition):
        import cv2
        import numpy
        import math

        o_img = tensor2opencv(src, 1)
        height, width = tuple(o_img.shape)
        img = cv.resize(o_img, (height // downscale_factor, width // downscale_factor), interpolation=cv.INTER_AREA)

        max_v = max(start_at, end_at)
        min_v = min(start_at, end_at)
        range_to_check = range(min_v, max_v + 1)
        if end_at < start_at:
            range_to_check = range_to_check.__reversed__()

        condition = prepare_text_for_eval(condition)
        cond_check = eval(f"lambda t: {condition}", {
            "__builtins__": {},
            "tuple": tuple, "list": list,
            'm': math, 'cv': cv2, 'np': numpy
        }, {})

        thresh_value = end_at
        for i in range_to_check:
            _, thresh = cv.threshold(img, i, 255, thresh_types_map[thresh_type])
            if cond_check(thresh):
                thresh_value = i
                break

        _, img = cv.threshold(o_img, thresh_value, 255, thresh_types_map[thresh_type])
        img = opencv2tensor(img)
        return (img,)

```
