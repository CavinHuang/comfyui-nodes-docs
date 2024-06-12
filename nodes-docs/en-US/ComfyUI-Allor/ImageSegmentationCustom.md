---
tags:
- Segmentation
---

# ImageSegmentationCustom
## Documentation
- Class name: `ImageSegmentationCustom`
- Category: `image/segmentation`
- Output node: `False`

This node specializes in custom image segmentation tasks, leveraging advanced configurations and models to precisely delineate and separate different elements within images. It is designed for scenarios requiring tailored segmentation approaches, offering flexibility in processing and enhancing image analysis capabilities.
## Input types
### Required
- **`images`**
    - The input images to be segmented. This parameter is crucial as it directly influences the segmentation outcome, determining the visual elements to be analyzed and separated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`model`**
    - Specifies the segmentation model to be used. This choice significantly impacts the accuracy and quality of the segmentation, allowing for customization to fit specific requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alpha_matting`**
    - A boolean flag indicating whether alpha matting should be applied to improve the segmentation's edge quality, particularly useful for achieving more precise and refined edges.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`alpha_matting_foreground_threshold`**
    - The threshold value for determining foreground elements in the context of alpha matting, aiding in the enhancement of segmentation accuracy around object borders.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`alpha_matting_background_threshold`**
    - The threshold value for identifying background elements during alpha matting, contributing to the clarity and precision of the segmented image's background areas.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`alpha_matting_erode_size`**
    - Defines the size of the erosion applied in alpha matting, which can help in reducing the noise around edges and improving the overall segmentation quality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`post_process_mask`**
    - Indicates whether post-processing should be applied to the segmentation mask to refine its quality, such as smoothing edges or removing noise.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`mean`**
    - The mean values used for normalizing the input images, playing a critical role in preparing the images for segmentation by adjusting their color properties.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Tuple[float, float, float]`
- **`std`**
    - The standard deviation values for image normalization, essential for adjusting the scale of pixel values to match the model's expected input distribution.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Tuple[float, float, float]`
- **`size`**
    - Specifies the target size to which the images will be resized before segmentation, impacting the resolution and detail level of the segmentation output.
    - Comfy dtype: `INT`
    - Python dtype: `Tuple[int, int]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The segmented images, where different elements within each image are precisely delineated and separated, ready for further analysis or processing.
    - Python dtype: `List[Image]`
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
