# Documentation
- Class name: IPAdapterCombineWeights
- Category: ipadapter/weights
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterCombineWeights节点支持权重调度，允许用户在不同时间段内调整图像的影响力，实现平滑的过渡和动画效果。这种方法比使用渐变蒙版更轻量且更高效​

# Output types
- weights
    - weights输出代表了将指定方法应用于输入权重的结果。它包含了节点目的的精髓，提供了输入数据的合成形式，可以用于进一步的分析或模型训练。
    - Comfy dtype: FLOAT
    - Python dtype: float
- count
    - count输出代表了输入权重的数量。它是节点的一个重要属性，用于描述输入数据的规模和范围。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterCombineWeights:
    @classmethod
    def INPUT_TYPES(s):
        return {
        "required": {
            "weights_1": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05 }),
            "weights_2": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05 }),
        }}
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("weights", "count")
    FUNCTION = "combine"
    CATEGORY = "ipadapter/utils"

    def combine(self, weights_1, weights_2):
        if not isinstance(weights_1, list):
            weights_1 = [weights_1]
        if not isinstance(weights_2, list):
            weights_2 = [weights_2]
        weights = weights_1 + weights_2

        return (weights, len(weights), )
```