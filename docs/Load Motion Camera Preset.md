# Documentation
- Class name: LoadMotionCameraPreset
- Category: motionctrl
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-MotionCtrl.git

该节点旨在检索和加载预定义的相机运动预设，以便于在运动捕捉场景中实现动态相机控制。

# Input types
## Required
- motion_camera
    - motion_camera参数指定要加载的预设，这对于确定运动序列中相机的位置和方向至关重要。
    - Comfy dtype: COMBO[MOTION_CAMERA_OPTIONS]
    - Python dtype: str

# Output types
- POINTS
    - 输出提供已加载的相机预设数据，这对于在系统中应用指定的相机运动至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class LoadMotionCameraPreset:

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
        with open(f'{comfy_path}/custom_nodes/ComfyUI-MotionCtrl/examples/camera_poses/test_camera_{motion_camera}.json') as f:
            data = f.read()
        return (data,)
```