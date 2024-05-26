# Documentation
- Class name: MirroredImage
- Category: ♾️Mixlab/Image
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点类旨在通过水平轴反射输入的图像集合，从而创建输入图像的镜像版本。它是图像处理任务中的基本工具，其中镜像图像可用于各种目的，如扩充数据集、创建视觉效果或进行基于对称性的分析。

# Input types
## Required
- image
    - 输入参数'image'是将由节点处理的图像集合。每个图像都应该是以节点内部图像处理功能可以读取和操作的格式。此参数至关重要，因为它直接决定了节点生成的镜像图像的内容和性质。
    - Comfy dtype: COMBO[IMAGE]
    - Python dtype: List[PIL.Image.Image]

# Output types
- IMAGE
    - 节点的输出是一系列镜像图像的列表。列表中的每个图像都是相应输入图像水平反射的结果。这些镜像图像可以用于各种下游应用，使得这个输出对于图像相关任务非常重要。
    - Comfy dtype: COMBO[IMAGE]
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class MirroredImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Image'
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)

    def run(self, image):
        res = []
        for ims in image:
            for im in ims:
                img = tensor2pil(im)
                mirrored_image = img.transpose(Image.FLIP_LEFT_RIGHT)
                img = pil2tensor(mirrored_image)
                res.append(img)
        return (res,)
```