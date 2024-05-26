# Documentation
- Class name: PoseEditor3D
- Category: image
- Output node: False
- Repo Ref: https://github.com/hinablue/ComfyUI_3dPoseEditor.git

PoseEditor3D类便于从图像中操作和处理3D姿态，使得可以提取和分析姿态数据以用于各种应用。

# Input types
## Optional
- pose
    - 姿态参数对于从图像中初始化3D姿态至关重要，允许节点专注于特定的人物形象。
    - Comfy dtype: COMBO[sorted(os.listdir(temp_dir),)]
    - Python dtype: Union[str, None]
- depth
    - 深度图像为3D重建过程提供重要信息，提高了姿态估计的准确性。
    - Comfy dtype: COMBO[sorted(os.listdir(temp_dir),)]
    - Python dtype: Union[str, None]
- normal
    - 法线图像有助于理解3D形象的表面方向，改善了姿态的视觉表示。
    - Comfy dtype: COMBO[sorted(os.listdir(temp_dir),)]
    - Python dtype: Union[str, None]
- canny
    - Canny图像用于边缘检测，这对于识别3D姿态的轮廓和边界至关重要。
    - Comfy dtype: COMBO[sorted(os.listdir(temp_dir),)]
    - Python dtype: Union[str, None]

# Output types
- OpenPose
    - OpenPose输出提供了3D姿态的详细表示，这对于进一步的分析和处理至关重要。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- Depth
    - Depth输出包含处理后的深度信息，对于3D重建和理解场景的空间关系至关重要。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- Normal
    - Normal输出代表3D形象的表面方向，提高了姿态的视觉准确性。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- Canny
    - Canny输出提供边缘检测数据，这对于识别3D姿态的轮廓和边界至关重要。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class PoseEditor3D(object):

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        temp_dir = folder_paths.get_temp_directory()
        temp_dir = os.path.join(temp_dir, '3dposeeditor')
        if not os.path.isdir(temp_dir):
            os.makedirs(temp_dir)
        return {'required': {}, 'optional': {'pose': (sorted(os.listdir(temp_dir)),), 'depth': (sorted(os.listdir(temp_dir)),), 'normal': (sorted(os.listdir(temp_dir)),), 'canny': (sorted(os.listdir(temp_dir)),)}}
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('OpenPose', 'Depth', 'Normal', 'Canny')
    FUNCTION = 'output_pose'
    CATEGORY = 'image'

    def output_pose(self, pose=None, depth=None, normal=None, canny=None):
        if pose is None:
            return (None, None, None, None)
        temp_dir = folder_paths.get_temp_directory()
        temp_dir = os.path.join(temp_dir, '3dposeeditor')
        image_path = os.path.join(temp_dir, pose)
        if pose.startswith('http'):
            from worker.components.utils import util
            i = util.get_image_from_uri(pose)
        else:
            i = Image.open(image_path)
        poseImage = i.convert('RGB')
        poseImage = np.array(poseImage).astype(np.float32) / 255.0
        poseImage = torch.from_numpy(poseImage)[None,]
        image_path = os.path.join(temp_dir, depth)
        if depth.startswith('http'):
            from worker.components.utils import util
            i = util.get_image_from_uri(depth)
        else:
            i = Image.open(image_path)
        depthImage = i.convert('RGB')
        depthImage = np.array(depthImage).astype(np.float32) / 255.0
        depthImage = torch.from_numpy(depthImage)[None,]
        image_path = os.path.join(temp_dir, normal)
        if normal.startswith('http'):
            from worker.components.utils import util
            i = util.get_image_from_uri(normal)
        else:
            i = Image.open(image_path)
        normalImage = i.convert('RGB')
        normalImage = np.array(normalImage).astype(np.float32) / 255.0
        normalImage = torch.from_numpy(normalImage)[None,]
        image_path = os.path.join(temp_dir, canny)
        if canny.startswith('http'):
            from worker.components.utils import util
            i = util.get_image_from_uri(canny)
        else:
            i = Image.open(image_path)
        cannyImage = i.convert('RGB')
        cannyImage = np.array(cannyImage).astype(np.float32) / 255.0
        cannyImage = torch.from_numpy(cannyImage)[None,]
        return (poseImage, depthImage, normalImage, cannyImage)

    @staticmethod
    def IS_CHANGED(self, pose=None, depth=None, normal=None, canny=None):
        if pose is None:
            return False
        temp_dir = folder_paths.get_temp_directory()
        temp_dir = os.path.join(temp_dir, '3dposeeditor')
        image_path = os.path.join(temp_dir, pose)
        m = hashlib.sha256()
        with open(image_path, 'rb') as f:
            m.update(f.read())
        return m.digest().hex()
```