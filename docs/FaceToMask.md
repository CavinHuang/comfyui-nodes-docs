# Documentation
- Class name: FaceToMask
- Category: ♾️Mixlab/Mask
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点使用图像处理技术从输入图像中识别和隔离面部特征，专注于绿色通道以创建突出显示检测到的面部的掩码。

# Input types
## Required
- image
    - 输入图像对于节点的操作至关重要，因为它是提取面部特征和生成掩码的来源。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Output types
- MASK
    - 输出掩码代表输入图像中的面部区域，使用绿色通道数据来指示面部的存在。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class FaceToMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',)}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Mask'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, image):
        im = tensor2pil(image)
        mask = detect_faces(im)
        mask = pil2tensor(mask)
        channels = ['red', 'green', 'blue', 'alpha']
        mask = mask[:, :, :, channels.index('green')]
        return (mask,)
```