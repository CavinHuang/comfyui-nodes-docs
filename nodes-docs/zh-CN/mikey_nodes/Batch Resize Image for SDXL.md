# Documentation
- Class name: BatchResizeImageSDXL
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

BatchResizeImageSDXL 节点旨在根据指定参数批量处理图像，通过调整大小来优化它们。它支持多种裁剪和放大方法，确保图像能够准确高效地调整尺寸。这个节点特别适用于为进一步处理或展示准备图像数据集。

# Input types
## Required
- image_directory
    - image_directory 参数指定了要调整大小的图像存储的位置。这对于节点定位和访问图像进行处理至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- upscale_method
    - upscale_method 参数决定了用于放大图像的算法。它对调整后图像的质量和外观有显著影响。
    - Comfy dtype: COMBO['nearest-exact', 'bilinear', 'area', 'bicubic']
    - Python dtype: str
- crop
    - crop 参数指示在调整大小后是否以及如何裁剪图像。这对于保持长宽比或关注图像的特定部分可能很重要。
    - Comfy dtype: COMBO['disabled', 'center']
    - Python dtype: str

# Output types
- image
    - BatchResizeImageSDXL 节点输出的 image 是一个调整过大小的图像列表。每个图像都根据输入参数进行了处理，使其准备好进行应用或分析的下一阶段。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class BatchResizeImageSDXL(ResizeImageSDXL):
    crop_methods = ['disabled', 'center']
    upscale_methods = ['nearest-exact', 'bilinear', 'area', 'bicubic']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image_directory': ('STRING', {'multiline': False, 'placeholder': 'Image Directory'}), 'upscale_method': (s.upscale_methods,), 'crop': (s.crop_methods,)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'batch'
    CATEGORY = 'Mikey/Image'
    OUTPUT_IS_LIST = (True,)

    def batch(self, image_directory, upscale_method, crop):
        if not os.path.exists(image_directory):
            raise Exception(f'Image directory {image_directory} does not exist')
        images = []
        for file in os.listdir(image_directory):
            if file.endswith('.png') or file.endswith('.jpg') or file.endswith('.jpeg') or file.endswith('.webp') or file.endswith('.bmp') or file.endswith('.gif'):
                img = Image.open(os.path.join(image_directory, file))
                img = pil2tensor(img)
                img = self.resize(img, upscale_method, crop)[0]
                images.append(img)
        return (images,)
```