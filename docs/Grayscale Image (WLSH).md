# Documentation
- Class name: WLSH_Image_Grayscale
- Category: WLSH Nodes/image
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点旨在将彩色图像转换为灰度图像，这是图像处理中的一项基本操作，通过去除颜色信息来降低图像的复杂性，从而专注于图像的结构和亮度方面。

# Input types
## Required
- original
    - 原始图像是进行灰度转换过程所需的输入。它至关重要，因为它是转换的对象，原始图像的质量和分辨率直接影响结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray

# Output types
- grayscale
    - 输出是输入图像的灰度版本，已处理以专注于亮度和结构细节，不受颜色的干扰。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Image_Grayscale:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'original': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('grayscale',)
    FUNCTION = 'make_grayscale'
    CATEGORY = 'WLSH Nodes/image'

    def make_grayscale(self, original):
        image = tensor2pil(original)
        image = ImageOps.grayscale(image)
        image = image.convert('RGB')
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        return (image,)
```