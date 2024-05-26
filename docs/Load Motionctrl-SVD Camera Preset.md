# Documentation
- Class name: LoadMotionCtrlSVDCameraPreset
- Category: motionctrl
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-MotionCtrl-SVD.git

该节点旨在为3D环境中的运动控制加载预定义的相机预设。它使用户能够选择并应用不同的相机视角，以增强视觉叙事或模拟场景。

# Input types
## Required
- motion_camera
    - ‘motion_camera’参数对节点的操作至关重要，因为它决定了要加载的特定相机预设。这个选择可以显著影响运动控制过程的结果，影响最终的可视化或模拟。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- POINTS
    - 输出‘POINTS’代表加载的相机预设数据，其中包含相机定位和方向的参数。这些数据对于在3D应用程序中实现所需的运动控制效果至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class LoadMotionCtrlSVDCameraPreset:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'motion_camera': (MOTION_CAMERA_OPTIONS,)}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('POINTS',)
    FUNCTION = 'load_motion_camera_preset'
    CATEGORY = 'motionctrl'

    def load_motion_camera_preset(self, motion_camera):
        data = '[]'
        comfy_path = os.path.dirname(folder_paths.__file__)
        with open(f'{comfy_path}/custom_nodes/ComfyUI-MotionCtrl-SVD/examples/camera_poses/test_camera_{motion_camera}.json') as f:
            data = f.read()
        return (data,)
```