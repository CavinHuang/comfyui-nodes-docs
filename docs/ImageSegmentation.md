
# Documentation
- Class name: ImageSegmentation
- Category: image/segmentation
- Output node: False

ImageSegmentation节点专门用于将图像分割成不同的区域，将前景与背景分离。它利用先进的模型和技术(如alpha matting)来优化分割边缘，提供精确且可定制的图像分割功能。

# Input types
## Required
- images
    - 需要进行分割的图像。这个参数至关重要，因为它直接影响分割结果。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- model
    - 指定要使用的分割模型，影响分割的准确性和风格。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- alpha_matting
    - 布尔标志，指示是否应用alpha matting来改善分割边缘，使其更精确和自然。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- alpha_matting_foreground_threshold
    - 应用alpha matting时确定前景像素的阈值，影响分割的精确度。
    - Comfy dtype: INT
    - Python dtype: float
- alpha_matting_background_threshold
    - 在alpha matting上下文中识别背景像素的阈值，影响分割的准确性。
    - Comfy dtype: INT
    - Python dtype: float
- alpha_matting_erode_size
    - alpha matting过程中应用于蒙版的腐蚀大小，可以细化分割边缘。
    - Comfy dtype: INT
    - Python dtype: int
- post_process_mask
    - 指示分割后的蒙版是否应进行后处理以提高质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool

# Output types
- image
    - 分割后的图像，其中前景与背景分离，可用于进一步处理或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageSegmentation:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "model": ([
                              "u2net",
                              "u2netp",
                              "u2net_human_seg",
                              "u2net_cloth_seg",
                              "silueta",
                              "isnet-general-use",
                              "isnetis",
                              "modnet-p",
                              "modnet-w"
                          ],),
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
            session=None
    ):
        if session is None:
            if model == "isnetis":
                session = new_session("isnet-anime")
            elif model == "modnet-p":
                session = ModnetPhotographicSession(model)
            elif model == "modnet-w":
                session = ModnetWebcamSession(model)
            else:
                session = new_session(model)

        def verst(image):
            img: Image = image.tensor_to_image()

            return remove(
                img, alpha_matting == "true",
                alpha_matting_foreground_threshold,
                alpha_matting_background_threshold,
                alpha_matting_erode_size, session,
                False, post_process_mask == "true"
            ).image_to_tensor()

        return (torch.stack([
            verst(images[i]) for i in range(len(images))
        ]),)

```
