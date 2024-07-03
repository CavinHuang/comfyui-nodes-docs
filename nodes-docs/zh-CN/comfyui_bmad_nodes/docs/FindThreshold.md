
# Documentation
- Class name: FindThreshold
- Category: Bmad/CV/Thresholding
- Output node: False

FindThreshold节点旨在基于特定条件识别图像分割或二值化的最佳阈值。它通过动态调整阈值参数以满足所需条件，从而提高图像处理任务的适应性和精确度。

# Input types
## Required
- src
    - 需要应用阈值处理的源图像。对于确定分割或二值化的最佳阈值至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- start_at
    - 阈值范围的起始点。定义了寻找最佳阈值的搜索空间的下限。
    - Comfy dtype: INT
    - Python dtype: int
- end_at
    - 阈值范围的结束点。设置了最佳阈值确定的搜索空间的上限。
    - Comfy dtype: INT
    - Python dtype: int
- thresh_type
    - 指定要应用的阈值处理类型。影响图像上阈值操作的执行方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- downscale_factor
    - 图像缩小的比例因子。有助于在阈值搜索过程中减少计算负荷。
    - Comfy dtype: INT
    - Python dtype: int
- condition
    - 阈值处理后的图像必须满足的条件。用于评估和选择最佳阈值。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 应用找到的最佳阈值后的图像。代表源图像的分割或二值化版本。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
