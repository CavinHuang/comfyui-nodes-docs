# Documentation
- Class name: LoadImageInspire
- Category: InspirePack/image
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点便于加载和预处理图像，将其转换为适合进一步分析和操作的格式。它强调将原始图像数据转换为结构化数组，为下游任务如特征提取或图像分类做好准备。

# Input types
## Required
- image
    - 图像参数至关重要，因为它指定了将要进行处理的源图像。它的选择影响了结果图像数据的质量和适用性。
    - Comfy dtype: COMBO[sorted(files) + ['#DATA']]
    - Python dtype: PIL.Image
## Optional
- image_data
    - 该参数包含编码后的图像数据，对于节点执行其主要功能——图像加载和转换至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 输出图像是输入的转换和结构化表示，为系统内进一步分析或处理做好了准备。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- mask
    - 掩码输出提供了一个二进制表示，可用于各种与图像相关的操作，增强了节点应用的多功能性。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LoadImageInspire:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {'required': {'image': (sorted(files) + ['#DATA'], {'image_upload': True}), 'image_data': ('STRING', {'multiline': False})}}
    CATEGORY = 'InspirePack/image'
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'load_image'

    def load_image(self, image, image_data):
        image_data = base64.b64decode(image_data.split(',')[1])
        i = Image.open(BytesIO(image_data))
        i = ImageOps.exif_transpose(i)
        image = i.convert('RGB')
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        if 'A' in i.getbands():
            mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
            mask = 1.0 - torch.from_numpy(mask)
        else:
            mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
        return (image, mask.unsqueeze(0))
```