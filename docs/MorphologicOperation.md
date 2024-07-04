
# Documentation
- Class name: MorphologicOperation
- Category: Bmad/CV/Morphology
- Output node: False

MorphologicOperation节点提供了一套全面的形态学操作用于图像处理，包括腐蚀、膨胀、开运算、闭运算、梯度、顶帽和底帽变换。它旨在对图像应用这些操作，允许在二值图像上下文中进行各种形式的结构修改和分析。

# Input types
## Required
- src
    - 需要进行形态学操作处理的源图像，根据指定的操作、核类型和迭代次数实现结构性修改。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- operation
    - 决定要应用的具体形态学操作，如腐蚀或膨胀，影响图像的结构转换。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- kernel_type
    - 指定形态学操作中使用的核的形状，影响变换的性质。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- kernel_size_x
    - 核的水平尺寸，影响操作对图像的作用范围和影响程度。
    - Comfy dtype: INT
    - Python dtype: int
- kernel_size_y
    - 核的垂直尺寸，影响形态学变换的作用范围和深度。
    - Comfy dtype: INT
    - Python dtype: int
- iterations
    - 形态学操作应用的次数，允许进行渐进的结构变化。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经过形态学操作后的输出图像，反映了所做的结构性变化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MorphologicOperation:
    # I did not want to make this node, but alas, I found no suit w/ the top/black hat operation
    # so might as well make a generic node w/ all the operations
    # just return as BW and implement convert node

    operation_map = {
        "MORPH_ERODE": cv.MORPH_ERODE,
        "MORPH_DILATE": cv.MORPH_DILATE,
        "MORPH_OPEN": cv.MORPH_OPEN,
        "MORPH_CLOSE": cv.MORPH_CLOSE,
        "MORPH_GRADIENT": cv.MORPH_GRADIENT,
        "MORPH_TOPHAT": cv.MORPH_TOPHAT,
        "MORPH_BLACKHAT": cv.MORPH_BLACKHAT,
    }
    operations = list(operation_map.keys())

    kernel_types_map = {
        "MORPH_RECT": cv.MORPH_RECT,
        "MORPH_ELLIPSE": cv.MORPH_ELLIPSE,
        "MORPH_CROSS": cv.MORPH_CROSS,
    }
    kernel_types = list(kernel_types_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "src": ("IMAGE",),
                "operation": (s.operations, {"default": s.operations[0]}),
                "kernel_type": (s.kernel_types, {"default": s.kernel_types[0]}),
                "kernel_size_x": ("INT", {"default": 4, "min": 2, "step": 2}),
                "kernel_size_y": ("INT", {"default": 4, "min": 2, "step": 2}),
                "iterations": ("INT", {"default": 1, "step": 1}),
            },
            # TODO maybe add optional input for custom kernel
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"
    CATEGORY = "Bmad/CV/Morphology"

    def apply(self, src, operation, kernel_type, kernel_size_x, kernel_size_y, iterations):
        img = tensor2opencv(src, 1)
        kernel = cv.getStructuringElement(self.kernel_types_map[kernel_type], (kernel_size_x + 1, kernel_size_y + 1))
        for i in range(iterations):
            img = cv.morphologyEx(img, self.operation_map[operation], kernel)
        return (opencv2tensor(img),)

```
