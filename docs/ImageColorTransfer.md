# Documentation
- Class name: ImageColorTransfer
- Category: ♾️Mixlab/Image
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

ImageColorTransfer 节点旨在通过从一个图像传递调色板到另一个图像来重新上色图像。它通过利用颜色转移算法实现这一点，该算法操作源图像的颜色分布以匹配目标图像，从而产生视觉上连贯且风格化变换的输出。

# Input types
## Required
- source
    - source 参数是要被替换颜色的图像。它在颜色转移过程中起着关键作用，因为它决定了将要被改变的原始颜色调色板。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- target
    - target 参数代表其颜色调色板将应用于源图像的图像。它对于定义输出图像应反映的所需颜色方案至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- result
    - result 参数是经过颜色转移的输出图像。它标志着节点操作的最终产品，展示了具有从目标图像适应颜色的源图像。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class ImageColorTransfer:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'source': ('IMAGE',), 'target': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Image'
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)

    def run(self, source, target):
        res = []
        target = target[0][0]
        print(target.shape)
        target = tensor2pil(target)
        for ims in source:
            for im in ims:
                image = tensor2pil(im)
                image = color_transfer(image, target)
                image = pil2tensor(image)
                res.append(image)
        return (res,)
```