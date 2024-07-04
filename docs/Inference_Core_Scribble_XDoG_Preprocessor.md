
# Documentation
- Class name: Inference_Core_Scribble_XDoG_Preprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

该节点旨在通过应用Scribble和XDoG（扩展高斯差分）技术的组合来预处理图像，从而提取风格化的线条绘图。它属于ControlNet预处理器/线条提取器类别，目的是通过强调关键轮廓和特征来增强图像分析和处理任务。

# Input types
## Required
- image
    - 需要处理的输入图像。它是线条提取过程的主要数据来源，节点将在其上应用Scribble和XDoG技术以突出并风格化重要特征。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- threshold
    - 定义XDoG滤波器的强度阈值，影响提取线条的对比度和可见度。它允许微调线条提取以达到所需的艺术效果。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 指定输出图像的分辨率。它决定了处理后图像的细节水平和质量，确保提取的线条得到适当的缩放。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个使用Scribble和XDoG技术处理后的图像，其中包含风格化的提取线条。它突出了基本特征和轮廓，适用于进一步的图像分析或艺术应用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
