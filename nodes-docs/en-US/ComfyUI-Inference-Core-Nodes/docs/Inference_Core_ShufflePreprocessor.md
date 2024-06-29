---
tags:
- Image
---

# [Inference.Core] Content Shuffle
## Documentation
- Class name: `Inference_Core_ShufflePreprocessor`
- Category: `ControlNet Preprocessors/T2IAdapter-only`
- Output node: `False`

The Inference_Core_ShufflePreprocessor node is designed to preprocess images by applying a content shuffle operation. This operation aims to detect and potentially rearrange elements within an image to enhance or modify its content for further processing steps, particularly in tasks that require content manipulation or augmentation.
## Input types
### Required
- **`image`**
    - The image to be processed. It is the primary input for the content shuffle operation, serving as the basis for detection and rearrangement of elements within the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`resolution`**
    - Specifies the resolution to which the image should be resized before processing. This affects the granularity of the shuffle operation, with higher resolutions allowing for more detailed manipulations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed for the random number generator used in the shuffle operation. This allows for reproducibility of the shuffle effect across different runs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image after the content shuffle operation has been applied. This output is ready for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
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
