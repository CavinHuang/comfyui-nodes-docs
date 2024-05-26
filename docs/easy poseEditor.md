# Documentation
- Class name: poseEditor
- Category: EasyUse/Image
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

poseEditor节点旨在处理和操作图像数据，便于从输入图像中提取和转换与姿态相关的特征。它擅长处理来自不同来源的图像数据，并将其转换为适合进一步分析或可视化的格式。

# Input types
## Required
- image
    - 图像参数至关重要，因为它定义了将由节点处理的源图像。它通过确定输入数据的内容和质量影响节点的操作，这直接影响后续的姿态分析和转换。
    - Comfy dtype: COMBO[sorted(os.listdir(temp_dir))]:string
    - Python dtype: str

# Output types
- output_pose
    - output_pose代表处理后的图像数据，已经转换并准备好进行进一步分析。它封装了从输入图像中提取的关键信息，重点关注与姿态相关的特征。
    - Comfy dtype: tuple(torch.Tensor)
    - Python dtype: Tuple[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class poseEditor:

    @classmethod
    def INPUT_TYPES(self):
        temp_dir = folder_paths.get_temp_directory()
        if not os.path.isdir(temp_dir):
            os.makedirs(temp_dir)
        temp_dir = folder_paths.get_temp_directory()
        return {'required': {}, 'optional': {'image': (sorted(os.listdir(temp_dir)),)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'output_pose'
    CATEGORY = 'EasyUse/Image'

    def output_pose(self, image):
        if image.startswith('http'):
            from worker.components.utils import util
            i = util.get_image_from_uri(image)
        else:
            image_path = os.path.join(folder_paths.get_temp_directory(), image)
            i = Image.open(image_path)
        image = i.convert('RGB')
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        return (image,)

    @classmethod
    def IS_CHANGED(self, image):
        image_path = os.path.join(folder_paths.get_temp_directory(), image)
        m = hashlib.sha256()
        with open(image_path, 'rb') as f:
            m.update(f.read())
        return m.digest().hex()
```