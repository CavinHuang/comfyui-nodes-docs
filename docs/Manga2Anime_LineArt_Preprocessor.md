
# Documentation
- Class name: `Manga2Anime_LineArt_Preprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

该节点旨在通过从漫画图像中提取线稿来预处理图像，将其转换为适合动漫风格渲染的格式。它利用专门的模型来检测和突出线稿，确保输出经过优化，可以直接用于进一步处理或动漫风格的视觉项目。

# Input types
## Required
- **`image`**
    - 需要进行漫画线稿提取处理的输入图像。这个图像会经过变换以突出线稿，使其适合动漫风格的渲染。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- **`resolution`**
    - 指定在进行线稿提取之前，输入图像需要缩放到的分辨率。这个参数确保输出能够针对所需的视觉质量进行优化。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- **`image`**
    - 经过处理后提取出漫画线稿的图像，以适合动漫风格渲染的格式呈现。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
