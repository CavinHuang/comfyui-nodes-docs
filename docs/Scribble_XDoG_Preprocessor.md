
# Documentation
- Class name: Scribble_XDoG_Preprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

Scribble_XDoG_Preprocessor节点专门用于从图像中提取风格化的线条绘图，结合了涂鸦检测和XDoG（扩展高斯差分）过滤技术。它对图像进行预处理以突出重要的边缘和细节，使其适合进一步的艺术或分析处理。

# Input types
## Required
- image
    - 需要处理以提取线条的输入图像。它是节点应用涂鸦检测和XDoG过滤技术的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- threshold
    - 决定XDoG过滤器在检测边缘时的敏感度。较低的阈值会捕捉到更细微的细节，而较高的值则强调更显著的边缘。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 指定处理图像的分辨率。它影响提取的线条中捕获的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个经过处理的图像，包含风格化的线条绘图，强调了使用Scribble_XDoG技术提取的边缘和细节。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
