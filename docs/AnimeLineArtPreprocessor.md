
# Documentation
- Class name: AnimeLineArtPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

AnimeLineArtPreprocessor节点专门用于从动漫图像中提取线稿。它使用专门的模型来处理图像并增强其线条艺术特征，使其适用于需要清晰分明的线条绘图的应用场景。

# Input types
## Required
- image
    - 需要处理以提取线稿的输入图像。这个参数至关重要，因为它决定了输出线稿的质量和特征。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- resolution
    - 指定输出图像的分辨率。更高的分辨率可能会带来更详细的线稿，但也可能增加处理时间。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经过处理的图像，具有增强的线条艺术特征。这个输出非常适合进一步的艺术创作或分析应用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
