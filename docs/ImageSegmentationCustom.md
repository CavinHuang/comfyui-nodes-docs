
# Documentation
- Class name: ImageSegmentationCustom
- Category: image/segmentation
- Output node: False

ImageSegmentationCustom节点专门用于自定义图像分割任务，利用先进的配置和模型精确地描绘和分离图像中的不同元素。它设计用于需要定制分割方法的场景，提供灵活的处理能力，增强图像分析能力。

# Input types
## Required
- images
    - 要进行分割的输入图像。这个参数至关重要，因为它直接影响分割结果，决定了要分析和分离的视觉元素。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
- model
    - 指定要使用的分割模型。这个选择对分割的准确性和质量有重大影响，允许根据特定需求进行定制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- alpha_matting
    - 一个布尔标志，表示是否应用alpha matting来改善分割的边缘质量，特别有助于实现更精确和细致的边缘。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- alpha_matting_foreground_threshold
    - 在alpha matting上下文中确定前景元素的阈值，有助于提高对象边界周围的分割准确性。
    - Comfy dtype: INT
    - Python dtype: float
- alpha_matting_background_threshold
    - 在alpha matting过程中识别背景元素的阈值，有助于提高分割图像背景区域的清晰度和精确度。
    - Comfy dtype: INT
    - Python dtype: float
- alpha_matting_erode_size
    - 定义alpha matting中应用的腐蚀大小，可以帮助减少边缘周围的噪声并提高整体分割质量。
    - Comfy dtype: INT
    - Python dtype: int
- post_process_mask
    - 表示是否应对分割掩码应用后处理以提高其质量，如平滑边缘或去除噪声。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- mean
    - 用于归一化输入图像的均值，通过调整图像的颜色属性在准备图像进行分割时起关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: Tuple[float, float, float]
- std
    - 图像归一化的标准差值，对于调整像素值的比例以匹配模型的预期输入分布至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: Tuple[float, float, float]
- size
    - 指定在分割之前将图像调整到的目标大小，影响分割输出的分辨率和细节水平。
    - Comfy dtype: INT
    - Python dtype: Tuple[int, int]

# Output types
- image
    - 分割后的图像，其中每个图像内的不同元素都被精确地描绘和分离，可用于进一步分析或处理。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageSegmentationCustom:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "model": (folder_paths.get_filename_list("onnx"),),
                "alpha_matting": (["true", "false"],),
                "alpha_matting_foreground_threshold": ("INT", {
                    "default": 240,
                    "max": 250,
                    "step": 5
                }),
                "alpha_matting_background_threshold": ("INT", {
                    "default": 20,
                    "max": 250,
                    "step": 5
                }),
                "alpha_matting_erode_size": ("INT", {
                    "default": 10,
                    "step": 1
                }),
                "post_process_mask": (["false", "true"],),
                "mean": ("FLOAT", {
                    "default": 0.485,
                    "max": 1.0,
                    "step": 0.01
                }),
                "std": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "size": ("INT", {
                    "default": 1024,
                    "step": 8
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/segmentation"

    def node(
            self,
            images,
            model,
            alpha_matting,
            alpha_matting_foreground_threshold,
            alpha_matting_background_threshold,
            alpha_matting_erode_size,
            post_process_mask,
            mean,
            std,
            size
    ):
        container = CustomSessionContainer(mean, mean, mean, std, std, std, size, size)

        class CustomSession(CustomAbstractSession):
            def __init__(self):
                super().__init__(model)

            @classmethod
            def name(cls, *args, **kwargs):
                return model

        session = CustomSession().from_container(container)

        return ImageSegmentation().node(
            images,
            model,
            alpha_matting,
            alpha_matting_foreground_threshold,
            alpha_matting_background_threshold,
            alpha_matting_erode_size,
            post_process_mask,
            session
        )

```
