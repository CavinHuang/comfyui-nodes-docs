
# Documentation
- Class name: Filter Contour
- Category: Bmad/CV/Contour
- Output node: False

Filter Contour节点旨在根据给定的适应度函数和选择标准来处理和筛选轮廓。它允许动态评估和选择图像中的轮廓，利用自定义逻辑来确定最适合进一步处理或分析的轮廓。

# Input types
## Required
- contours
    - 待筛选的轮廓集合。这个参数是节点操作的核心，因为它提供了将根据适应度函数和选择标准进行处理的原始数据。
    - Comfy dtype: CV_CONTOURS
    - Python dtype: List[ndarray]
- fitness
    - 用于评估每个轮廓的自定义适应度函数。这个函数在根据适应度分数确定哪些轮廓被选中输出方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: Callable
- select
    - 用于在通过适应度函数评估轮廓后选择轮廓的标准。这个参数决定了如何选择筛选后的轮廓进行输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- image
    - 一个可选的图像参数，可以在适应度函数中用于轮廓评估。
    - Comfy dtype: IMAGE
    - Python dtype: ndarray | None
- aux_contour
    - 一个可选的辅助轮廓，可以在适应度函数中用于比较分析。
    - Comfy dtype: CV_CONTOUR
    - Python dtype: ndarray | None

# Output types
- cv_contour
    - Comfy dtype: CV_CONTOUR
    - 主要输出包含一个根据提供的适应度函数和选择标准筛选出的单个轮廓。
    - Python dtype: ndarray | None
- cv_contours
    - Comfy dtype: CV_CONTOURS
    - 次要输出包含所有根据适应度函数和选择标准评估并可能筛选的轮廓，包括主要选定的轮廓。
    - Python dtype: List[ndarray]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FilterContour:
    @staticmethod
    def MODE(cnts, fit):
        sorted_list = sorted(cnts, key=fit)
        return [sorted_list[len(sorted_list) // 2]]

    return_modes_map = {
        "MAX": lambda cnts, fit: [sorted(cnts, key=fit)[-1]],
        "MIN": lambda cnts, fit: [sorted(cnts, key=fit)[0]],
        "MODE": MODE,
        "FILTER": lambda cnts, fit: list(filter(fit, cnts)),
    }
    return_modes = list(return_modes_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "contours": ("CV_CONTOURS",),
                "fitness": ("STRING", {"multiline": True, "default":
                    "# Contour Fitness Function\n"}),
                "select": (s.return_modes, {"default": s.return_modes[0]})
            },
            "optional": {
                "image": ("IMAGE",),
                "aux_contour": ("CV_CONTOUR",)
            }
        }

    RETURN_TYPES = ("CV_CONTOUR", "CV_CONTOURS")
    FUNCTION = "filter"
    CATEGORY = "Bmad/CV/Contour"

    def filter(self, contours, fitness, select, image=None, aux_contour=None):
        import math
        import cv2
        import numpy

        if len(contours) == 0:
            print("Contour list is empty")
            return ([[]], contours)

        # region prepare inputs
        if image is not None:
            image = tensor2opencv(image)

        fitness = prepare_text_for_eval(fitness)

        # endregion

        # region available functions
        # cv methods, but cache them
        @cache_with_ids(single=False)
        def boundingRect(cnt):
            return cv.boundingRect(cnt)

        @cache_with_ids(single=False)
        def contourArea(cnt):
            return cv.contourArea(cnt)

        @cache_with_ids(single=False)
        def arcLength(cnt):
            return cv.arcLength(cnt, True)

        @cache_with_ids(single=True)
        def minAreaRect(cnt):
            return cv.minAreaRect(cnt)

        @cache_with_ids(single=True)
        def minEnclosingCircle(cnt):
            return cv.minEnclosingCircle(cnt)

        @cache_with_ids(single=True)
        def fitEllipse(cnt):
            return cv.fitEllipse(cnt)

        @cache_with_ids(single=True)
        def convexHull(cnt):
            return cv.convexHull(cnt)

        # useful properties; adapted from multiple sources, including cv documentation
        @cache_with_ids(single=True)
        def aspect_ratio(cnt):
            x, y, w, h = boundingRect(cnt)
            return float(w) / h

        @cache_with_ids(single=True)
        def extent(cnt):
            area = contourArea(cnt)
            x, y, w, h = boundingRect(cnt)
            rect_area = w * h
            return float(area) / rect_area

        @cache_with_ids(single=True)
        def solidity(cnt):
            area = contourArea(cnt)
            hull = convexHull(cnt)
            hull_area = contourArea(hull)
            return float(area) / hull_area

        @cache_with_ids(single=True)
        def equi_diameter(cnt):
            area = contourArea(cnt)
            return math.sqrt(4 * area / math.pi)

        @cache_with_ids(single=True)
        def center(cnt):
            M = cv.moments(cnt)
            cX = int(M["m10"] / M["m00"])
            cY = int(M["m01"] / M["m00"])
            return cX, cY

        @cache_with_ids(single=False)
        def contour_mask(cnt, img):
            if len(img.shape) > 2:
                height, width, channels = img.shape
            else:
                height, width = img.shape

            mask = numpy.zeros((height, width, 1), numpy.uint8)
            cv.drawContours(mask, [cnt], 0, 255, -1)
            return mask

        @cache_with_ids(single=True)
        def mean_color(cnt, img):
            return cv.mean(img, mask=contour_mask(cnt, img))

        @cache_with_ids(single=True)
        def mean_intensity(cnt, img):
            gray = cv.cvtColor(img, cv.COLOR_RGB2GRAY)
            return mean_color(cnt, gray)[0]

        @cache_with_ids(single=True)
        def extreme_points(cnt):
            l = tuple(cnt[cnt[:, :, 0].argmin()][0])
            r = tuple(cnt[cnt[:, :, 0].argmax()][0])
            t = tuple(cnt[cnt[:, :, 1].argmin()][0])
            b = tuple(cnt[cnt[:, :, 1].argmax()][0])
            return {"top": t, "right": r, "bottom": b, "left": l}

        def intercepts_mask(cnt, img):  # where img should be a binary mask
            gray = cv.cvtColor(img, cv.COLOR_RGB2GRAY)
            intersection = cv2.bitwise_and(gray,
                                           cv2.drawContours(np.zeros_like(gray), [cnt], 0, 255, thickness=cv2.FILLED))
            return cv2.countNonZero(intersection) > 0

        # endregion

        available_funcs = {}
        for key, value in locals().items():
            if callable(value):
                available_funcs[key] = value

        fitness = eval(f"lambda c, i, a: {fitness}", {
            "__builtins__": {},
            "tuple": tuple, "list": list,
            'm': math, 'cv': cv2, 'np': numpy,
            **available_funcs
        }, {})

        ret = self.return_modes_map[select](contours, lambda c: fitness(c, image, aux_contour))
        return (ret[0], ret,)

```
