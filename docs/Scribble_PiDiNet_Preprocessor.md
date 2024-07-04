
# Documentation
- Class name: Scribble_PiDiNet_Preprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

该节点利用PiDiNet模型预处理图像以提取涂鸦线条，从而增强图像以供进一步处理或可视化。它专注于从输入图像中生成清晰的涂鸦式线条，适用于需要风格化线条绘图或素描的应用场景。

# Input types
## Required
- image
    - 需要进行涂鸦线条提取处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- safe
    - 一种模式，启用时会在处理过程中应用额外的安全检查或约束，以确保处理的稳健性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 在处理前将输入图像缩放到的分辨率。这会影响提取线条的细节程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 处理后的图像，包含增强的涂鸦线条，适合可视化或进一步处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Scribble_PiDiNet_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            safe=(["enable", "disable"], {"default": "enable"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, safe, resolution):
        def model(img, **kwargs):
            from controlnet_aux.pidi import PidiNetDetector
            pidinet = PidiNetDetector.from_pretrained().to(model_management.get_torch_device())
            result = pidinet(img, scribble=True, **kwargs)
            result = nms(result, 127, 3.0)
            result = cv2.GaussianBlur(result, (0, 0), 3.0)
            result[result > 4] = 255
            result[result < 255] = 0
            return result
        return (common_annotator_call(model, image, resolution=resolution, safe=safe=="enable"),)

```
