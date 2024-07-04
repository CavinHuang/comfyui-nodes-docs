
# Documentation
- Class name: ImageSegmentationCustomAdvanced
- Category: image/segmentation
- Output node: False

ImageSegmentationCustomAdvanced节点专为高级图像分割任务而设计，提供可定制选项，以使用特定模型和设置处理图像。它允许微调分割参数和后处理技术，以实现精确和定制化的分割结果。

# Input types
## Required
- images
    - 待分割的图像。此参数至关重要，因为它通过提供视觉数据来直接影响分割结果。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
- model
    - 要使用的分割模型。这个选择影响分割的准确性和类型，允许灵活应对各种分割挑战。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- alpha_matting
    - 一个布尔标志，指示是否应用alpha matting来细化分割边缘。这通过提供更平滑和自然的边缘来提高分割质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- alpha_matting_foreground_threshold
    - 在alpha matting中确定前景像素的阈值。此参数有助于微调边缘细化过程。
    - Comfy dtype: INT
    - Python dtype: int
- alpha_matting_background_threshold
    - 在alpha matting中确定背景像素的阈值。它在准确分离背景和前景方面起关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- alpha_matting_erode_size
    - alpha matting过程中应用的腐蚀大小。这影响分割边缘的细节水平，允许更精确的边缘控制。
    - Comfy dtype: INT
    - Python dtype: int
- post_process_mask
    - 一个布尔标志，指示分割掩码是否应进行后处理。这可能包括平滑或过滤等操作，以提高掩码质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- mean_r
    - 用于归一化图像的平均红色通道值。这个值对确保图像数据在处理前正确缩放至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mean_g
    - 用于归一化图像的平均绿色通道值。这个值对确保图像数据在处理前正确缩放至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mean_b
    - 用于归一化图像的平均蓝色通道值。这个值对确保图像数据在处理前正确缩放至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- std_r
    - 用于图像归一化的红色通道标准差。这个值确保图像数据在所有图像中一致地归一化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- std_g
    - 用于图像归一化的绿色通道标准差。这个值确保图像数据在所有图像中一致地归一化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- std_b
    - 用于图像归一化的蓝色通道标准差。这个值确保图像数据在所有图像中一致地归一化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- width
    - 图像在分割前将被调整到的目标宽度。此参数确保所有图像以一致的比例进行处理，影响分割的准确性和性能。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 图像在分割前将被调整到的目标高度。此参数确保所有图像以一致的比例进行处理，影响分割的准确性和性能。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 分割后的图像或图像集。此输出代表最终的分割结果，展示从背景中分离出的前景。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageSegmentationCustomAdvanced:
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
                "mean_r": ("FLOAT", {
                    "default": 0.485,
                    "max": 1.0,
                    "step": 0.01
                }),
                "mean_g": ("FLOAT", {
                    "default": 0.456,
                    "max": 1.0,
                    "step": 0.01
                }),
                "mean_b": ("FLOAT", {
                    "default": 0.406,
                    "max": 1.0,
                    "step": 0.01
                }),
                "std_r": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "std_g": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "std_b": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "width": ("INT", {
                    "default": 1024,
                    "step": 8
                }),
                "height": ("INT", {
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
            mean_x,
            mean_y,
            mean_z,
            std_x,
            std_y,
            std_z,
            width,
            height
    ):
        container = CustomSessionContainer(mean_x, mean_y, mean_z, std_x, std_y, std_z, width, height)

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
