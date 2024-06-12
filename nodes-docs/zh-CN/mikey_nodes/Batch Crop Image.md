# Documentation
- Class name: BatchCropImage
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

BatchCropImage节点的`batch`方法旨在处理一个目录中的图像，通过将每个图像裁剪到指定大小来保持长宽比。它能够处理各种图像格式，并将裁剪后的图像转换为适合进一步处理的张量格式。

# Input types
## Required
- image_directory
    - 参数`image_directory`指定包含要裁剪图像的目录的路径。这是一个关键参数，因为节点的执行取决于此目录的存在和可访问性。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- crop_amount
    - 参数`crop_amount`确定要裁剪的图像比例。它很重要，因为它直接影响结果裁剪图像的尺寸，影响后续的分析或处理。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出`image`由转换为张量格式的裁剪图像列表组成。这个输出很重要，因为它代表了准备好用于下游任务（如机器学习或图像分析）的已处理数据。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class BatchCropImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image_directory': ('STRING', {'multiline': False, 'placeholder': 'Image Directory'}), 'crop_amount': ('FLOAT', {'default': 0.05})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'batch'
    CATEGORY = 'Mikey/Image'
    OUTPUT_IS_LIST = (True,)

    def batch(self, image_directory, crop_amount):
        if not os.path.exists(image_directory):
            raise Exception(f'Image directory {image_directory} does not exist')
        images = []
        for file in os.listdir(image_directory):
            if file.endswith('.png') or file.endswith('.jpg') or file.endswith('.jpeg') or file.endswith('.webp') or file.endswith('.bmp') or file.endswith('.gif'):
                img = Image.open(os.path.join(image_directory, file))
                (width, height) = img.size
                pixels = int(width * crop_amount) // 8 * 8
                left = pixels
                upper = pixels
                right = width - pixels
                lower = height - pixels
                cropped_img = img.crop((left, upper, right, lower))
                img = pil2tensor(cropped_img)
                images.append(img)
        return (images,)
```