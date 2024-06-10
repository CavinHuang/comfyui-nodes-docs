# Documentation
- Class name: LoadImageMask
- Category: mask
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LoadImageMask节点旨在加载和处理图像文件，特别关注提取特定的颜色通道或alpha通道以创建掩码。它能够处理各种图像格式，并确保输出是一个标准化的掩码张量，适用于下游任务的进一步处理。

# Input types
## Required
- image
    - 图像参数对于LoadImageMask节点至关重要，因为它指定了要加载的图像文件。这个输入直接影响节点的操作，它决定了掩码数据的来源。
    - Comfy dtype: str
    - Python dtype: str
- channel
    - 通道参数指示使用图像的哪个颜色通道来生成掩码。它在节点的功能中起着关键作用，通过定义要提取和处理的特定通道。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- MASK
    - LoadImageMask节点的MASK输出代表了从指定图像和通道派生的掩码张量。它是一个标准化的张量，可以立即用于后续操作。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LoadImageMask:
    _color_channels = ['alpha', 'red', 'green', 'blue']

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {'required': {'image': (sorted(files), {'image_upload': True}), 'channel': (s._color_channels,)}}
    CATEGORY = 'mask'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'load_image'

    def load_image(self, image, channel):
        image_path = folder_paths.get_annotated_filepath(image)
        i = Image.open(image_path)
        i = ImageOps.exif_transpose(i)
        if i.getbands() != ('R', 'G', 'B', 'A'):
            if i.mode == 'I':
                i = i.point(lambda i: i * (1 / 255))
            i = i.convert('RGBA')
        mask = None
        c = channel[0].upper()
        if c in i.getbands():
            mask = np.array(i.getchannel(c)).astype(np.float32) / 255.0
            mask = torch.from_numpy(mask)
            if c == 'A':
                mask = 1.0 - mask
        else:
            mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
        return (mask.unsqueeze(0),)

    @classmethod
    def IS_CHANGED(s, image, channel):
        image_path = folder_paths.get_annotated_filepath(image)
        m = hashlib.sha256()
        with open(image_path, 'rb') as f:
            m.update(f.read())
        return m.digest().hex()

    @classmethod
    def VALIDATE_INPUTS(s, image):
        if not folder_paths.exists_annotated_filepath(image):
            return 'Invalid image file: {}'.format(image)
        return True
```