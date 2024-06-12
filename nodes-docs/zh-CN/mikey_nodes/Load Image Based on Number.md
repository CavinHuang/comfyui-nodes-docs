# Documentation
- Class name: LoadImgFromDirectoryBasedOnIndex
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

该节点旨在根据提供的索引从指定目录加载图像。它确保目录存在，然后从该目录中排序后的图像文件列表中选择一个图像文件。节点的功能集中在检索图像并将其转换为适合进一步处理的张量格式。

# Input types
## Required
- image_directory
    - image_directory 参数指定包含图像文件的目录的路径。它对节点的操作至关重要，因为它决定了要加载的图像的来源。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- seed
    - seed 参数用于确定从排序后的文件列表中加载的图像文件的索引。它影响选择过程，并确保在图像检索中有一定程度的随机性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - image 输出提供了以张量格式加载的图像，这对于需要以数值形式的图像数据的下游任务至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- filename
    - filename 输出返回加载的图像文件的名称，这对于记录、跟踪或需要文件识别的额外处理非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class LoadImgFromDirectoryBasedOnIndex:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image_directory': ('STRING', {'multiline': False, 'placeholder': 'Image Directory'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'filename')
    FUNCTION = 'load'
    CATEGORY = 'Mikey/Image'

    def load(self, image_directory, seed):
        if not os.path.exists(image_directory):
            raise Exception(f'Image directory {image_directory} does not exist')
        files = [os.path.join(image_directory, f) for f in os.listdir(image_directory) if os.path.isfile(os.path.join(image_directory, f)) and f.endswith(('.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif'))]
        files.sort()
        offset = seed % len(files)
        filename = files[offset].split('/')[-1]
        img = Image.open(files[offset])
        img = pil2tensor(img)
        return (img, filename)
```