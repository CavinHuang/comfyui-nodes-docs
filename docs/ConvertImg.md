
# Documentation
- Class name: ConvertImg
- Category: Bmad/CV
- Output node: False
- Repo Ref: https://github.com/bmad4ever/ComfyUI-Bmad-Custom-Nodes

ConvertImg节点旨在进行显式的图像格式转换，它使得某些自定义节点所需的特定图像格式能够直接使用，无需借助变通方法。这个节点在需要特定格式图像的工作流程中尤其有用，可以简化图像处理过程并提高工作效率。

# Input types
## Required
- image
    - image参数代表需要进行格式转换的输入图像。图像的当前格式对于转换过程至关重要，它直接影响节点的执行过程和最终的图像格式转换结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- to
    - to参数指定了图像转换的目标格式。这个参数决定了输出图像的格式，并可能影响该图像在后续处理步骤中的可用性。选择合适的目标格式对于确保图像在整个处理流程中的兼容性和功能性非常重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是一个已经转换为指定格式的图像，可以直接用于后续的处理或在应用程序中使用。这个转换后的图像保持了原始图像的内容，但其格式已经按照要求进行了调整，以满足特定的处理需求或兼容性要求。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ConvertImg:
    """ An explicit conversion, instead of using workarounds when using certain custom nodes. """
    options_map = {
        "RGBA": 4,
        "RGB": 3,
        "GRAY": 1,
    }
    options = list(options_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image": ("IMAGE",),
            "to": (s.options, {"default": s.options[1]})
        }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "convert"
    CATEGORY = "Bmad/CV"

    def convert(self, image, to):
        image = tensor2opencv(image, self.options_map[to])
        return (opencv2tensor(image),)

```
