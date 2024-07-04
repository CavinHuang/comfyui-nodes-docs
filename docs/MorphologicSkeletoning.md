
# Documentation
- Class name: MorphologicSkeletoning
- Category: Bmad/CV/Morphology
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

MorphologicSkeletoning 节点用于计算图像的形态学骨架。它将输入图像转换成一种最小化但完全具有代表性的骨架形式，该形式保留了原始形状的结构和连通性。这种转换在图像分析和处理中非常有用，可以提取出图像的本质特征。

# Input types
## Required
- src
    - src 参数代表需要处理的源图像。它对于确定骨架变换中原始形状的结构和连通性至关重要。源图像的质量和特征直接影响最终骨架的精度和代表性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是输入图像的骨架表示。这种表示以最小化的形式保留了原始形状的结构和连通性。骨架图像通常呈现为细线条结构，突出显示了原始图像的主要特征和拓扑结构。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MorphologicSkeletoning:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "src": ("IMAGE",)
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "compute"
    CATEGORY = "Bmad/CV/Morphology"

    def compute(self, src):
        from skimage.morphology import skeletonize
        img = tensor2opencv(src, 1)
        _, img = cv.threshold(img, 127, 1, cv.THRESH_BINARY)  # ensure it is binary and set max value to 1.
        skel = skeletonize(img) * 255
        img = opencv2tensor(skel)
        return (img,)

```
