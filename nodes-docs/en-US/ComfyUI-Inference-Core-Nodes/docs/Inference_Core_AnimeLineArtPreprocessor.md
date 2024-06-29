---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# [Inference.Core] Anime Lineart
## Documentation
- Class name: `Inference_Core_AnimeLineArtPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

This node specializes in preprocessing images to extract anime-style line art, utilizing a dedicated model for detecting and enhancing line art features in anime images. It's designed to work within a ControlNet preprocessing pipeline, focusing on the transformation of input images into a format optimized for further anime-related image processing tasks.
## Input types
### Required
- **`image`**
    - The input image to be processed for anime line art extraction. This image serves as the primary data for the line art detection model, determining the quality and characteristics of the output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution for the output line art image, affecting the level of detail and clarity in the extracted line art.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with anime-style line art extracted, ready for use in subsequent processing stages.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AnimeLineArt_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.lineart_anime import LineartAnimeDetector

        model = LineartAnimeDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out, )

```
