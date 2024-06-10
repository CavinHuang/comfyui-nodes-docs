---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# Anime Lineart
## Documentation
- Class name: `AnimeLineArtPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The AnimeLineArtPreprocessor node is designed for extracting line art from anime images. It utilizes a specialized model to process images and enhance their line art features, making it suitable for applications that require clean and distinct line drawings.
## Input types
### Required
- **`image`**
    - The input image to be processed for line art extraction. This parameter is crucial as it determines the quality and characteristics of the output line art.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution of the output image. A higher resolution can lead to more detailed line art but may increase processing time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with enhanced line art features. This output is ideal for further artistic or analytical applications.
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
