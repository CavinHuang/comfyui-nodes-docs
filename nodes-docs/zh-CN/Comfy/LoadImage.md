# Documentation
- Class name: LoadImage
- Category: image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LoadImage节点旨在从指定目录中摄取图像文件，处理它们，并输出图像及其对应的掩码。它能够处理图像序列并将其转换为适合进一步处理的格式，强调其在准备图像相关任务数据中的作用。

# Input types
## Required
- image
    - 'image'参数是要处理的图像文件的路径。它对节点的操作至关重要，因为它决定了要加载和操作的特定图像。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- IMAGE
    - 'IMAGE'输出是一个表示处理后的图像数据的张量，它已被转换为浮点格式并进行了归一化。这个输出很重要，因为它是用于后续图像分析或操作任务的主要数据结构。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- MASK
    - 'MASK'输出是一个表示与图像相关联的二进制掩码的张量，用于区分图像中的不同区域或对象。对于需要分割或对象识别的任务来说，它是必不可少的。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LoadImage:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {'required': {'image': (sorted(files), {'image_upload': True})}}
    CATEGORY = 'image'
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'load_image'

    def load_image(self, image):
        image_path = folder_paths.get_annotated_filepath(image)
        img = Image.open(image_path)
        output_images = []
        output_masks = []
        for i in ImageSequence.Iterator(img):
            i = ImageOps.exif_transpose(i)
            if i.mode == 'I':
                i = i.point(lambda i: i * (1 / 255))
            image = i.convert('RGB')
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            if 'A' in i.getbands():
                mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                mask = 1.0 - torch.from_numpy(mask)
            else:
                mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
            output_images.append(image)
            output_masks.append(mask.unsqueeze(0))
        if len(output_images) > 1:
            output_image = torch.cat(output_images, dim=0)
            output_mask = torch.cat(output_masks, dim=0)
        else:
            output_image = output_images[0]
            output_mask = output_masks[0]
        return (output_image, output_mask)

    @classmethod
    def IS_CHANGED(s, image):
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