
# Documentation
- Class name: InRange (hsv)
- Category: Bmad/CV/Thresholding
- Output node: False

InRangeHSV节点旨在基于指定的色相、饱和度和亮度（HSV）范围对图像进行过滤。它允许选择HSV值包含边界内的像素，从而能够在图像中隔离特定颜色或颜色范围。

# Input types
## Required
- rgb_image
    - 需要转换为HSV并根据指定HSV值进行过滤的输入RGB图像。这个参数对于定义颜色过滤操作的范围至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- color_a
    - HSV格式的两个颜色边界之一，用于定义过滤范围。这个参数与color_b一起决定了要隔离的特定颜色范围。
    - Comfy dtype: HSV_COLOR
    - Python dtype: Tuple[int, int, int]
- color_b
    - HSV格式的两个颜色边界中的第二个，用于定义过滤范围。与color_a一起使用，以指定要过滤的确切颜色范围。
    - Comfy dtype: HSV_COLOR
    - Python dtype: Tuple[int, int, int]
- hue_mode
    - 指定用于色相过滤的方法，允许不同的策略，如忽略、分割或选择最大/最小色相区间。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 应用HSV范围过滤后的输出图像，突出显示指定HSV范围内的像素，有效地隔离所需的颜色范围。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


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
