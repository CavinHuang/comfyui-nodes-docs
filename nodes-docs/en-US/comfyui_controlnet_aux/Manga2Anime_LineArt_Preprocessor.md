---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# Manga Lineart (aka lineart_anime_denoise)
## Documentation
- Class name: `Manga2Anime_LineArt_Preprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

This node is designed to preprocess images by extracting line art from manga images, transforming them into a format suitable for anime-style rendering. It utilizes a specialized model to detect and highlight the line art, ensuring the output is optimized for further processing or direct use in anime-style visual projects.
## Input types
### Required
- **`image`**
    - The input image to be processed for manga line art extraction. This image is transformed to highlight the line art, making it suitable for anime-style rendering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image is scaled before line art extraction. This parameter ensures the output is optimized for the desired visual quality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with manga line art extracted, presented in a format optimized for anime-style rendering.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Manga2Anime_LineArt_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.manga_line import LineartMangaDetector

        model = LineartMangaDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out, )

```
