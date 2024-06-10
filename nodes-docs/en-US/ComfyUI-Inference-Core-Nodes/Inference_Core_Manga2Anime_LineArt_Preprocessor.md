---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# [Inference.Core] Manga Lineart (aka lineart_anime_denoise)
## Documentation
- Class name: `Inference_Core_Manga2Anime_LineArt_Preprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

This node specializes in preprocessing manga images to extract line art, transforming them into a format suitable for anime-style visual enhancements. It leverages a dedicated model to detect and refine manga line art, ensuring the output is optimized for subsequent anime-style rendering processes.
## Input types
### Required
- **`image`**
    - The input image to be processed for manga line art extraction. This image is transformed to highlight the essential line art, preparing it for anime-style rendering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution for the output line art image, allowing control over the detail level of the extracted lines.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with manga line art extracted, ready for further anime-style rendering.
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
