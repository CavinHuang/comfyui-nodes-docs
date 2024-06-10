---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# Scribble XDoG Lines
## Documentation
- Class name: `Scribble_XDoG_Preprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The Scribble_XDoG_Preprocessor node is designed for extracting stylized line drawings from images using a combination of scribble detection and XDoG (eXtended Difference of Gaussians) filtering techniques. It preprocesses images to highlight important edges and details, making them suitable for further artistic or analytical processing.
## Input types
### Required
- **`image`**
    - The input image to be processed for line extraction. It serves as the primary data for the node to apply scribble detection and XDoG filtering techniques.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`threshold`**
    - Determines the sensitivity of the XDoG filter in detecting edges. A lower threshold value results in finer details being captured, while a higher value emphasizes more prominent edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - Specifies the resolution at which the image should be processed. It affects the level of detail captured in the extracted lines.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a processed image with stylized line drawings, emphasizing edges and details extracted using the Scribble_XDoG technique.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)



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
