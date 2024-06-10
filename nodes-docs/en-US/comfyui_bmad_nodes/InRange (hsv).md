---
tags:
- Color
- HSVColorSpace
---

# InRange (hsv)
## Documentation
- Class name: `InRange (hsv)`
- Category: `Bmad/CV/Thresholding`
- Output node: `False`

The InRangeHSV node is designed to filter an image based on a specified hue, saturation, and value (HSV) range. It allows for the selection of pixels within inclusive bounds of HSV values, enabling the isolation of specific colors or color ranges within an image.
## Input types
### Required
- **`rgb_image`**
    - The input RGB image to be converted to HSV and filtered based on the specified HSV values. This parameter is essential for defining the scope of the color filtering operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`color_a`**
    - One of the two color bounds in HSV format to define the filtering range. This parameter, in conjunction with color_b, determines the specific color range to be isolated.
    - Comfy dtype: `HSV_COLOR`
    - Python dtype: `Tuple[int, int, int]`
- **`color_b`**
    - The second of the two color bounds in HSV format to define the filtering range. Works together with color_a to specify the exact color range to be filtered.
    - Comfy dtype: `HSV_COLOR`
    - Python dtype: `Tuple[int, int, int]`
- **`hue_mode`**
    - Specifies the method to apply for hue filtering, allowing for different strategies such as ignoring, splitting, or selecting the largest/smallest hue interval.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after applying the HSV range filtering, highlighting the pixels within the specified HSV range and effectively isolating the desired color range.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class InRangeHSV:
    # w/ respect to documentation in :
    #   https://docs.opencv.org/3.4/d2/de8/group__core__array.html#ga48af0ab51e36436c5d04340e036ce981
    # both bounds are inclusive

    @staticmethod
    def get_saturation_and_value_bounds(color_a, color_b):
        min_s = min(color_a[1], color_b[1])
        max_s = max(color_a[1], color_b[1])
        min_v = min(color_a[2], color_b[2])
        max_v = max(color_a[2], color_b[2])
        return min_s, max_s, min_v, max_v

    @staticmethod
    def hue_ignore(image, color_a, color_b):
        ls, us, lv, uv = InRangeHSV.get_saturation_and_value_bounds(color_a, color_b)
        return cv.inRange(image, np.array((0, ls, lv)), np.array((179, us, uv)))

    @staticmethod
    def hue_single(image, color_a, color_b):
        ls, us, lv, uv = InRangeHSV.get_saturation_and_value_bounds(color_a, color_b)
        lh = min(color_a[0], color_b[0])
        uh = max(color_a[0], color_b[0])
        return cv.inRange(image, np.array((lh, ls, lv)), np.array((uh, us, uv)))

    @staticmethod
    def hue_split(image, color_a, color_b):
        ls, us, lv, uv = InRangeHSV.get_saturation_and_value_bounds(color_a, color_b)
        lh = min(color_a[0], color_b[0])
        uh = max(color_a[0], color_b[0])
        thresh_1 = cv.inRange(image, np.array((0, ls, lv)), np.array((lh, us, uv)))
        thresh_2 = cv.inRange(image, np.array((uh, ls, lv)), np.array((179, us, uv)))
        return cv.bitwise_or(thresh_1, thresh_2)

    LARGEST_HUE_INTERVAL = False
    SMALLEST_HUE_INTERVAL = True

    @staticmethod
    def choose_hue_method(color_a, color_b, interval_to_select):
        single_interval = abs(color_a[0] - color_b[0])
        split_interval = 180 - single_interval
        return InRangeHSV.hue_split \
            if split_interval < single_interval and interval_to_select == InRangeHSV.SMALLEST_HUE_INTERVAL \
               or split_interval > single_interval and interval_to_select == InRangeHSV.LARGEST_HUE_INTERVAL \
            else InRangeHSV.hue_single

    @staticmethod
    def hue_smallest(image, color_a, color_b):
        hue_method = InRangeHSV.choose_hue_method(color_a, color_b, InRangeHSV.SMALLEST_HUE_INTERVAL)
        return hue_method(image, color_a, color_b)

    @staticmethod
    def hue_largest(image, color_a, color_b):
        hue_method = InRangeHSV.choose_hue_method(color_a, color_b, InRangeHSV.LARGEST_HUE_INTERVAL)
        return hue_method(image, color_a, color_b)

    hue_modes_map = {
        "SMALLEST": hue_smallest,  # choose the smallest interval, independently of whether it requires a split or not
        "LARGEST": hue_largest,  # same as above but chooses the largest interval
        "IGNORE": hue_ignore,  # disregard hue entirely
        "SINGLE": hue_single,  # single check, ignores whether used interval is the smallest or the largest
        "SPLIT": hue_split,  # splits the check and ignores whether used interval is the smallest or the largest
    }
    hue_modes = list(hue_modes_map.keys())
    HUE_MODE_SINGLE = hue_modes[3]
    HUE_MODE_SPLIT = hue_modes[4]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "rgb_image": ("IMAGE",),
            "color_a": ("HSV_COLOR",),
            "color_b": ("HSV_COLOR",),
            "hue_mode": (s.hue_modes, {"default": s.hue_modes[0]})
        }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "thresh"
    CATEGORY = "Bmad/CV/Thresholding"

    def thresh(self, rgb_image, color_a, color_b, hue_mode):
        image = tensor2opencv(rgb_image, 3)
        image = cv.cvtColor(image, cv.COLOR_RGB2HSV)
        thresh = self.hue_modes_map[hue_mode](image, color_a, color_b)
        thresh = cv.cvtColor(thresh, cv.COLOR_GRAY2RGB)
        thresh = opencv2tensor(thresh)
        return (thresh,)

```
