# Documentation
- Class name: SvgImage
- Category: ♾️Mixlab/Image
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点旨在处理SVG图像，将其转换为适合在神经网络框架中进一步操作和分析的张量格式。它强调SVG数据的转换和适配，以便与深度学习模型集成。

# Input types
## Required
- upload
    - ‘upload’参数对节点的运行至关重要，它包含了SVG图像数据和相关的元数据。它直接影响节点处理和转换SVG为张量的能力。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Output types
- IMAGE
    - ‘IMAGE’输出提供了输入SVG图像的张量表示，可用于深度学习环境中的进一步处理。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor
- layers
    - ‘layers’输出包含了从SVG数据中提取的单个组件或图层，可用于对图像结构进行详细分析或操作。
    - Comfy dtype: List[Any]
    - Python dtype: List[Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SvgImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'upload': ('SVG',)}}
    RETURN_TYPES = ('IMAGE', 'LAYER')
    RETURN_NAMES = ('IMAGE', 'layers')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Image'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False, True)

    def run(self, upload):
        layers = []
        image = base64_to_image(upload['image'])
        image = image.convert('RGB')
        image = pil2tensor(image)
        for layer in upload['data']:
            layers.append(layer)
        return (image, layers)
```