
# Documentation
- Class name: Contours
- Category: Bmad/CV/Contour
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Contours节点旨在根据指定的检索和近似模式从图像中识别和提取轮廓。它将输入图像转换为灰度版本，必要时应用阈值处理，并利用OpenCV的轮廓查找功能返回识别出的轮廓及其层次结构。

# Input types
## Required
- image
    - 输入图像，用于提取轮廓。这个图像至关重要，因为它是轮廓检测的基础，直接影响所识别的轮廓及其特征。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- retrieval_mode
    - 指定轮廓检索模式，决定轮廓的组织或检索方式。这个选择会影响输出轮廓的结构，进而影响轮廓的层次关系或分组方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- approximation_mode
    - 定义用于近似轮廓的方法。不同的模式可以以各种方式简化轮廓形状，影响提取轮廓的细节水平和整体形状。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- cv_contours
    - 图像中检测到的轮廓列表，是轮廓检测的主要输出。
    - Comfy dtype: CV_CONTOURS
    - Python dtype: List[torch.Tensor]
- cv_contour
    - 从检测到的轮廓列表中选择的单个轮廓，基于特定标准或处理步骤。
    - Comfy dtype: CV_CONTOUR
    - Python dtype: torch.Tensor
- cv_contours_hierarchy
    - 轮廓的层次表示，指示轮廓级别之间的关系。这种层次结构提供了图像中轮廓嵌套和组织的洞察。
    - Comfy dtype: CV_CONTOURS_HIERARCHY
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Contours:
    """
    Note:
    The image is converted to grey, but no threshold is applied.
    Apply the thresholding before using and feed a black and white image.
    """

    approximation_modes_map = {
        'CHAIN_APPROX_NONE': cv.CHAIN_APPROX_NONE,
        'CHAIN_APPROX_SIMPLE': cv.CHAIN_APPROX_SIMPLE,
        'CHAIN_APPROX_TC89_L1': cv.CHAIN_APPROX_TC89_L1,
        'CHAIN_APPROX_TC89_KCOS': cv.CHAIN_APPROX_TC89_KCOS
    }
    approximation_modes = list(approximation_modes_map.keys())

    retrieval_modes_map = {
        'RETR_EXTERNAL': cv.RETR_EXTERNAL,
        'RETR_LIST': cv.RETR_LIST,
        'RETR_CCOMP': cv.RETR_CCOMP,
        'RETR_TREE': cv.RETR_TREE,
        'RETR_FLOODFILL': cv.RETR_FLOODFILL
    }
    retrieval_modes = list(retrieval_modes_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "retrieval_mode": (s.retrieval_modes, {"default": "RETR_LIST"}),
                "approximation_mode": (s.approximation_modes, {"default": "CHAIN_APPROX_SIMPLE"}),
            },
        }

    RETURN_TYPES = ("CV_CONTOURS", "CV_CONTOUR", "CV_CONTOURS_HIERARCHY")
    FUNCTION = "find_contours"
    CATEGORY = "Bmad/CV/Contour"
    OUTPUT_IS_LIST = (False, True, False)

    def find_contours(self, image, retrieval_mode, approximation_mode):
        image = tensor2opencv(image)
        thresh = cv.cvtColor(image, cv.COLOR_RGB2GRAY)

        # no thresh applied here, non zeroes are treated as 1 according to documentation;
        # thresh should have been already applied to the image, before passing it to this node.

        contours, hierarchy = cv.findContours(
            thresh,
            self.retrieval_modes_map[retrieval_mode],
            self.approximation_modes_map[approximation_mode])

        return (contours, contours, hierarchy,)

```
