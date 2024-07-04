
# Documentation
- Class name: Inference_Core_Manga2Anime_LineArt_Preprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

该节点专门用于预处理漫画图像以提取线稿，将其转化为适合动画风格视觉增强的格式。它利用专门的模型来检测和优化漫画线稿，确保输出结果针对后续的动画风格渲染过程进行了优化。

# Input types
## Required
- image
    - 需要进行处理以提取漫画线稿的输入图像。该图像经过变换以突出显示重要的线稿，为动画风格渲染做准备。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 指定输出线稿图像的分辨率，允许控制提取线条的细节级别。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经过处理并提取了漫画线稿的图像，已准备好进行进一步的动画风格渲染。
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
