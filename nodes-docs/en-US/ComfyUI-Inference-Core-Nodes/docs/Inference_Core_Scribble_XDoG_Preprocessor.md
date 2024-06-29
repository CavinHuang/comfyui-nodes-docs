---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# [Inference.Core] Scribble XDoG Lines
## Documentation
- Class name: `Inference_Core_Scribble_XDoG_Preprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

This node is designed to preprocess images by applying a combination of Scribble and XDoG (eXtended Difference of Gaussians) techniques to extract stylized line drawings. It's part of the ControlNet Preprocessors/Line Extractors category, aimed at enhancing image analysis and processing tasks by emphasizing essential outlines and features.
## Input types
### Required
- **`image`**
    - The input image to be processed. It serves as the primary data for the line extraction process, where the node applies Scribble and XDoG techniques to highlight and stylize important features.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`threshold`**
    - Defines the intensity threshold for the XDoG filter, affecting the contrast and visibility of the extracted lines. It allows for fine-tuning the line extraction to achieve the desired artistic effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - Specifies the resolution for the output image. It determines the level of detail and quality of the processed image, ensuring that the extracted lines are appropriately scaled.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a processed image with stylized lines extracted using the Scribble and XDoG techniques. It highlights essential features and outlines, suitable for further image analysis or artistic applications.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Scribble_XDoG_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            threshold = ("INT", {"default": 32, "min": 1, "max": 64, "step": 1})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, threshold, resolution=512, **kwargs):
        from controlnet_aux.scribble import ScribbleXDog_Detector

        model = ScribbleXDog_Detector()
        return (common_annotator_call(model, image, resolution=resolution, thr_a=threshold), )

```
