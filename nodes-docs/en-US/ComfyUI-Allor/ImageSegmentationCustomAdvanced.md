---
tags:
- Segmentation
---

# ImageSegmentationCustomAdvanced
## Documentation
- Class name: `ImageSegmentationCustomAdvanced`
- Category: `image/segmentation`
- Output node: `False`

The ImageSegmentationCustomAdvanced node is designed for advanced image segmentation tasks, offering customizable options for processing images with specific models and settings. It enables fine-tuning of segmentation parameters and post-processing techniques to achieve precise and tailored segmentation results.
## Input types
### Required
- **`images`**
    - The images to be segmented. This parameter is crucial as it directly influences the segmentation outcome by providing the visual data for processing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`model`**
    - The segmentation model to be used. This choice affects the accuracy and type of segmentation performed, allowing for flexibility in addressing various segmentation challenges.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alpha_matting`**
    - A boolean flag indicating whether alpha matting should be applied to refine the segmentation edges. This enhances the quality of the segmentation by providing smoother and more natural edges.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`alpha_matting_foreground_threshold`**
    - The threshold value for determining foreground pixels in alpha matting. This parameter helps in fine-tuning the edge refinement process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha_matting_background_threshold`**
    - The threshold value for determining background pixels in alpha matting. It plays a key role in accurately separating the background from the foreground.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha_matting_erode_size`**
    - The size of the erosion applied during alpha matting. This affects the detail level of the segmentation edges, allowing for more precise edge control.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`post_process_mask`**
    - A boolean flag indicating whether the segmentation mask should undergo post-processing. This can include operations like smoothing or filtering to improve the mask's quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`mean_r`**
    - The mean red channel value used for normalizing the images. This value is crucial for ensuring that the image data is properly scaled before processing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mean_g`**
    - The mean green channel value used for normalizing the images. This value is crucial for ensuring that the image data is properly scaled before processing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mean_b`**
    - The mean blue channel value used for normalizing the images. This value is crucial for ensuring that the image data is properly scaled before processing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`std_r`**
    - The standard deviation of the red channel used for image normalization. This value ensures that the image data is normalized consistently across all images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`std_g`**
    - The standard deviation of the green channel used for image normalization. This value ensures that the image data is normalized consistently across all images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`std_b`**
    - The standard deviation of the blue channel used for image normalization. This value ensures that the image data is normalized consistently across all images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`width`**
    - The target width to which the images will be resized before segmentation. This parameter ensures that all images are processed at a consistent scale, affecting the segmentation's accuracy and performance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The target height to which the images will be resized before segmentation. This parameter ensures that all images are processed at a consistent scale, affecting the segmentation's accuracy and performance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The segmented image or images. This output represents the final segmentation results, showcasing the separated foreground from the background.
    - Python dtype: `List[Image]`
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
