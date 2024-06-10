---
tags:
- Image
---

# Content Shuffle
## Documentation
- Class name: `ShufflePreprocessor`
- Category: `ControlNet Preprocessors/T2IAdapter-only`
- Output node: `False`

The ShufflePreprocessor node is designed to preprocess images by applying a content shuffle detection algorithm. This preprocessing step is crucial for tasks that require the identification or manipulation of shuffled content within images, enhancing the model's ability to recognize and handle such patterns effectively.
## Input types
### Required
- **`image`**
    - The input image to be processed. It is the primary data on which the content shuffle detection algorithm is applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image or numpy.ndarray`
- **`resolution`**
    - Specifies the resolution to which the input image is resized before processing. This parameter can influence the detection accuracy and performance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the shuffle detection process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image after applying the content shuffle detection algorithm. It represents the detected shuffled content within the original image.
    - Python dtype: `PIL.Image or numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Shuffle_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": dict(
                image=("IMAGE",),
                resolution=("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 64}),
                seed=("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})
            )
        }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "preprocess"

    CATEGORY = "ControlNet Preprocessors/T2IAdapter-only"

    def preprocess(self, image, resolution=512, seed=None):
        from controlnet_aux.shuffle import ContentShuffleDetector

        return (common_annotator_call(ContentShuffleDetector(), image, resolution=resolution, seed=seed), )

```
