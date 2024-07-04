
# Documentation
- Class name: Inference_Core_AnimeLineArtPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

这个节点专门用于预处理图像以提取动漫风格的线稿，它使用了专门的模型来检测和增强动漫图像中的线稿特征。该节点设计用于ControlNet预处理流程中，专注于将输入图像转换为适合进一步动漫相关图像处理任务的格式。

# Input types
## Required
- image
    - 需要进行动漫线稿提取处理的输入图像。这个图像作为线稿检测模型的主要数据输入，决定了输出的质量和特征。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 指定输出线稿图像的分辨率，影响提取的线稿的细节水平和清晰度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经过处理后提取出动漫风格线稿的图像，可直接用于后续处理阶段。
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
