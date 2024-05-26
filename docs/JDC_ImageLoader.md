# Documentation
- Class name: LoadImagePath
- Category: image
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

LoadImagePath节点旨在从指定的路径或URL获取和处理图像数据。它可以处理在线图像（通过下载）和本地图像（直接打开文件）。该节点能够将图像转换为适合进一步处理的格式，包括归一化和转换为张量，如果可用，还会提取掩码。这个节点对于启动工作流中的基于图像的操作至关重要。

# Input types
## Required
- image
    - 'image'参数至关重要，因为它定义了图像数据的来源。它可以是本地文件路径或指向在线图像的URL。节点使用此输入来相应地检索和处理图像，使其成为节点操作的关键元素。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 'image'输出是输入图像的加工版本，转换为适合进一步计算任务的张量格式。它是节点功能的关键结果，使得后续的图像分析和操作成为可能。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor
- mask
    - 当存在'mack'输出时，它以二进制掩码的形式提供了额外信息，该掩码从输入图像中派生而来。这个掩码可以用于图像处理工作流中的各种目的，如分割或对象识别。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LoadImagePath:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('STRING', {'default': ''})}}
    CATEGORY = 'image'
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'load_image'

    def load_image(self, image):
        image_path = str(image)
        image_path = image_path.replace('"', '')
        i = None
        if image_path.startswith('http'):
            response = requests.get(image_path)
            i = Image.open(BytesIO(response.content)).convert('RGB')
        else:
            i = Image.open(image_path)
        i = ImageOps.exif_transpose(i)
        image = i.convert('RGB')
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        if 'A' in i.getbands():
            mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
            mask = 1.0 - torch.from_numpy(mask)
        else:
            mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
        return (image, mask)

    @classmethod
    def IS_CHANGED(s, image):
        image_path = str(image)
        image_path = image_path.replace('"', '')
        m = hashlib.sha256()
        if not image_path.startswith('http'):
            with open(image_path, 'rb') as f:
                m.update(f.read())
            return m.digest().hex()
        else:
            m.update(image.encode('utf-8'))
            return m.digest().hex()

    @classmethod
    def VALIDATE_INPUTS(s, image):
        image_path = str(image)
        image_path = image_path.replace('"', '')
        if image_path.startswith('http'):
            return True
        if not os.path.isfile(image_path):
            return 'No file found: {}'.format(image_path)
        return True
```